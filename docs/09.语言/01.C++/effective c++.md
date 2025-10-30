---
title: effective C++
date: 2025-04-14 14:29:49
permalink: /09/01/01
comment: true
categories: 
  - 09
  - 01
tags: 
author:
  name: songkuakua
  link: https://github.com/liang9886703 
---

# 名词对照表

| 中文                     | 英文                                   | 简写  | 解释                                                         |
| ------------------------ | -------------------------------------- | ----- | ------------------------------------------------------------ |
| 值传递                   | Pass-by-value                          |       |                                                              |
| 以const的方式引用传递    | pass-by-reference-to-const             |       |                                                              |
| 隐式类型转换             | implicit type conversion               |       |                                                              |
| 显示类型转换             | explicit type conversion               |       |                                                              |
| 用户定义变量             | user-defined type                      |       |                                                              |
| 未定义行为               | undefined behavior                     |       |                                                              |
| 指向T的指针              | pointer to T                           |       |                                                              |
| 元编程                   | metaprogramming                        |       |                                                              |
| 泛型                     | generic                                |       |                                                              |
| 单例模式                 | singleton                              |       |                                                              |
|                          | right hand side                        | rhs   |                                                              |
|                          | left hand side                         | lhs   |                                                              |
| 缺省行为                 | default behavior                       |       |                                                              |
| 资源获取即初始化         | resource acquisition is initialization | RAII  |                                                              |
| 跨 DLL 问题              | cross-Dll problem                      |       | 不同编译器有不同的 对象模型，从而导致不同库 之间调用出现崩溃 |
| 封装灵活性/包裹弹性      | Packaging flexibility                  |       |                                                              |
| 声明函数                 | declare a function                     |       |                                                              |
| 定义函数                 | define a function                      |       |                                                              |
| 实现函数（口语）         | implement a function                   |       |                                                              |
| 异常安全编程             | exception-sate programming             |       |                                                              |
|                          | pointer to implement                   | pimpl |                                                              |
| 偏特化                   | partially specialize                   |       |                                                              |
| 全特化                   | total template specialization          |       |                                                              |
| 效率高敏感时             | performance-sensitive                  |       |                                                              |
| 并发控制                 | concurrency control                    |       |                                                              |
| 换页                     | paging                                 |       |                                                              |
| 指令高速缓存装置的命中率 | instruction cache hit rate             |       |                                                              |
| 纯虚函数                 | pure virtual function                  |       |                                                              |
| 虚函数                   | impure virtual function                |       |                                                              |
| 非虚函数                 | non-virtual function                   |       |                                                              |
| 模板元编程               | template metaprogramming               | TMP   |                                                              |

声明式(declaration)：告诉编译器某个东西名称和类型，`class Widget`

签名式(signature)：函数的声明揭示其签名式，为函数的参数和返回类型

定义式(definition)：对template而言是代码实现，对类而言是定义列出成员

初始化(initialization)：给对象初值，对自定义对象而言是调用构造函数

本文中的客户指调用你提供的接口的人

# 习惯c++

## 1 视c++为语言联邦(view c++ as federation of languages)

- c
- object-oriented c++
- template c++
- stl

c++并不是一组守则一体的语言，而是四个次语言组成的联邦，每个次语言都有自己的规约

## 2 用编译器替换预处理器

