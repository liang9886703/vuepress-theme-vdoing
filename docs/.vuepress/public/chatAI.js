import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import 'https://cdn.jsdelivr.net/npm/deep-chat@latest/dist/deepChat.js';

const chat = {
  setup() {
    const chatElementRef = ref(null);
    const history = ref([]);

    onMounted(() => {
      if (!chatElementRef.value) return;

      chatElementRef.value.htmlClassUtilities = {
        div: {
          events: {
            click: () => {
              chatElementRef.value.submitUserMessage({text: "你好"});
            }
          },
          styles: {
            default: { backgroundColor: "#f3d2c1", borderRadius: "10px", padding: "10px", cursor: "pointer", textAlign: "center" },
            hover: { backgroundColor: "#ebebeb" },
            click: { backgroundColor: "#e4e4e4" }
          }
        }
      };

      chatElementRef.value.avatars = {
        default: { styles: { avatar: { height: "30px", width: "30px" }, container: { marginTop: "8px" } } },
        ai: { src: "/chu/chara3.png", styles: { avatar: { marginLeft: "-3px" } } },
        bob: { src: "/chu/chara2.png", styles: { avatar: { borderRadius: "15px" } } }
      };

      chatElementRef.value.textInput = {
        placeholder: { text: "受限deepseek，回复时间约30s！" }
      };

      chatElementRef.value.history = history.value;
      chatElementRef.value.displayLoadingBubble = false;

      chatElementRef.value.connect = {
        url: "http://songkuakua.com/stream",
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        stream: true
      };
    });

    return { chatElementRef };
  },
  template: `
  <deep-chat ref="chatElementRef" class="deepChat" 
    style="background-color: rgba(17, 167, 205, 0.3); border-radius: 12px;width:500px;height:700px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);" 
    chatStyle='{"backgroundColor": "#f7f7f7", "borderRadius": "8px"}'
    dropupStyles='{
        "button": {
          "styles": {
            "container": {
              "default": {"backgroundColor": "rgba(219, 118, 119,10%)"},
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
            "font-family": "home_english, home_chinese"
          }
        }
      }' 
    audio='{"button": {"position": "dropup-menu"}}'
    images='{"button": {"position": "dropup-menu"}}'
    textInput='{
        "styles": {
          "text": {"color": "black","paddingRight": "70px"},
          "container": {"maxHeight": "50px", "backgroundColor": "#f5f9ff"},
          "focus": {"border": "2px solid rgba(219, 118, 119,90%)"}
        },
        "placeholder": {"text": "Insert text here...", "style": {"color": "rgba(219, 118, 119,60%)"}}
      }'
    auxiliaryStyle="
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: rgba(219, 118, 119,60%);
        border-radius: 5px;
      }"
  >
  <div class="div">嗨，蝶野雏！</div>
</deep-chat>  `
};

createApp(chat).mount("#chatAI");