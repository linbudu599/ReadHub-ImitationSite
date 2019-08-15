<template>
  <div>
    <img src="../assets/unknownpage.png" alt="无效" />
    <p>
      将在{{ count }}秒后返回
      <a href="jaavscript:void(0)" @click="backToHome()">readHub主页</a>...
    </p>
  </div>
</template>
<script>
import { bus } from '../main'
export default {
  name: 'errorPages',
  data() {
    return {
      count: 3
    }
  },
  created() {
    console.log(this)
    this.$parent.showSponser = false
  },
  mounted() {
    let _this = this
    let countInterval = setInterval(function() {
      _this.count -= 1
      if (_this.count == 0) {
        clearInterval(countInterval)
        bus.$emit('backToHome', 'topic')
      }
    }, 1000)
  },
  methods: {
    backToHome() {
      bus.$emit('backToHome', 'topic')
    }
  },
  beforeDestroy() {
    // if(countInterval){
    //     clearInterval(countInterval);
    // }
  }
}
</script>