<template>
  <div class="hello">
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      color: ''
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
