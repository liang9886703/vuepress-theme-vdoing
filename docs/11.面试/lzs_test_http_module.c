#include <ngx_core.h> //nginx的数据结构
#include<ngx_http.h> //编写http模块必须包含的
//#include<ngx_config.h>
//#include<ngx_buf.h>

//为了保存配置参数的数据结构
typedef struct
{//这里有14中数据结构，对应有14种预设配置项的解析方法
    ngx_str_t   	my_str;
    ngx_int_t   	my_num;
    ngx_flag_t   	my_flag;
    size_t		    my_size;
    ngx_array_t*  	my_str_array;
    ngx_array_t*  	my_keyval;
    off_t   	    my_off;
    ngx_msec_t   	my_msec;
    time_t   	    my_sec;
    ngx_bufs_t   	my_bufs;
    ngx_uint_t   	my_enum_seq;
    ngx_uint_t	    my_bitmask;
    ngx_uint_t   	my_access;
    ngx_path_t*	    my_path;

    ngx_str_t		my_config_str;
    ngx_int_t		my_config_num;
} ngx_http_mytest_config_conf_t;

/* nginx框架调用http模块的时机有下面几部分
typedef enum {
    NGX_HTTP_POST_READ_PHASE = 0,  接收到完整的HTTP头部后处理的HTTP阶段，主要是获取客户端真实IP 

    NGX_HTTP_SERVER_REWRITE_PHASE, 还没有查询到URI匹配的location前，这时rewrite重写URL的阶段

    NGX_HTTP_FIND_CONFIG_PHASE,    根据URI寻找匹配的location（不可添加方法）
    NGX_HTTP_REWRITE_PHASE,        rewrite重写URL的阶段
    NGX_HTTP_POST_REWRITE_PHASE,   重写后的阶段，防止错误的conf导致死循环（不可添加方法）一个请求超过10次重定向则被认为死循环

    NGX_HTTP_PREACCESS_PHASE,      在access阶段前要做的

    NGX_HTTP_ACCESS_PHASE,         让http模块判断是否运行请求访问服务器
    NGX_HTTP_POST_ACCESS_PHASE,    （不可添加方法）

    NGX_HTTP_PRECONTENT_PHASE,

    NGX_HTTP_CONTENT_PHASE,        处理http请求的阶段，并不是所有请求都能到这个函数处理的

    NGX_HTTP_LOG_PHASE             处理完请求后记录日志的阶段
} ngx_http_phases;
*/

static void* ngx_http_mytest_create_loc_conf(ngx_conf_t* cf){
    ngx_http_mytest_conf_t *mycf;
    mycf = (ngx_http_mytest_conf_t*)ngx_pcalloc(cf->pool, sizeof(ngx_http_mytest_conf_t));
    if(mycf == NULL){
        return NULL;
    }
    /*这里可以对数据初始化值*/
    /*……*/
    return mycf;
}

static char* ngx_http_mytest_merge_loc_conf(ngx_conf_t* cf, void* parent, void* child){
    ngx_http_mytest_conf_t *prev = (ngx_http_mytest_conf_t*)parent;
    ngx_http_mytest_conf_t *conf = (ngx_http_mytest_conf_t*)child;
    ngx_conf_merge_str_value(conf->my_str, prev->my_str, "defaultstr");
    //如果第一二个参数都存在，则各自用各自的
    //如果第一个不存在，用第二个参数的，如果第二个参数也不存在，用默认值
    return NGX_CONF_OK;
}

static char* ngx_conf_set_myconfig(ngx_conf_t *cf, ngx_command_t* cmd, void *conf){
    ngx_http_mytest_conf_t *mycf = conf;//conf就是loc的create函数创建的结构体对象
    ngx_str_t* value = cf->args->elts;//value[1]就是配置项后面的第一个参数，value[2]后面就是配置项的后面第二个参数
    mycf->my_config_str = value[1];
    return NGX_CONF_OK;
}

