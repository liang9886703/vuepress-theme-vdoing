<template>
  <div class="home-wrapper">
    <div class="head"
    :style="bannerBgStyle"
    >
      <!-- banner块 s -->
      <div class="charaBox">
        <div class='chara' :style="blueBanner"> </div>
      </div>
      <div
        class="banner"
        :class="{ 'hide-banner': !showBanner }"
      >
        <div
          class="banner-conent"
          :style="
            !homeData.features && !homeData.heroImage && `padding-top: 7rem`
          "
        >
          <div>
            <h1 class="welcome"
            >
              welcome!
            </h1>

          </div>
          <!-- PC端features块 s -->
          <div class="features" v-if="hasFeatures">
              <div
                class="feature"
                v-for="(feature, index) in homeData.features"
                :key="index"
              >
                <router-link v-if="feature.link" :to="feature.link">
                  <img
                    class="feature-img"
                    v-if="feature.imgUrl"
                    :src="$withBase(feature.imgUrl)"
                    :alt="feature.title"
                  />
                  <h2>{{ feature.title }}</h2>
                  <p>{{ feature.details }}</p>
                </router-link>
                <a v-else href="javascript:;">
                  <img  
                    class="feature-img"
                    v-if="feature.imgUrl"
                    :src="$withBase(feature.imgUrl)"
                    :alt="feature.title"
                  />
                  <h2>{{ feature.title }}</h2>
                  <p>{{ feature.details }}</p>
                </a>
              </div>

          </div>
          <!---hero-->
          <header class="hero">
            <!---
              <img
                v-if="homeData.heroImage"
                :src="$withBase(homeData.heroImage)"
                :alt="homeData.heroAlt"
              />
            -->
            <!---松垮垮's blog-->
            <h1 v-if="homeData.heroText" id="main-title">
              {{ homeData.heroText }}
            </h1>

            <!---活着就是为了改变世界！-->
            <p v-if="homeData.tagline" class="description">
              {{ homeData.tagline }}
            </p>

            <p class="action" v-if="homeData.actionText && homeData.actionLink">
              <NavLink class="action-button" :item="actionLink" />
            </p>
          </header>

          <!-- PC端features块 e -->
        </div>

      </div>
            <!-- 移动端features块 s -->
      <!-- isMQMobile放到v-if上线后会报错 -->
      <div class="slide-banner" v-if="hasFeatures" v-show="isMQMobile">
        <div class="banner-wrapper">
          <div class="slide-banner-scroll" ref="slide">
            <div class="slide-banner-wrapper">
              <div
                class="slide-item"
                v-for="(feature, index) in homeData.features"
                :key="index"
              >
                <router-link v-if="feature.link" :to="feature.link">
                  <img
                    class="feature-img"
                    v-if="feature.imgUrl"
                    :src="$withBase(feature.imgUrl)"
                    :alt="feature.title"
                  />
                  <h2>{{ feature.title }}</h2>
                  <p>{{ feature.details }}</p>
                </router-link>
                <a v-else href="javascript:;">
                  <img
                    class="feature-img"
                    v-if="feature.imgUrl"
                    :src="$withBase(feature.imgUrl)"
                    :alt="feature.title"
                  />
                  <h2>{{ feature.title }}</h2>
                  <p>{{ feature.details }}</p>
                </a>
              </div>
            </div>
          </div>
          <div class="docs-wrapper">
            <span
              class="doc"
              v-for="(item, index) in homeData.features.length"
              :key="index"
              :class="{ active: currentPageIndex === index }"
            ></span>
          </div>
        </div>
      </div>
      <!-- 移动端features块 e -->

      <div class="margin"></div>
      <!-- banner块 e -->
    </div>
    <MainLayout>
      <template #mainLeft>
        <!-- 简约版文章列表 -->
        <UpdateArticle
          class="card-box"
          v-if="homeData.postList === 'simple'"
          :length="homeData.simplePostListLength || 10"
          :moreArticle="
            $themeConfig.updateBar && $themeConfig.updateBar.moreArticle
          "
        />

        <!-- 详情版文章列表 -->
        <template
          v-else-if="!homeData.postList || homeData.postList === 'detailed'"
        >
          <PostList :currentPage="currentPage" :perPage="perPage" />
          <Pagination
            :total="total"
            :perPage="perPage"
            :currentPage="currentPage"
            @getCurrentPage="handlePagination"
            v-show="Math.ceil(total / perPage) > 1"
          />
        </template>

        <Content class="theme-vdoing-content custom card-box" />
      </template>

      <template v-if="!homeData.hideRightBar" #mainRight>
        <BloggerBar v-if="$themeConfig.blogger" />
        <CategoriesBar
          v-if="
            $themeConfig.category !== false &&
            $categoriesAndTags.categories.length
          "
          :categoriesData="$categoriesAndTags.categories"
          :length="10"
        />
        <TagsBar
          v-if="$themeConfig.tag !== false && $categoriesAndTags.tags.length"
          :tagsData="$categoriesAndTags.tags"
          :length="30"
        />
        <div
          class="custom-html-box card-box"
          v-if="homeSidebarB"
          v-html="homeSidebarB"
        ></div>
      </template>
    </MainLayout>
  </div>


