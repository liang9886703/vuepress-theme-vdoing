'''
Author: liang9886703 liang9886703@outlook,com
Date: 2025-02-07 15:54:36
LastEditors: liang9886703 liang9886703@outlook,com
LastEditTime: 2025-02-13 23:10:47
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
import json

'''
如果对目录和md文件修改名字，会改变页面的跳转
'''

orderPath = Path.cwd() / 'docs'
configPath = Path.cwd() / 'docs/.vuepress/config.ts'

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

def create_str_from_item(item):
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
    _isCatalogue = False
    _pre_name = ''

    def __init__(self, path:Path, relative_dir:str, isCatalogue:bool = False, pre_name:str=''):
        self._root = path / rootDirectory
        self._relative_dir = relative_dir
        self._isCatalogue = isCatalogue
        self._pre_name = pre_name
        
        if self._root.exists():
            shutil.rmtree(self._root)

        self._root.mkdir()

    def build_directories(self, name:str, count:int=-1)->str:
        """生成目录文件夹，并返回编号后的文件夹名"""
        # 目录前缀数字
        self._count += 1
        if count == -1:
            file_name = str(self._count).zfill(2) + '.' + name
        else:
            file_name = str(count).zfill(2) + '.' + name

        # 目录内容字符串生成
        tagDir = copy.deepcopy(tagDirectory)
        tagDir['pageComponent']['data']['path'] = file_name
        tagDir['title'] = name
        tagDir['date'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        tagDir['permalink'] = self._pre_name+ r'/' + getOrder(file_name)
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
        string = create_str_from_item(tagDir)
        file_path = self._root / (file_name+'.md')

        file_path.touch()
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(string)

        return file_name
    
    def __del__(self):
        if self._count == 0 or not self._isCatalogue:
            shutil.rmtree(self._root)

def deleteOrder(name):
    """删除字符串中可能有的文件夹编号"""
    return re.sub(matchMdDir, '', name)

def getOrder(name):
    """删除字符串中可能有的文件夹编号"""
    return name.split('.')[0]

def orderMd(path:Path, name:str, num:int, pre_name:str):
    """对md文件进行编号和排序，文件中添加格式化文本"""
    unordered_name = deleteOrder(name)
    num = str(num).zfill(2)
    new_name = num + '.' + unordered_name
    file_path = path / new_name
    (path / name).rename(file_path)
    title = unordered_name.rsplit('.', 1)[0]

    tagDir = copy.deepcopy(tagMd)
    tagDir['title'] = title
    tagDir['date'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    tagDir['permalink'] = pre_name + r'/' + num
    categories = ''
    for s in pre_name.split(r'/'):
        if s == '':
            continue
        categories += '\n' + '  - ' + s
    tagDir['categories'] = categories
    tagDir['tags'] = ''

    string = create_str_from_item(tagDir)

    with open(file_path, 'r+', encoding='utf-8') as file:
        # 检查是否已经添加过格式化文本
        first_line = file.readline()
        all = ''
        if first_line.startswith('---'): # 这一行是否以'---'开头
            # 以下代码能够删除文件的格式化文本
            first_line = file.readline()
            while first_line and not first_line.startswith('---'):
                first_line = file.readline()
            all = file.read()

        file.seek(0)
        file.write(string)
        file.write(all)
        file.truncate()  # 截断文件，删除多余的旧内容
        
    return {new_name:tagDir['permalink'] + r'/'}

def findFirstMd(path: Path, pre_name: str):
    """顺便找到文件夹中的一个md文件"""
    for item in path.iterdir():
        if item.is_file() and item.suffix == '.md':
            return {deleteOrder(item.name).rsplit('.', 1)[0] : pre_name + r'/' + getOrder(item.name) + r'/'}
        elif item.is_dir() and not item.name in excludeFileRoot:
            return findFirstMd(path / item.name, pre_name + r'/' + getOrder(item.name) )
    return None
        
def orderDir(path: Path, level: int, relative_dir: str, pre_name:str=''):
    """对文件夹进行编号和排序"""
    if level == 3:
        print(f"文件夹层级超过3层的部分不会被处理!")
        return
    # item_list = [item for item in path.iterdir()]
    res = []
    num = 1
    if level == 0:
        builder = dir_builder(path, relative_dir, True, pre_name)
    else:
        builder = dir_builder(path, relative_dir, False, pre_name)
    for item in path.iterdir():
        if item.is_dir() and not item.name in excludeFileRoot:
            
            unordered_name = deleteOrder(item.name)
            new_name = ''


            
            if level == 0:
                new_name = builder.build_directories(unordered_name)
            else:
                new_name = builder.build_directories(unordered_name, num)
                num += 1
                
            new_path = path / new_name
            if new_name:
                (path / item.name).rename(new_path)
            else:
                print(f"Failed to rename {item.name}")
            it = orderDir(new_path, level+1, relative_dir+r'/'+unordered_name, pre_name + '/' + getOrder(new_name))
            
            firstMd = findFirstMd(path / item.name,  pre_name + '/' + getOrder(new_name))
            if level == 1 and firstMd:
                res.append(firstMd)
            if level <= 1 and it:
                res.append({new_name:it})
        elif item.is_file() and item.suffix == '.md':
            if relative_dir == '' and item.name == 'index.md':
                continue
            article = orderMd(path, item.name, num, pre_name)
            num += 1
            if level == 1:
                res.append(article)
    return res

def configJSfromDirstr(dir: list, config: list, relative_dir: str):
    for item in dir:
        for k,v in item.items():
            num = getOrder(k)
            files = []
            for kv in v:
                for k1,v1 in kv.items():
                    if type(v1) == str and type(k1) == str:
                        files.append({ 'text': deleteOrder(k1), 'link': v1 })
                    else:
                        print(f"md文件目录有错")
            config.append({
                'text': deleteOrder(k),
                'link': relative_dir + num + r'/',
                'items': files
            })

def updateConfig(dirStruct: str):
    with open(configPath, 'r+', encoding='utf-8') as f:
        # 读取'nav: ['之前的内容
        pre_lines = ''
        line = f.readline()
        while line and not line.startswith(r'    nav:'):
            pre_lines += line
            line = f.readline()
        if not line:
            print(f"文件损坏，找不到'nav: ['")
            return
        pre_lines += r'    nav: ' +'\n'
        
        # 跳过'nav: [……]'
        while r'[' not in line:
            line = f.readline()
        stack = 1
        while line and stack:
            line = f.readline()
            if r'[' in line or r'{' in line or r'(' in line:
                stack += 1
            if r']' in line or r'}' in line or r')' in line:
                stack -= 1 # 认为config格式正确，如果不正确那完啦
        if not line:
            print(f"文件损坏")
            return
        
        # 读取'nav: [……]'之后的内容
        end_lines = ''
        while line:
            line = f.readline()
            end_lines += line
        
        # 生成新的'nav: [……]'
        config = [{ 'text': '首页', 'link': r'/' }]
        configJSfromDirstr(dirStruct, config, r'/')
        config.append({ 'text': '索引', 'link': r'/archives/' ,\
                        'items': [{ 'text': '分类', 'link': r'/categories/' },\
                                { 'text': '标签', 'link': r'/tags/' },\
                                { 'text': '归档', 'link': r'/archives/' }]\
                        })
        
        # 自定义的json编码器
        def custom_json_encoder(obj, indent=0):
            indent_str = ' ' * indent
            if isinstance(obj, dict):
                items = []
                for key, value in obj.items():
                    formatted_key = key  # 不加引号
                    formatted_value = custom_json_encoder(value, indent + 2)  # 递归调用自定义编码器
                    items.append(f"{indent_str}{formatted_key}: {formatted_value}")
                return f"{indent_str[0:-2]}" + "{\n" + ",\n".join(items) + f"\n{indent_str[0:-2]}}}"
            elif isinstance(obj, list):
                items = [custom_json_encoder(item, indent + 4) for item in obj]
                return "[\n" + ",\n".join(items) + f"\n{'    ' if len(indent_str)<=4 else indent_str[0:-2]}]"
            else:
                return f"'{obj}'"

        configStr = custom_json_encoder(config, 4)
        configStr = '    '+configStr+r','+'\n'

        f.seek(0)
        f.write(pre_lines + configStr + end_lines)
        f.truncate()

dirStruct = orderDir(orderPath, 0, '','')
# print(dirStruct)
updateConfig(dirStruct)
print(f"目录生成完成")