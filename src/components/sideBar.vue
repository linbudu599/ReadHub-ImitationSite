<template>
  <aside>
    <div v-for="item in 10" :key="item" class="ad">
      <img src="../assets/sponsors.png" alt />\
    </div>
  </aside>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="less">
@media screen and (max-width: 1500px) {
  aside {
    display: none !important;
  }
}
aside {
  position: absolute;
  top: 11%;
  right: 18%;
  float: right;
  width: 300px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: start;
  padding-top: 24px;
  .ad {
    width: 125px;
    height: 80px;
    border: 0.8px solid #999;
    z-index: 99;
    margin-left: 15px;
    margin-top: 23px;
    overflow: hidden;
    img {
      overflow: hidden;
      width: 495px;
      position: relative;
    }
  }
}
.ad:nth-of-type(2) img {
  left: -125px;
}
.ad:nth-of-type(3) img {
  left: -250px;
}
.ad:nth-of-type(4) img {
  left: -375px;
}
.ad:nth-of-type(5) img {
  top: -75px;
}
.ad:nth-of-type(6) img {
  top: -75px;
  left: -125px;
}
.ad:nth-of-type(7) img {
  top: -75px;
  left: -250px;
}
.ad:nth-of-type(8) img {
  top: -75px;
  left: -375px;
}
.ad:nth-of-type(9) img {
  top: -150px;
}
.ad:nth-of-type(10) img {
  top: -150px;
  left: -125px;
}
</style>