用const、enum、inline替换`#define`(prefer const、enum、inline to #define)

用`const double AspectRatio = 1.653`来代替`#define ASPECT_RATIO 1.653`。后者的代码对编译器是不可见的，不能纳入编译器的符号表，因此出错时将报错`1.653`而不是`ASPECT_RATIO`，这会难以调试。

使用常量需要注意：

- 对字符串常量应该是两次const,`const char* const authorName = “fsdfdf”`，更好的是用string，`const string authorName(“fsdfdf”)`，因为①string提供防止越界、混淆编码（UTF-8/GBK）、拷贝问题②提供了封装好的统一操作
- 如果是class的专属常量，如果是`const int Num = 5`可能只有一份，如果是`const int Num`，在构造函数中初始化Num的值，那么肯定有多份，因此写成`static const int Num = 5`能确保只有一份

当编译器不支持在类中用整数型常量来初始化类中成员时，可以改用enum hack补偿做法，enum hack比较像`#define`,而不像const，const是可以取地址的，因此用来代替`#define`比较合适

```cpp
class GamePlayer{
private:
	enum{NumTurns = 5};
    int scores[NumTurns];
}
```

即使为每个实参加上括号，使用宏函数依然有很大的风险，宏函数中出现分支语句可能带来风险

```cpp
#define CALL_MAX(a,b) f((a)>(b)?(a):(b))//这里出现了分支语句，使得出现bug
int a=5, b=0;
CALL_MAX(++a,b);//a被加两次
CALL_MAX(++a,b+10);//a被将一次
```

因此用inline函数更合适，并且inline函数准守作用域和访问规则，可以控制对它的使用范围

## 3 尽可能使用const(use const whenever possible)

在使用迭代器时，只访问不修改时，应该使用const_iterator，`vector<int>::const_iterator cIter = vec.begin();`，用`const auto`达不到效果

修饰入参、返回值、成员函数记得最好加上const

注意成员函数const不同是可以被重载的

### 成员函数

bitwise constness，认为const成员不应该修改object里的任何值，即const成员函数默认的做法

但我们编程中应该**使用logical constness**，认为只要保证对象在逻辑上不变，其中一些细节可以改变。例如TextBlock class，在调用length()得到文本长度时，这个函数是const的，但TextBlock class里的文本可能是高速刷新的，length在变，length()函数每次调用时查询得到最新函数再返回，从逻辑上是const的，实际上修改了对客户来说透明的值。引入mutable关键字来实现这个功能

当对成员函数提供const和nonconst两个版本时，其中一定有些重复的代码，将重复的代码单独提出来一个函数是个方案，但还是有一些重复，理想的做法是**在nonconst中调用const的版本**（const调用nonconst版本是错误的行为），如下

```cpp
class TextBlock{
    const char& operator[]()const{
        //……
    }
    char& operator[](){
    	return const_cast<char&>(//将返回值去掉const
        	static_cast<const TextBlock&>(*this)[position]//转为const对象调用const版本的函数
        )
    }
}
```

c++缺乏调用指定const成员函数的能力，因此只能将传入的nonconst对象转为const对象再调用

## 4 确保使用前先初始化对象(make sure that objects are initialized before they’re used)

第一点是，优先初始化列表

显然初始化列表优于在构造函数中的赋值(assignment)操作

当class 中member data较多，且有些需要传参初始化，有些不需要显示初始化自动调用默认构造函数下，为了避免遗漏了需要初始化的对象，因此最好将所有对象的都显示调用，例如`ABEntry::ABEntry():theName(),theAddress("",1),numTimesConsulted(0){}`

如果类中有大量构造函数，且对部分成员的初始化操作都一致，那么也可以适当的将公共部分放置一个private函数，其中以赋值的方式初始化。这通常发生在从配置文件中读取初始化数据的场景

第二点是，注意对象初始化依赖，用local static对象替代non-local static对象

存在一个对象初始化时依赖另一个已经初始化了的对象的场景。但c++对定义于不同编译单元内的non-local static对象的初始化次序无明确定义。

> static对象指global对象；定义于namespace作用域的对象；在class内、函数内、file作用域内被声明为static的对象，local static是指函数内的static对象，其他的为non-local static对象

```cpp
//file1.cpp
class FileSystem{};
extern FileSystem tfs;//预备给客户使用
//file2.cpp
class Directory{
    Directory(params){
		size_t dists = tfs.numDisks();//无法确定tfs是否初始化完成
    }
}

```

C++能保证函数内的local static对象会在该函数被首次调用时初始化，因此用函数内的local static对象来代替全局的fts，如下

```cpp
//file1.cpp
class FileSystem{};
FileSystem& tfs(){//预备给客户使用
    static FileSystem fs;
    return fs;
};
//file2.cpp
class Directory{
    Director(params){
		size_t dists = tfs().numDisks();//类似singleton模式的方式调用
    }
}
```

c++20中，使用模块机制，能让用户指定初始化顺序，是对这个问题的一个解决方案

# 构造、析构、赋值

## 5 了解c++默默编写并调用了哪些函数(know what functions c++ silently writes and calls)

略

赋值函数并不总会出现，例如class中有引用对象

## 6 明确拒绝不想让编译器生成的函数(explicity disallow the use of compiler-generated functions you do not want)

将不希望编译器声明的函数设为private，这无法阻止friend和member function调用它，因此再将其**只声明不定义**，如下

```cpp
class HomeForSale{
public:
    ……
private:
    HomeForSale(const HomeForSale&);//既然不定义他，那么参数名称也没必要了
    HomeForSale& operator=(const HomeForSale&);
};
```

另一种方式是提供一个uncopyable class类让其他函数继承他

## 7 为多态基类声明virtual析构函数(declare destructors  virtual in polymorphic base classes)

如果一个class存在virtual function，那么就应该有一个virtual destructor。如果一个class没有virtual function，那么提供virtual destructor除了带来额外vptr负担没有好处。如果一个类没有virtual function，表明这个类不希望自己作为base class，那么去继承他是会有问题的，如果一个base class指针实际指向derived class，那么对他析构时会调用base的析构

？也许最好继承只发生在有virtual function的class中，对没有virtual function的class，用组合去代替继承

如果希望能有一个pure virtual class，可以声明pure virtual destructor，但注意这个pure virtual destructor需要有定义

```cpp
class AWOV{
public:
	virtual ~AWOV()=0;
}
AWOV::~AWOV(){}
```

## 8 别让异常逃离析构函数(prevent exceptions from leaving destructors)

c++不喜欢在析构函数中抛出异常，如果当前正在处理异常，导致函数推出触发析构，析构中抛出异常，那么就会有两个异常从而导致未定义行为

c++11中，默认析构函数为`noexcept(true)`，异常只在析构函数内处理掉，因此用户可以在析构中用try/catch处理。处理可以是①调`abort()`，直接终止程序至少比出现未定义行为好②记录并继续执行

一个较佳的策略如下，

```cpp
class DBConn{
    void close(){//提供给客户一个关闭接口
        db.close();
        close=true;
    }
    //……
    
    ~DBconn(){//析构中再次close
        if(!closed){
            try{
                db.close();
            }catch(){
                //记录
            }
        }
    }
}
```

对可能出现异常的操作提供一个额外的函数供用户调用，虽然对用户的使用增加了复杂度，但实际上，对于可能出现异常的操作，一方面给予了用户捕获和处理错误的机会，另一方面将异常处理排除在析构函数之外了。

析构函数中，如果用户没有调用close进入的析构函数`db.cloase()`失败，那么属于我们提供了异常处理机制用户没有使用，用户自行承担后果，如果用户调用了cloes后进入到析构函数，那么如果有异常在前面用户已经处理过了，此处不需要处理，记录即可

## 9 不在构造和析构中调virtual函数(never call virtual function during constructor or destructor)

在构造函数中调虚函数并不会触发多态，而是调自己类的那个虚函数，如果这个虚函数是个纯虚函数，那么运行前就报错了。但是更隐蔽的情况是在构造函数中调用了其他函数，其他函数中调用了这个纯虚函数，这个问题编译时无法察觉，只能在运行时才能报错。对这个问题没有什么解决方案，只有注意

如果需要base class根据不同的derived class来创建对象，那么不应得依赖虚函数机制，而是通过有参构造来传递信息，如下

```cpp
class Transaction{
    void Transaction(const std::string& logInfo)const{
        //……
    }
}
class BuyTransaction:public Transaction{
public:
    BuyTransaction(parameters):Transaction(createLogString(parameters)){
        
    }
private:
    static std::string createLogString(parameters);
    //避免上面列表初始化时，这个值还没出现
    //用createLogString函数传递值会更可读
}
```

## 10 令operator=返回一个reference to *this（have assignment operator return a reference to *this）

`widget& operator=(const Widget& rhs)`

为了能连锁赋值

## 11 在operator=中处理自我赋值（handle assignment to self in operator=）

如果代码中有多个pointers或reference指向多个相同类型（或有继承关系）的对象，那么就要考虑这些对象是否为同一个，如果是同一个可能造成在停止使用这个资源前意外的释放了这个资源，一个解决方案是，

```cpp
Widget& Widget::operator=(const Widget& rhs){
    if(this == &rhs)return *this;//证同测试(identity test)
    
    delete pb;//如果没有上面的自我赋值判断
    pb = new Bitmap(*rhs.pd);//那么这里rhs可能是被上一行释放掉的对象
    return *this;
}
```

这个方案用证同测试来解决自我赋值，但是每次证同测试带来了代码增多，增加了控制分支的成本，如果这样的赋值操作很多，而出现自我赋值的概率很低，那么引入了一些性能成本。另一个问题是如果new抛出异常，那么正在使用的pd被释放了，不能再次使用。因此另一种方案是先拷贝再删除旧值

```cpp
Widget& Widget::operator=(const Widget& rhs){
	Bitmap* pOrig = pd;//记录旧值
    pb = new Bitmap(*rhs.pd);//不管是否是自我赋值都复制一份
	delete pOrig;//释放旧值
    return *this;
}
```

这段代码的问题是如果自我赋值频率高，那么复制次数增多带来了成本

另一个替代方案是copy and swap技术

```cpp
void swap(Widget& rhs);//交换*this和rhs的数据
Widget& Widget::operator=(const Widget& rhs){
	Widget temp(rhs);
    swap(temp);
    return *this;
}
```

或者更简洁的写法，利用函数的值传递自动复制，对于这种写法编译器更容易做优化，但是牺牲了清晰性，

```cpp
void swap(Widget& rhs);//交换*this和rhs的数据
Widget& Widget::operator=(const Widget rhs){
    swap(rhs);
    return *this;
}
```

## 12 复制对象时不要忘了其每一个成分(copy all part of an object)

当自己写copy constructor或copy assignment时，如果其中遗落了成员变量没有处理那么编译器不会提示

尤其发生在为derived object写copy constructor或copy assignment时，有两个点容易遗忘，如下

```cpp
class PriorityCustomer: public Customer{
public:
    PriorityCustomer(const PriorityCustomer& rhs)
     :Customer(rhs), //1. 调用base class的拷贝构造，如果没有，那么执行的是base class的default constructor
    	priority(rhs.priority)
    {}
    PriorityCustomer& operator=(const PriorityCustomer& rhs){
        Customer::operator=(rhs);//2. 调用base class的copy assignment，如果没有这一句，那么base class的member没有copy
        priority = rhs.priority;
        return *this;
    }
private:
    int priority;
}
```

copy constructor和copy assignment有代码上对重复，但是两个函数之间相互调用是不合理的，只能将其中公共的部分提取出来建一个新的成员函数

# 资源管理（resource management）

总的来说，设计资源管理时，多想想智能指针是怎么做的

## 13 以对象管理资源(use objects to manage resources)

用智能指针

## 14 在资源管理类中小心拷贝行为(think carefully about copying behavior in resources-managing classes)

RAII思想中，在智能指针上只适用于在heap上申请的内存，但是有些资源不是heap-based的，需要手动建立资源管理类，这类RAII对象被复制时，有几种做法：

- 禁止复制，如果复制操作不合理，可以用条款6的方式禁止复制
- 对RAII对象使用计数(reference-count)，①在RAII对象中包裹一个智能指针，并在指定的删除器中释放资源②自己写智能指针中引用计数器的方案，在堆上申请一个空间来计数，拷贝时只拷贝指针
- 深拷贝
- 转移所有权，类似unique_ptr指针，适用于希望永远只有一个RAII资源指向对象

## 15 在资源管理类中提供对原始资源的访问(provide access to raw resources in resource-managing class)

提供资源管理类(resource-managing class)来包裹了原始资源(raw resources)，但大多时候依然需要提供对原始资源的访问方式（理想中，依赖这个class来实现和资源的所有互动，但实际工程中都是不理想的情况），这并不是破坏封装，资源管理类并不是为了封装而存在，而是用于管理这个类的生命周期。一些情况下可以对这个资源管理类再次封装。也可以采用类似智能指针这样的松散封装方式，用get()让外界能使用原始指针，但引用计数器这类却完全封装了起来

对原始资源的访问可以是隐式转换或显示转换，他们各有优劣。提供显示转换，类似智能指针的get()语句是大多数的做法，但问题是这样会比较麻烦，当使用他麻烦时大家就不会用它

```cpp
//当用c++操作一组c库的基础组件时问题比较明显，类似如下
//c库的基础组件定义，提供c风格的一组对字体操作的函数
FontHandle getFont();
void releaseFont(FontHandle);
//c++自定义的RAII类，封装了releaseFont函数
class Font;
//-----上面的内容是已有的内容，下面的内容是当前开发的内容----
//业务对组件自定义的函数
void changeFontSize(FontHandle,int);
//业务逻辑
Font f(getFont());
int newFontSize;
changeFontSize(f.get(), newFontSize);//使用RAII类会比较麻烦
```

使用隐式转换会方便很多

```cpp
class FontHandle{
public:
    //……
    operator FontHandle() const; 
}
```

但会带来不受期望的转化，例如`FontHandle f2=f1`，本意上是想拷贝一个FontHandle对象，但实际上，此时f2和f1都同时指向了同一个资源，当其中一个释放时对另一个是灾难的

在智能指针中提供了get()这样的显示转换，也提供了operator->和operator*这样的隐式转换，但不支持普通指针和智能之间之间的转换，属于在易用性和安全性做了平衡

## 16 成对使用new和delete时要采取相同形式(use the same form in corresponding uses of new and delete by pairs)

new []搭配delete[]

略

注意不要在typedef中使用数组对象，类似这样`typedef std::string AddressLines[4]`，当使用AddressLines时，即使是写typedef的人也不一定记得这是一个数组对象必须用delete[]来释放

用vector封装多个对象来代替数组对象是一个不错的方案

## 17 以独立语句将newed对象置入智能指针(store newed objects in smart pointers in standalone statements)

```cpp
void processWidget(shared_ptr<Widget>, int);//声明
processWidget(new Widget, priority());//调用
```

如上这段代码，编译器执行的顺序不确定，如果是`new Widget `-> `priority() `-> `shared_ptr<Widget>()`拿到地址这样的顺序，那么priority()执行错误时，将出现内存泄漏

因此要用独立的语句来初始化智能指针

```cpp
shared_ptr<Widget> it = make_shared<Widget>();
processWidget(it, priority());//调用
```

# 设计和声明(desings and declarations)

## 18 让接口容易被正确使用，不易被误用(make inferfaces easy to use correctly and hard to use incorrectly)

> 如果面对一个企图想把事情做好的客户，而他们对你的接口存在使用错误，那么你至少也得负一部分责任

对于如下这个常见的接口，它看似很合理

```cpp
class Date{
public:
    Date(int month, int day, int year);
    //……
};
```

但实际上，有几点可以优化：

1. 传入对象代替传入数字，避免参数传入的顺序错误

   设置`struct Day; struct Month; struct Year;`

2. 限制传入类型，避免传入无效参数(13月等)

​		在struct中，如果设置const值表示月份，这个值可以取值，这不是预期要有的，如果enum表现月份，enums可以被拿来当一个int使用，也不安全，因此最好预先定义所有有效的Months，类似在Month类中提供这些函数，

​	`static Month Jan(){return Month(1)} `

​		使用static是为了避免模块间初始化顺序问题，参考条款4

3. 限制操作，避免用户误操作

   例如将month对象拿来做计算`if(a*b=c)`，原意是想做比较，`==`写成了`=`

4. 提供行为一致的接口，让客户更容易理解

   尽量让你的types行为和内置types一致，客户知道int有什么行为，那么使用month也会有什么行为

5. 帮用户做一些必须要做的事情

   如果某些接口要求客户必须做某事，那么就有不正确的倾向，因为客户可能会忘记，最好在接口中限制死。例如如果返回一个指针需要用户使用完后调delete，那么不如强制返回一个智能指针

   如果需要用户调用一个接口在释放资源，那么可以给智能指针添加删除器，这还可以避免cross-DLL problem

## 19 设计class犹如设计type(treat class design as type design)

当设计一个class，也就定义了一个新type，因此应该和设计语言内置类型一样的严谨来研讨class的设计，有如下这些需要考虑

​		**开干之前：**

- 是否需要这个type？如果定义的是一整个type家族，应该使用template。如果只是提供新的技能，提供non-memeber函数或template能达到目标

  **创建：**

- 其如何创建和销毁？设计constructor、destructor、operator new、operator delete……

- 其初始化和赋值有什么差别

- 其被passed by value（值传递)意味着什么

  **使用：**

