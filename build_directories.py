'''
Author: liang9886703 liang9886703@outlook,com
Date: 2025-02-07 15:54:36
LastEditors: liang9886703 liang9886703@outlook,com
LastEditTime: 2025-02-08 13:57:05
FilePath: \vuepress-theme-vdoing\build_directories.py
Description: 

Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
'''
from pathlib import Path
import shutil
from datetime import datetime
# import json
import copy
import re

'''
如果对目录和md文件修改名字，会改变页面的跳转
'''

orderPath = Path.cwd() / 'docs'

rootDirectory = '00.目录页'
tagDirectoryContent = {}
tagDirectoryContent[8] = {'pageComponent':{'data':{'description': r'服务器开发等技术'}}} # 示例

# todo 更换图片 'imgUrl': '/img/web.png', 
tagDirectory = {'pageComponent':{
                    'name': 'Catalogue',
                    'data':{
                        'path': '01.前端',
                        'imgUrl': r'/img/web.png', 
                        'description': r'JavaScript、ES6、Vue框架等前端技术'
                        }
                    },
                'title': '前端',
                'date': '',
                'permalink': '',
                'sidebar': 'false',
                'article': 'false',
                'comment': 'false',
                'editLink': 'false',
                'author':{
                    'name': 'songkuakua',
                    'link': r'https://github.com/liang9886703'
                    }
                }

tagMd = {'title': '33个非常实用的JavaScript一行代码',
            'date': '',
            'permalink': r'/pages/a61298/',
            'categories':'\n  - 服务端开发',
            'tags':'\n  - 服务端开发',
            'author': {
                    'name': 'songkuakua',
                    'link': r'https://github.com/liang9886703'
                    }
            }

excludeFileRoot = ['_posts','.vuepress','@pages', rootDirectory]

matchMdDir = r'^([0-9]+.)(?=[\S\s]+$)'

def create_str_from_item(item,name):
    '''通过列表生成格式化的md描述文本'''
    res = '---\n'
    def func(item, level):
        res = ''
        for k,v in item.items():
            res += '  ' * level
            res += f'{k}:'
            if isinstance(v, str):
                res += f' {v}\n'
            else:
                res += '\n'
                res += func(v, level+1)
        return res

    res += func(item, 0)
    res += '---\n'
    return res


class dir_builder:
    _count = 0
    _root = None
    _relative_dir = ''

    def __init__(self, path:Path, relative_dir:str):
        self._root = path / rootDirectory
        self._relative_dir = relative_dir
        
        if self._root.exists():
            shutil.rmtree(self._root)

        try:
            self._root.mkdir()
        except Exception as e:
            print(f"Failed to create {self._root} : {e}")
            return None

    def build_directories(self, name:str)->str:
        """生成目录文件夹，并返回编号后的文件夹名"""
        # 目录前缀数字
        self._count += 1
        file_name = str(self._count).zfill(2) + '.' + name

        # 目录内容字符串生成
        tagDir = copy.deepcopy(tagDirectory)
        tagDir['pageComponent']['data']['path'] = file_name
        tagDir['title'] = name
        tagDir['date'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        tagDir['permalink'] = self._relative_dir+ '/' + name
        # 只有第一层目录手动添加自定义内容
        if self._relative_dir == '' and tagDirectoryContent.get(self._count):
            for k,v in tagDirectoryContent[self._count].items():
                if type(v) == str:
                    tagDir[k] = v
                else:
                    for k1,v1 in v.items():
                        if type(v1) == str:
                            tagDir[k][k1] = v1
                        else:
                            for k2,v2 in v1.items():
                                tagDir[k][k1][k2] = v2
        # string = json.dumps(tagDir, ensure_ascii=False, indent=4)
        string = create_str_from_item(tagDir,name)
        file_path = self._root / (file_name+'.md')

        try:
            file_path.touch()
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(string)
        except Exception as e:
            print(f"Failed to write {file_path}: {e}")
            return None

        return file_name
    
    def __del__(self):
        if self._count == 0:
            shutil.rmtree(self._root)

def deleteOrder(name):
    """删除字符串中可能有的文件夹编号"""
    return re.sub(matchMdDir, '', name)

def orderMd(path:Path, name:str, num:int, relative_dir:str):
    """对md文件进行编号和排序，文件中添加格式化文本"""
    unordered_name = deleteOrder(name)
    new_name = str(num).zfill(2) + '.' + unordered_name
    file_path = path / new_name
    (path / name).rename(file_path)
    title = unordered_name.rsplit('.', 1)[0]

    tagDir = copy.deepcopy(tagMd)
    tagDir['title'] = title
    tagDir['date'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    tagDir['permalink'] = relative_dir + '/' + title
    categories = ''
    for s in relative_dir.split('/'):
        if s == '':
            continue
        categories += '\n' + '  - ' + s
    tagDir['categories'] = categories
    tagDir['tags'] = ''

    string = create_str_from_item(tagDir,name)

    try:
        with open(file_path, 'r+', encoding='utf-8') as file:
            first_line = file.readline()
            other_content = file.read()
            
            # 检查是否已经添加过格式化文本
            if not first_line.startswith('---'): # 这一行是否以'---'开头
                file.seek(0)
                file.write(string + first_line + other_content)
            # 以下代码能够删除文件的格式化文本
            # first_line = file.readline()
            # while first_line and first_line.startswith('---'):
            #     first_line = file.readline()
            #     while first_line and not first_line.startswith('---'):
            #         first_line = file.readline()
            #     first_line = file.readline()
            # all = first_line + file.read()
            # file.seek(0)
            # file.write(all)
            # file.truncate()  # 截断文件，删除多余的旧内容

    except Exception as e:
        print(f"Failed to write {file_path}: {e}")
        return



def orderDir(path: Path, level: int, relative_dir: str):
    """对文件夹进行编号和排序"""
    if level == 3:
        print(f"文件夹层级超过3层的部分不会被处理!")
        return
    # item_list = [item for item in path.iterdir()]
    num = 0
    builder = dir_builder(path, relative_dir)
    for item in path.iterdir():
        if item.is_dir() and not item.name in excludeFileRoot:
            unordered_name = deleteOrder(item.name)
            new_name = builder.build_directories(unordered_name)
            new_path = path / new_name
            if new_name:
                (path / item.name).rename(new_path)
            else:
                print(f"Failed to rename {item.name}")
            orderDir(new_path, level+1, relative_dir+'/'+unordered_name)
        elif item.is_file() and item.suffix == '.md':
            if relative_dir == '' and item.name == 'index.md':
                continue
            orderMd(path, item.name, num, relative_dir)
            num += 1

orderDir(orderPath, 0, '')