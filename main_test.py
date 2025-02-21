'''
Author: liang9886703 liang9886703@outlook,com
Date: 2025-02-18 20:23:51
LastEditors: liang9886703 liang9886703@outlook,com
LastEditTime: 2025-02-20 23:10:33
FilePath: \vuepress-theme-vdoing\main_test.py
Description: 

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''
import requests
import sseclient
import json
# 请求地址（假设 Flask 服务运行在本地5000端口）
url = " http://192.168.1.10:5000/stream"

# 请求头，必须包含 X-Auth-Token
headers = {
    "Accept": "text/event-stream"
}

# 请求体，必须包含 data 字段
payload = {
    "content": "今天周几",
}

try:
    resp = requests.post(url, json=payload, stream=True, headers=headers)
    # print(f"resp:{resp.text}")
    client = sseclient.SSEClient(resp)
    for ev in client.events():
        # print(f'event:{ev.event}, "data:"{ev.data}')
        data = json.loads(ev.data)
        if 'reply' in data:
            print(f'event:{ev.event}, "data:"{data['reply']}')
        elif 'thought' in data:
            print(f'event:{ev.event}, "data:"{data['thought']}')
        # if ev.event == "reply":
        #     if data["payload"]["is_from_self"]:  # 自己发出的包
        #         print(f'is_from_self, event:{ev.event}, "content:"{data["payload"]["content"]}')
        #     elif data["payload"]["is_final"]:  # 服务端event传输完毕；服务端的回复是流式的，最后一条回复的content，包含完整内容
        #         print(f'is_final, event:{ev.event}, "content:"{data["payload"]["content"]}')
        else:
            print(f'event:{ev.event}, "data:"{ev.data}')
except Exception as e:
    print(f"Error in stream: {str(e)}\n")

# # 发送流式请求
# with requests.post(url, headers=headers, json=payload, stream=True) as response:
#     print(response.status_code)
#     for line in response.iter_lines():
#         if line:
#             print(f"收到数据: {line}")  # 逐行打印服务器返回的数据