/* 处理一个http请求的函数ß,在NGX_HTTP_CONTENT_PHASE阶段调用，这个例子是阻塞方式的，实际上不应该这样
*  ngx_http_request.h http的返回码
*  ngx_http_request.h ngx本身的状态码

*  状态码 NGX_OK       nginx会继续执行后续动作
*  状态码 NGX_DECLINED 继续在NGX_HTTP_CONTENT_PHASE阶段找下一个对该请求感兴趣的http模块来处理
*  状态码 NGX_DONE     告诉框架暂时不再继续执行这个请求的后续部分，用于对于耗时较长的请求，一次没处理完等到下次再处理，提高整体性能
*  状态码 NGX_ERROR    执行完post子请求（如果有）后终止本次请求
*/
static ngx_int_t ngx_http_mytest_handler(ngx_http_request_t *r){

    printf("[%s]%d: ", __FILE__, __LINE__);
    /*这个模块只打算处理get或head方法*/
    if(!r->method & (NGX_HTTP_GET|NGX_HTTP_HEAD)){
        return NGX_HTTP_NOT_ALLOWED;//返回405  
    }

    /*这里不处理包体*/
    /*丢弃包体不能不处理就完了，而是要调对应函数，不然http模块不接受tcp流，客户端可能一直发送*/
    ngx_int_t rc = ngx_http_discard_request_body(r);
    if(rc != NGX_OK){
        return rc;
    }

    /*发送http头部信息*/
    {
        /*只要往ngx_http_request_t结构体里的headers_out参数填入，下面就可以把http头部发出*/
        /*
        ngx_http_set_content_type(r);//根据URI中的文件扩展名等来设置content-type的值
        ngx_table_elt_t* h = ngx_list_push(&r->headers_out.headers);
        if(h == NULL){
            return NGX_ERROR;
        }
        */
        r->headers_out.status = NGX_HTTP_OK;//返回状态码
        ngx_str_t content = ngx_string("text/plain");
        r->headers_out.content_type =content;//设置返回的类型

        // /*在响应中新增一行HTTP头部：TestHead: TestValue\r\n*/
        // r->headers_out;
        // h->hash = 1;
        // h->key.len = sizeof("TestHead") - 1;
        // h->key.data = (u_char*) "TestHead";
        // h->value.len = sizeof("TestValue") - 1;
        // h->value.data = (u_char*)"TestValue";

        /*http框架提供了发送http头部的方法，姑且认为返回值大于0就是不正常*/
        ngx_int_t rc = ngx_http_send_header(r);
        if(rc == NGX_ERROR || rc > NGX_OK || r->header_only){
            return rc;
        }
    }
    /*发送包体*/
    {
        /*分配内存，生成数据*/
        /*用基本的内存分配方法
        //ngx_palloc和ngx_pcalloc基本一样，只不过ngx_pcalloc会把内存块置0
        ngx_buf_t* b = ngx_pcalloc(r->pool, sizeof(ngx_buf_t));
        b->start = (u_char*)ngx_pcalloc(r->pool, 128);
        b->pos = b->start;
        b->last = b->start;
        b->end = b->last + 128;
        b->temporary = 1;*/
        //或者用如下函数完成上面6行代码的功能
        ngx_buf_t* b = ngx_create_temp_buf(r->pool, 128);
        if(b == NULL){
            return NGX_HTTP_INTERNAL_SERVER_ERROR;
        }

        /*生成包体内容*/
        ngx_str_t response = ngx_string("Hello World!");//包体内容
        ngx_memcpy(b->pos, response.data, response.len);
        b->last = b->pos + response.len;//一定要设置
        b->last_buf = 1;//声明这是最后一块缓冲区

        /*发送*/
        ngx_chain_t out;
        out.buf = b;
        out.next = NULL;
        return ngx_http_output_filter(r, &out);
        //注意因为异步的nginx，不可以用栈区的空间作为包体发送
        //可能存在TCP连接的缓冲区不可写，而这个函数提前返回了，当TCP可写时，栈空间的数据已经释放了
        //发送结束后HTTP框架会调用ngx_http_finalize_request方法结束请求
    }
}

/*用于异步接收包体，接收的包体在r->request_body->temp_file->file中获取临时文件，这里没有使用这个函数*/
ngx_int_t ngx_http_mytest_body_handler(ngx_http_request_t *r){
    //这个函数表示开启接收包体，这个动作完成后会调用自己ngx_http_mytest_body_handler
    ngx_int_t rc = ngx_http_read_client_request_body(r, ngx_http_mytest_body_handler);

    if(rc >= NGX_HTTP_SPECIAL_RESPONSE){
        return rc;
    }
    return NGX_DONE;
}

