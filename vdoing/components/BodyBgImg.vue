<template>
  <div
    class="body-bg"
    :style="`background: url(${bgImg}) center  top / 90% 90% no-repeat ;opacity:${opacity} `"
  ></div>
</template>

<script>
    //:style="`background: url(${bgImg}) center center / cover no-repeat;opacity:${opacity}`"
    
import { type } from '../util'
export default {
  data() {
    return {
      bgImg: '',
      opacity: 0.5
    }
  },
  mounted() {
    let { bodyBgImg, bodyBgImgOpacity, bodyBgImgInterval = 15 } = this.$themeConfig
    //console.log('bodyBgImg', bodyBgImg.length)
    if (type(bodyBgImg) === 'string') {
      this.bgImg = bodyBgImg
    } else if (type(bodyBgImg) === 'array' && bodyBgImg.length > 0) {
      let count = 0
      let timer = null

      this.bgImg = bodyBgImg[count]
      clearInterval(timer)
      timer = setInterval(() => {
        if (++count >= bodyBgImg.length) {
          count = 0
        }
        this.bgImg = bodyBgImg[count]

        // 预加载下一张图片
        if (bodyBgImg[count + 1]) {
          const img = new Image()
          img.src = bodyBgImg[count + 1]
        }
      }, bodyBgImgInterval * 1000);
    }

    if (bodyBgImgOpacity !== undefined) {
      this.opacity = bodyBgImgOpacity
    }
    //this.bgImg = '/img/bg.svg'
  }
}
</script>

<style lang='stylus'>
.body-bg 
  position absolute
  left 50%
  top 0
  transform translateX(-55%) // 通过 transform 调整位置，使得中心点对齐
  z-index -999999
  height:1300px
  width 1700px
  transition background 1s


</style>