- 其传入的合法值是什么？什么入参是合理的，在构造、赋值、`setter`函数等中做限制检查，合理设置异常

  **如何更好的使用：**

- 其需要哪些转换？显示、隐式

- 提供/限制哪些操作？是否提供重载new、+、（）等操作。是否禁用赋值、构造、拷贝等操作

- 什么是其的未声明接口？条款29

  **迭代拓展时**

- 其是否需要配合继承图系(inheritance graph)?

- 谁会使用其中的member？决定了哪些是public/provid/private，friend

## 20 宁用pass-by-reference-to-const去替换pass-by-value(prefer pass-by-reference-to-const to pass-by-value)

这里指的是函数入参时，参数最好是const。除了stl迭代器，函数对象，内置类型，其他都最好用引用传递

## 21 必须返回对象时，别妄想返回其reference(Don’t try to return a reference when you must return an object)

对于这个成员函数`const Rational& operator*(……)`，对于他的返回的引用值：

- 如果是在栈上申请的，那么返回的值是被析构后的垃圾对象

- 如果是在堆上申请的，那么当`w = x * y * z`时，中间出现了内存泄漏，x*y申请的内存无法释放

- 如果用是函数内的static对象，那么一方面有多线程问题，另一方面，对这样的代码`(x*y )==(c*d)`将永远是true
- 如果在函数内用static数组，那么更糟糕了

因此最好的方案就是值传递的方式返回，虽然有性能影响，但正确

## 22 将成员变量声明为private(declare data members private )

理由一：让访问方式一致，用户对类的访问全部通过函数，避免访问成员变量时不确定是否加()

理由二：对成员变量的使用实现精细控制

理由三：封装，底层数据、实现的变化不会改变接口。将成员变量设为protected也没必要，如果这个变量删除了，那么所以涉及这个变量的derived class都会被影响

## 23 宁以non-member non-friend替换member函数(prefer nnon-member non-friend functions to member functions)

注意non-member non-friend是一个词组，表示一个非友元且非成员函数

考虑如下列子，

```cpp
class WebBrower{
    void clearCache();
    void clearHistory();
    void removeCookies();
    //……
};
```

WebBrower是一个对浏览器的操作类，提供了清除缓存、历史、cookie的操作，有时希望提供一个函数整合这一类的清理操作，可以新增一个成员函数，

```cpp
class WebBrower{
	//……
    void clearEverything();
};
```

也可以选择提供一个nnon-member non-friend functions，

```cp
void clearEverything(WebBrower* );
```

那么后者比前者会有更好的封装，理由如下，

封装并不是把所有数据和操作方法捆绑到一起。越多的东西被隐藏起来，意味着越少的代码能触及到他们，那么修改他们带来的影响越小，给这个类带来更多弹性。（类中只保留必要的功能和函数，当一个函数功能的实现不是必要依赖类中的细节的时候，那么他就不应该放到这个类中，这会让核心类维护起来容易，也让整体模块更清晰）

注意，friend函数和成员函数有一样的访问权限，因此这里指的是non-member non-friend。其次，不是WebBrower类的成员函数，不代表不可以是其他类的成员函数

更合理的实现是将`clearEverything`放到同一个namespace下的其他编译单元中，因为它没有提供对WebBrowser客户无法以其他方式取得的能力，客户可以选择是否需要引入这个函数使用。类似std命名空间中，客户可以选择是否加入`<memory>`、`vector`库。

## 24 若所有参数皆需类型转换，为其采用non-member函数(declare non-member functions when type conservions should apply to all parameters)

考虑如下场景

```cpp
class Rational{
public:
    Rational(int a=0, int b=1);
    const Rational operator* (const Rational& rhs)const;
};
```

对其做计算时，

```cpp
Rational oneHalf(1,2);
result = oneHalf *2;//true
result = 2*oneHalf;//error
```

这不符合和内置类型特性一样的原则，会让人无法理解，因此用外置函数可以解决

```cpp
const Rational operator* (const Rational& lhs, const Rational& rhs)const;

result = oneHalf *2;//true
result = 2*oneHalf;//true
```

在这里将这个函数声明为friend是没有必要的，如23条款提到的，friend有和成员函数一样的特性，能不设置为friend就不要设置为friend

## 25 考虑写出一个不抛异常的swap函数(consider support for a non-throwing swap)

直接调用stl提供的swap函数，其内部实现是如预期的那样通过temp实现拷贝，这种朴实无华的做法质量不能达到预期，例如在pimpl手法设计的类中

```cpp
class Widget{
public:
    //……
    Widget& operator=(const Widget& rhs){
        *pImpl = *(rhs.pImpl);
    }
private:
    WidgetImpl* pImpl;//用指针指向实际资源
}
```

用内置的swap函数会调用operator三次以完成交换，但实际上只需要交换指针就好了，不需要拷贝。

因此我们需要手动实现一个swap，全特化一个`swap<Widgey>`函数，但swap函数没法访问Widget的私有成员pImpl，一种方式是将这个全特化的swap函数设置为友元，另一种更好的方式是Widget提供一个供全局swap调用的swap成员函数，如下

```cpp
namespace std{
    template<>
    void swap<Widget>(Widget& a, Widget& b){//特化内置的swap函数
        a.swap(b);
    }
}

class Widget{
public:
    //
    void swap(Widget& other){//类中实现自定义的交互函数
        using std::swap;//这一句是必要的，当编译器没有找到Widget的专属swap时，能降级调用全局的swap
        swap(pImpl, other.pImpl);//交换指针时使用内置的swap更高效
    }
    //……
}
```

类似stl里容器的swap函数一样，既可以通过类::swap来调用，也可以直接调用全局的swap

但如果我们的Widget函数是个类模板的话，就不能用这种方式来偏特化了

