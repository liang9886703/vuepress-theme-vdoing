
from pathlib import Path
import shutil
from datetime import datetime
# import json
import os
import re
import chardet
import urllib.parse

num = 10

def replace_pic(match, path: Path):
    global num
    picName = match.group(2)
    picPath = path / picName
    print(f'picPath: {picPath}')    
    if picName.startswith('http'):
        return picName
    
    num += 1
    newPicName = f'./pic{num}.png'
    if picPath.exists():
        picPath.rename(path / newPicName)
    return newPicName


def orderDir(path: Path):
    # 递归遍历文件夹内的所有文件
    global num
    num = 10
    for file in path.iterdir():
        if file.is_dir():
            # 如果是目录，改名，在outDir目录下创建对应的文件夹结构
            # 递归遍历子文件夹
            tempNum = num
            orderDir(file)
            num = tempNum
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
# clearDir(Path.cwd())