</template>

<script>

import NavLink from "@theme/components/NavLink";
import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"
import MainLayout from '@theme/components/MainLayout'
import PostList from '@theme/components/PostList'
import UpdateArticle from '@theme/components/UpdateArticle'
import Pagination from '@theme/components/Pagination'
import BloggerBar from '@theme/components/BloggerBar'
import CategoriesBar from '@theme/components/CategoriesBar'
import TagsBar from '@theme/components/TagsBar'

const MOBILE_DESKTOP_BREAKPOINT = 720 // refer to config.styl

BScroll.use(Slide)

export default {
  data() {
    return {
      isMQMobile: false,

      slide: null,
      currentPageIndex: 0,
      playTimer: 0,
      mark: 0,

      total: 0, // 总长
      perPage: 10, // 每页长
      currentPage: 1,// 当前页
    }
  },
  computed: {
    homeData() {
      return {
        ...this.$page.frontmatter
      }
    },
    hasFeatures() {
      return !!(this.homeData.features && this.homeData.features.length)
    },
    homeSidebarB() {
      const { htmlModules } = this.$themeConfig
      return htmlModules ? htmlModules.homeSidebarB : ''
    },
    showBanner() { // 当分页不在第一页时隐藏banner栏
      return this.$route.query.p
        && this.$route.query.p != 1
        && (!this.homeData.postList || this.homeData.postList === 'detailed')
        ? false : true
    },
    blueBanner(){
      let bannerBg = '/chu/full_body_chu.png'
      return {
        background: `url(${this.$withBase(bannerBg)}) center center / cover no-repeat`, 
        //width: '1000px',
        //height: '1000px',
        }
    },

    bannerBgStyle() {
      //let bannerBg = '/chu/full_body_chu.png'
      let bannerBg = '/img/bg.png'
      let blue_rec = '/chu/blue_rec.jpg'
      return {
        background: `url(${this.$withBase(bannerBg)}) center center / cover no-repeat `,
        '--banner-bg': `url(${this.$withBase(blue_rec)})`
        }
      // let bannerBg = this.homeData.bannerBg
      // //return 'background-image:url("http://gips3.baidu.com/it/u=100751361,1567855012&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280")'
      // if (!bannerBg || bannerBg === 'auto') { // 默认
      //   console.log('bannerBg1',bannerBg)
      //   if (this.$themeConfig.bodyBgImg) { // 当有bodyBgImg时，不显示背景
      //     return ''
      //   } else { // 网格纹背景
      //     return 'background: rgb(40,40,45) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABOSURBVFhH7c6xCQAgDAVRR9A6E4hLu4uLiWJ7tSnuQcIvr2TRYsw3/zOGGEOMIcYQY4gxxBhiDDGGGEOMIcYQY4gxxBhiDLkx52W4Gn1tuslCtHJvL54AAAAASUVORK5CYII=)'
      //   }
      // } else if (bannerBg === 'none') { // 无背景
      //   console.log('bannerBg2')
      //   if (this.$themeConfig.bodyBgImg) {
      //     return ''
      //   } else {
      //     return 'background: var(--mainBg);color: var(--textColor)'
      //   }
      // } else if (bannerBg.indexOf('background:') > -1 || bannerBg.indexOf('background-image:') > -1) { // 自定义背景样式
      //   console.log('bannerBg3')
      //   return bannerBg
      // } else if (bannerBg.indexOf('.') > -1) { // 大图
      //   console.log('bannerBg4')
      //   return `background: url(${this.$withBase(bannerBg)}) center center / cover no-repeat`
      // }

    },
    actionLink() {
      return {
        link: this.homeData.actionLink,
        text: this.homeData.actionText
      };
    }
  },
  components: { NavLink, MainLayout, PostList, UpdateArticle, BloggerBar, CategoriesBar, TagsBar, Pagination },
  created() {
    this.total = this.$sortPosts.length
  },
  beforeMount() {
    this.isMQMobile = false;//window.innerWidth < MOBILE_DESKTOP_BREAKPOINT ? true : false; // vupress在打包时不能在beforeCreate(),created()访问浏览器api（如window）
  },
  mounted() {
    if (this.$route.query.p) {
      this.currentPage = Number(this.$route.query.p)
    }

    if (this.hasFeatures && this.isMQMobile && (!this.$route.query.p || this.$route.query.p == 1)) {
      this.init()
    }

    if (this.hasFeatures) {
      window.addEventListener('resize', () => {
        this.isMQMobile = false;window.innerWidth < MOBILE_DESKTOP_BREAKPOINT ? true : false;
        if (this.isMQMobile && !this.slide && !this.mark) {
          this.mark++

        }
      })
    }
  },
  beforeDestroy() {
    this.playTimer && clearTimeout(this.playTimer)
    this.slide && this.slide.destroy()
  },
  watch: {
    '$route.query.p'() {
      if (!this.$route.query.p) {
        this.currentPage = 1
      } else {
        this.currentPage = Number(this.$route.query.p)
      }

    }
  },
  methods: {
    init() {
      this.playTimer && clearTimeout(this.playTimer)
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true, // x轴滚动
        scrollY: false, // y轴滚动
        slide: {
          loop: true,
          threshold: 100
        },
        useTransition: true, // 使用css3 transition动画
        momentum: false,
        bounce: false, // 回弹
        stopPropagation: false, // 是否阻止事件冒泡
        probeType: 2,
        preventDefault: false
      })

    },
    handlePagination(i) { // 分页
      this.currentPage = i
    },
    getScrollTop() {
      return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
    },
  },

};
</script>

