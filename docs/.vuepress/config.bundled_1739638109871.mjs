// docs/.vuepress/config.ts
import { resolve } from "path";
import { defineConfig4CustomTheme } from "vuepress/config";
import dayjs from "dayjs";

// docs/.vuepress/config/baiduCode.ts
var baiduCode_default = "503f098e7e5b3a5b5d8c5fc2938af002";

// docs/.vuepress/config/htmlModules.ts
var htmlModule = {
  homeSidebarB: `<div style="padding: 0.95rem">
    <p style="
      color: var(--textColor);
      opacity: 0.9;
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 8px 0;
    ">\u516C\u4F17\u53F7</p>
    <img src="https://open.weixin.qq.com/qr/code?username=gh_0cf4b813918c"  style="width:100%;" />
    \u5173\u6CE8\u516C\u4F17\u53F7\uFF0C\u56DE\u590D[<b>\u524D\u7AEF\u8D44\u6E90</b>]\uFF0C\u53EF\u83B7\u53D6 <a href="https://game.xugaoyi.com" arget="_blank" >\u524D\u7AEF\u5B66\u4E60\u8D44\u6E90<span><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg> <span class="sr-only">(opens new window)</span></span></a>
    </p>
    </div>`
};
var htmlModules_default = htmlModule;

// docs/.vuepress/config.ts
var DOMAIN_NAME = "songkuakua.com";
var WEB_SITE = `http://${DOMAIN_NAME}`;
var config_default = defineConfig4CustomTheme({
  theme: resolve("F:\\cpp\\vuepress-theme-vdoing\\docs\\.vuepress", "../../vdoing"),
  locales: {
    "/": {
      lang: "zh-CN",
      title: "\u677E\u57AE\u57AE",
      description: "\u540E\u7AEF\u5F00\u53D1\u7B49\u6280\u672F\u6587\u7AE0\u3002"
    }
  },
  themeConfig: {
    nav: [
      {
        text: "\u9996\u9875",
        link: "/"
      },
      {
        text: "cs",
        link: "/01/",
        items: [
          {
            text: "GPU\u5E76\u884C\u7F16\u7A0B",
            link: "/01/01/01/"
          },
          {
            text: "\u56FE\u5F62\u5B66",
            link: "/01/03/01/"
          },
          {
            text: "\u5F52\u5E76\u7B97\u6CD5",
            link: "/01/05/"
          },
          {
            text: "\u8BA1\u7B97\u673A\u89C6\u89C9",
            link: "/01/06/01/"
          }
        ]
      },
      {
        text: "\u524D\u7AEF",
        link: "/03/",
        items: [
          {
            text: "css",
            link: "/03/01/"
          },
          {
            text: "html",
            link: "/03/02/"
          },
          {
            text: "JavaScript",
            link: "/03/03/"
          },
          {
            text: "vue",
            link: "/03/04/"
          }
        ]
      },
      {
        text: "\u5DE5\u5177\u548C\u5F00\u53D1",
        link: "/05/",
        items: [
          {
            text: "\u538B\u7F29\u547D\u4EE4",
            link: "/05/01/"
          },
          {
            text: "cmdline",
            link: "/05/02/"
          },
          {
            text: "Docker",
            link: "/05/03/"
          },
          {
            text: "ftrace\u8DDF\u8E2A\u6280\u672F",
            link: "/05/04/"
          },
          {
            text: "gcov\u4EE3\u7801\u8986\u76D6\u7387\u6D4B\u8BD5",
            link: "/05/05/"
          },
          {
            text: "GDB",
            link: "/05/06/"
          },
          {
            text: "git",
            link: "/05/07/"
          },
          {
            text: "kgdb",
            link: "/05/08/"
          },
          {
            text: "linux\u64CD\u4F5C",
            link: "/05/09/"
          },
          {
            text: "markdown",
            link: "/05/10/"
          },
          {
            text: "systemtap",
            link: "/05/11/"
          },
          {
            text: "valgrind",
            link: "/05/12/"
          },
          {
            text: "\u8BBE\u8BA1\u6A21\u5F0F",
            link: "/05/13/01/"
          }
        ]
      },
      {
        text: "\u7CFB\u7EDF",
        link: "/07/",
        items: [
          {
            text: "\u5206\u5E03\u5F0F",
            link: "/07/01/01/"
          },
          {
            text: "\u64CD\u4F5C\u7CFB\u7EDF",
            link: "/07/03/01/"
          },
          {
            text: "\u6570\u636E\u5E93",
            link: "/07/05/01/\u4E8B\u52A1/"
          },
          {
            text: "\u670D\u52A1\u5668",
            link: "/07/07/01/"
          },
          {
            text: "\u7F51\u7EDC",
            link: "/07/09/01/"
          }
        ]
      },
      {
        text: "\u8BED\u8A00",
        link: "/09/",
        items: [
          {
            text: "C++",
            link: "/09/01/01/"
          },
          {
            text: "c\u8BED\u8A00",
            link: "/09/03/"
          },
          {
            text: "go",
            link: "/09/04/01/"
          },
          {
            text: "JSON",
            link: "/09/06/"
          },
          {
            text: "Makefile",
            link: "/09/07/"
          },
          {
            text: "matlab",
            link: "/09/08/01/"
          },
          {
            text: "OpenGL",
            link: "/09/10/"
          },
          {
            text: "python",
            link: "/09/11/01/"
          },
          {
            text: "shell",
            link: "/09/13/"
          },
          {
            text: "\u6B63\u5219\u8868\u8FBE\u5F0F",
            link: "/09/14/"
          },
          {
            text: "\u6C47\u7F16",
            link: "/09/15/"
          }
        ]
      },
      {
        text: "\u9762\u8BD5",
        link: "/11/",
        items: [
          {
            text: "GPU\u5E76\u884C\u7F16\u7A0B",
            link: "/11/01/"
          },
          {
            text: "mysql",
            link: "/11/02/"
          },
          {
            text: "nginx",
            link: "/11/03/"
          },
          {
            text: "redis",
            link: "/11/04/"
          },
          {
            text: "\u7F51\u7EDC",
            link: "/11/05/"
          },
          {
            text: "\u8BA1\u7B97\u673A\u89C6\u89C9",
            link: "/11/06/"
          },
          {
            text: "\u8FDB\u7A0B\u7BA1\u7406",
            link: "/11/07/"
          }
        ]
      },
      {
        text: "\u9879\u76EEbug",
        link: "/13/",
        items: [
          {
            text: "linux\u8C03\u8BD5",
            link: "/13/01/"
          },
          {
            text: "\u3010Python\u3011\uFF1Are.error bad escape i at position 4",
            link: "/13/02/"
          }
        ]
      },
      {
        text: "\u7D22\u5F15",
        link: "/archives/",
        items: [
          {
            text: "\u5206\u7C7B",
            link: "/categories/"
          },
          {
            text: "\u6807\u7B7E",
            link: "/tags/"
          },
          {
            text: "\u5F52\u6863",
            link: "/archives/"
          }
        ]
      }
    ],
    sidebarDepth: 2,
    logo: "/img/logo.png",
    repo: "liang9886703",
    searchMaxSuggestions: 10,
    lastUpdated: "\u4E0A\u6B21\u66F4\u65B0",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "\u7F16\u8F91",
    bodyBgImg: "/img/bg.svg",
    bodyBgImgOpacity: 0.9,
    sidebar: "structuring",
    author: {
      name: "songkuakua",
      link: "https://github.com/liang9886703"
    },
    blogger: {
      avatar: "https://jsd.cdn.zzko.cn/gh/xugaoyi/image_store/blog/20200103123203.jpg",
      name: "\u677E\u57AE\u57AE",
      slogan: "c++\u540E\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08"
    },
    social: {
      icons: [
        {
          iconClass: "icon-youjian",
          title: "\u53D1\u90AE\u4EF6",
          link: "mailto:liang9886703@outlook.com"
        },
        {
          iconClass: "icon-github",
          title: "GitHub",
          link: "https://github.com/liang9886703"
        },
        {
          iconClass: "icon-erji",
          title: "\u542C\u97F3\u4E50",
          link: "https://music.163.com/#/playlist?id=755597173"
        }
      ]
    },
    footer: {
      createYear: 2025,
      copyrightInfo: '\u677E\u57AE\u57AE | <a href="https://github.com/liang9886703/vuepress-theme-vdoing/blob/master/LICENSE" target="_blank">MIT License</a> | <a href="http://beian.miit.gov.cn/" target="_blank">\u8700ICP\u59072025120453\u53F7</a> | <img src="/img/beian.png" style="width: 15px; margin-bottom: -3px;" /> <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51011202000997" rel="noreferrer" target="_blank">\u5DDD\u516C\u7F51\u5B89\u590751011202000997\u53F7</a>'
    },
    extendFrontmatter: {
      author: {
        name: "songkuakua",
        link: "https://github.com/liang9886703"
      }
    },
    htmlModules: htmlModules_default
  },
  head: [
    ["link", { rel: "icon", href: "/img/favicon.ico" }],
    [
      "meta",
      {
        name: "keywords",
        content: "\u540E\u7AEF\u535A\u5BA2,\u4E2A\u4EBA\u6280\u672F\u535A\u5BA2,\u540E\u7AEF,\u540E\u7AEF\u5F00\u53D1,\u540E\u7AEF\u6846\u67B6,\u540E\u7AEF\u9762\u8BD5\u9898,\u6280\u672F\u6587\u6863,\u5B66\u4E60,\u9762\u8BD5,c++,git,github"
      }
    ],
    ["meta", { name: "baidu-site-verification", content: "7F55weZDDc" }],
    ["meta", { name: "theme-color", content: "#11a8cd" }]
  ],
  plugins: [
    [
      "sitemap",
      {
        hostname: WEB_SITE
      }
    ],
    "vuepress-plugin-baidu-autopush",
    [
      "vuepress-plugin-baidu-tongji",
      {
        hm: baiduCode_default
      }
    ],
    [
      "thirdparty-search",
      {
        thirdparty: [
          {
            title: "\u5728MDN\u4E2D\u641C\u7D22",
            frontUrl: "https://developer.mozilla.org/zh-CN/search?q=",
            behindUrl: ""
          },
          {
            title: "\u5728Runoob\u4E2D\u641C\u7D22",
            frontUrl: "https://www.runoob.com/?s="
          },
          {
            title: "\u5728Vue API\u4E2D\u641C\u7D22",
            frontUrl: "https://cn.vuejs.org/v2/api/#"
          },
          {
            title: "\u5728Bing\u4E2D\u641C\u7D22",
            frontUrl: "https://cn.bing.com/search?q="
          },
          {
            title: "\u901A\u8FC7\u767E\u5EA6\u641C\u7D22\u672C\u7AD9\u7684",
            frontUrl: `https://www.baidu.com/s?wd=site%3A${DOMAIN_NAME}%20`
          }
        ]
      }
    ],
    [
      "one-click-copy",
      {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
        copyMessage: "\u590D\u5236\u6210\u529F",
        duration: 1e3,
        showInMobile: false
      }
    ],
    [
      "demo-block",
      {
        settings: {
          jsfiddle: false,
          codepen: true,
          horizontal: false
        }
      }
    ],
    [
      "vuepress-plugin-zooming",
      {
        selector: ".theme-vdoing-content img:not(.no-zoom)",
        options: {
          bgColor: "rgba(0,0,0,0.6)"
        }
      }
    ],
    [
      "vuepress-plugin-comment",
      {
        choosen: "gitalk",
        options: {
          clientID: "a6e1355287947096b88b",
          clientSecret: "f0e77d070fabfcd5af95bebb82b2d574d7248d71",
          repo: "blog-gitalk-comment",
          owner: "xugaoyi",
          admin: ["xugaoyi"],
          pagerDirection: "last",
          id: "<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>",
          title: "\u300C\u8BC4\u8BBA\u300D<%- frontmatter.title %>",
          labels: ["Gitalk", "Comment"],
          body: "\u9875\u9762\uFF1A<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>"
        }
      }
    ],
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          return dayjs(timestamp).format("YYYY/MM/DD, HH:mm:ss");
        }
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"]
  },
  extraWatchFiles: [
    ".vuepress/config.ts",
    ".vuepress/config/htmlModules.ts"
  ]
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImRvY3MvLnZ1ZXByZXNzL2NvbmZpZy9iYWlkdUNvZGUudHMiLCAiZG9jcy8udnVlcHJlc3MvY29uZmlnL2h0bWxNb2R1bGVzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcclxuICogXHU2M0QwXHU3OTNBXHVGRjFBXHU1OTgyXHU2MEE4XHU2MEYzXHU0RjdGXHU3NTI4SlNcdTcyNDhcdTY3MkNcdTc2ODRcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdTUzRUZcdTUzQzJcdTgwMDNcdUZGMUFodHRwczovL2dpdGh1Yi5jb20veHVnYW95aS92dWVwcmVzcy10aGVtZS12ZG9pbmcvdHJlZS9hMmYwM2U5OTNkZDJmMmEzYWZkYzU3Y2Y3MmFkZmM2ZjFiNmIwYzMyL2RvY3MvLnZ1ZXByZXNzXHJcbiAqL1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnNEN1c3RvbVRoZW1lLCBVc2VyUGx1Z2lucyB9IGZyb20gJ3Z1ZXByZXNzL2NvbmZpZydcclxuaW1wb3J0IHsgVmRvaW5nVGhlbWVDb25maWcgfSBmcm9tICd2dWVwcmVzcy10aGVtZS12ZG9pbmcvdHlwZXMnXHJcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcydcclxuaW1wb3J0IGJhaWR1Q29kZSBmcm9tICcuL2NvbmZpZy9iYWlkdUNvZGUnIC8vIFx1NzY3RVx1NUVBNlx1N0VERlx1OEJBMWhtXHU3ODAxXHJcbmltcG9ydCBodG1sTW9kdWxlcyBmcm9tICcuL2NvbmZpZy9odG1sTW9kdWxlcycgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU2M0QyXHU1MTY1XHU3Njg0aHRtbFx1NTc1N1xyXG5cclxuY29uc3QgRE9NQUlOX05BTUUgPSAnc29uZ2t1YWt1YS5jb20nIC8vIFx1NTdERlx1NTQwRCAoXHU0RTBEXHU1RTI2aHR0cHMpXHJcbmNvbnN0IFdFQl9TSVRFID0gYGh0dHA6Ly8ke0RPTUFJTl9OQU1FfWAgLy8gXHU3RjUxXHU1NzQwXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnNEN1c3RvbVRoZW1lPFZkb2luZ1RoZW1lQ29uZmlnPihcclxue1xyXG4gIC8vdGhlbWU6ICd2ZG9pbmcnLCAvLyBcdTRGN0ZcdTc1MjhucG1cdTRFM0JcdTk4OThcdTUzMDVcclxuICB0aGVtZTogcmVzb2x2ZShcIkY6XFxcXGNwcFxcXFx2dWVwcmVzcy10aGVtZS12ZG9pbmdcXFxcZG9jc1xcXFwudnVlcHJlc3NcIiwgJy4uLy4uL3Zkb2luZycpLCAvLyBcdTRGN0ZcdTc1MjhcdTY3MkNcdTU3MzBcdTRFM0JcdTk4OThcdTUzMDVcclxuXHJcbiAgbG9jYWxlczoge1xyXG4gICAgJy8nOiB7XHJcbiAgICAgIGxhbmc6ICd6aC1DTicsXHJcbiAgICAgIHRpdGxlOiBcIlx1Njc3RVx1NTdBRVx1NTdBRVwiLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ1x1NTQwRVx1N0FFRlx1NUYwMFx1NTNEMVx1N0I0OVx1NjI4MFx1NjcyRlx1NjU4N1x1N0FFMFx1MzAwMicsXHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyBiYXNlOiAnLycsIC8vIFx1OUVEOFx1OEJBNCcvJ1x1MzAwMlx1NTk4Mlx1Njc5Q1x1NEY2MFx1NjBGM1x1NUMwNlx1NEY2MFx1NzY4NFx1N0Y1MVx1N0FEOVx1OTBFOFx1N0Y3Mlx1NTIzMFx1NTk4MiBodHRwczovL2Zvby5naXRodWIuaW8vYmFyL1x1RkYwQ1x1OTBBM1x1NEU0OCBiYXNlIFx1NUU5NFx1OEJFNVx1ODhBQlx1OEJCRVx1N0Y2RVx1NjIxMCBcIi9iYXIvXCIsXHVGRjA4XHU1NDI2XHU1MjE5XHU5ODc1XHU5NzYyXHU1QzA2XHU1OTMxXHU1M0JCXHU2ODM3XHU1RjBGXHU3QjQ5XHU2NTg3XHU0RUY2XHVGRjA5XHJcblxyXG4gIC8vIFx1NEUzQlx1OTg5OFx1OTE0RFx1N0Y2RVxyXG4gIHRoZW1lQ29uZmlnOiB7XHJcbiAgICAvLyBcdTVCRkNcdTgyMkFcdTkxNERcdTdGNkVcclxuICAgIC8vICEgYnVpbGRfZGlyZWN0b3JpZXMucHlcdTRGMUFcdTRGRUVcdTY1MzluYXZcdTc2ODRcdTUxODVcdTVCQjlcdUZGMENcdTU3MjhcdThGRDlcdTkxQ0NcdTZDRThcdTkxQ0FcdTRGMUFcdTg4QUJcdTUyMjBcdTk2NjQgXHJcbiAgICBuYXY6IFxyXG4gICAgW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1OTk5Nlx1OTg3NScsXHJcbiAgICAgICAgbGluazogJy8nXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnY3MnLFxyXG4gICAgICAgIGxpbms6ICcvMDEvJyxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ0dQVVx1NUU3Nlx1ODg0Q1x1N0YxNlx1N0EwQicsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wMS8wMS8wMS8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnXHU1NkZFXHU1RjYyXHU1QjY2JyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzAxLzAzLzAxLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdcdTVGNTJcdTVFNzZcdTdCOTdcdTZDRDUnLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDEvMDUvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ1x1OEJBMVx1N0I5N1x1NjczQVx1ODlDNlx1ODlDOScsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wMS8wNi8wMS8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1NTI0RFx1N0FFRicsXHJcbiAgICAgICAgbGluazogJy8wMy8nLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnY3NzJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzAzLzAxLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdodG1sJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzAzLzAyLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdKYXZhU2NyaXB0JyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzAzLzAzLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICd2dWUnLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDMvMDQvJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1NURFNVx1NTE3N1x1NTQ4Q1x1NUYwMFx1NTNEMScsXHJcbiAgICAgICAgbGluazogJy8wNS8nLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnXHU1MzhCXHU3RjI5XHU1NDdEXHU0RUU0JyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA1LzAxLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdjbWRsaW5lJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA1LzAyLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdEb2NrZXInLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDUvMDMvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ2Z0cmFjZVx1OERERlx1OEUyQVx1NjI4MFx1NjcyRicsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wNS8wNC8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnZ2Nvdlx1NEVFM1x1NzgwMVx1ODk4Nlx1NzZENlx1NzM4N1x1NkQ0Qlx1OEJENScsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wNS8wNS8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnR0RCJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA1LzA2LydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdnaXQnLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDUvMDcvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ2tnZGInLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDUvMDgvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ2xpbnV4XHU2NENEXHU0RjVDJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA1LzA5LydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdtYXJrZG93bicsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wNS8xMC8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnc3lzdGVtdGFwJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA1LzExLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICd2YWxncmluZCcsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wNS8xMi8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnXHU4QkJFXHU4QkExXHU2QTIxXHU1RjBGJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA1LzEzLzAxLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHU3Q0ZCXHU3RURGJyxcclxuICAgICAgICBsaW5rOiAnLzA3LycsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdcdTUyMDZcdTVFMDNcdTVGMEYnLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDcvMDEvMDEvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ1x1NjRDRFx1NEY1Q1x1N0NGQlx1N0VERicsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wNy8wMy8wMS8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnXHU2NTcwXHU2MzZFXHU1RTkzJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA3LzA1LzAxL1x1NEU4Qlx1NTJBMS8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnXHU2NzBEXHU1MkExXHU1NjY4JyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA3LzA3LzAxLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdcdTdGNTFcdTdFREMnLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDcvMDkvMDEvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdThCRURcdThBMDAnLFxyXG4gICAgICAgIGxpbms6ICcvMDkvJyxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ0MrKycsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wOS8wMS8wMS8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnY1x1OEJFRFx1OEEwMCcsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wOS8wMy8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnZ28nLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDkvMDQvMDEvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ0pTT04nLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDkvMDYvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ01ha2VmaWxlJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA5LzA3LydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdtYXRsYWInLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDkvMDgvMDEvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ09wZW5HTCcsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wOS8xMC8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAncHl0aG9uJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA5LzExLzAxLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdzaGVsbCcsXHJcbiAgICAgICAgICAgICAgbGluazogJy8wOS8xMy8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnXHU2QjYzXHU1MjE5XHU4ODY4XHU4RkJFXHU1RjBGJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzA5LzE0LydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdcdTZDNDdcdTdGMTYnLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMDkvMTUvJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1OTc2Mlx1OEJENScsXHJcbiAgICAgICAgbGluazogJy8xMS8nLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnR1BVXHU1RTc2XHU4ODRDXHU3RjE2XHU3QTBCJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzExLzAxLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdteXNxbCcsXHJcbiAgICAgICAgICAgICAgbGluazogJy8xMS8wMi8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnbmdpbngnLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMTEvMDMvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ3JlZGlzJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzExLzA0LydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdcdTdGNTFcdTdFREMnLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvMTEvMDUvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ1x1OEJBMVx1N0I5N1x1NjczQVx1ODlDNlx1ODlDOScsXHJcbiAgICAgICAgICAgICAgbGluazogJy8xMS8wNi8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnXHU4RkRCXHU3QTBCXHU3QkExXHU3NDA2JyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzExLzA3LydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTk4NzlcdTc2RUVidWcnLFxyXG4gICAgICAgIGxpbms6ICcvMTMvJyxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ2xpbnV4XHU4QzAzXHU4QkQ1JyxcclxuICAgICAgICAgICAgICBsaW5rOiAnLzEzLzAxLydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdcdTMwMTBQeXRob25cdTMwMTFcdUZGMUFyZS5lcnJvciBiYWQgZXNjYXBlIGkgYXQgcG9zaXRpb24gNCcsXHJcbiAgICAgICAgICAgICAgbGluazogJy8xMy8wMi8nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnXHU3RDIyXHU1RjE1JyxcclxuICAgICAgICBsaW5rOiAnL2FyY2hpdmVzLycsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6ICdcdTUyMDZcdTdDN0InLFxyXG4gICAgICAgICAgICAgIGxpbms6ICcvY2F0ZWdvcmllcy8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiAnXHU2ODA3XHU3QjdFJyxcclxuICAgICAgICAgICAgICBsaW5rOiAnL3RhZ3MvJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogJ1x1NUY1Mlx1Njg2MycsXHJcbiAgICAgICAgICAgICAgbGluazogJy9hcmNoaXZlcy8nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBzaWRlYmFyRGVwdGg6IDIsIC8vIFx1NEZBN1x1OEZCOVx1NjgwRlx1NjYzRVx1NzkzQVx1NkRGMVx1NUVBNlx1RkYwQ1x1OUVEOFx1OEJBNDFcdUZGMENcdTY3MDBcdTU5MjcyXHVGRjA4XHU2NjNFXHU3OTNBXHU1MjMwaDNcdTY4MDdcdTk4OThcdUZGMDlcclxuICAgIGxvZ286ICcvaW1nL2xvZ28ucG5nJywgLy8gXHU1QkZDXHU4MjJBXHU2ODBGbG9nb1xyXG4gICAgcmVwbzogJ2xpYW5nOTg4NjcwMycsIC8vIFx1NUJGQ1x1ODIyQVx1NjgwRlx1NTNGM1x1NEZBN1x1NzUxRlx1NjIxMEdpdGh1Ylx1OTRGRVx1NjNBNVxyXG4gICAgc2VhcmNoTWF4U3VnZ2VzdGlvbnM6IDEwLCAvLyBcdTY0MUNcdTdEMjJcdTdFRDNcdTY3OUNcdTY2M0VcdTc5M0FcdTY3MDBcdTU5MjdcdTY1NzBcclxuICAgIGxhc3RVcGRhdGVkOiAnXHU0RTBBXHU2QjIxXHU2NkY0XHU2NUIwJywgLy8gXHU1RjAwXHU1NDJGXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0XHVGRjBDXHU1RTc2XHU5MTREXHU3RjZFXHU1MjREXHU3RjAwXHU2NTg3XHU1QjU3ICAgc3RyaW5nIHwgYm9vbGVhbiAoXHU1M0Q2XHU1MDNDXHU0RTNBZ2l0XHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0KVxyXG4gICAgZG9jc0RpcjogJ2RvY3MnLCAvLyBcdTdGMTZcdThGOTFcdTc2ODRcdTY1ODdcdTRFRjZcdTU5MzlcclxuICAgIC8vIGRvY3NCcmFuY2g6ICdtYXN0ZXInLCAvLyBcdTdGMTZcdThGOTFcdTc2ODRcdTY1ODdcdTRFRjZcdTYyNDBcdTU3MjhcdTUyMDZcdTY1MkZcdUZGMENcdTlFRDhcdThCQTRtYXN0ZXJcdTMwMDIgXHU2Q0U4XHU2MTBGXHVGRjFBXHU1OTgyXHU2NzlDXHU0RjYwXHU3Njg0XHU1MjA2XHU2NTJGXHU2NjJGbWFpblx1NTIxOVx1NEZFRVx1NjUzOVx1NEUzQW1haW5cclxuICAgIGVkaXRMaW5rczogdHJ1ZSwgLy8gXHU1NDJGXHU3NTI4XHU3RjE2XHU4RjkxXHJcbiAgICBlZGl0TGlua1RleHQ6ICdcdTdGMTZcdThGOTEnLFxyXG5cclxuICAgIC8vKioqIFx1NEVFNVx1NEUwQlx1NjYyRlZkb2luZ1x1NEUzQlx1OTg5OFx1NzZGOFx1NTE3M1x1OTE0RFx1N0Y2RVx1RkYwQ1x1NjU4N1x1Njg2M1x1RkYxQWh0dHBzOi8vZG9jLnh1Z2FveWkuY29tL3BhZ2VzL2EyMGNlOC8gKioqLy9cclxuXHJcbiAgICAvLyBjYXRlZ29yeTogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NjI1M1x1NUYwMFx1NTIwNlx1N0M3Qlx1NTI5Rlx1ODBGRFx1RkYwQ1x1OUVEOFx1OEJBNHRydWVcclxuICAgIC8vIHRhZzogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NjI1M1x1NUYwMFx1NjgwN1x1N0I3RVx1NTI5Rlx1ODBGRFx1RkYwQ1x1OUVEOFx1OEJBNHRydWVcclxuICAgIC8vIGFyY2hpdmU6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTYyNTNcdTVGMDBcdTVGNTJcdTY4NjNcdTUyOUZcdTgwRkRcdUZGMENcdTlFRDhcdThCQTR0cnVlXHJcbiAgICAvLyBjYXRlZ29yeVRleHQ6ICdcdTk2OEZcdTdCMTQnLCAvLyBcdTc4OEVcdTcyNDdcdTUzMTZcdTY1ODdcdTdBRTBcdUZGMDhfcG9zdHNcdTY1ODdcdTRFRjZcdTU5MzlcdTc2ODRcdTY1ODdcdTdBRTBcdUZGMDlcdTk4ODRcdThCQkVcdTc1MUZcdTYyMTBcdTc2ODRcdTUyMDZcdTdDN0JcdTUwM0NcdUZGMENcdTlFRDhcdThCQTQnXHU5NjhGXHU3QjE0J1xyXG5cclxuICAgIC8vIHBhZ2VTdHlsZTogJ2xpbmUnLCAvLyBcdTk4NzVcdTk3NjJcdTk4Q0VcdTY4M0NcdUZGMENcdTUzRUZcdTkwMDlcdTUwM0NcdUZGMUEnY2FyZCdcdTUzNjFcdTcyNDcgfCAnbGluZScgXHU3RUJGXHVGRjA4XHU2NzJBXHU4QkJFXHU3RjZFYm9keUJnSW1nXHU2NUY2XHU2MjREXHU3NTFGXHU2NTQ4XHVGRjA5XHVGRjBDIFx1OUVEOFx1OEJBNCdjYXJkJ1x1MzAwMiBcdThCRjRcdTY2MEVcdUZGMUFjYXJkXHU2NUY2XHU4MENDXHU2NjZGXHU2NjNFXHU3OTNBXHU3MDcwXHU4MjcyXHU4ODZDXHU2MjU4XHU1MUZBXHU1MzYxXHU3MjQ3XHU2ODM3XHU1RjBGXHVGRjBDbGluZVx1NjVGNlx1ODBDQ1x1NjY2Rlx1NjYzRVx1NzkzQVx1N0VBRlx1ODI3Mlx1RkYwQ1x1NUU3Nlx1NEUxNFx1OTBFOFx1NTIwNlx1NkEyMVx1NTc1N1x1NUUyNlx1N0VCRlx1Njc2MVx1OEZCOVx1Njg0NlxyXG5cclxuICAgIGJvZHlCZ0ltZzogJy9pbWcvYmcuc3ZnJywvL1tcclxuICAgICAgLy8nL2ltZy9iZy5zdmcnXHJcbiAgICAgIC8vJ2h0dHBzOi8vanNkLmNkbi56emtvLmNuL2doL3h1Z2FveWkvaW1hZ2Vfc3RvcmUvYmxvZy8yMDIwMDUwNzE3NTgyOC5qcGVnJ1xyXG4gICAgLy9dLCAvLyBib2R5XHU4MENDXHU2NjZGXHU1OTI3XHU1NkZFXHVGRjBDXHU5RUQ4XHU4QkE0XHU2NUUwXHUzMDAyIFx1NTM1NVx1NUYyMFx1NTZGRVx1NzI0NyBTdHJpbmcgfCBcdTU5MUFcdTVGMjBcdTU2RkVcdTcyNDcgQXJyYXksIFx1NTkxQVx1NUYyMFx1NTZGRVx1NzI0N1x1NjVGNlx1OTY5NGJvZHlCZ0ltZ0ludGVydmFsXHU1MjA3XHU2MzYyXHU0RTAwXHU1RjIwXHUzMDAyXHJcbiAgICBib2R5QmdJbWdPcGFjaXR5OiAwLjksIC8vIGJvZHlcdTgwQ0NcdTY2NkZcdTU2RkVcdTkwMEZcdTY2MEVcdTVFQTZcdUZGMENcdTkwMDlcdTUwM0MgMC4xfjEuMCwgXHU5RUQ4XHU4QkE0MC41XHJcbiAgICAvLyBib2R5QmdJbWdJbnRlcnZhbDogMTUsIC8vIGJvZHlcdTU5MUFcdTVGMjBcdTgwQ0NcdTY2NkZcdTU2RkVcdTY1RjZcdTc2ODRcdTUyMDdcdTYzNjJcdTk1RjRcdTk2OTQsIFx1OUVEOFx1OEJBNDE1XHVGRjBDXHU1MzU1XHU0RjREc1xyXG4gICAgLy8gdGl0bGVCYWRnZTogZmFsc2UsIC8vIFx1NjU4N1x1N0FFMFx1NjgwN1x1OTg5OFx1NTI0RFx1NzY4NFx1NTZGRVx1NjgwN1x1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQVx1RkYwQ1x1OUVEOFx1OEJBNHRydWVcclxuICAgIC8vIHRpdGxlQmFkZ2VJY29uczogWyAvLyBcdTY1ODdcdTdBRTBcdTY4MDdcdTk4OThcdTUyNERcdTU2RkVcdTY4MDdcdTc2ODRcdTU3MzBcdTU3NDBcdUZGMENcdTlFRDhcdThCQTRcdTRFM0JcdTk4OThcdTUxODVcdTdGNkVcdTU2RkVcdTY4MDdcclxuICAgIC8vICAgJ1x1NTZGRVx1NjgwN1x1NTczMFx1NTc0MDEnLFxyXG4gICAgLy8gICAnXHU1NkZFXHU2ODA3XHU1NzMwXHU1NzQwMidcclxuICAgIC8vIF0sXHJcbiAgICAvLyBjb250ZW50QmdTdHlsZTogMSwgLy8gXHU2NTg3XHU3QUUwXHU1MTg1XHU1QkI5XHU1NzU3XHU3Njg0XHU4MENDXHU2NjZGXHU5OENFXHU2ODNDXHVGRjBDXHU5RUQ4XHU4QkE0XHU2NUUwLiAxIFx1NjVCOVx1NjgzQyB8IDIgXHU2QTJBXHU3RUJGIHwgMyBcdTdBRDZcdTdFQkYgfCA0IFx1NURFNlx1NjU5Q1x1N0VCRiB8IDUgXHU1M0YzXHU2NTlDXHU3RUJGIHwgNiBcdTcwQjlcdTcyQjZcclxuXHJcbiAgICAvLyB1cGRhdGVCYXI6IHsgLy8gXHU2NzAwXHU4RkQxXHU2NkY0XHU2NUIwXHU2ODBGXHJcbiAgICAvLyAgIHNob3dUb0FydGljbGU6IHRydWUsIC8vIFx1NjYzRVx1NzkzQVx1NTIzMFx1NjU4N1x1N0FFMFx1OTg3NVx1NUU5NVx1OTBFOFx1RkYwQ1x1OUVEOFx1OEJBNHRydWVcclxuICAgIC8vICAgbW9yZUFydGljbGU6ICcvYXJjaGl2ZXMnIC8vIFx1MjAxQ1x1NjZGNFx1NTkxQVx1NjU4N1x1N0FFMFx1MjAxRFx1OERGM1x1OEY2Q1x1NzY4NFx1OTg3NVx1OTc2Mlx1RkYwQ1x1OUVEOFx1OEJBNCcvYXJjaGl2ZXMnXHJcbiAgICAvLyB9LFxyXG4gICAgLy8gcmlnaHRNZW51QmFyOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBXHU1M0YzXHU0RkE3XHU2NTg3XHU3QUUwXHU1OTI3XHU3RUIyXHU2ODBGXHVGRjBDXHU5RUQ4XHU4QkE0dHJ1ZSAoXHU1QzRGXHU1QkJEXHU1QzBGXHU0RThFMTMwMHB4XHU0RTBCXHU2NUUwXHU4QkJBXHU1OTgyXHU0RjU1XHU5MEZEXHU0RTBEXHU2NjNFXHU3OTNBKVxyXG4gICAgLy8gc2lkZWJhck9wZW46IGZhbHNlLCAvLyBcdTUyMURcdTU5Q0JcdTcyQjZcdTYwMDFcdTY2MkZcdTU0MjZcdTYyNTNcdTVGMDBcdTVERTZcdTRGQTdcdThGQjlcdTY4MEZcdUZGMENcdTlFRDhcdThCQTR0cnVlXHJcbiAgICAvLyBwYWdlQnV0dG9uOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBXHU1RkVCXHU2Mzc3XHU3RkZCXHU5ODc1XHU2MzA5XHU5NEFFXHVGRjBDXHU5RUQ4XHU4QkE0dHJ1ZVxyXG5cclxuICAgIC8vIFx1OUVEOFx1OEJBNFx1NTkxNlx1ODlDMlx1NkEyMVx1NUYwRlx1RkYwOFx1NzUyOFx1NjIzN1x1NjcyQVx1NTcyOFx1OTg3NVx1OTc2Mlx1NjI0Qlx1NTJBOFx1NEZFRVx1NjUzOVx1OEZDN1x1NkEyMVx1NUYwRlx1NjVGNlx1NjI0RFx1NzUxRlx1NjU0OFx1RkYwQ1x1NTQyNlx1NTIxOVx1NEVFNVx1NzUyOFx1NjIzN1x1OEJCRVx1N0Y2RVx1NzY4NFx1NkEyMVx1NUYwRlx1NEUzQVx1NTFDNlx1RkYwOVx1RkYwQ1x1NTNFRlx1OTAwOVx1RkYxQSdhdXRvJyB8ICdsaWdodCcgfCAnZGFyaycgfCAncmVhZCdcdUZGMENcdTlFRDhcdThCQTQnYXV0bydcdTMwMDJcclxuICAgIC8vIGRlZmF1bHRNb2RlOiAnYXV0bycsXHJcblxyXG4gICAgLy8gXHU0RkE3XHU4RkI5XHU2ODBGICAnc3RydWN0dXJpbmcnIHwgeyBtb2RlOiAnc3RydWN0dXJpbmcnLCBjb2xsYXBzYWJsZTogQm9vbGVhbn0gfCAnYXV0bycgfCA8XHU4MUVBXHU1QjlBXHU0RTQ5PiAgICBcdTZFMjlcdTk5QThcdTYzRDBcdTc5M0FcdUZGMUFcdTc2RUVcdTVGNTVcdTk4NzVcdTY1NzBcdTYzNkVcdTRGOURcdThENTZcdTRFOEVcdTdFRDNcdTY3ODRcdTUzMTZcdTc2ODRcdTRGQTdcdThGQjlcdTY4MEZcdTY1NzBcdTYzNkVcdUZGMENcdTU5ODJcdTY3OUNcdTRGNjBcdTRFMERcdThCQkVcdTdGNkVcdTRFM0Enc3RydWN0dXJpbmcnLFx1NUMwNlx1NjVFMFx1NkNENVx1NEY3Rlx1NzUyOFx1NzZFRVx1NUY1NVx1OTg3NVxyXG4gICAgc2lkZWJhcjogJ3N0cnVjdHVyaW5nJyxcclxuXHJcbiAgICAvLyBcdTY1ODdcdTdBRTBcdTlFRDhcdThCQTRcdTc2ODRcdTRGNUNcdTgwMDVcdTRGRTFcdTYwNkZcdUZGMEMoXHU1M0VGXHU1NzI4bWRcdTY1ODdcdTRFRjZcdTRFMkRcdTUzNTVcdTcyRUNcdTkxNERcdTdGNkVcdTZCNjRcdTRGRTFcdTYwNkYpIHN0cmluZyB8IHtuYW1lOiBzdHJpbmcsIGxpbms/OiBzdHJpbmd9XHJcbiAgICBhdXRob3I6IHtcclxuICAgICAgbmFtZTogJ3NvbmdrdWFrdWEnLCAvLyBcdTVGQzVcdTk3MDBcclxuICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9saWFuZzk4ODY3MDMnLCAvLyBcdTUzRUZcdTkwMDlcdTc2ODRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU1MzVBXHU0RTNCXHU0RkUxXHU2MDZGIChcdTY2M0VcdTc5M0FcdTU3MjhcdTk5OTZcdTk4NzVcdTRGQTdcdThGQjlcdTY4MEYpXHJcbiAgICBibG9nZ2VyOiB7XHJcbiAgICAgIGF2YXRhcjogJ2h0dHBzOi8vanNkLmNkbi56emtvLmNuL2doL3h1Z2FveWkvaW1hZ2Vfc3RvcmUvYmxvZy8yMDIwMDEwMzEyMzIwMy5qcGcnLFxyXG4gICAgICBuYW1lOiAnXHU2NzdFXHU1N0FFXHU1N0FFJyxcclxuICAgICAgc2xvZ2FuOiAnYysrXHU1NDBFXHU3QUVGXHU1RjAwXHU1M0QxXHU1REU1XHU3QTBCXHU1RTA4JyxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU3OTNFXHU0RUE0XHU1NkZFXHU2ODA3IChcdTY2M0VcdTc5M0FcdTRFOEVcdTUzNUFcdTRFM0JcdTRGRTFcdTYwNkZcdTY4MEZcdTU0OENcdTk4NzVcdTgxMUFcdTY4MEZcdTMwMDJcdTUxODVcdTdGNkVcdTU2RkVcdTY4MDdcdUZGMUFodHRwczovL2RvYy54dWdhb3lpLmNvbS9wYWdlcy9hMjBjZTgvI3NvY2lhbClcclxuICAgIHNvY2lhbDoge1xyXG4gICAgICAvLyBpY29uZm9udENzc0ZpbGU6ICcvL2F0LmFsaWNkbi5jb20vdC94eHguY3NzJywgLy8gXHU1M0VGXHU5MDA5XHVGRjBDXHU5NjNGXHU5MUNDXHU1NkZFXHU2ODA3XHU1RTkzXHU1NzI4XHU3RUJGY3NzXHU2NTg3XHU0RUY2XHU1NzMwXHU1NzQwXHVGRjBDXHU1QkY5XHU0RThFXHU0RTNCXHU5ODk4XHU2Q0ExXHU2NzA5XHU3Njg0XHU1NkZFXHU2ODA3XHU1M0VGXHU4MUVBXHU1REYxXHU2REZCXHU1MkEwXHUzMDAyXHU5NjNGXHU5MUNDXHU1NkZFXHU3MjQ3XHU1RTkzXHVGRjFBaHR0cHM6Ly93d3cuaWNvbmZvbnQuY24vXHJcbiAgICAgIGljb25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbkNsYXNzOiAnaWNvbi15b3VqaWFuJyxcclxuICAgICAgICAgIHRpdGxlOiAnXHU1M0QxXHU5MEFFXHU0RUY2JyxcclxuICAgICAgICAgIGxpbms6ICdtYWlsdG86bGlhbmc5ODg2NzAzQG91dGxvb2suY29tJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb25DbGFzczogJ2ljb24tZ2l0aHViJyxcclxuICAgICAgICAgIHRpdGxlOiAnR2l0SHViJyxcclxuICAgICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vbGlhbmc5ODg2NzAzJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb25DbGFzczogJ2ljb24tZXJqaScsXHJcbiAgICAgICAgICB0aXRsZTogJ1x1NTQyQ1x1OTdGM1x1NEU1MCcsXHJcbiAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9tdXNpYy4xNjMuY29tLyMvcGxheWxpc3Q/aWQ9NzU1NTk3MTczJyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBcdTk4NzVcdTgxMUFcdTRGRTFcdTYwNkZcclxuICAgIGZvb3Rlcjoge1xyXG4gICAgICBjcmVhdGVZZWFyOiAyMDI1LCAvLyBcdTUzNUFcdTVCQTJcdTUyMUJcdTVFRkFcdTVFNzRcdTRFRkRcclxuICAgICAgY29weXJpZ2h0SW5mbzpcclxuICAgICAgICAnXHU2NzdFXHU1N0FFXHU1N0FFIHwgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9saWFuZzk4ODY3MDMvdnVlcHJlc3MtdGhlbWUtdmRvaW5nL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcIiB0YXJnZXQ9XCJfYmxhbmtcIj5NSVQgTGljZW5zZTwvYT4gfCA8YSBocmVmPVwiaHR0cDovL2JlaWFuLm1paXQuZ292LmNuL1wiIHRhcmdldD1cIl9ibGFua1wiPlx1ODcwMElDUFx1NTkwNzIwMjUxMjA0NTNcdTUzRjc8L2E+IHwgPGltZyBzcmM9XCIvaW1nL2JlaWFuLnBuZ1wiIHN0eWxlPVwid2lkdGg6IDE1cHg7IG1hcmdpbi1ib3R0b206IC0zcHg7XCIgLz4gPGEgaHJlZj1cImh0dHBzOi8vYmVpYW4ubXBzLmdvdi5jbi8jL3F1ZXJ5L3dlYlNlYXJjaD9jb2RlPTUxMDExMjAyMDAwOTk3XCIgcmVsPVwibm9yZWZlcnJlclwiIHRhcmdldD1cIl9ibGFua1wiPlx1NURERFx1NTE2Q1x1N0Y1MVx1NUI4OVx1NTkwNzUxMDExMjAyMDAwOTk3XHU1M0Y3PC9hPicsIC8vIFx1NTM1QVx1NUJBMlx1NzI0OFx1Njc0M1x1NEZFMVx1NjA2Rlx1MzAwMVx1NTkwN1x1Njg0OFx1NEZFMVx1NjA2Rlx1N0I0OVx1RkYwQ1x1NjUyRlx1NjMwMWFcdTY4MDdcdTdCN0VcdTYyMTZcdTYzNjJcdTg4NENcdTY4MDdcdTdCN0U8L2JyPlxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBcdTYyNjlcdTVDNTVcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBmcm9udG1hdHRlclx1MzAwMlx1RkYwOFx1NUY1M21kXHU2NTg3XHU0RUY2XHU3Njg0ZnJvbnRtYXR0ZXJcdTRFMERcdTVCNThcdTU3MjhcdTc2RjhcdTVFOTRcdTc2ODRcdTVCNTdcdTZCQjVcdTY1RjZcdTVDMDZcdTgxRUFcdTUyQThcdTZERkJcdTUyQTBcdTMwMDJcdTRFMERcdTRGMUFcdTg5ODZcdTc2RDZcdTVERjJcdTY3MDlcdTc2ODRcdTY1NzBcdTYzNkVcdTMwMDJcdUZGMDlcclxuICAgIGV4dGVuZEZyb250bWF0dGVyOiB7XHJcbiAgICAgIGF1dGhvcjoge1xyXG4gICAgICAgIG5hbWU6ICdzb25na3Vha3VhJyxcclxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2xpYW5nOTg4NjcwMydcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlobXRsKFx1NUU3Rlx1NTQ0QSlcdTZBMjFcdTU3NTdcclxuICAgIGh0bWxNb2R1bGVzXHJcbiAgfSxcclxuXHJcbiAgLy8gXHU2Q0U4XHU1MTY1XHU1MjMwXHU5ODc1XHU5NzYyPGhlYWQ+XHU0RTJEXHU3Njg0XHU2ODA3XHU3QjdFXHVGRjBDXHU2ODNDXHU1RjBGW3RhZ05hbWUsIHsgYXR0ck5hbWU6IGF0dHJWYWx1ZSB9LCBpbm5lckhUTUw/XVxyXG4gIGhlYWQ6IFtcclxuICAgIFsnbGluaycsIHsgcmVsOiAnaWNvbicsIGhyZWY6ICcvaW1nL2Zhdmljb24uaWNvJyB9XSwgLy9mYXZpY29uc1x1RkYwQ1x1OEQ0NFx1NkU5MFx1NjUzRVx1NTcyOHB1YmxpY1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgW1xyXG4gICAgICAnbWV0YScsXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAna2V5d29yZHMnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdcdTU0MEVcdTdBRUZcdTUzNUFcdTVCQTIsXHU0RTJBXHU0RUJBXHU2MjgwXHU2NzJGXHU1MzVBXHU1QkEyLFx1NTQwRVx1N0FFRixcdTU0MEVcdTdBRUZcdTVGMDBcdTUzRDEsXHU1NDBFXHU3QUVGXHU2ODQ2XHU2N0I2LFx1NTQwRVx1N0FFRlx1OTc2Mlx1OEJENVx1OTg5OCxcdTYyODBcdTY3MkZcdTY1ODdcdTY4NjMsXHU1QjY2XHU0RTYwLFx1OTc2Mlx1OEJENSxjKyssZ2l0LGdpdGh1YicsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAnYmFpZHUtc2l0ZS12ZXJpZmljYXRpb24nLCBjb250ZW50OiAnN0Y1NXdlWkREYycgfV0sIC8vIFx1NzY3RVx1NUVBNlx1N0VERlx1OEJBMVx1NzY4NFx1N0FEOVx1OTU3Rlx1OUE4Q1x1OEJDMVx1RkYwOFx1NEY2MFx1NTNFRlx1NEVFNVx1NTNCQlx1NjM4OVx1RkYwOVxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAndGhlbWUtY29sb3InLCBjb250ZW50OiAnIzExYThjZCcgfV0sIC8vIFx1NzlGQlx1NTJBOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NEUzQlx1OTg5OFx1OTg5Q1x1ODI3MlxyXG4gICAgLy8gW1xyXG4gICAgLy8gICAnc2NyaXB0JyxcclxuICAgIC8vICAge1xyXG4gICAgLy8gICAgICdkYXRhLWFkLWNsaWVudCc6ICdjYS1wdWItNzgyODMzMzcyNTk5MzU1NCcsXHJcbiAgICAvLyAgICAgYXN5bmM6ICdhc3luYycsXHJcbiAgICAvLyAgICAgc3JjOiAnaHR0cHM6Ly9wYWdlYWQyLmdvb2dsZXN5bmRpY2F0aW9uLmNvbS9wYWdlYWQvanMvYWRzYnlnb29nbGUuanMnLFxyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gXSwgLy8gXHU3RjUxXHU3QUQ5XHU1MTczXHU4MDU0R29vZ2xlIEFkU2Vuc2UgXHU0RTBFIGh0bWxcdTY4M0NcdTVGMEZcdTVFN0ZcdTU0NEFcdTY1MkZcdTYzMDFcdUZGMDhcdTRGNjBcdTUzRUZcdTRFRTVcdTUzQkJcdTYzODlcdUZGMDlcclxuICBdLFxyXG5cclxuXHJcbiAgLy8gXHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFXHJcbiAgcGx1Z2luczogPFVzZXJQbHVnaW5zPltcclxuICAgIFtcclxuICAgICAgXCJzaXRlbWFwXCIsIC8vIFx1N0Y1MVx1N0FEOVx1NTczMFx1NTZGRVxyXG4gICAgICB7XHJcbiAgICAgICAgaG9zdG5hbWU6IFdFQl9TSVRFLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuXHJcbiAgICAndnVlcHJlc3MtcGx1Z2luLWJhaWR1LWF1dG9wdXNoJywgLy8gXHU3NjdFXHU1RUE2XHU4MUVBXHU1MkE4XHU2M0E4XHU5MDAxXHJcblxyXG4gICAgW1xyXG4gICAgICAndnVlcHJlc3MtcGx1Z2luLWJhaWR1LXRvbmdqaScsIC8vIFx1NzY3RVx1NUVBNlx1N0VERlx1OEJBMVxyXG4gICAgICB7XHJcbiAgICAgICAgaG06IGJhaWR1Q29kZSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcblxyXG4gICAgLy8gXHU1MTY4XHU2NTg3XHU2NDFDXHU3RDIyXHUzMDAyIFx1MjZBMFx1RkUwRlx1NkNFOFx1NjEwRlx1RkYxQVx1NkI2NFx1NjNEMlx1NEVGNlx1NEYxQVx1NTcyOFx1NjI1M1x1NUYwMFx1N0Y1MVx1N0FEOVx1NjVGNlx1NTkxQVx1NTJBMFx1OEY3RFx1OTBFOFx1NTIwNmpzXHU2NTg3XHU0RUY2XHU3NTI4XHU0RThFXHU2NDFDXHU3RDIyXHVGRjBDXHU1QkZDXHU4MUY0XHU1MjFEXHU2QjIxXHU4QkJGXHU5NUVFXHU3RjUxXHU3QUQ5XHU1M0Q4XHU2MTYyXHUzMDAyXHU1OTgyXHU1NzI4XHU2MTBGXHU1MjFEXHU2QjIxXHU4QkJGXHU5NUVFXHU5MDFGXHU1RUE2XHU3Njg0XHU4QkREXHU1M0VGXHU0RUU1XHU0RTBEXHU0RjdGXHU3NTI4XHU2QjY0XHU2M0QyXHU0RUY2XHVGRjAxXHVGRjA4XHU2M0E4XHU4MzUwXHVGRjFBdnVlcHJlc3MtcGx1Z2luLXRoaXJkcGFydHktc2VhcmNoXHVGRjA5XHJcbiAgICAvLyAnZnVsbHRleHQtc2VhcmNoJyxcclxuXHJcbiAgICAvLyBcdTUzRUZcdTRFRTVcdTZERkJcdTUyQTBcdTdCMkNcdTRFMDlcdTY1QjlcdTY0MUNcdTdEMjJcdTk0RkVcdTYzQTVcdTc2ODRcdTY0MUNcdTdEMjJcdTY4NDZcdUZGMDhcdTdFRTdcdTYyN0ZcdTUzOUZcdTVCOThcdTY1QjlcdTY0MUNcdTdEMjJcdTY4NDZcdTc2ODRcdTkxNERcdTdGNkVcdTUzQzJcdTY1NzBcdUZGMDlcclxuICAgIFtcclxuICAgICAgJ3RoaXJkcGFydHktc2VhcmNoJyxcclxuICAgICAge1xyXG4gICAgICAgIHRoaXJkcGFydHk6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdcdTU3MjhNRE5cdTRFMkRcdTY0MUNcdTdEMjInLFxyXG4gICAgICAgICAgICBmcm9udFVybDogJ2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL3NlYXJjaD9xPScsIC8vIFx1NjQxQ1x1N0QyMlx1OTRGRVx1NjNBNVx1NzY4NFx1NTI0RFx1OTc2Mlx1OTBFOFx1NTIwNlxyXG4gICAgICAgICAgICBiZWhpbmRVcmw6ICcnLCAvLyBcdTY0MUNcdTdEMjJcdTk0RkVcdTYzQTVcdTc2ODRcdTU0MEVcdTk3NjJcdTkwRThcdTUyMDZcdUZGMENcdTUzRUZcdTkwMDlcdUZGMENcdTlFRDhcdThCQTQgJydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnXHU1NzI4UnVub29iXHU0RTJEXHU2NDFDXHU3RDIyJyxcclxuICAgICAgICAgICAgZnJvbnRVcmw6ICdodHRwczovL3d3dy5ydW5vb2IuY29tLz9zPScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1x1NTcyOFZ1ZSBBUElcdTRFMkRcdTY0MUNcdTdEMjInLFxyXG4gICAgICAgICAgICBmcm9udFVybDogJ2h0dHBzOi8vY24udnVlanMub3JnL3YyL2FwaS8jJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnXHU1NzI4QmluZ1x1NEUyRFx1NjQxQ1x1N0QyMicsXHJcbiAgICAgICAgICAgIGZyb250VXJsOiAnaHR0cHM6Ly9jbi5iaW5nLmNvbS9zZWFyY2g/cT0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6ICdcdTkwMUFcdThGQzdcdTc2N0VcdTVFQTZcdTY0MUNcdTdEMjJcdTY3MkNcdTdBRDlcdTc2ODQnLFxyXG4gICAgICAgICAgICBmcm9udFVybDogYGh0dHBzOi8vd3d3LmJhaWR1LmNvbS9zP3dkPXNpdGUlM0Eke0RPTUFJTl9OQU1FfSUyMGAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH1cclxuICAgIF0sXHJcblxyXG4gICAgW1xyXG4gICAgICAnb25lLWNsaWNrLWNvcHknLCAvLyBcdTRFRTNcdTc4MDFcdTU3NTdcdTU5MERcdTUyMzZcdTYzMDlcdTk0QUVcclxuICAgICAge1xyXG4gICAgICAgIGNvcHlTZWxlY3RvcjogWydkaXZbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHByZScsICdkaXZbY2xhc3MqPVwiYXNpZGUtY29kZVwiXSBhc2lkZSddLCAvLyBTdHJpbmcgb3IgQXJyYXlcclxuICAgICAgICBjb3B5TWVzc2FnZTogJ1x1NTkwRFx1NTIzNlx1NjIxMFx1NTI5RicsIC8vIGRlZmF1bHQgaXMgJ0NvcHkgc3VjY2Vzc2Z1bGx5IGFuZCB0aGVuIHBhc3RlIGl0IGZvciB1c2UuJ1xyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLCAvLyBwcm9tcHQgbWVzc2FnZSBkaXNwbGF5IHRpbWUuXHJcbiAgICAgICAgc2hvd0luTW9iaWxlOiBmYWxzZSwgLy8gd2hldGhlciB0byBkaXNwbGF5IG9uIHRoZSBtb2JpbGUgc2lkZSwgZGVmYXVsdDogZmFsc2UuXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG5cclxuICAgIFtcclxuICAgICAgJ2RlbW8tYmxvY2snLCAvLyBkZW1vXHU2RjE0XHU3OTNBXHU2QTIxXHU1NzU3IGh0dHBzOi8vZ2l0aHViLmNvbS94aWd1YXhpZ3VhL3Z1ZXByZXNzLXBsdWdpbi1kZW1vLWJsb2NrXHJcbiAgICAgIHtcclxuICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgLy8ganNMaWI6IFsnaHR0cDovL3h4eCddLCAvLyBcdTU3MjhcdTdFQkZcdTc5M0FcdTRGOEIoanNmaWRkbGUsIGNvZGVwZW4pXHU0RTJEXHU3Njg0anNcdTRGOURcdThENTZcclxuICAgICAgICAgIC8vIGNzc0xpYjogWydodHRwOi8veHh4J10sIC8vIFx1NTcyOFx1N0VCRlx1NzkzQVx1NEY4Qlx1NEUyRFx1NzY4NGNzc1x1NEY5RFx1OEQ1NlxyXG4gICAgICAgICAgLy8gdnVlOiAnaHR0cHM6Ly9qc2QuY2RuLnp6a28uY24vbnBtL3Z1ZS9kaXN0L3Z1ZS5taW4uanMnLCAvLyBcdTU3MjhcdTdFQkZcdTc5M0FcdTRGOEJcdTRFMkRcdTc2ODR2dWVcdTRGOURcdThENTZcclxuICAgICAgICAgIGpzZmlkZGxlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBIGpzZmlkZGxlIFx1OTRGRVx1NjNBNVxyXG4gICAgICAgICAgY29kZXBlbjogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBIGNvZGVwZW4gXHU5NEZFXHU2M0E1XHJcbiAgICAgICAgICBob3Jpem9udGFsOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU1QzU1XHU3OTNBXHU0RTNBXHU2QTJBXHU1NDExXHU2ODM3XHU1RjBGXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICd2dWVwcmVzcy1wbHVnaW4tem9vbWluZycsIC8vIFx1NjUzRVx1NTkyN1x1NTZGRVx1NzI0N1xyXG4gICAgICB7XHJcbiAgICAgICAgc2VsZWN0b3I6ICcudGhlbWUtdmRvaW5nLWNvbnRlbnQgaW1nOm5vdCgubm8tem9vbSknLCAvLyBcdTYzOTJcdTk2NjRjbGFzc1x1NjYyRm5vLXpvb21cdTc2ODRcdTU2RkVcdTcyNDdcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICBiZ0NvbG9yOiAncmdiYSgwLDAsMCwwLjYpJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtcclxuICAgICAgJ3Z1ZXByZXNzLXBsdWdpbi1jb21tZW50JywgLy8gXHU4QkM0XHU4QkJBXHJcbiAgICAgIHtcclxuICAgICAgICBjaG9vc2VuOiAnZ2l0YWxrJyxcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICBjbGllbnRJRDogJ2E2ZTEzNTUyODc5NDcwOTZiODhiJyxcclxuICAgICAgICAgIGNsaWVudFNlY3JldDogJ2YwZTc3ZDA3MGZhYmZjZDVhZjk1YmViYjgyYjJkNTc0ZDcyNDhkNzEnLFxyXG4gICAgICAgICAgcmVwbzogJ2Jsb2ctZ2l0YWxrLWNvbW1lbnQnLCAvLyBHaXRIdWIgXHU0RUQzXHU1RTkzXHJcbiAgICAgICAgICBvd25lcjogJ3h1Z2FveWknLCAvLyBHaXRIdWJcdTRFRDNcdTVFOTNcdTYyNDBcdTY3MDlcdTgwMDVcclxuICAgICAgICAgIGFkbWluOiBbJ3h1Z2FveWknXSwgLy8gXHU1QkY5XHU0RUQzXHU1RTkzXHU2NzA5XHU1MTk5XHU2NzQzXHU5NjUwXHU3Njg0XHU0RUJBXHJcbiAgICAgICAgICAvLyBkaXN0cmFjdGlvbkZyZWVNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgcGFnZXJEaXJlY3Rpb246ICdsYXN0JywgLy8gJ2ZpcnN0J1x1NkI2M1x1NUU4RiB8ICdsYXN0J1x1NTAxMlx1NUU4RlxyXG4gICAgICAgICAgaWQ6ICc8JS0gKGZyb250bWF0dGVyLnBlcm1hbGluayB8fCBmcm9udG1hdHRlci50by5wYXRoKS5zbGljZSgtMTYpICU+JywgLy8gIFx1OTg3NVx1OTc2Mlx1NzY4NFx1NTUyRlx1NEUwMFx1NjgwN1x1OEJDNixcdTk1N0ZcdTVFQTZcdTRFMERcdTgwRkRcdThEODVcdThGQzc1MFxyXG4gICAgICAgICAgdGl0bGU6ICdcdTMwMENcdThCQzRcdThCQkFcdTMwMEQ8JS0gZnJvbnRtYXR0ZXIudGl0bGUgJT4nLCAvLyBHaXRIdWIgaXNzdWUgXHU3Njg0XHU2ODA3XHU5ODk4XHJcbiAgICAgICAgICBsYWJlbHM6IFsnR2l0YWxrJywgJ0NvbW1lbnQnXSwgLy8gR2l0SHViIGlzc3VlIFx1NzY4NFx1NjgwN1x1N0I3RVxyXG4gICAgICAgICAgYm9keTpcclxuICAgICAgICAgICAgJ1x1OTg3NVx1OTc2Mlx1RkYxQTwlLSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgKGZyb250bWF0dGVyLnRvLnBhdGggfHwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSAlPicsIC8vIEdpdEh1YiBpc3N1ZSBcdTc2ODRcdTUxODVcdTVCQjlcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtcclxuICAgICAgJ0B2dWVwcmVzcy9sYXN0LXVwZGF0ZWQnLCAvLyBcIlx1NEUwQVx1NkIyMVx1NjZGNFx1NjVCMFwiXHU2NUY2XHU5NUY0XHU2ODNDXHU1RjBGXHJcbiAgICAgIHtcclxuICAgICAgICB0cmFuc2Zvcm1lcjogKHRpbWVzdGFtcCwgbGFuZykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGRheWpzKHRpbWVzdGFtcCkuZm9ybWF0KCdZWVlZL01NL0RELCBISDptbTpzcycpXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgXSxcclxuXHJcbiAgbWFya2Rvd246IHtcclxuICAgIGxpbmVOdW1iZXJzOiB0cnVlLFxyXG4gICAgZXh0cmFjdEhlYWRlcnM6IFsnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnXSwgLy8gXHU2M0QwXHU1M0Q2XHU2ODA3XHU5ODk4XHU1MjMwXHU0RkE3XHU4RkI5XHU2ODBGXHU3Njg0XHU3RUE3XHU1MjJCXHVGRjBDXHU5RUQ4XHU4QkE0WydoMicsICdoMyddXHJcbiAgfSxcclxuXHJcbiAgLy8gXHU3NkQxXHU1NDJDXHU2NTg3XHU0RUY2XHU1M0Q4XHU1MzE2XHU1RTc2XHU5MUNEXHU2NUIwXHU2Nzg0XHU1RUZBXHJcbiAgZXh0cmFXYXRjaEZpbGVzOiBbXHJcbiAgICAnLnZ1ZXByZXNzL2NvbmZpZy50cycsXHJcbiAgICAnLnZ1ZXByZXNzL2NvbmZpZy9odG1sTW9kdWxlcy50cycsXHJcbiAgXVxyXG59XHJcbikvL2J1aWxkX2RpcmVjdG9yaWVzLnB5XHU0RUU1XHU2NzAwXHU1NDBFXHU0RTAwXHU4ODRDXHU2ODA3XHU4QkM2anNvblx1NzY4NFx1N0VEM1x1NUMzRVx1RkYwQ1x1NEUwRFx1ODBGRFx1NkRGQlx1NTJBMFx1NjVFMFx1NjEwRlx1NEU0OVx1NzY4NFx1N0E3QVx1ODg0QyIsICJleHBvcnQgZGVmYXVsdCAnNTAzZjA5OGU3ZTViM2E1YjVkOGM1ZmMyOTM4YWYwMDInXHJcbiIsICJpbXBvcnQgeyBWZG9pbmdUaGVtZUNvbmZpZyB9IGZyb20gJ3Z1ZXByZXNzLXRoZW1lLXZkb2luZy90eXBlcydcclxuXHJcbi8qKiBcdTYzRDJcdTUxNjVcdTgxRUFcdTVCOUFcdTRFNDlodG1sXHU2QTIxXHU1NzU3IChcdTUzRUZcdTc1MjhcdTRFOEVcdTYzRDJcdTUxNjVcdTVFN0ZcdTU0NEFcdTZBMjFcdTU3NTdcdTdCNDkpXHJcbiAqIHtcclxuICogICBob21lU2lkZWJhckI6IGh0bWxTdHJpbmcsIFx1OTk5Nlx1OTg3NVx1NEZBN1x1OEZCOVx1NjgwRlx1NUU5NVx1OTBFOFxyXG4gKlxyXG4gKiAgIHNpZGViYXJUOiBodG1sU3RyaW5nLCBcdTYyNDBcdTY3MDlcdTVERTZcdTRGQTdcdThGQjlcdTY4MEZcdTk4NzZcdTkwRThcclxuICogICBzaWRlYmFyQjogaHRtbFN0cmluZywgXHU2MjQwXHU2NzA5XHU1REU2XHU0RkE3XHU4RkI5XHU2ODBGXHU1RTk1XHU5MEU4XHJcbiAqXHJcbiAqICAgcGFnZVQ6IGh0bWxTdHJpbmcsIFx1OTg3NVx1OTc2Mlx1OTg3Nlx1OTBFOFxyXG4gKiAgIHBhZ2VCOiBodG1sU3RyaW5nLCBcdTk4NzVcdTk3NjJcdTVFOTVcdTkwRThcclxuICogICBwYWdlVHNob3dNb2RlOiBzdHJpbmcsIFx1OTg3NVx1OTc2Mlx1OTg3Nlx1OTBFOC1cdTY2M0VcdTc5M0FcdTY1QjlcdTVGMEZcdUZGMUFcdTY3MkFcdTkxNERcdTdGNkVcdTlFRDhcdThCQTRcdTYyNDBcdTY3MDlcdTk4NzVcdTk3NjJcdUZGMUInYXJ0aWNsZScgPT4gXHU0RUM1XHU2NTg3XHU3QUUwXHU5ODc1XHUyNDYwXHVGRjFCICdjdXN0b20nID0+IFx1NEVDNVx1ODFFQVx1NUI5QVx1NEU0OVx1OTg3NVx1MjQ2MFxyXG4gKiAgIHBhZ2VCc2hvd01vZGU6IHN0cmluZywgXHU5ODc1XHU5NzYyXHU1RTk1XHU5MEU4LVx1NjYzRVx1NzkzQVx1NjVCOVx1NUYwRlx1RkYxQVx1NjcyQVx1OTE0RFx1N0Y2RVx1OUVEOFx1OEJBNFx1NjI0MFx1NjcwOVx1OTg3NVx1OTc2Mlx1RkYxQidhcnRpY2xlJyA9PiBcdTRFQzVcdTY1ODdcdTdBRTBcdTk4NzVcdTI0NjBcdUZGMUIgJ2N1c3RvbScgPT4gXHU0RUM1XHU4MUVBXHU1QjlBXHU0RTQ5XHU5ODc1XHUyNDYwXHJcbiAqXHJcbiAqICAgd2luZG93TEI6IGh0bWxTdHJpbmcsIFx1NTE2OFx1NUM0MFx1N0E5N1x1NTNFM1x1NURFNlx1NEUwQlx1ODlEMlx1MjQ2MVxyXG4gKiAgIHdpbmRvd1JCOiBodG1sU3RyaW5nLCBcdTUxNjhcdTVDNDBcdTdBOTdcdTUzRTNcdTUzRjNcdTRFMEJcdTg5RDJcdTI0NjFcclxuICogfVxyXG4gKlxyXG4gKiBcdTI0NjBcdTZDRThcdUZGMUFcdTU3MjgubWRcdTY1ODdcdTRFRjZmcm9udCBtYXR0ZXJcdTkxNERcdTdGNkVgYXJ0aWNsZTogZmFsc2VgXHU3Njg0XHU5ODc1XHU5NzYyXHU2NjJGXHU4MUVBXHU1QjlBXHU0RTQ5XHU5ODc1XHVGRjBDXHU2NzJBXHU5MTREXHU3RjZFXHU3Njg0XHU5RUQ4XHU4QkE0XHU2NjJGXHU2NTg3XHU3QUUwXHU5ODc1XHVGRjA4XHU5OTk2XHU5ODc1XHU5NjY0XHU1OTE2XHVGRjA5XHUzMDAyXHJcbiAqIFx1MjQ2MVx1NkNFOFx1RkYxQXdpbmRvd0xCIFx1NTQ4QyB3aW5kb3dSQlx1RkYxQTEuXHU1QzU1XHU3OTNBXHU1MzNBXHU1NzU3XHU2NzAwXHU1OTI3XHU1QkJEXHU5QUQ4MjAwcHgqNDAwcHhcdTMwMDIyLlx1OEJGN1x1N0VEOVx1ODFFQVx1NUI5QVx1NEU0OVx1NTE0M1x1N0QyMFx1NUI5QVx1NEUwMFx1NEUyQVx1NEUwRFx1OEQ4NVx1OEZDNzIwMHB4KjQwMHB4XHU3Njg0XHU1QkJEXHU5QUQ4XHUzMDAyMy5cdTU3MjhcdTVDNEZcdTVFNTVcdTVCQkRcdTVFQTZcdTVDMEZcdTRFOEU5NjBweFx1NjVGNlx1NjVFMFx1OEJCQVx1NTk4Mlx1NEY1NVx1OTBGRFx1NEUwRFx1NEYxQVx1NjYzRVx1NzkzQVx1MzAwMlxyXG4gKi9cclxuY29uc3QgaHRtbE1vZHVsZTogVmRvaW5nVGhlbWVDb25maWdbJ2h0bWxNb2R1bGVzJ10gPSB7XHJcbiAgaG9tZVNpZGViYXJCOlxyXG4gICAgYDxkaXYgc3R5bGU9XCJwYWRkaW5nOiAwLjk1cmVtXCI+XHJcbiAgICA8cCBzdHlsZT1cIlxyXG4gICAgICBjb2xvcjogdmFyKC0tdGV4dENvbG9yKTtcclxuICAgICAgb3BhY2l0eTogMC45O1xyXG4gICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICBtYXJnaW46IDAgMCA4cHggMDtcclxuICAgIFwiPlx1NTE2Q1x1NEYxN1x1NTNGNzwvcD5cclxuICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9vcGVuLndlaXhpbi5xcS5jb20vcXIvY29kZT91c2VybmFtZT1naF8wY2Y0YjgxMzkxOGNcIiAgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiIC8+XHJcbiAgICBcdTUxNzNcdTZDRThcdTUxNkNcdTRGMTdcdTUzRjdcdUZGMENcdTU2REVcdTU5MERbPGI+XHU1MjREXHU3QUVGXHU4RDQ0XHU2RTkwPC9iPl1cdUZGMENcdTUzRUZcdTgzQjdcdTUzRDYgPGEgaHJlZj1cImh0dHBzOi8vZ2FtZS54dWdhb3lpLmNvbVwiIGFyZ2V0PVwiX2JsYW5rXCIgPlx1NTI0RFx1N0FFRlx1NUI2Nlx1NEU2MFx1OEQ0NFx1NkU5MDxzcGFuPjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGZvY3VzYWJsZT1cImZhbHNlXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiBjbGFzcz1cImljb24gb3V0Ym91bmRcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xOC44LDg1LjFoNTZsMCwwYzIuMiwwLDQtMS44LDQtNHYtMzJoLTh2MjhoLTQ4di00OGgyOHYtOGgtMzJsMCwwYy0yLjIsMC00LDEuOC00LDR2NTZDMTQuOCw4My4zLDE2LjYsODUuMSwxOC44LDg1LjF6XCI+PC9wYXRoPiA8cG9seWdvbiBmaWxsPVwiY3VycmVudENvbG9yXCIgcG9pbnRzPVwiNDUuNyw0OC43IDUxLjMsNTQuMyA3Ny4yLDI4LjUgNzcuMiwzNy4yIDg1LjIsMzcuMiA4NS4yLDE0LjkgNjIuOCwxNC45IDYyLjgsMjIuOSA3MS41LDIyLjlcIj48L3BvbHlnb24+PC9zdmc+IDxzcGFuIGNsYXNzPVwic3Itb25seVwiPihvcGVucyBuZXcgd2luZG93KTwvc3Bhbj48L3NwYW4+PC9hPlxyXG4gICAgPC9wPlxyXG4gICAgPC9kaXY+YCxcclxuICAvLyBgPCEtLSBcdTdFQjVcdTU0MTFcdTgxRUFcdTkwMDJcdTVFOTQgLS0+XHJcbiAgLy8gPGlucyBjbGFzcz1cImFkc2J5Z29vZ2xlXCJcclxuICAvLyAgICAgc3R5bGU9XCJkaXNwbGF5OmJsb2NrO3BhZGRpbmc6IDAuOTVyZW07XCJcclxuICAvLyAgICAgZGF0YS1hZC1jbGllbnQ9XCJjYS1wdWItNzgyODMzMzcyNTk5MzU1NFwiXHJcbiAgLy8gICAgIGRhdGEtYWQtc2xvdD1cIjc4MDI2NTQ1ODJcIlxyXG4gIC8vICAgICBkYXRhLWFkLWZvcm1hdD1cImF1dG9cIlxyXG4gIC8vICAgICBkYXRhLWZ1bGwtd2lkdGgtcmVzcG9uc2l2ZT1cInRydWVcIj48L2lucz5cclxuICAvLyA8c2NyaXB0PlxyXG4gIC8vICAgICAoYWRzYnlnb29nbGUgPSB3aW5kb3cuYWRzYnlnb29nbGUgfHwgW10pLnB1c2goe30pO1xyXG4gIC8vIDwvc2NyaXB0PmAsXHJcbiAgLy8gc2lkZWJhclQ6XHJcbiAgLy8gICBgPCEtLSAgXHU1NkZBXHU1QjlBMTAwJSAqIDE1MHB4XHU1M0VGXHU2NjNFXHU3OTNBXHVGRjBDbWF4LWhlaWdodDoxNTBweCBcdTY3MkFcdTg5QzFcdTY2M0VcdTc5M0EtLT5cclxuICAvLyAgIDxpbnMgY2xhc3M9XCJhZHNieWdvb2dsZVwiXHJcbiAgLy8gICAgICAgICBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCU7bWF4LWhlaWdodDoxNTBweFwiXHJcbiAgLy8gICAgICAgICBkYXRhLWFkLWNsaWVudD1cImNhLXB1Yi03ODI4MzMzNzI1OTkzNTU0XCJcclxuICAvLyAgICAgICAgIGRhdGEtYWQtc2xvdD1cIjY2MjUzMDQyODRcIj48L2lucz5cclxuICAvLyAgICAgPHNjcmlwdD5cclxuICAvLyAgICAgICAgIChhZHNieWdvb2dsZSA9IHdpbmRvdy5hZHNieWdvb2dsZSB8fCBbXSkucHVzaCh7fSk7XHJcbiAgLy8gICAgIDwvc2NyaXB0PmAsXHJcbiAgLy8gc2lkZWJhckI6XHJcbiAgLy8gICBgPCEtLSBcdTZCNjNcdTY1QjlcdTVGNjIgLS0+XHJcbiAgLy8gICAgIDxpbnMgY2xhc3M9XCJhZHNieWdvb2dsZVwiXHJcbiAgLy8gICAgICAgICBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIlxyXG4gIC8vICAgICAgICAgZGF0YS1hZC1jbGllbnQ9XCJjYS1wdWItNzgyODMzMzcyNTk5MzU1NFwiXHJcbiAgLy8gICAgICAgICBkYXRhLWFkLXNsb3Q9XCIzNTA4NzczMDgyXCJcclxuICAvLyAgICAgICAgIGRhdGEtYWQtZm9ybWF0PVwiYXV0b1wiXHJcbiAgLy8gICAgICAgICBkYXRhLWZ1bGwtd2lkdGgtcmVzcG9uc2l2ZT1cInRydWVcIj48L2lucz5cclxuICAvLyAgICAgPHNjcmlwdD5cclxuICAvLyAgICAgICAgIChhZHNieWdvb2dsZSA9IHdpbmRvdy5hZHNieWdvb2dsZSB8fCBbXSkucHVzaCh7fSk7XHJcbiAgLy8gICAgIDwvc2NyaXB0PmAsXHJcbiAgLy8gcGFnZVQ6XHJcbiAgLy8gICBgPCEtLSBcdTU2RkFcdTVCOUExMDAlICogOTBweFx1NTNFRlx1NjYzRVx1NzkzQVx1RkYwQ21heC1oZWlnaHQ6OTBweFx1NjcyQVx1ODlDMVx1NjYzRVx1NzkzQS0tPlxyXG4gIC8vICAgIDxpbnMgY2xhc3M9XCJhZHNieWdvb2dsZVwiXHJcbiAgLy8gICAgICAgICBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCU7bWF4LWhlaWdodDo5MHB4XCJcclxuICAvLyAgICAgICAgIGRhdGEtYWQtY2xpZW50PVwiY2EtcHViLTc4MjgzMzM3MjU5OTM1NTRcIlxyXG4gIC8vICAgICAgICAgZGF0YS1hZC1zbG90PVwiNjYyNTMwNDI4NFwiPjwvaW5zPlxyXG4gIC8vICAgICA8c2NyaXB0PlxyXG4gIC8vICAgICAgICAgKGFkc2J5Z29vZ2xlID0gd2luZG93LmFkc2J5Z29vZ2xlIHx8IFtdKS5wdXNoKHt9KTtcclxuICAvLyAgICAgPC9zY3JpcHQ+YCxcclxuICAvLyBwYWdlVHNob3dNb2RlOiAnYXJ0aWNsZScsXHJcbiAgLy8gcGFnZUI6XHJcbiAgLy8gICBgPCEtLSBcdTZBMkFcdTU0MTFcdTgxRUFcdTkwMDJcdTVFOTQgLS0+XHJcbiAgLy8gICAgIDxpbnMgY2xhc3M9XCJhZHNieWdvb2dsZVwiXHJcbiAgLy8gICAgICAgICBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIlxyXG4gIC8vICAgICAgICAgZGF0YS1hZC1jbGllbnQ9XCJjYS1wdWItNzgyODMzMzcyNTk5MzU1NFwiXHJcbiAgLy8gICAgICAgICBkYXRhLWFkLXNsb3Q9XCI2NjIwMjQ1NDg5XCJcclxuICAvLyAgICAgICAgIGRhdGEtYWQtZm9ybWF0PVwiYXV0b1wiXHJcbiAgLy8gICAgICAgICBkYXRhLWZ1bGwtd2lkdGgtcmVzcG9uc2l2ZT1cInRydWVcIj48L2lucz5cclxuICAvLyAgICAgPHNjcmlwdD5cclxuICAvLyAgICAgICAgIChhZHNieWdvb2dsZSA9IHdpbmRvdy5hZHNieWdvb2dsZSB8fCBbXSkucHVzaCh7fSk7XHJcbiAgLy8gICAgIDwvc2NyaXB0PmAsXHJcbiAgLy8gcGFnZUJzaG93TW9kZTogJ2FydGljbGUnLFxyXG4gIC8vIHdpbmRvd0xCOiAvLyBcdTRGMUFcdTkwNkVcdTYzMjFcdTkwRThcdTUyMDZcdTRGQTdcdThGQjlcdTY4MEZcclxuICAvLyAgIGA8IS0tIFx1NTZGQVx1NUI5QTIwMCoyMDBweCAtLT5cclxuICAvLyAgICAgPHNjcmlwdCBhc3luYyBzcmM9XCJodHRwczovL3BhZ2VhZDIuZ29vZ2xlc3luZGljYXRpb24uY29tL3BhZ2VhZC9qcy9hZHNieWdvb2dsZS5qc1wiPjwvc2NyaXB0PlxyXG4gIC8vICAgICA8aW5zIGNsYXNzPVwiYWRzYnlnb29nbGVcIlxyXG4gIC8vICAgICAgICAgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoyMDBweDtoZWlnaHQ6MjAwcHhcIlxyXG4gIC8vICAgICAgICAgZGF0YS1hZC1jbGllbnQ9XCJjYS1wdWItNzgyODMzMzcyNTk5MzU1NFwiXHJcbiAgLy8gICAgICAgICBkYXRhLWFkLXNsb3Q9XCI2NjI1MzA0Mjg0XCI+PC9pbnM+XHJcbiAgLy8gICAgIDxzY3JpcHQ+XHJcbiAgLy8gICAgICAgICAoYWRzYnlnb29nbGUgPSB3aW5kb3cuYWRzYnlnb29nbGUgfHwgW10pLnB1c2goe30pO1xyXG4gIC8vICAgICA8L3NjcmlwdD5gLFxyXG4gIC8vIHdpbmRvd1JCOlxyXG4gIC8vICAgYDwhLS0gXHU1NkZBXHU1QjlBMTYwKjE2MHB4IC0tPlxyXG4gIC8vICAgICA8aW5zIGNsYXNzPVwiYWRzYnlnb29nbGVcIlxyXG4gIC8vICAgICAgICAgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazttYXgtd2lkdGg6MTYwcHg7bWF4LWhlaWdodDoxNjBweFwiXHJcbiAgLy8gICAgICAgICBkYXRhLWFkLWNsaWVudD1cImNhLXB1Yi03ODI4MzMzNzI1OTkzNTU0XCJcclxuICAvLyAgICAgICAgIGRhdGEtYWQtc2xvdD1cIjgzNzczNjk2NThcIj48L2lucz5cclxuICAvLyAgICAgPHNjcmlwdD5cclxuICAvLyAgICAgICAgIChhZHNieWdvb2dsZSA9IHdpbmRvdy5hZHNieWdvb2dsZSB8fCBbXSkucHVzaCh7fSk7XHJcbiAgLy8gICAgIDwvc2NyaXB0PlxyXG4gIC8vICAgICBgLFxyXG59XHJcblxyXG5cclxuLy8gY29uc3QgaHRtbE1vZHVsZSA9IHtcclxuLy8gICBob21lU2lkZWJhckI6IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwcHg7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiAjZWVlO1wiPlx1ODFFQVx1NUI5QVx1NEU0OVx1NkEyMVx1NTc1N1x1NkQ0Qlx1OEJENTwvZGl2PmAsXHJcbi8vICAgc2lkZWJhclQ6IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwcHg7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiAjZWVlO1wiPlx1ODFFQVx1NUI5QVx1NEU0OVx1NkEyMVx1NTc1N1x1NkQ0Qlx1OEJENTwvZGl2PmAsXHJcbi8vICAgc2lkZWJhckI6IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwcHg7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiAjZWVlO1wiPlx1ODFFQVx1NUI5QVx1NEU0OVx1NkEyMVx1NTc1N1x1NkQ0Qlx1OEJENTwvZGl2PmAsXHJcbi8vICAgcGFnZVQ6IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwcHg7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiAjZWVlO1wiPlx1ODFFQVx1NUI5QVx1NEU0OVx1NkEyMVx1NTc1N1x1NkQ0Qlx1OEJENTwvZGl2PmAsXHJcbi8vICAgcGFnZUI6IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwcHg7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiAjZWVlO1wiPlx1ODFFQVx1NUI5QVx1NEU0OVx1NkEyMVx1NTc1N1x1NkQ0Qlx1OEJENTwvZGl2PmAsXHJcbi8vICAgd2luZG93TEI6IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwcHg7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiAjZWVlO1wiPlx1ODFFQVx1NUI5QVx1NEU0OVx1NkEyMVx1NTc1N1x1NkQ0Qlx1OEJENTwvZGl2PmAsXHJcbi8vICAgd2luZG93UkI6IGA8ZGl2IHN0eWxlPVwid2lkdGg6MTAwJTtoZWlnaHQ6MTAwcHg7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiAjZWVlO1wiPlx1ODFFQVx1NUI5QVx1NEU0OVx1NkEyMVx1NTc1N1x1NkQ0Qlx1OEJENTwvZGl2PmAsXHJcbi8vIH1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBodG1sTW9kdWxlXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFHQTtBQUNBO0FBRUE7OztBQ05BLElBQU8sb0JBQVE7OztBQ3FCZixJQUFNLGFBQStDO0FBQUEsRUFDbkQsY0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWtHSixJQUFPLHNCQUFROzs7QUYvR2YsSUFBTSxjQUFjO0FBQ3BCLElBQU0sV0FBVyxVQUFVO0FBRzNCLElBQU8saUJBQVEseUJBQ2Y7QUFBQSxFQUVFLE9BQU8sUUFBUSxtREFBbUQ7QUFBQSxFQUVsRSxTQUFTO0FBQUEsSUFDUCxLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUE7QUFBQTtBQUFBLEVBTWpCLGFBQWE7QUFBQSxJQUdYLEtBQ0E7QUFBQSxNQUNFO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUE7QUFBQSxNQUVSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDSDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBO0FBQUEsVUFFUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBO0FBQUEsVUFFUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBO0FBQUEsVUFFUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSWQ7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNIO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJZDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0g7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlkO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDSDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBO0FBQUEsVUFFUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBO0FBQUEsVUFFUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBO0FBQUEsVUFFUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBO0FBQUEsVUFFUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSWQ7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNIO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJZDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0g7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQTtBQUFB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
