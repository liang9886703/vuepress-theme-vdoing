'''
Author: liang9886703 liang9886703@outlook,com
Date: 2025-02-15 18:29:49
LastEditors: liang9886703 liang9886703@outlook,com
LastEditTime: 2025-02-15 20:52:08
FilePath: \vuepress-theme-vdoingf:\考研\新建文件夹\out\computer\工具和开发\设计模式\picture.py
Description: 

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''

from pathlib import Path
import shutil
from datetime import datetime
# import json
import os
import re
import chardet
import urllib.parse

def replace_pic(match, path: Path):
    matchV = match.group(2)
    if matchV.startswith('http'):
        return matchV
    picPath = path / matchV
    newPicName = matchV.replace('/', '')

    if picPath.exists():
        picPath.rename(path / newPicName)
    return newPicName


def orderDir(path: Path):
    # 递归遍历文件夹内的所有文件
    for file in path.iterdir():
        if file.is_dir():
            # 如果是目录，改名，在outDir目录下创建对应的文件夹结构
            # 递归遍历子文件夹
            orderDir(file)
        elif file.is_file():
            if file.name.endswith('.md'):
                # 对于md，读取文件内容
                with open(file, 'r+', encoding='utf-8') as f:
                    content = f.read()
                    content = re.sub(r'^\s*!\[(.*?)\]\((.*?)\)', lambda m: f'![{m.group(1)}]({replace_pic(m, path)})', content, flags=re.MULTILINE)
                    f.seek(0)
                    f.write(content)
                    f.truncate()

def clearDir(path: Path):
    # 递归遍历文件夹内的所有文件
    for file in path.iterdir():
        if file.is_dir():
            clearDir(file)
    # 如果目录为空，删除目录
    if not any(path.iterdir()):
        print(f'{path} is empty, remove it')
        path.rmdir()


orderDir(Path.cwd())
clearDir(Path.cwd())