<style lang="stylus" scoped>


.home-wrapper
  @font-face
    font-family: 'home_chinese'
    src: url('F:\cpp\vuepress-theme-vdoing\docs\.vuepress\public\chu\fonts\together.ttf') format('')
    font-weight: normal
    font-style: normal

  @font-face
    font-family: 'home_english'
    src: url('F:\cpp\vuepress-theme-vdoing\docs\.vuepress\public\chu\fonts\FuturaLT-CondensedLightObl.otf') format('opentype')
    font-weight: normal
    font-style: normal
  .head
    display: flex; /* 使用 Flexbox 布局 */
    flex-direction: row
    justify-content: space-between; /* 确保子元素之间有间距 */
    .margin
      width: 0%
      height: 100%
      z-index -1
    .charaBox
      width 35%
      .chara
        box-sizing: border-box
        position: relative
        display: inline-block
        left 10%
        z-index: 10
        scale: 0.6
        width: 532px
        height: 1438px
        overflow: visible
        transform translateY(-20%)
        alt: "咦，这是谁？"
        transition: left 0.4s
    .banner
      width 65%
      min-height 450px
      margin-top $navbarHeight
      color $bannerTextColor
      position relative
      overflow hidden
      .banner-conent
        max-width $homePageWidth
        margin 0px auto
        position relative
        z-index 1
        overflow hidden
        .welcome
        // 主页字体
          font-family: 'home_english',Oxygen
          font-size:40px
          position: relative
          top: 100px
          right:10%
          max-width 100%
          display block
          margin 0 auto
          padding-top 2rem
          padding-bottom 1rem
        .hero
          text-align center
          margin-top 3rem
          img
            max-width 100%
            max-height 240px
            display block
            margin 2rem auto 1.5rem
          h1
            margin 0
            font-size 3.2rem
          .description, .action
            margin 1.5rem auto
          .description
            max-width 40rem
            font-size 1.1rem
            line-height 1.3
            opacity 0.9
          .action-button
            display inline-block
            font-size 1.2rem
            background-color $accentColor
            padding 0.8rem 1.6rem
            border-radius 4px
            transition background-color 0.5s ease
            box-sizing border-box
            border-bottom 1px solid darken($accentColor, 10%)
            color #fff
            &:hover
              background-color lighten($accentColor, 10%)
        // pc端features
        .features
          padding 2rem 0
          margin-top 2.5rem
          display flex
          flex-wrap nowrap
          align-items flex-start
          align-content stretch
          justify-content center
          gap 5rem
        .feature
          flex-grow 1
          flex-basis 20%
          max-width 20%
          text-align center
          a
            // color lighten($bannerTextColor,10%)
            color inherit
            .feature-img
              width 10rem
              height 10rem
              transition: width 0.2s, height 0.2s
              animation heart 1.2s ease-in-out 0s infinite alternate
              animation-play-state paused
            h2
              font-weight 500
              font-size 1.3rem
              border-bottom none
              padding-bottom 0
            p
              opacity 0.8
              padding 0 0.8rem
        .feature:hover
          .feature-img
            animation-play-state running
          h2, p
            color $accentColor
      // 移动端滑动图标
      .slide-banner
        margin-top 2rem
        .banner-wrapper
          position relative
        .slide-banner-scroll
          min-height 1px
          overflow hidden
        .slide-banner-wrapper
          height 300px
          .slide-item
            display inline-block
            height 300px
            width 100%
            text-align center
            a
              // color lighten($bannerTextColor,10%)
              color inherit
              .feature-img
                width 10rem
                height 10rem
                transition: width 0.5s, height 0.4s
              h2
                font-size 1.1rem
                font-weight 500
                border-bottom none
                padding-bottom 0
              p
                opacity 0.8
                padding 0 0.8rem
        .docs-wrapper
          position absolute
          bottom 25px
          left 50%
          transform translateX(-50%)
          .doc
            display inline-block
            margin 0 4px
            width 8px
            height 8px
            border-radius 50%
            background var(--textColor)
            opacity 0.9
            &.active
              opacity 0.5
    // 分页不在第一页时，隐藏banner栏
    .banner.hide-banner
      display none
      & + .main-wrapper
        margin-top: ($navbarHeight + 0.9rem)
    .main-wrapper
      margin-top 2rem
      .main-left
        .card-box
          margin-bottom 2rem
        .pagination
          margin-bottom 3rem
        .theme-vdoing-content
          padding 0 2rem
          overflow hidden
          border none
          &>:first-child
            padding-top 2rem
          &>:last-child
            padding-bottom 2rem
      .main-right
        .custom-html-box
          padding 0
          overflow hidden
  .head::after 
    content: ""
    z-index: 0
    position: absolute
    top: 650px
    left: 50%
    transform: translate(-50%)
    -webkit-transform: translate(-50%)
    -ms-transform: translate(-50%)
    width: 100%
    height: 204px
    background: var(--banner-bg) no-repeat
    background-size: cover
  .head::before
    content: ""
    z-index: 0
    position: absolute
    top: 650px
    left: 50%
    transform: translate(-50%, -50%)
    -webkit-transform: translate(-50%, -50%)
    -ms-transform: translate(-50%, -50%)
    width: 100%
    height: 454px
    background-color:white
    background-size: cover
    opacity: 50%