```cpp
//这是无法编译通过的代码
namespace std{
    template<typename T>
    void swap<Widget<T>>(Widget<T>& a, Widget<T>& b){
        a.swap(b);
    }
}
```

> 函数不能偏特化，类可以偏特化，这是语言上有意的设计，因为函数重载和偏特化如果同时出现会让函数调用逻辑混乱，而类模板没有重载，只参与实例化

更合理的做法是重载function templates。c++标准规定不能添加新的templates到std里（如果这么做了程序可能能运行，但注意这是未定义行为），所以只能自定义命名空间来实现，类似如下

```cpp
namespace WidgetStuff{
    template<typename T>
    class Widget{……}//同上
    
    template<typename T>
    void swap(Widget<T>& a), Widget<T>& b){//重载swap函数
        a.swap(b);
    }
}
```

客户在调用swap函数时，可能会写`std::swap()`，此时强迫编译调用stl命名空间的swap版本，因此即使有了上述的方案，也要写一个swap特化的版本

最佳实践总结如下：

1. 新的命名空间内定义class，在class内写一个member swap函数，实现更高效的swap
2. 新的命名空间内实现重载版本的全局swap(注意写`using std::swap`语句)
3. stl命名空间内实现特化版本的全局swap函数，避免客户不正当调用(`std::swap()`)

最后，swap不应该抛出异常。提供自定义的swap的目的一方面是为了高性能，另一方面，希望有不抛出异常的swap（缺省的swap调用operator=函数实现可能抛出异常），因为swap函数常常被用来帮助class提供异常安全性(exception-safety)保障。因此注意swap成员函数绝不可抛出异常

# 实现(implementations)

## 26 尽可能的延后变量定义式的出现时间(postpone variable definitions as long as possible)

函数可能在任何时候退出，这使得一个变量定义了却没使用是可能的，从而承担了没有必要的constructor和destructor成本，例如如下

```cpp
std::string encryptPassword(const std::string& password){
    std::string encrypted;
    if(password.length()<MinimumPasswordLength){//如果密码长度不够，抛出异常
        throw logic_error("Password is too short");//1. 如果这里抛出了异常
    }
    ……//加密密码并置入变量encrypted内
        
   	return encrypted;//2. 那么这个变量没有使用，浪费了性能
}
```

因此最好在使用时才定义一个变量，类似`string encrypted = createPassword()`

如果是在循环中，例如如下两个函数

```cpp
void func1(){
    Widget w;
    for(int i=0;i<n;i++){
        w=取决i的值;
    }
}

void func2(){
    for(int i=0;i<n;i++){
        Widget w（取决i的值）;
    }
}
```

当效率高敏感时(performance-sensitive)时，func1通常会更好，赋值的代价通常比构造+析构的代价低，但这样带来的问题是变量的定义和使用距离太远，可读性差。大多时候，性能不敏感时，使用func2更可读

## 27 尽可能少做转型动作(minimize casting)

c语言风格的转型为旧式转型(old-style casts)，c++提供的cast的四个关键字来实现新式转型，带来的优势有①容易在代码中识别出来，用find能快速找出类型系统在哪个地方破坏②缩窄转型类型，从而编译器提供一定能力的检查

转型并不是编译器将某种类型视为另一种类型，而是会生成某些代码来完成这些工作。例如derived class转为base class 会有指针地址的转换

本部分有三点需要注意，

第一，static_cast需要注意，如下这个代码会生成一个Window临时对象后再调用onResize()，

```cpp
class Window{
public:
    virtual void onResize();//这个函数里可能有对this指针的操作
};
class SpecialWindow:public Window{//在derived类中调用base类的同名函数
    virtual void onResize(){
        static_cast<Window>(*this).onResize();//这里是生成一个Window临时对象后再调用onResize()
    }
}
```

这个代码的问题是static_cast关键字产生了临时对象调用onResize函数时，如果onResize函数内对对象做了修改那么实际上是对临时对象的修改。因此上诉代码应该写成`Window::onResize()`

第二，如果有一个指向的是derived class object的pointer to base class，希望调用derived的特有函数。而dynamic_cast有更高的成本，大多编译器多次调用strcmp来比较RTTI信息，因此应该避免。那么有两个通用做法：

1. 转为base指针前，提前用容器记录指向derived class对象的指针，类似`vector<shared_ptr<derived>>`

2. 在base class中添加virtual function，base virtual function内什么也不做（虽然这可能是个馊主意，见条款34）

虽然这些方法都有弊端，但提供了dynamic_cast的替代方案

第三，必须要避免“连串(cascading)dynamic_cast“，看起来类似如下，

```cpp
typedef vector<shared_ptr<Window>> VPW;
VPW winPtrs;
//SpecialWindow1、SpecialWindow2、SpecialWindow3是Window的派生类
for(VPW::iterator it = winPtrs.begin();it!=winPtrs.end();++it){
    if(SpecialWindow1* psw1 = dynamic_cast<SpecialWindow1*>(it->get())){……}
    else if(SpecialWindow2* psw2 = dynamic_cast<SpecialWindow2*>(it->get())){……}
    else if(SpecialWindow3* psw3 = dynamic_cast<SpecialWindow3*>(it->get())){……}
}
```

这些会产生出大量代码，而且弹性很差，一旦加入新的derived class需要加入新的条件分支。这样的代码应该总是被基于virutal函数的调用取代

总体来说，c++应该避免转型，如果转型，尽可能隔离转型动作，将其隐藏在某个函数内，其中的转型操作应该是c++的新式转型

## 28 避免返回handles指向对象内部成分(avoid returning “handles ”to object innernals)

这里的handles指的是reference、pointer、迭代器

注意访问级别，public的函数返回private级别的handles，指向private级别的成员函数或其他数据时，这时将handles所指对象的访问级别提高了。如果是引用的方式返回，考虑是否加const，如果是值传递的方式返回，用指针接收时要注意他的生命周期

要看封装的目的是什么。类似智能指针或vector容器这种，封装的是生命周期和数据管理方式，因此可以返回private级别的指针，但如果封装的目的是屏蔽细节，那就不应该返回

## 29 为“异常安全“而努力是值得的(strive for exception-safe code)

来看一个朴实无华的代码，他存在一些问题，

```cpp
void PrettyMenu::changeBackground(std::istream& imgSrc){
    lock(&mutex);
    delete bgImage;//1. 旧的数据被释放了，此时PrettyMenu对象不安全
    ++imageChanges;
    bgImage = new Image(imgSrc);//这里可能抛出异常
    unlock(&mutex);//mutex未释放
}
```

我们希望当异常抛出时，带有异常安全性(exception-safety)的函数会：

1. 不泄漏任何资源，条款13和条款14已解决
2. 不允许数据败坏

异常安全函数提供三种安全保证的级别：

1. 基本承诺：如果抛出异常，程序仍然保持在有效状态下，然而程序的显示状态(exact state)恐怕不可预料
2. 强烈保证：如果异常抛出，程序状态不改变，即这个函数满足原子性，要么完全成功，要么完全回退
3. 不抛掷(nothrow)保证：承诺不抛出异常

来看一个修改成基本承诺级别的代码，这段代码的问题是如果Image()的构造函数里抛出异常，imgSrc可能已经被消费了一部分，及时changeBackground函数安全退出，imgSrc的状态可能还是改变了

```cpp
void PrettyMenu::changeBackground(std::istream& imgSrc){
    Lock ml(&mutex);
    bgImage.reset(new Image(imgSrc));
    ++imageChanges;
}
```

copy and swap策略是一种典型的导致强烈保证的方案，即复制一份再修改，以下是一份修改方案

```cpp
struct PMImpl{
    shared_ptr<Image> bgImage;
    int imageChanges;
};
class PrettyMenu{
private:
    Mutex mutex;
    shared_ptr<PMImpl> pImpl;//被copy and swap的对象
};
void PrettyMenu::changeBackground(std::istream& imgSrc){
    using std::swap;
    Lock ml(&mutex);
    //copy
    shared_ptr<PMImpl> pNew(new PMImpl(*pImpl));
    //修改
    pNew->bgImage.reset(new Image(imgSrc));
    ++pNew->imageChanges;
    //交换
    swap(pImpl, pNew);
}
```

但这种copy and swap策略并不保证整个函数有强烈的异常安全性，以如下someFunc举例。

```cpp
void someFunc(){
    ……
	f1();
    f2();
    ……
}
```

一方面，如果f1和f2的异常安全性强烈保证低，那么someFunc很难实现强烈保证，需要捕获调用f1之前的所有状态，然后恢复

另一方面，即使f1和f2是强烈保证级别的函数，也会有问题。想象运行时f1完成了，f2抛出异常，那么此时someFunc还是处于中间的状态，没能达到执行失败时全部回退。问题出在连带影响(side effects)上，如果函数值操作局部性状态，那么容易提供强烈保证，但函数对非局部性数据(non-local data)有连带影响时，提供强烈保证就困难了

