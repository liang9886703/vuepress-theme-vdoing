<template>
<deep-chat ref="chatElementRef" class="deepChat" 
            style="background-color: rgba(17, 167, 205, 0.3); border-radius: 12px;width:500px;height:700px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);" 
            chatStyle='{"backgroundColor": "#f7f7f7", "borderRadius": "8px"}'
            dropupStyles='{
                "button": {
                  "styles": {
                    "container": {
                      "default": {"backgroundColor": "rgb(219, 118, 119,10%)"},
                      "hover": {"backgroundColor": "#e4f3ff"},
                      "click": {"backgroundColor": "#d7edff"}
                    }
                  }
                },
                "menu": {
                  "container": {
                    "boxShadow": "#e2e2e2 0px 1px 3px 2px"
                  },
                  "item": {
                    "hover": {
                      "backgroundColor": "#e1f2ff"
                    },
                    "click": {
                      "backgroundColor": "#cfeaff"
                    }
                  },
                  "iconContainer": {
                    "width": "1.8em"
                  },
                  "text": {
                    "fontSize": "1.05em",
                    "font-family": "home_english",
                    "font-family": "home_chinese"
                  }
                }
              }' 
            audio='{"button": {"position": "dropup-menu"}}'
            images='{"button": {"position": "dropup-menu"}}'
            inputAreaStyle='{"backgroundColor": "rgba(17, 167, 205, 0.5)"}'
            textInput='{
                "styles": {
                  "text": {"color": "black","paddingRight": "70px"},
                  "container": {"maxHeight": "50px", "backgroundColor": "#f5f9ff"},
                  "focus": {"border": "2px solid rgb(219, 118, 119,90%)"}
                },
                "placeholder": {"text": "Insert text here...", "style": {"color": "rgb(219, 118, 119,60%)"}}
              }'
              submitButtonStyles='{
                  "submit": {
                    "container": {
                      "default": {"backgroundColor": "rgb(219, 118, 119,80%)"},
                      "hover": {"backgroundColor": "#c6e1ff"},
                      "click": {"backgroundColor": "#acd3ff"}
                    },
                    "svg": {
                      "styles": {
                        "default": {
                          "filter":
                            "brightness(0) saturate(100%) invert(58%) sepia(53%) saturate(6828%) hue-rotate(214deg) brightness(100%) contrast(100%)"
                        }
                      }
                    }
                  },
                  "alwaysEnabled": true,
                  "position": "outside-right"
                }'
                auxiliaryStyle="
                  ::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                  }
                  ::-webkit-scrollbar-thumb {
                    background-color: rgb(219, 118, 119,60%);
                    border-radius: 5px;
                  }"
    >
  <div class="div">总之就是这样啦
  </div>
</deep-chat>
</template>

<script>
  //:connect='connectConfig'
import { ref, onMounted,computed } from 'vue';
import 'deep-chat';
import {fetchEventSource} from '@microsoft/fetch-event-source';

