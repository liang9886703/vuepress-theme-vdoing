<!--
 * @Author: liang9886703 liang9886703@outlook,com
 * @Date: 2025-02-18 23:00:37
 * @LastEditors: liang9886703 liang9886703@outlook,com
 * @LastEditTime: 2025-02-20 23:43:43
 * @FilePath: \vuepress-theme-vdoing\vdoing\components\chatAI.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
<deep-chat
  connect='{
    "url": " http://192.168.1.10:5000/stream",
    "method": "POST",
    "headers": {"Content-Type": "application/json"},
    "stream": "true"
  }'/>
</template>

<script>
  //:connect='connectConfig'
import { ref, onMounted,computed } from 'vue';
import 'deep-chat';
import {fetchEventSource} from '@microsoft/fetch-event-source';

export default {
  setup() {


    return {  };
  },
};
</script>

<style lang='stylus'>

</style>
