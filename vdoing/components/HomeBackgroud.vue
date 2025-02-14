<template>
  <div class="home-wrapper">
    <div class="white_rec blur"></div>
    <img src="/chu/staffcast_bg_full.png" class="background_chu" />
    <img src="/chu/blue_rec.png" class="blue_rec" />
    <img src="/chu/cir_left.png" class="cir_left" />
    <img src="/chu/cir_right.png" class="cir_right" />
    <img src="/chu/cir_mid.png" class="cir_mid" />
    <img src="/chu/cir_down.png" class="cir_down" />
  </div>
</template>

<script>

export default {
  computed: {
    homeData() {
      return {
        ...this.$page.frontmatter
      }
    },
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {

  },
  beforeDestroy() {
  },
  methods: {
    init() {
    },
  },

};
</script>

<style lang="stylus" scoped>

.home-wrapper
  position: absolute
  width: 100%
  height: 1100px
  .background_chu
    position: absolute
    top: 0
    right: 0
    width: 100%
    max-height: 1330px
    object-fit: cover
    object-position: top right
    z-index: -1
    @media (max-width: 1400px)
      height: 1330px
      aspect-ratio 11/6

  .white_rec
      content: ""
      z-index: 3
      position: absolute
      top: 650px
      left: 50%
      transform: translate(-50%, -50%)
      -webkit-transform: translate(-50%, -50%)
      -ms-transform: translate(-50%, -50%)
      width: 100%
      height: 390px
      background-color:white
      background-size: cover
      opacity: 80%
  .blue_rec
    content: ""
    z-index: 4
    position: absolute
    top: 650px
    left: 50%
    transform: translate(-50%)
    -webkit-transform: translate(-50%)
    -ms-transform: translate(-50%)
    aspect-ratio 23/1
    height: 180px
    background: var(--banner-bg) no-repeat
    background-size: cover
    opacity 1
  .cir_left
    position: absolute
    top: -20px
    left: 0px
    aspect-ratio 4/3
    height: 880px
    z-index 2
    opacity 1
    transition: 0.4s
    @media (max-width 925px)
      height 650px
      opacity 0.8
      transition: 0.4s
    @media (max-width 680px)
      height 0px
      transition:  0.3s ease-in-out ;
  .cir_right
    position: absolute
    top 65px
    right -55px
    height 440px
    aspect-ratio 4/5
    z-index 2
    opacity 1
    transition: 0.4s
    transform: rotate(1deg);
  .cir_down
    position: absolute
    bottom 80px
    left 180px
    height 120px
    aspect-ratio 12/21
    z-index 2
    opacity 0.8
    transition: 0.4s
    @media (max-width 925px)
      bottom 170px
      left 10%
      height 80px
      transition: 0.4s
      @media (max-width 680px)
        height 0px
        transition:  0.3s ease-in-out ;
  .cir_mid
    position: absolute
    right 100px
    bottom 160px
    transform translateX(-50%)
    height 240px
    aspect-ratio 7/9
    z-index 2
    opacity 1
    transition: 0.4s
    @media (max-width 925px)
      right 100px
      bottom 170px
      height 190px
      transition: 0.4s
</style>