@keyframes heart
  from
    transform translate(0, 0)
  to
    transform translate(0, 8px)
// 1025px以下
@media (max-width 1225px)
  .home-wrapper
    .head
      .charaBox
        width 20%
        .chara
          left -120px
          transition: left 0.4s
      .banner
        width 80%
        .banner-conent
          .hero
            h1
              font-size 2.5rem
            .description
              font-size 1rem
          .feature
            a
              h2
                font-size 1.1rem
              .feature-img
                width 8rem
                height 8rem
                transition: width 0.5s, height 0.4s
// 719px以下
@media (max-width 880px)
  .home-wrapper
    .head
      .charaBox
        display none
        .banner
          width 100%
          transition: width 0.5s
// 419px以下
@media (max-width $MQMobileNarrow)
  .home-wrapper
    .head
      .banner-conent
        padding-left 1.5rem
        padding-right 1.5rem
        .hero
          img
            max-height 210px
            margin 2rem auto 1.2rem
          h1
            font-size 2rem
          h1, .description, .action
            margin 1.2rem auto
          .description
            font-size 1.2rem
          .action-button
            font-size 1rem
            padding 0.6rem 1.2rem
        .feature
          h2
            font-size 1.25rem
.theme-style-line
  .main-wrapper
    @media (max-width 719px)
      margin-top -1px




</style>
