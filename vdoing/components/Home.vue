<template>
  <div class="home-wrapper">
    <!---背景部分-->
    <homeBackgroud class="homeBackgroud"/>
    <div class="head">
      <!-- banner块 s -->
      <chara class="charaBox"/>
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
          <div class="welcome_div">
            <span class="welcome">Welcome !</span>
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
    <MainLayout v-if="homeData.postList === 'simple'">
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

      <template >
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
import chara from '@theme/components/chara'
import homeBackgroud from '@theme/components/HomeBackgroud'

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

    // bannerBgStyle() {
    //   //let bannerBg = '/chu/full_body_chu.png'
    //   //let bannerBg = '/chu/staffcast_bg_full.png'
    //   //let blue_rec = '/chu/blue_rec.jpg'
    //   return {
    //     //background: `url(${this.$withBase(bannerBg)}) center center / cover no-repeat `,
    //     //'--banner-bg': `url(${this.$withBase(blue_rec)})`
    //     }
    //   // let bannerBg = this.homeData.bannerBg
    //   // //return 'background-image:url("http://gips3.baidu.com/it/u=100751361,1567855012&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280")'
    //   // if (!bannerBg || bannerBg === 'auto') { // 默认
    //   //   console.log('bannerBg1',bannerBg)
    //   //   if (this.$themeConfig.bodyBgImg) { // 当有bodyBgImg时，不显示背景
    //   //     return ''
    //   //   } else { // 网格纹背景
    //   //     return 'background: rgb(40,40,45) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABOSURBVFhH7c6xCQAgDAVRR9A6E4hLu4uLiWJ7tSnuQcIvr2TRYsw3/zOGGEOMIcYQY4gxxBhiDDGGGEOMIcYQY4gxxBhiDLkx52W4Gn1tuslCtHJvL54AAAAASUVORK5CYII=)'
    //   //   }
    //   // } else if (bannerBg === 'none') { // 无背景
    //   //   console.log('bannerBg2')
    //   //   if (this.$themeConfig.bodyBgImg) {
    //   //     return ''
    //   //   } else {
    //   //     return 'background: var(--mainBg);color: var(--textColor)'
    //   //   }
    //   // } else if (bannerBg.indexOf('background:') > -1 || bannerBg.indexOf('background-image:') > -1) { // 自定义背景样式
    //   //   console.log('bannerBg3')
    //   //   return bannerBg
    //   // } else if (bannerBg.indexOf('.') > -1) { // 大图
    //   //   console.log('bannerBg4')
    //   //   return `background: url(${this.$withBase(bannerBg)}) center center / cover no-repeat`
    //   // }

    // },
    actionLink() {
      return {
        link: this.homeData.actionLink,
        text: this.homeData.actionText
      };
    }
  },
  components: { homeBackgroud, NavLink, MainLayout, PostList, UpdateArticle, BloggerBar, CategoriesBar, TagsBar, Pagination ,chara},
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
    this.$nextTick(() => {
      this.addCharaBoxListeners();
    });
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
    addCharaBoxListeners() {
      const card = this.$refs.chara;
      if(!card) {
        console.log('no cards');
        return;
      }
      card.addEventListener('mousemove', e => {
        const x = e.offsetX;
        const y = e.offsetY;
        const cardWidth = card.clientWidth;
        const cardHeight = card.clientHeight;
        const transX = (x - cardWidth / 2);
        const transY = (y - cardHeight / 2);
        card.style.transform = `translateX(${transX}px) translateY(${transY}px)`;
        card.style.boxShadow = `${transX / -1}px ${transY / -1}px 0 #0005`;
      });
      card.addEventListener('mouseout', e => {
        card.style.transform = ``;
        card.style.boxShadow = ``;
      });

    }
  },

};
</script>

<style lang="stylus" scoped>