/**/
static char* ngx_http_mytest(ngx_conf_t* cf, ngx_command_t* cmd, void* conf){
    //cf指向解析配置文件上下文，cf->args->elts表示当前正在解析的指令后面的参数，cf->args->elts[0]表示指令的字符串，cf->args->elts[1]表示指令后面那个参数的字符串
    //cmd指向这个模块里ngx_http_mytest_commands数组里激活这个函数的那个command对应的那个数组配置
    //conf指向配置结构体的实例（如ngx_http_）

    printf("[%s]%d: ", __FILE__, __LINE__);
    //clcf可以是main、srv、loc任意级别的配置项
    ngx_http_core_loc_conf_t* clcf = ngx_http_conf_get_module_loc_conf(cf, ngx_http_core_module);
    /*将在ngx_http_finalize_request(r, r->content_handler(r));里面的r->content_handler(r)执行这个注册的函数
    HTTP框架在接收完HTTP请求的头部后，会调用这个方法*/
    clcf->handler = ngx_http_mytest_handler;
    return NGX_CONF_OK; 
}

//HTTP框架初始化时各个阶段需要做的事情，
//在框架初始化时，main函数中调用Ngx_init_cycle函数中调用每个核心模块的create_conf中，
//例如，ngx_http_module模块的create_conf函数中会遍历每个http模块，创建他们的conf对象（由ngx_http_module持有，其他http模块通过下标访问自己的配置对象）
//     这里的创建就是调这里定义的create函数
//     ngx_http_module模块的init_conf函数里调用这里的init函数
static ngx_http_module_t ngx_http_mytest_module_ctx = {
    NULL, /* preconfiguration */
    NULL,  /* postconfiguration*/ 

    NULL,/* create main configuration *///如果需要从配置项里读些信息作为全局变量使用，需要在这里创建对象
    NULL,/* init main configuration */
    
    NULL,/* create server configuration */ 
    NULL,/* merge server configuration */
 
    ngx_http_mytest_create_loc_conf,/* create location configuration */
    ngx_http_mytest_merge_loc_conf,/* merge location configuration */
    //如果只实现了create_loc,没有实现merge_loc，那么loc级别的配置项不会生效
};

// 对模块配置的初始化，
static ngx_command_t ngx_http_mytest_commands[] = {
    {//
        ngx_string("mytest"), //方法名字
        NGX_HTTP_MAIN_CONF|NGX_HTTP_SRV_CONF|NGX_HTTP_LOC_CONF|NGX_HTTP_LMT_CONF|NGX_CONF_NOARGS, //决定这个配置项可以在哪些配置项出现
        //这里是可以出现在http模块里的http{}、server{}、location{}、limit_except{},NGX_CONF_NOARGS表示配置项不携带参数
        ngx_http_mytest, //当某个模块出现mytest配置项时，将调用它
        //既可以自定义，也可以使用nginx提供的14种解析配置的方法
        NGX_HTTP_LOC_CONF_OFFSET,//分配内存的偏移量，指明这个数据应该放到所处内存的相对偏移位置
        //仅在type里没有设置NGX_DIRECT_CONF、NGX_MAIN_CONF时才生效
        //当回调函数用的是nginx自带的14种解析方法时，就需要通过这个值指明读到的参数放到哪个级别的配置项里
        0,//当前这个变量应该放到这个级别的结构体的偏移量里，归具体的哪个变量负责，可以通过调用宏来计算值：offsetof(结构体名字，变量名)
        NULL//post方法，用在解析完配置项后的回调方法，通常init_main_conf这样的方法就能全部完成解析了，不需要这个函数
    },
    {//使用自定义的函数解析配置
        ngx_string("test_myconfig"),
        NGX_HTTP_LOC_CONF|NGX_CONF_TAKE12,
        ngx_conf_set_myconfig,
        NGX_HTTP_LOC_CONF_OFFSET,
        0,
        NULL
    },
    ngx_null_command
};

//模块的句柄
ngx_module_t ngx_http_mytest_module = {
    NGX_MODULE_V1, //一个宏，初始化基础信息
    &ngx_http_mytest_module_ctx, //上面定义的
    ngx_http_mytest_commands, //上面定义的
    NGX_HTTP_MODULE, //模块类型是http模块
    NULL, //master进程创建时的初始化
    NULL, //模块创建时的初始化
    NULL, //创建子进程时的初始化
    NULL, //创建子线程时的初始化（不用）
    NULL, //线程离开时要做的（不用）
    NULL, //进程离开时要做的
    NULL, //master进程离开时要做的
    NGX_MODULE_V1_PADDING
};
