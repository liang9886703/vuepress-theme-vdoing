'''
Author: liang9886703 liang9886703@outlook,com
Date: 2025-02-18 20:23:50
LastEditors: liang9886703 liang9886703@outlook,com
LastEditTime: 2025-02-21 01:58:44
FilePath: \vuepress-theme-vdoing\main.py
Description: 

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''
from flask import Flask, request, Response, stream_with_context, jsonify
import requests
import json
import sseclient
from flask_cors import CORS
import time
import copy

app = Flask(__name__)
CORS(app)

url = 'https://wss.lke.cloud.tencent.com/v1/qbot/chat/sse'
headers = {"Accept": "text/event-stream"}


response_headers ={
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*"
    }

class Custom:
    
    def chat(self, body):
        # Text messages are stored inside request body using the Deep Chat JSON format:
        # https://deepchat.dev/docs/connect
        print(body)
        # Sends response back to Deep Chat using the Response format:
        # https://deepchat.dev/docs/connect/#Response
        return {"text": "This is a respone from a Flask server. Thankyou for your message!",'error': "error", 'overwrite':'true'}

    def rec_and_send_stream(self, message):
        send_data = {
            "content": message,
            "bot_app_key": "RhCFVzuO",
            "visitor_biz_id": 'test',
            "session_id": "test",
            "streaming_throttle": 5
        }
        try:
            resp = requests.post(url, json=send_data, stream=True, headers=headers)
            client = sseclient.SSEClient(resp) 
            locData = 0
            for ev in client.events():
                # print(f'event:{ev.event}, "data:"{ev.data}')
                data = json.loads(ev.data)
                if ev.event == "reply":
                    rec_message = data["payload"]["content"]
                    if data["payload"]["is_from_self"]:  # 自己发出的包
                        # print(f'is_from_self, event:{ev.event}, "content:"{data["payload"]["content"]}')
                        # reply = json.dumps({'reply':data["payload"]["content"]})
                        
                        # for i in range(locData, len(reply)):
                        #     time.sleep(0.07)
                        #     print(reply[i])
                        #     yield f"data: {json.dumps({'text': f'{reply[i]} '})}\n\n"
                        # locData = len(reply)
                        continue
                    elif data["payload"]["is_final"]:  # 服务端event传输完毕；服务端的回复是流式的，最后一条回复的content，包含完整内容
                        # print(f'is_final, event:{ev.event}, "content:"{rec_message}')
                        while locData < len(rec_message):
                            time.sleep(0.07)
                            print(f'locData：{locData}len:{len(rec_message)}data:{rec_message[locData]}')
                            reply = rec_message[locData]
                            yield f"data: {json.dumps({'text': f'{reply}'})}\n\n"
                            print(rec_message[locData])
                            locData += 1
                    else:
                        while locData < len(rec_message):
                            time.sleep(0.07)
                            print(f'locData：{locData}len:{len(rec_message)}data:{rec_message[locData]}')
                            reply = rec_message[locData]
                            yield f"data: {json.dumps({'text': f'{reply}'})}\n\n"
                            print(rec_message[locData])
                            locData += 1
                    # print(f'locData：{locData}, rec_message({len(rec_message)}):{rec_message}')
                elif ev.event == 'thought':
                        print(f'"thought:"{data['payload']['procedures']}')
                        rec_message = ""
                        # for pro in data['payload']['procedures']:
                        #     reply += pro["debugging"]['content']
                        # print("------------")
                        # # print(reply)
                        # print("------------")
                        # reply = json.dumps({'thought':reply})
                        # yield reply
                elif ev.event == 'error':
                    info = f'text: event:{ev.event}, data:{ev.data}'
                    yield f"data: {json.dumps(f'{info}')}\n\n"
                elif ev.event == 'token_stat':
                    print(f"event:{ev.event}, data:{ev.data}\n\n")
                else:
                    print(f'event:{ev.event}, "data:"{ev.data}')

        except Exception as e:
            print(f"\033[1;31merror:{str(e)}\033[0m\n")
            yield f"data: {json.dumps({'text': f'Error in stream: {str(e)}'})}\n\n"

    def rec_and_send(self, message):
        send_data = {
            "content": message,
            "bot_app_key": "RhCFVzuO",
            "visitor_biz_id": 'test',
            "session_id": "test",
            "streaming_throttle": 5
        }
        try:
            resp = requests.post(url, json=send_data, stream=True, headers=headers)
            client = sseclient.SSEClient(resp) 
            locData = 0
            for ev in client.events():
                # print(f'event:{ev.event}, "data:"{ev.data}')
                data = json.loads(ev.data)
                if ev.event == "reply":
                    rec_message = data["payload"]["content"]
                    if data["payload"]["is_from_self"]:  # 自己发出的包
                        # print(f'is_from_self, event:{ev.event}, "content:"{data["payload"]["content"]}')
                        # reply = json.dumps({'reply':data["payload"]["content"]})
                        
                        # for i in range(locData, len(reply)):
                        #     time.sleep(0.07)
                        #     print(reply[i])
                        #     yield f"data: {json.dumps({'text': f'{reply[i]} '})}\n\n"
                        # locData = len(reply)
                        continue
                    elif data["payload"]["is_final"]:  # 服务端event传输完毕；服务端的回复是流式的，最后一条回复的content，包含完整内容
                        # print(f'is_final, event:{ev.event}, "content:"{rec_message}')
                        time.sleep(0.07)
                        print(f'locData：{locData}len:{len(rec_message)}data:{rec_message}')
                        yield f"data: {json.dumps({'text': f'{rec_message}','overwrite':'true'})}\n\n"
                    else:
                        time.sleep(0.07)
                        print(f'locData：{locData}len:{len(rec_message)}data:{rec_message}')
                        yield f"data: {json.dumps({'text': f'{rec_message}'})}\n\n"
                    # print(f'locData：{locData}, rec_message({len(rec_message)}):{rec_message}')
                elif ev.event == 'thought':
                        print(f'"thought:"{data['payload']['procedures']}')
                        # for pro in data['payload']['procedures']:
                        #     reply += pro["debugging"]['content']
                        # print("------------")
                        # # print(reply)
                        # print("------------")
                        # reply = json.dumps({'thought':reply})
                        # yield reply
                elif ev.event == 'error':
                    rec_message = f'event:{ev.event}, data:{ev.data}'
                    yield f"data: {json.dumps({'text': f'{rec_message} ','overwrite':'true'})}\n\n"
                elif ev.event == 'token_stat':
                    print(f"event:{ev.event}, data:{ev.data}\n\n")
                else:
                    print(f'event:{ev.event}, "data:"{ev.data}')

        except Exception as e:
            print(f"\033[1;31merror:{str(e)}\033[0m\n")
            yield f"data: {json.dumps({'text': f'Error in stream: {str(e)}'})}\n\n"


    def chat_stream2(self, body):
        # Text messages are stored inside request body using the Deep Chat JSON format:
        # https://deepchat.dev/docs/connect
        print(body)
        response_chunks = "This is a response from a Flask server. Thank you for your message!".split(
            " ")
        response = Response(self.send_stream2(response_chunks), mimetype="text/event-stream")
        response.headers["Content-Type"] = "text/event-stream"
        response.headers["Cache-Control"] = "no-cache"
        response.headers["Connection"] = "keep-alive"
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

    def send_stream2(self, response_chunks, chunk_index=0):
        if chunk_index < len(response_chunks):
            chunk = response_chunks[chunk_index]
            yield f"data: {json.dumps({'text': f'{chunk} '})}\n\n"
            time.sleep(0.07)
            yield from self.send_stream2(response_chunks, chunk_index + 1)
        else:
            yield ""
            
    def send_stream3(self, response_chunks, chunk_index=0):
        text = 'hello'
        yield f"data: {json.dumps({'text': f'{text} ','overwrite':'true'})}\n\n"
        time.sleep(0.07)
        text = '你'
        yield f"data: {json.dumps({'text': f'{text} ','overwrite':'true'})}\n\n"
        time.sleep(0.07)
        text = '你好'
        yield f"data: {json.dumps({'text': f'{text} ','overwrite':'true'})}\n\n"
        time.sleep(0.07)
        text = '你好啊'
        yield f"data: {json.dumps({'text': f'{text} ','overwrite':'true'})}\n\n"
        time.sleep(0.07)
        text = '你好啊我'
        yield f"data: {json.dumps({'text': f'{text} ','overwrite':'true'})}\n\n"
        time.sleep(0.07)
        text = '你好啊我层'
        yield f"data: {json.dumps({'text': f'{text} ','overwrite':'true'})}\n\n"
        yield from self.send_stream2(response_chunks, chunk_index + 1)

    def chat_stream(self, body):
        # Text messages are stored inside request body using the Deep Chat JSON format:
        # https://deepchat.dev/docs/connect
        print(body)
        
        response = Response(self.rec_and_send(body), mimetype="text/event-stream")
        response.headers = response_headers
        return response
    
    def send_stream(self, response_chunks, chunk_index=0):
        for char in response_chunks.split(' '):
            print(f'char:{char}')
            time.sleep(0.07)
            json_data = json.dumps({'text': f'{char} '}, ensure_ascii=False)
            yield f"data: {json_data} \n\n"
        # json_data = json.dumps(f'text: {response_chunks}', ensure_ascii=False)
        # yield f"data: {json_data}\n\n"
        # yield f"data: {json.dumps({'text': f'{response_chunks}'},ensure_ascii=False)}\n\n"

    def files(self, request):
        # Files are stored inside a files object
        # https://deepchat.dev/docs/connect
        files = request.files.getlist("files")
        if files:
            print("Files:")
            for file in files:
                print(file.filename)

            # When sending text messages along with files - they are stored inside the data form
            # https://deepchat.dev/docs/connect
            text_messages = list(request.form.items())
            if len(text_messages) > 0:
                print("Text messages:")
                # message objects are stored as strings and they will need to be parsed (JSON.parse) before processing
                for key, value in text_messages:
                    print(key, value)
        else:
            # When sending text messages without any files - they are stored inside a json
            print("Text messages:")
            print(request.json)

        # Sends response back to Deep Chat using the Response format:
        # https://deepchat.dev/docs/connect/#Response
        return {"text": "This is a respone from a Flask server. Thankyou for your message!"}

custom = Custom()

def generate_stream(new_headers, new_body):
    """
    向目标地址建立流连接，并逐行读取返回数据，处理后yield给客户端
    """
    global data
    
    data['content'] = new_body['content']
    
    try:
        resp = requests.post(url, json=data, headers=headers, stream=True)
        client = sseclient.SSEClient(resp) 
        for ev in client.events():
            # print(f'event:{ev.event}, "data:"{ev.data}')
            data = json.loads(ev.data)
            if ev.event == "reply":
                if data["payload"]["is_from_self"]:  # 自己发出的包
                    print(f'is_from_self, event:{ev.event}, "content:"{data["payload"]["content"]}')
                    reply = json.dumps(data["payload"]["content"])
                    print("------------")
                    print(reply)
                    print("------------")
                    yield reply
                elif data["payload"]["is_final"]:  # 服务端event传输完毕；服务端的回复是流式的，最后一条回复的content，包含完整内容
                    print(f'is_final, event:{ev.event}, "content:"{data["payload"]["content"]}')
                    reply = json.dumps(data["payload"]["content"])
                    print("------------")
                    print(reply)
                    print("------------")
                    yield reply

                    # yield data["payload"]["content"]
            elif ev.event == 'thought':
                    print(f'"thought:"{data['payload']['procedures']}')
                    
                    for pro in data['payload']['procedures']:
                        reply += pro["debugging"]['content']
                    print("------------")
                    # print(reply)
                    print("------------")
                    reply = json.dumps({'thought':reply})
                    yield reply
            else:
                print(f'event:{ev.event}, "data:"{ev.data}')

    except Exception as e:
        print(f"\033[1;31merror:{str(e)}\033[0m\n")
        yield f"Error in stream: {str(e)}\n"
        
def generate_stream_test(new_headers, new_body):
    print(f'new_body: {new_body}')
    # yield json.dumps({'reply': '1'})
    yield f"data: 244\n\n"
    yield f"data: 344\n\n"
    yield "data: end\n\n"  # 流结束时发送最后一条消息
    return 

@app.route('/', methods=['GET'])
def root_get():
    return "Hello, World!"


@app.route('/stream', methods=['POST'])
def stream_route():
    if not request.is_json:
        return jsonify({"error": "Request body must be JSON"}), 400

    req_data = request.json
    print(f'req_data:{req_data}')
    if 'messages' not in req_data:
        return jsonify({"error": "Missing 'message' in request body"}), 400
    if isinstance(req_data['messages'], list) and 'text' not in req_data['messages'][0]:
        return jsonify({"error": "Missing 'text' in 'messages' in request body"}), 400
    # if 'content' not in req_data:
    #     return jsonify({"error": "Missing 'content' in request body"}), 400
    # return custom.chat_stream(req_data)
    return custom.chat_stream(req_data['messages'][0]['text'])

if __name__ == '__main__':
    # 监听所有地址，方便外部访问；debug模式仅用于开发环境
    app.run(host='0.0.0.0', port=5000, debug=True)