export default {
  name: 'App',
  setup() {
    const chatElementRef = ref(null);

    // // 计算属性：转换为 JSON 格式
    // const connectConfig = computed(() => ({
    //   url: "https://wss.lke.cloud.tencent.com/v1/qbot/chat/sse",
    //   method: "POST",
    //   headers: {  },
    //   stream: 'true'
    // }));
  
    const history = ref([
    ]);

    let abortController = null;
    onMounted(async() => {
      chatElementRef.value.htmlClassUtilities = {
        ['div']: {
          events: {
            click: (event) => {
              const text = '你好';
              chatElementRef.value.submitUserMessage(text.substring(1, text.length - 1));
            },
          },
          styles: {
            default: {backgroundColor: '#f3d2c1', borderRadius: '10px', padding: '10px', cursor: 'pointer', textAlign: 'center'},
            hover: {backgroundColor: '#ebebeb'},
            click: {backgroundColor: '#e4e4e4'},
          }
        },
      }
      chatElementRef.value.avatars = {
        "default": {"styles": {"avatar": {"height": "30px", "width": "30px"}, "container": {"marginTop": "8px"},"backgroundColor": "#f3d2c1"}},
        "ai": {"src": "/chu/chara3.png", "styles": {"avatar": {"marginLeft": "-3px"}},"backgroundColor": "#f3d2c1"},
        "bob": {"src": "/chu/chara2.png", "styles": {"avatar": {"borderRadius": "15px"},"backgroundColor": "#f3d2c1"}}
      };
      chatElementRef.value.textInput = {
        placeholder: { text: 'Welcome to the demo!' }
      };
      chatElementRef.value.history = history.value;
      chatElementRef.value.displayLoadingBubble="false";

      abortController = new AbortController(); // 创建一个控制器，用于停止流
      chatElementRef.value.connect = {
        url: "http://192.168.1.10:5000/stream",
        method: "POST",
        headers: {"Content-Type": "application/json", // 发送 JSON 格式数据
                        "Accept": "application/json"},
        stream: true/*,

        handler: (message, signals) => {
          try {
            // this is PSEUDO CODE for creating a stream
            console.log('1');
            console.log(signals);
            console.log(message);
            //console.log(message.messages[0].text);
            fetchEventSource('http://192.168.1.10:5000/stream', {
              signal: abortController.signal, // 允许停止流
              method: "POST", // 使用 POST 请求
              stream: true, // 使用流
              headers: {"Content-Type": "application/json", // 发送 JSON 格式数据
                        "Accept": "application/json" // 确保后端能解析 JSON
              },
              body: JSON.stringify({
                "content": message.messages[0].text
              }),
              async onopen(response) {
                signals.stopClicked.listener = () => {
                  abortController.abort(); // stops the stream
                };
                console.log('3');
                console.log(response);
                console.log('4');
                if (response.ok) {
                  signals.onOpen(); // stops the loading bubble
                  chatElementRef.value.addMessage({text: "思考中……".data, author: 'ai'}, true); // adds text into the message bubble
              } else {
                  signals.onResponse({error: 'error'}); // displays an error message
                  abortController.abort(); // stops the stream
                }
              },
              onmessage(message) {
                console.log('5');
                console.log(message);
                if (message.data === 'end') {
                  signals.onClose(); // The stop button will be changed back to submit button
                  console.log('end');
                  abortController.abort(); // stops the stream
                  return;
                }
                //signals.onResponse({text: message.data, role: 'ai',overwrite:true}); // adds text into the message bubble
                //chatElementRef.value.addMessage({ text: message.data, role: 'ai', overwrite: true })
                //updateMessage({ text: message.data, role: 'ai', overwrite: true }); // adds text into the message bubble
                chatElementRef.value.updateMessage({ text: message.data, role: 'ai', overwrite: true }); // adds text into the message bubble
              },
              onerror(message) {
                console.log('error');
                console.log(message);
                signals.onResponse({error: message}); // displays an error message
                signals.onClose(); 
                abortController.abort(); // stops the stream
              },
              onclose() {
                //console.log(message);
                console.log('close');
                signals.onClose(); // The stop button will be changed back to submit button
                abortController.abort(); // stops the stream
              },
            });
            // triggered when the user clicks the stop button
            console.log('2');
            signals.stopClicked.listener = () => {
              // logic to stop your stream, such as creating an abortController
            };
          } catch (e) {
            signals.onResponse({error: e.message}); // displays an error message
          }
        }*/
      };
        /*chatElementRef.responseInterceptor = (response) => {
          console.log(response); // printed above
          return {text:'this is a response'};
        };
        chatElementRef.value.requestInterceptor = (requestDetails) => {
          console.log(requestDetails);
          requestDetails.body = {
            "content": "你好",
            "bot_app_key": "RhCFVzuO",
            "visitor_biz_id": "test",
            "session_id": "test"
          }
          return requestDetails;
        };*/
    });

  // const avatar = ref({
  //   "default": {"styles": {"avatar": {"height": "30px", "width": "30px"}, "container": {"marginTop": "8px"}}},
  //   "ai": {"src": "/chu/chara3.png", "styles": {"avatar": {"marginLeft": "-3px"}}},
  //   "bob": {"src": "/chu/chara2.png", "styles": {"avatar": {"borderRadius": "15px"}}}
  //     });


    return { history, chatElementRef};
  },
};
</script>

<style lang='stylus'>
.deepChat
  background: rgba(255, 255, 255, 0.2); /* 半透明背景 */
  backdrop-filter: blur(4px); /* 毛玻璃效果 */
  -webkit-backdrop-filter: blur(10px); /* 兼容 Safari */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* 阴影效果 */
  border-radius 12px
</style>