还有一个问题，copy and swap存在拷贝的行为无疑是影响了性能和内存的

因此如果实现强烈保证的成本过高，就必须提供基本保证。有时连基本保证也难完成，因为一旦你调用的代码没有提供异常安全保证，那么你的代码也无法保障异常安全，但除此之外，如果可能，提供异常安全保证

## 30 透彻了解inlining的里里外外(understand the ins and outs of inlining )

大多时候，inline函数通常置于头文件中，为了方便编译器做inlining，部分编译器环境能在链接的时候inlining，极少编译器环境能在运行时inlining。

inline是对编译器对申请，并不是必须执行。分为隐喻提出，即将函数定义于定义式内，和明确声明，即使用inline关键字。通常过于复杂度函数、涉及虚函数调用的函数都会被拒绝inlining，还有通过函数指针调用的函数，有时编译器生成的构造析构函数里会通过函数指针调用函数，因此使得inline声明的函数不能inlining。构造析构通常也不会是inline的，编译器在构造析构函数中加入了太多东西以实现多态

inline函数带来的问题：

- inline函数本质上是将对函数调用用函数本体替换，过渡热衷inline会造成**代码膨胀**，如果内存不够会引发额外的换页行为(paging)，降低指令高速缓存装置的集中率(instruction cache hit rate)，印发效率问题。但如果inline函数本体很小，比编译器针对函数调用产生的代码还小，那就不影响

- 开发者要考虑inline带来的冲击，如果f是个inline函数，那么修改f会让所有用到f的客户端程序**重新编译**，如果不是inline函数修改后只需要重新链接

- 大多**调试器**对于inline函数都束手无策，毕竟无法给并不存在的函数设置断点。关掉优化是可以调试的
- 不要因为function template出现在头文件，就将他们设置为inline，除非你确定这个template所有具现化都该被inlined

总之刚开始开发时，都不要声明inline，80%的执行时间是20%的代码产生的，找到有效增进程序效率的20%代码并优化

## 31 将文件间的编译依存关系将至最低(minimize compilation dependencies between files)

如果只是对class的实现做了轻微修改，却导致大量文件被重新编译和修改了，这是因为C++并没有把将接口从实现中分离这件事情做好

```cpp
class Preson{
    Preson(const std::string& name, const Date& birthday, const Address& addr);
	……
private:
    std::string name;
	Data d;
    Address a;
}
```

此时Preson依赖string、Data和Address，编译器需要通过定义知道他们生成对象的大小，需要通过include导入定义，从而形成连串编译依存关系(cascading compilation dependecies)

解决这类问题有两种常见做法

第一种是pimpl。在java等语言上没有这类问题，因为那些语言定义对象时只需要分配指针，当然c++也可以这样做，这类做法被称为pimpl idiom，类似如下，Preson的客户就完全和Date、Address和Preson的实现细节分离了，这样的Preson也称为handle classes

```cpp
class PresonImpl;
class Date;
class Address;
class Preson{
    Preson(const std::string& name, const Date& birthday, const Address& addr);
	……
private:
    std::shared_ptr<PresonImpl> pImpl;//指向实际的实现物
}
```

现实中尽可能让头文件自我满足，做不到就让它和其他文件内的声明式相依，这种方式的实现依赖以下三点：

1 能够使用reference和pointer完成任务就不要使用object

2 尽量以class声明式替换class定义式

```cpp
class Date;
Date today();//OK
void clearAppointemtns(Date d);//OK
```

​	上面这个代码能通过编译。将Date的定义和函数的定义放到同一个文件中，这样调用函数时一定能看到Date的定义。这样做的目的就是为了将并非真正必要的类型定义于客户端之间的编译依存性去掉

3 为声明式和定义式提供不同的头文件

​	程序库应同时提供声明式和定义式两个头文件，且保持两个头文件一致。客户希望前置声明若干函数时，使用包含一个声明文件来代替，类似`#include “xxxfwd.h”`这个命名方式来源于c++标准库的头文件。这也适用于模板的定义和声明分离

另一种降低编译依存度方式是使用abstract base class，即interface class。

```cpp
class Person{
public:
	virtual ~Person();
    virtual string name()=0;
    virtual string birthDate()=0;
    virtual string address()=0;
    ……
	//同时通过工厂方法提供接口，让用户获得这个实际的对象
    static shared_ptr<Person> create(const string& name, const Date& birthday, const Address& addr);
};
```

这种方式也能让客户使用中，只要接口不修改，就不需要重新编译

两种方式各有优劣，

这两种方式，都存在一定性能影响。pimpl idiom的做法，使用handle class，①需要通过implementation pointer间接访问数据，每访问一次就有一次间接开销②每个handle object都需要维护implementation pointer。interface class做法依赖多态，等同于多态的开销，vptr的内存开销，vtbl的查找开销

# 继承和面向对象涉及(inheritance and object-oriented design)

## 32 确定你的public继承塑膜出”is-a”的关系(make sure public inheritance models “is-a”)

“is-a”关系是指任何能使用base class的地方都可以使用derived class，当使用derived class时，他应该有base class的所有特点并能代替base类，但反过来不行。“is-a“是public继承的基石

下面有两个常见的没能很好塑膜“is-a”的例子，

一是，企鹅是一种鸟，而鸟可以飞，但企鹅不能飞，类似如下，

```cpp
class Bird{
public:
    void fly();
}
`class penguin:public Bird{
    //fly（），error，企鹅不应该能飞
}
```

企鹅是鸟的派生类，却继承了fly这个本不应该继承的函数，此时如果把企鹅完全当作鸟来使用则会出现错误。这个问题本质上是没能对鸟这个类的定义不严谨，实际上应该是大多数鸟会飞。一个解决方案是Bird中没有fly，由derived class实现

二是，正方形是一种矩形，矩形可以随意修改长宽，正方形长宽必须同时修改，类似如下

```cpp
class Rectangle{
public:
}
class Square: public Rectangle{
    
}
void makeBigger(Rectangle& r, int newWidth){//如果这里传入的是Square，就会错误
    r.setwidth(newWidth);//当只修改宽度时
    assert(r.width() != r.height);//对矩形来说，这里一定成立，对正方形来说却不是
}
```

此时因为正方形有矩形独有的性质，本可应用到Rectangle的规则不能施行在Square上

## 33 避免遮掩继承而来的名称(avoid hiding inherited names)

当derived class用base class中已有的函数名字定义一个函数时，此时derived class会覆盖base class所有这个函数名字相关的重载函数，如下

```cpp
class Base{
public:
    virtual void mf1()=0;
    virtual void mf1(int);
	……
};
class derived: public Base{
public:
    virtual void mf1();
};

derived d;
d.mf1(1);//error,重载被覆盖了
```

有两种方式能解决，一是使用using声明式

```cpp
class derived: public Base{
public:
    using Base::mf1;
    virtual void mf1();
};
```

如果只希望能用到base的mf1无参版本，不希望用到重载版本，可以提供一个转交函数(forwarding function)来实现

```cpp
class derived: private Base{
public:
    virtual void mf1(){Base::mf1();}
};

derived d;
d.mf1();//通过转交函数间接调用base里的mf1
```

## 34 区分接口继承和实现继承(differentiate between inheritance of interface and inheritance of implementation)

pure virtual、simple(impure) virtual、non-virtual函数之间的差异使class的设计者能精确指定想要derived class继承的东西。将所有成员声明为virtual是常见的错误(除非这是interface classes)，如果一个函数的不变性(invariant)大于特异性(specialization)，应坚定立场，声明为non-virtual。必须谨慎的选择声明成员函数的不同类型

- 声明pure virutal的目的是为了让derived classes只继承函数接口
- 声明impure virutal 函数的目的，是为了让derived classes继承该函数的缺省实现和接口
- 声明non-virtual函数的目的是为了令derived classes继承函数的接口和一份强制性实现

在derived类继承base类缺省实现时，有一些技巧可以避免一些问题

一个问题是当新增一个derived class时，有时会忘记要重写这个接口，依然使用缺省实现，而这编译不会报错，运行时却可能出现不可知的问题

一个解决方案是用纯虚函数提供接口，同时新增一个protected级别的缺省实现函数，需要用户实现纯虚函数调用缺省函数，类似如下，

```cpp
class Airplane{
public:
    virtual void fly()=0;
protected:
	void defaultFly();
};

class ModelA:public Airplane{
public:
    void fly(){//使用缺省实现
        defaultFly();
    }
};

class ModelB:public Airplane{
public:
    void fly(){//重新实现
        ……
    }
};
```

derived class重写base class提供的pure virtual function，选择是否使用default function，从而避免在新增derived class时，忘记重写缺省实现。但这种方式带来的问题是存在过多雷同的函数名称，污染命名空间

另一种方式则没有这个问题，是利用pure virutal function可以有自己的默认实现，

```cpp
class Airplane{
public:
    virtual void fly()=0{
        ……缺省实现代码……
    }
};

