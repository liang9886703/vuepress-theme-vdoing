<!--
 * @Author: liang9886703 liang9886703@outlook,com
 * @Date: 2025-02-05 21:01:43
 * @LastEditors: liang9886703 liang9886703@outlook,com
 * @LastEditTime: 2025-02-11 19:22:52
 * @FilePath: \vuepress-theme-vdoing\vdoing\components\chara.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>

<div class="charaBox">
    <img ref="chara" class="chara" src="/chu/full_body_chu.png" />
</div>
</template>

<script>
export default {
    mounted() {
        this.$nextTick(() => {
            this.addCharaBoxListeners();
        });
    },
    methods: {
        addCharaBoxListeners() {
            const card = this.$refs.chara;
            if(!card) {
                console.log('no cards');
                return;
            }
            console.log(' cards');

            card.addEventListener('mousemove', e => {
                const x = e.offsetX;
                const y = e.offsetY;
                const cardWidth = card.clientWidth;
                const cardHeight = card.clientHeight;
                const transX = (x - cardWidth / 2)/1.5;
                const transY = (y - cardHeight / 2)/10;
                card.style.transform = `translateX(${transX}px) translateY(${transY}px)`;
            });
            card.addEventListener('mouseout', e => {
                card.style.transform = ``;
            });
        }
    },
    computed: {
        blueBanner(){
            let bannerBg = '/chu/full_body_chu.png'
            return {
                background: `url(${this.$withBase(bannerBg)}) center center / cover no-repeat`, 
                //width: '1000px',
                //height: '1000px',
                }
        },
    },
}
</script>

<style lang="stylus" scoped>
.charaBox
    display flex
    justify-content center top
    scale: 0.6;
    overflow show
    .chara
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        top: -200px;
        left: -10%;
        position: absolute;
        aspect-ratio 5/14
        height 1400px;
        cursor: default;
        transition:  0.4s
        @media (max-width 925px)
            left: -160px;
            scale: 0.8;
            transition:  0.4s
    @media (max-width 680px)
        visibility:hidden;
        overflow:hidden
        transition: 0.3s

          
</style>