.home-wrapper



  .head
    display: flex; /* 使用 Flexbox 布局 */
    flex-direction: row
    justify-content: space-between; /* 确保子元素之间有间距 */
    max-height 1155px

    .homeBackgroud
      top: 0
      right: 0
      width: 100%
      height: 1100px
      object-fit: cover
      object-position: top right
      z-index: -100
      @media (max-width: 1400px)
        width: 1400px
        height: 1100px
        aspect-ratio 11/6
    .margin
      width: 0%
      height: 100%
      z-index -1

    .charaBox
      position relative
      top 0px
      width 38%
      height 1100px
      z-index: 19
      transition: width 0.4s
    .banner
      max-height 1155px
      width 62%
      margin-top $navbarHeight
      color $bannerTextColor
      position relative
      overflow hidden
      .banner-conent
        //max-width $homePageWidth
        margin 0px auto
        position relative
        z-index 10
        overflow hidden
        .welcome_div
          min-height 0px
          display block
          position: relative
          width 100%
          height 400px
          .welcome
            z-index 1000
            position: absolute
            right 10%
            bottom 50px
            font-family: 'home_english', Oxygen
            font-size: 90px
            display: block
            margin: 0
            color: rgb(0, 168, 255)
            font-weight: 550
            -webkit-text-fill-color: rgb(0, 168, 255)
            text-shadow:
              -1px -1px 0 white,
              1px -1px 0 white,
              -1px 1px 0 white,
              1px 1px 0 white
        .hero
          text-align center
          font-family: 'home_chinese'

          img
            max-width 100%
            max-height 240px
            display block
            margin 2rem auto 1.5rem
          h1
            transition:  0.4s ease-in-out ;
            margin-top 0rem
            margin-right 50px
            margin-bottom 0px
            font-size 5.8rem
            text-align right 
          .description, .action
            margin-top 7.5rem
            margin-bottom 200px
            text-align right

          .description
            transition:  0.4s ease-in-out ;
            margin-top 3px
            margin-bottom 0px
            margin-right 50px
            text-align right
            font-size 1.4rem
            line-height 1.3
            opacity 0.9
          .action-button
            display inline-block
            font-size 1.4rem
            background-color rgb(219, 118, 119)
            padding 0.8rem 2.5rem
            border-radius 6px
            transition background-color 0.5s ease
            box-sizing border-box
            border-bottom 1px solid darken($accentColor, 10%)
            color #fff
            &:hover
              background-color lighten($accentColor, 10%)
        // pc端features
        .features
          padding 1rem 0
          display flex
          flex-wrap nowrap
          align-items flex-start
          align-content stretch
          justify-content center
        .feature
          white-space:nowrap
          overflow:hidden;
          text-overflow:ellipsis
          min-width 6rem
          flex-grow 1
          flex-basis 20%
          max-width 33%
          text-align center
          a
            // color lighten($bannerTextColor,10%)
            color: rgb(0, 168, 255)
            font-family: 'home_chinese'
            .feature-img
              width 6rem
              height 6rem
              transition: width 0.2s, height 0.2s
              animation heart 1.2s ease-in-out 0s infinite alternate
              animation-play-state paused
            h2
              margin-top 1rem
              margin-bottom 0.5rem
              font-weight 500
              font-size 1.3rem
              border-bottom none
              padding-bottom 0
            p
              margin-top 0rem
              margin-bottom 0.5rem
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
          margin-bottom 0rem
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
@keyframes heart
  from
    transform translate(0, 0)
  to
    transform translate(0, 8px)
// 1025px以下
@media (max-width 925px)
  .home-wrapper
    .head
      .charaBox
        left 18px
        width 28%
        transition: 0.4s
      .banner
        width 72%
        .banner-conent
          .hero
            h1
              transition:  0.4s ease-in-out ;
              margin-top 1rem
              font-size 4.5rem
            .description
              transition:  0.4s ease-in-out ;
              margin-top 1rem
              font-size 1.2rem
          //.features
          //  gap 5rem
          //.feature
          //  a
          //    h2
          //      font-size 1.1rem
          //    .feature-img
          //      width 6rem
          //      height 6rem
          //      transition: width 0.5s, height 0.4s
// 719px以下
@media (max-width 680px)
  .home-wrapper
    .head
      .charaBox
        left 0px
        width 0.5%
        aspect-ratio 1/100
        transition:  0.3s ease-in-out ;
      .banner
        width 99%
        transition:  0.3s ease-in-out ;
        .banner-conent
          .hero
            h1
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            .description
              margin-top 1rem
              font-size 1.2rem
        
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
        //.feature
        //  h2
        //    font-size 1.25rem
.theme-style-line 
  .main-wrapper
    @media (max-width 719px)
      margin-top -1px




</style>