class ModelA:public Airplane{
public:
    void fly(){
        Airplane::fly();//调用缺省实现
    }
};

class ModelB:public Airplane{
public:
    void fly(){//重新实现
        ……
    }
};
```

这就完美了

## 35 考虑虚函数以外的其他选择(consider alternatives to virtual functions)

考虑一个场景，设计一个具有伤害系统的游戏，人物的血量会被因某些原因发生改变。显而易见的办法是提供一个角色类，其中将血量的计算设置为虚函数，让derived class去实现具体的血量计算方法，类似如下

```cpp
class GameCharacter{
publi:
    virtual int healthValue()const;
}
```

这个显而易见的实现也有一些弱点，我们可以考虑一些替代方案

### NVI手法实现Template Method模式

NVI(Non-Virtual Interface)，用non-virtual提供public接口供客户调用，其中调用一个private virtual函数

```cpp
class GameCharacter{
public:
    int healthValue()const{//外覆器
        …设定好适当场景…
		int retVal = doHealthValue();
        …清理场景…
        return retVal;
    }
private:
    virtual int doHealthValue()const{
        …
    }
};
```

non-virtual又被称为外覆器(wrapper)，其中中能填加一些调用之前和之后做的事情，例如，上锁(locking a mutex)、制造运转日志记录项(log entry)、验证class约束条件、验证函数先决条件、验证函数事后条件等

将doHealthValue设置为private，使得derived class不能调用GameCharacter的doHealthValue函数，但能重写doHealthValue函数。但如果为了提供derived class的缺省行为，也可以设置为protected。

### 用函数指针实现strategy模式

如果人物和血量的计算方式不一定是绑定的关系，需要将血量计算方法和角色解耦。可以将血量计算的函数根据需要传入到角色类中的函数指针来使用，如下

```cpp
class GameCharacter{
public:
    static int defaultHealthCalc(const GameCharacter& gc);//缺省函数
    typedef int (*HealthCalcFunc)(const GameCharacter&);//声明函数指针

    explicit GameCharacter(HealthCalcFunc hcf = defaultHealthCalc):healthFunc(hcf){}
    int healthValue()const{
        return healthFunc(*this);
    }
private:
	HealthCalcFunc healthFunc;//函数指针
};
```

这样同一类型的实体可以有不同的血量计算函数，且角色的血量计算函数可在运行期变更

这带来的问题是如果血量的计算依赖角色的部分private属性，传入的函数指针就不能运行了。解决方案是降低角色类的封装程度，要么将这个函数设置为friend，要么提供public访问函数让传入的函数可以调用

### 用function完成strategy模式

使用function能让传入的对象有更大的弹性，不仅仅是函数，当健康计算变的更复杂时，function能接受持有任何语此签名式(signature)兼容的可调用物(callable entity)

```cpp
class GameCharacter{
public:
    static int defaultHealthCalc(const GameCharacter& gc);//缺省函数
    typedef function<int (const GameCharacter&)> HealthCalcFunc;//function对象

    explicit GameCharacter(HealthCalcFunc hcf = defaultHealthCalc):healthFunc(hcf){}
    int healthValue()const{
        return healthFunc(*this);
    }
private:
	HealthCalcFunc healthFunc;
};
class EyeCandyCharacter: public GameCharacter{……};
```

function使得能支持传入仿函数对象

```cpp
struct HealthCalculator{
    int operator()(const GameCharacter&)const{}
};

EyeCandyCharacter ecc1(HealthCalculator());
```

更进一步，结合bind，能让血量计算和对象之间有更多弹性

```cpp
class GameLevel{//独立于角色的辅助类，通过传入角色来计算血量
public:
    float health(const GameCharacter&)const;
    ……
};

GameLevel currentLevel;
EyeCandyCharacter ebg2(bind(&GameLevel::health, currentLevel, _1));
```

### 古典的strategy模式

```cpp
class GameCharavter;//前置声明（forward declaration）
class HealthCalcFunc{//实现血量计算的类，可以被继承
public:
    virtual int clac(const GameCharacter& gc)const;
    ……
};
HealthCalcFunc defaultHealthCalc;//缺省实现

class GameCharavter{
public:
    GameCharavter(HealthCalcFunc *phcf = &defaultHealthCalc):pHealthCalc(phcf){}
    int healthValue()const{
        return pHealthCalc->calc(*this);
    }
private:
    HealthCalcFunc* pHealthCalc;
};
```

GameCharavter、HealthCalcFunch都可通过继承扩展，同时GameCharavter组合HealthCalcFunc类

## 36 绝不重新定义继承而来的non-virtual函数(nerver redefine an inherited non-virtual function)

条款32提到，public继承是意味着“is-a”关系

条款34提到，class里声明non-virtual函数会为该class建立起一个不变性(invariant)，凌驾特异性(specialization)

重定义继承而来的non-virtual函数和这两个条款相违背

条款7中提到析构函数应该是virutal的，本质上是这个条款的一部分

## 37 绝不重新定义继承而来的缺省参数值(nerver redefine a function’s inherited default parameter value)

静态类型指指针的类型，动态类型(dynamic type)指实际指向的类型

```cpp
class Shape{
public:
    virtual void draw(ShapeColor color = Green)const;
};
class Rectangle : public Shape{
    virtual void draw(ShapeColor color = Red)const;
}
class Circle : public Shape{
    virtual void draw(ShapeColor color)const;
}
```

virtual 函数的缺省参数值是静态绑定的，virtual函数的调用是动态的，产生的问题类似如下，函数的调用由object的实际类型决定，函数传入的缺省参数由指针的类型确定，

```cpp
Shape* pc = new Circle;//静态类型为Shape，动态类型为Circle
Shape* pr = new Rectangle;//静态类型为Shape，动态类型为Rectangle
pc->draw();//draw(）传入了Green，但Circle没有默认参数
pr->draw();//draw（）传入了Green，但Rectangle的默认参数是Red
```

引用也有同样的问题。这个问题是编译器考虑了性能和开发简易度做的取舍，将默认参数设置为动态的会有性能开销

解决方案，用35条款的NVI方法

## 38 通过复合塑膜出has-a或is-implemented-in-terms-of(model “has-a” or “is-implemented-in-terms-of” through composition)

复合/组合(composition)、分层(layering)、内含(containment)、聚合(aggregation)、内嵌(embedding)都是同一意思

如条款32所说，public继承带有is-a的意义，而复合意味着has-a(有一个)或is-implemented-in-terms-of(由某物实现)

程序中的对象分为应用域(application domain)部分，是塑造世界中具体的事物，例如人、汽车等，和实现域(implementation)，是指实现细节上的人工制品，例如缓存区(buffers)、互斥器(mutexes)、查找树(search trees)等。当复合对象发生于应用域的对象之间，表现出has-a关系，发生于实现域之间，则是is-implemented-in-terms-of关系

private继承也能实现is-implemented-in-terms-of

复合的is-implemented-in-terms-of的关系容易和public继承的is-a的关系弄混淆。考虑用list实现一个set类，set有list不具备的特性:不能有重复的元素加入，因此set是一个list这是不对的，应该采用复合

## 39 明智而审慎地使用private继承(use private inheritance judiciously)

`class Student: private Person;`

类似这样的private继承，复习一下他的特性，①不能从student转为person类，`Person a = Student();`②person的所有成员都变为private类型，derived class不能调用但是能重载base class的函数

使用private继承意味着is-implemented-in-terms-of，这和复合有同样的特点，但在使用时尽可能的使用复合，只有当protected成员或virtual函数牵扯进来时才可能使用private继承

如下是一个使用private继承的例子：

```cpp
class Timer{
public:
    explicit Timer(int tickFrequency);
    virtual void onTick()const;
};
class Widget: private Timer{
private:
    virtaul void onTick()const;
};
```

Timer class中实现定时器的逻辑，定时调用onTick函数，Widget重写了onTick函数，这样当Widget类定义时，能自动触发定时器逻辑而不用关注定时器的细节

这里用private继承的例子是可以用组合的方式来实现的，

```cpp
class Widget{
private:
    class WidgetTimer: private Timer{
    public:
    	virtaul void onTick()const;
    }
    WidgetTimer timer;
};
```

这两种实现，使用组合会更优秀，这里有两个原因来说明，

- 如果Widget可以被继承，那么如果想要阻止derived class重写onTick()函数，使用private继承无法实现，而组合却可以
- 组合可以解耦(decouplings)，降低编译依赖，用条款31的方法，将WidgetTimer设置为Widget里的一个指针，定义放在其他文件內，使得Widget类不需要包含Timer.h

这里是base class的constructor函数定时调用了onTick函数，在NVI手法中，也可以是base class的non-virtual function作为public接口，其中调用重写的onTick函数

只有当onTick想要访问Timer的protected级别的函数时，private继承才是必要的

## 40 明智而审慎的使用多重继承(use multiple inheritance judiciously)

大多时候，能不使用多重继承就不要使用多重继承，考虑替代的方案，如下是一个使用多重继承的例子

考虑当前项目中已有这些类，

```cpp
class IPerson{//提供给客户的接口
public:
    virtual ~IPerson();
    virtual string name()const=0;
    virtual string birthDate()const=0;
};
class DatabaseId;
class PersonInfo{//用来协助打印数据库字段
public:
    explicit PersonInfo(DatabaseID pid);
    virtual ~PersonInfo();
    virtual string theName()const;//调用private里的函数，实现调整字段格式得到新字段
    virtual string theBirthDate()const;
private:
    virtual string valueDelimOpen()const;//添加字段的前缀
    virtual string valueDelimClose()const;//添加字符串后缀
}
```

此时我们是客户，需要提供一个CPerson类来实现了IPerson的接口，通过DatabaseId完成初始化CPerson，PersonInfo类提供了将DatabaseId初始化为IPerson的方法

显然新增的CPerson类需要public继承IPerson，那么CPerson和PersonInfo是什么关系呢？PersonInfo提供的函数能帮助实现CPerson，他们是is-implemented-in-terms-of的关系，条款38和39提到可以通过复合和private 继承来实现。这里PersonInfo函数提供一些接口和缺省行为，如果想要重新缺省行为，那么一种方式是通过继承，使用这种方式就不可避免多重继承了，

```cpp
class CPerson: public IPerson, private PersonInfo{
public:
    //通过PersonInfo类实现IPerson的接口
    virtual string name()const{
        return PersonInfo::theName();
    }
    virtual string birthDate()const{
        return PersonInfo::theBirthDate();
    }
private:
    //重写PersonInfo的缺省行为
	const string valueDelimOpen()const{return ""};
	const string valueDelimClose()const{return ""};
}
```

另一种方式是组合+继承的方式来实现，会有更多的代码和类，

```cpp
class PersonInfoImpl: private PersonInfo{
    ……
private:
    //重写PersonInfo的缺省行为
	const string valueDelimOpen()const{return ""};
	const string valueDelimClose()const{return ""};
}

