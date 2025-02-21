'''
Author: liang9886703 liang9886703@outlook,com
Date: 2025-02-18 16:01:24
LastEditors: liang9886703 liang9886703@outlook,com
LastEditTime: 2025-02-19 20:36:22
FilePath: \vuepress-theme-vdoing\curl_ai_chat.py
Description: 

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''
import requests
import json
import sseclient

# 请求 URL
url = r'https://wss.lke.cloud.tencent.com/v1/qbot/chat/sse'

# 请求头
headers = {"Accept": "text/event-stream"}

# # 请求数据
# data = {
#     "content": "你好",
#     "bot_app_key": "RhCFVzuO",
#     "visitor_biz_id": "test",
#     "session_id": "test"
# }

# # 发送 POST 请求，并开启流模式
# response = requests.post(url, data=json.dumps(data), headers=headers, stream=True)



# # {'url':'https://wss.lke.cloud.tencent.com/v1/qbot/chat/sse', 'json':{"content": "你好","bot_app_key": "RhCFVzuO","visitor_biz_id": "test","session_id": "test"}, 'headers':{}, 'stream':'True'}

# # 逐行读取 SSE 响应
# for line in response.iter_lines():
#     if line:
#         print(line.decode("utf-8"))  # 解码并打印每一行数据


def sse_client(sid: str):
    req_data = {
        "content": "deepseek是什么",
        "bot_app_key": "RhCFVzuO",
        "visitor_biz_id": 'test',
        "session_id": sid,
        "streaming_throttle": 5
    }
    
    try:
        # print(f'req_data:{req_data}')
        resp = requests.post(url, json=req_data, stream=True, headers=headers)
        # print(f"resp:{resp.text}")
        client = sseclient.SSEClient(resp)
        for ev in client.events():
            # print(f'event:{ev.event}, "data:"{ev.data}')
            data = json.loads(ev.data)
            if ev.event == "reply":
                if data["payload"]["is_from_self"]:  # 自己发出的包
                    print(f'is_from_self, event:{ev.event}, "content:"{data["payload"]["content"]}')
                elif data["payload"]["is_final"]:  # 服务端event传输完毕；服务端的回复是流式的，最后一条回复的content，包含完整内容
                    print(f'is_final, event:{ev.event}, "content:"{data["payload"]["content"]}')
            else:
                print(f'event:{ev.event}, "data:"{ev}')
    except Exception as e:
        print(e)


if __name__ == "__main__":
    sse_client("test")