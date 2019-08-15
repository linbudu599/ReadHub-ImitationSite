<template>
  <div :key="itemDetails.id">
    <p class="newstitle">{{ itemDetails.title }}</p>
    <p
      class="timebefore"
    >{{ timeBefore(currentDate,itemDetails.createdAt,itemDetails.publishDate) }}</p>
    <p class="acticle">{{ itemDetails.summary }}</p>
    <p class="report">媒体报道</p>
    <ul class="report">
      <li v-for="news in newsArray" :key="news.id">
        <span>
          <img src="../assets/listIcon.png" />
        </span>
        <a :href="news.url" target="_blank">{{ news.title }}</a>
        <span>{{ news.siteName }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { timeBefore } from '../../static/publicFuncs'
export default {
  name: 'itemCom',
  data() {
    return {
      itemDetails: {},
      currentDate: Date.now()
    }
  },
  created() {
    this.$parent.showSponser = false
  },
  computed: {
    newsArray() {
      return this.itemDetails.newsArray
    }
  },
  // mounted(){
  // },
  mounted() {
    console.log((this.$parent.$refs.main.style.width = '960px'))
    // this.$parent.$refs.main.clientWidth = '960px'
    let id = this.$route.params.pathMatch
    this.itemDetails = JSON.parse(sessionStorage.getItem(id))
  },
  watch: {
    $route() {}
  }
}
</script>
<style lang="less">
@normalgray: #999;
@deepergray: #737373;
@steelblue:steelblue;
@titlefont: 18px;
@articlefont: 14px;
.newstitle {
  font-size: 24px;
  letter-spacing: 1px;
}
.timebefore {
  color: @normalgray;
}
.acticle {
  font-size: @titlefont;
  line-height: 30px;
  text-indent: 36px;
  margin-top: 3%;
  width: 82%;
}
p.report {
  color: @deepergray;
  font-size: @titlefont;
}
ul.report {
  border-top: 1px solid @normalgray;
  width: 79%;
}
ul.report li {
  list-style: none;
  margin-top: 18px;
  font-size: @titlefont;
}
ul.report li img {
  width: 17px;
}
ul.report li a {
  text-decoration: none;
  letter-spacing: 1px;
  color: black;
}
ul.report li a:hover {
  border-bottom: 1px solid @steelblue;
  color: @steelblue;
}
ul.report li span {
  color: @normalgray;
  font-size: @articlefont;
}
</style>