class CPerson: public IPerson{
public:
    //通过PersonInfo类实现IPerson的接口
    virtual string name()const{
        return pinfo->theName();
    }
    virtual string birthDate()const{
        return pinfo->theBirthDate();
    }
private:
	shared_ptr<PersonInfo> pinfo;//组合PersonInfoImpl类
}
```

使用多重继承会带来一些问题，考虑如下类

```cpp
class BorrowableItem;
class ElectronicGaddget;
class MP3Player : public BorrowableItem, public ElectronicGaddget;
```

多重继承中，需要注意如果两个base class有同名函数(即使一个是public，一个是private)，都会导致出现歧义(ambiguity)，使得编译器不知道调用那个函数，这种情况需要手动指定调用对象，类似`mp3.BorrowableItem::checkout()`

在菱形继承中，是否使用虚继承要根据实际的需求，如果就是需要base class拷贝一份，那就不需要虚继承。一般来说能不使用虚继承就不要使用虚继承，如果使用了，那么虚继承中的base class中最好不要放置数据，这样可以避免在这些class中初始化带来的问题

# 模板与泛型编程(templates and generic programming)

## 41 了解隐式接口和编译器多态(understand implicit interfaces and compile-time polymorphism)

面向对象和模板都支持接口和多态

在面向对象中，基类提供的显示接口(explicit interface)，对virtual函数提供运行时多态(runtime polymorphism)，而在泛型编程的世界中，依然存在显示接口和运行时多态，但隐式接口(implicit interfaces)和编译器多态(complie-time polymorphism)提到前头了。

- 凡涉及T的任何函数调用有可能造成模板具现化(instantiated)，以不同的template参数具现化function templates导致不同的调用函数，这就是编译器多态

- 而隐式接口由执行于模板T上的操作来决定。显示的接口由函数的签名式（函数名称、参数类型、返回类型）构成，隐式接口则是由有效表达式(valid expressions)构成，

## 42 了解typename的双重意义(understand the two meanings of typename)

当声明模板时，下面两种方式是相同的，

`template<class T> class Widget;`

`template<typename T> class Widget;`

typename还有其他意义，

template内出现的名称如果相依于某个template参数，称为从属名称(dependent names)，如果从属名称在class内呈嵌套状，则称为嵌套从属名称(nested dependent name)。而嵌套从属名称可能导致解析困难，例如如下，

```cpp
template<typename C>
void print2nd(const C& container){
    C::const_iterator* x;
}
```

本意上是想定义一个类型为const_iterator的指针x，但如果const_iterator在c中有一个同名变量，而x又是一个全局变量，那么这行代码会被解析成变量const_iterator乘以变量x

为了解决这个问题，编译器默认认为嵌套从属名称为一个变量而不类型，只有用typename紧邻着修饰的才被认为是类型，类似如下

```cpp
template<typename C>
class Derived: public Base<T>::Nested{//继承时，不能使用typename
public:
    explicit Derived(int x):Base<T>::Nested(x){//调用base类的构造函数初始化时不能使用typename
		typename Base<T>::Nested temp;//用typename修改Nested，表示Nested是一个类型
    }
}
```

注意有两个情况不能使用typename，一是继承时，不能使用typename，二是调用base类的构造函数初始化时不能使用typename

## 43 学习处理模板化基类内的名称(know how to access names in templatized base classes)



首先定义一个templatized base class,

```cpp
template<typename Company>
class MsgSender{
public:
    void sendClear(const MsgInfo& info);
    void sendCleartext(const MsgInfo& info);
};
```

继承这个基类并调用基类的函数，编译失败，无法找到base class的函数

```cpp
template<typename Company>
class LoggingMsgSender: public MsgSender<Company>{
public:
    ……
    void sendClearMsg(const MsgInfo& info){
        ……
        sendClear(info);//error,无法找到这个函数    
		……
    }
};
```

这是因为templatized base class是可以被特化的，例如

```cpp
template<>
class MsgSender<CompanyA>{
public:
	//特化版本中，可以不定义任何函数
};
```

特化可以改写templatized base class的定义，因此编译器往往会拒绝在templatized base class中寻找继承而来的名称。如条款1所说，当从面向对象到泛型编程时规则往往不同了

解决方案有三个，都是告诉编译器去base class查找：

一是使用this指针，`this->sendClear(info);`

二是加上using声明式，`using MsgSender<Company>::sendClear`

三是显示指出基类，`MsgSender<Company>::sendClear(info)`，注意这个方法会失去运行时多态，因为指定了调用的对象和函数

## 44 将与参数无关的代码抽离templates(factor parameter-independent code out of templates)

template可能导致代码膨胀(code bloat)，源码看起来很短，但目标码却可能很大，而且有很多重复的部分，解决的方法同函数一样，做共性与变性的分析(commonality and variability analysis)

对于如下这样的模板类，只有尺寸的部分发生了改变，但是却会生成不同的实例化类

```cpp
template<typename T, size_t n>//额。。n作为构造函数不好吗，干嘛作为模板的参数
class SquareMatrix{
public:
    void invert();
    ……
};
SquareMatrix<double,5> sm1;
SquareMatrix<double,15> sm2;
```

因为类型T是可以重复的，可以将类型T的部分拆出来，作为单独的类。但是拆出来的类没有办法访问原来类的数据，因此需要在构造时传入一个指针和旧的类共享数据，类似如下，

```cpp
template<typename T>
class SquareMatrixBase{
protected:
    void setDataPtr(T* ptr){
        pData=ptr;
    }
    void invert(size_t matrixSize);
    ……
};
template<typename T, size_t n>
class SquareMatrix: private SquareMatrixBase{
public:
    using SquareMatrixBase<T>::invert;
    using SquareMatrixBase<T>::setDataPtr;
    
    SquareMatrix():SquareMatrixBase<T>(n,0){
        this->setDataPtr(pData.get());
    }
    void invert(){
        this->invert(n);
    }
    ……
};
```

## 45 运用成员函数模板接收所有兼容类型(use member function templates to receive “all compatible types”)

智能指针由模板实现，能够和普通指针一样支持有继承关系的类之间的转化，`shared_ptr<Base> it = shared_ptr<Derived>(new Derived);`，这是因为在指针智能类中提供了成员函数模板，类似如下，

```cpp
template<typename T>
class shared_ptr{
public:
	template<typename Y>
    explicit shared_ptr(Y* p);
  	template<typename Y>
    shared_ptr(shared_ptr<Y>const& p);//只有同类型的指针允许隐式转换，将普通指针转为智能指针
	template<typename Y>
    explicit shared_ptr(weak_ptr<Y>const& p);
	template<typename Y>
    explicit shared_ptr& operator=(shared_ptr<Y>const& p);//提供赋值操作
    
