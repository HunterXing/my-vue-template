<template>
  <div class="home">
    <hello-world :msg="msg"></hello-world>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// 这样方便引入 组件
import { HelloWorld } from '@/components'
export default Vue.extend({
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: 'Hello World'
    }
  },
});
</script>