    shared_ptr(shared_ptr const& p);//需要提供构造和赋值函数，调用模板函数
    shared_ptr& operator=(shared_ptr const& p);
}
```

注意，提供成员函数模板并不会改变语言规则，因此即使提供了泛化的构造函数，编译器还是会生成默认的构造函数，因此需要提供构造和赋值函数

## 46 需要类型转换是请为模板定义非成员函数(define non-member function inside templates when type conversions is desired)

```cpp
template<typename T>
classs Rational;

template<typename T>
const Rational<T> operator*(const Rational<T>& lhs, const Rational<T>& rhs);

Rational<int> result = oneHalf*2;//oneHalf为Rational，error
```

当遵循条款24，写出如上代码时，会发现在调用时无法通过编译，这是因为template在实参推导过程中不会将隐式转换考虑在内，在调用的时候才会有隐式转换，因此编译器找不到应该调用哪个函数而报错。对这样的问题可以使其Rational的friend，当Rational实例化的时候，也就实例化了一个int类型的operator*的函数声明，从而通过编译，但这不会实例化其外部对应的模板函数的定义，因此无法通过链接，解决方式是直接在Rational的firend声明中实现这个友元函数

```cpp
template<typename T>
const Rational<T> doMultiply(const Rational<T>& lhs, const Rational<T>& rhs);

template<typename T>
classs Rational{
    ……
	friend const Rational operator*(const Rational& lhs, const Rational& rhs){
        //直接实现这个函数
        ……
        //或者调用类外的函数，这个函数起到帮助编译器决策调用哪个函数的作用
        doMultiply<T>(lhs,rhs);
    }	
}
```

通常模板都写在头文件中，而类中直接定义成员函数通常是inline的，所以为了避免代码膨胀，这里的friend的函数内可以调用其他函数

## 47 请使用traits classes表现类型信息(use traits classes for information about types)

回顾一下STL的迭代器的分类(categories)，

- input迭代器（struct input_iterator_tag），只能向前，移动一步，可读，例如istream_iterator
- output迭代器（struct output_iterator_tag），只能向前，移动一步，可写一次，例如ostream_iterator
- forward迭代器（struct forward_iterator_tag），只能向前，移动一步，可读可写
- Bidirectional迭代器（struct bidirectional_iterator_tag），前后移动，移动一步，可读可写
- random access迭代器（struct random_access__iterator_tag），前后移动，随机访问，可读可写

除了input和output，每一个迭代器按上诉顺序继承上一个迭代器，例如Bidirectional先后继承了output、forward迭代器，这种继承复合“is-a”关系

STL中有一个advance函数，能实现将某个迭代器移动指定距离，

```cpp
template<typename IterT, typename DistT>
void advance(IterT& iter, DistT d);
```

这个函数能根据不同的迭代器类型，采用不同的做法来移动指针，且对内置(built-in)类型和自定义(user-defined)类型都能有同样的表现，而实现这个功能的技术就是traits（在编译时提取操作类型信息，用于对不同类型实现逻辑统一的操作），它是如何实现的？

能够实施于内置类型意味着不能在数据结构内嵌套信息(nesting information)，我们需要一个struct包裹数据结构和数据类型

首先，为每一个自定义的类中添加一个统一的类型接口，

```cpp
template<……>
class deque{
public:
    class iterator{
	public:
        typedef random_access_iterator_tag iterator_category;//为所有类型指定同一个名称
        ……
    }
};
template<……>
class list{
public:
    class iterator{
	public:
        typedef bidirectional_iterator_tag iterator_category;//为所有类型指定同一个名称
        ……
    }
};

```

然后就可以在advance中用`typeid(typename iterator_traits<IterT>::iterator_category)`来判断这个迭代器的类型，结合if语句实现不同逻辑了，但if语句需要在运行期执行，且不能通过编译(见后续例子)，有没有可以在编译期执行的方法。有的，使用重载，给定不同类型迭代器参数的重载版本

```cpp
template<typename IterT, typename DistT>
void doAdvance(IterT& iter, DistT d, random_access_iterator_tag);
template<typename IterT, typename DistT>
void doAdvance(IterT& iter, DistT d, input_iterator_tag);
……
```

最后，在advance函数中传入迭代器的类型作为参数，编译器能自动查找最匹配的重载函数，

```cpp
template<typename IterT, typename DistT>
void advance(IterT& iter, DistT d){
    doAdvance(iter, d, iterator_traits<IterT>::iterator_category());
}
```

回到为什么用typeid不能通过编译的问题，因为编译器必须要确保所有源码都有效，模板实例化后的代码如下，

```cpp
void advance(list<int>::iterator& iter, DistT d){
    if(typeid(iterator_traits<list<int>::iterator>::iterator_category) ==
      typeid(random_access_iterator_tag)){
        //虽然这段代码不会被执行，但编译器依然会判断这行语句是否正确
        iter += d;//error，list<int>::iterator不能随机访问
    }else{
        if(d>=0){while(d--)++iter;}
        else {while(d++)--iter;}
    }
}
list<int>::iterator iter;
advance(iter, 10);
```

## 48 认识template元编程(be aware of template metaprogramming)

TMP能简化工作，还能将原本运行期的工作转移到编译期，便于排查问题，同时提高运行期性能，更小的执行文件，较少的内存。TMP被证明是图灵完备(Turing-complete)机器，能通过他实现任何代码，下面将介绍通过TMP实现一个功能

考虑如下代码，这个代码在大多电脑上都无法跑完，

```cpp
int test(int a) {
	if (a == 1 || a == 2)return 1;
	return test(a - 1) + test(a - 2);
}

test(200);//这个程序会相当耗时，一般的优化方法是使用动态规划
```

在TMP中没有循环构建，所有循环都以递归完成，下面这个代码通过递归模板具现化实现循环，能正确输出结果，

```cpp
template<int T>
 struct test2 {
	enum {value =  test2<T - 1>::value + test2<T - 2>::value };
};

 template<>
 struct test2<0> {
	 enum { value = 1 };
 };
 template<>
 struct test2<1> {
	 enum { value = 2 };
 };

cout << test2<100>::value << endl;;
```

TMP的优势在一下场景能带来优势：

- 确保度量单位正确。不同度量单位的正确结合使用TMP能确保所有度量单位的组合都正确
- 优化矩阵计算。`m1*m2*m3*m4`这样的代码会产生多个临时对象，如果将m1的类型变为`SquareMatrix<double, 10000>`能消除那些临时对象并合并循环
- 生成客户定制设计模式实现品。可以产生一些template用来表述独立的设计选项，然后可以任意结合他们，从而使得模式实现客户定制的行为

# 定制new和delete(customizing new and delete)

## 49 了解new-handler的行为(understand the behavior of the new-handler)

略，当new分配失败后处理逻辑，见c++/内存分配部分/异常处理

## 50 了解new和delete的合理替换时机(understand when it makes sense to replace new and delete)

替换new/delete的理由：

- 检测运用上的错误。class中持有动态分配的地址，在delete时判断是否已释放。超额申请内存，在额外空间放置byte patterns(签名，signatures)，delete时检查签名是否变动
- 提升性能。默认的new和delete适用于所有场景，如果业务有特定的性质可以替换为特定库
- 统计数据。分配的大小分布；寿命分布；分配归还次序；最大动态分配量……

定制new并没有想象的那么简单，齐位是一个问题，考虑如下代码，

```cpp
void* operator new(size_t size)throw(bad_alloc){
    size_t realSize = size + 2*sizeof(int);
    void* pMem = malloc(realSize);
    …签名…
    return static_cast<Byte*>(pMem)+sizeof(int);
}
```

在不同机器上可能有不同结果，不能保证正确。因为内存对齐的原因，返回一个malloc分配好的地址再偏移使用，不能确定是否还能获得了内存齐位(alignment)。例如，用户写`new double[2]`，而在某台机器上double为8字节，我们申请了24字节，返回申请的内存中4字节开头的地址，此时访问一个double的数据cpu需要读两次

大多时候不要定制new，使用开源代码

## 51 编写new和delete时需固守常规(adhere to convention when writing new and delete)

略，讲如何开发new和delete的，

## 52 写了placement new也要写placement delete(write placement delete if you write placement new)

略，讲如何开发new和delete的，

# 杂项讨论(miscellany)

## 53 不要忽略编译器的警告(pay attention to compiler warnings)

努力在编译器最高警告级别下争取物警告的荣誉

不要依赖编译器对报警能力，可能一个编译器发出警告在另一个编译器却什么也没有

## 54 让自己熟悉包括TR1在内的标准程序库(Familiarize yourself with the standard library,including TR1)

TR1指Technical Report 1，记录c++各个版本的修改

## 55 让自己熟悉Boost(familiarize yourself with boost)

略
