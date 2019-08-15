<template>
  <div>
    <header>
      <nav>
        <a href="javascript:void(0)" @click="routerChange('topic',0)">
          <img src="./assets/readhub_logo@2x.e5b95388.png" alt="logo" />
        </a>
        <a
          href="javascript:void(0)"
          v-for="nav in routers"
          @click="routerChange(nav.router,nav.index)"
          :key="nav.router"
          :class="{'chosendNav':chosendNav == nav.index}"
        >{{ nav.name }}</a>
      </nav>
    </header>
    <main ref="main" v-show="loading == 'finished'">
      <router-view></router-view>
    </main>
    <div id="loading" v-show="loading === 'loading'">
      <img src="./assets/loading.gif" alt="loading" />
    </div>
    <sideBar v-if="showSponser == true"></sideBar>
  </div>
</template>

<script>
import axios from 'axios'
import topic from './components/topic.vue'
import jobs from './components/jobs.vue'
import itemCom from './components/itemCom.vue'
import sideBar from './components/sideBar.vue'
import { timeBefore, axiosDeal, confirmHashVal } from '../static/publicFuncs'

axios.defaults.baseURL = 'https://api.readhub.cn'
export default {
  name: 'App',
  data() {
    return {
      routers: [
        { name: '热门话题', router: 'topic', index: 0 },
        { name: '科技动态', router: 'news', index: 1 },
        { name: '开发者资讯', router: 'technews', index: 2 },
        { name: '区块链快讯', router: 'blockchain', index: 3 },
        { name: '招聘行情', router: 'jobs', index: 4 }
      ],
      showSponser: true,
      chosendNav: '0',
      hashValue: location.hash,
      loading: 'finished'
    }
  },

  methods: {
    routerChange(routerName, index) {
      this.$router.push({
        name: `${routerName}` //这种方式用name和path引入都可
      })
      this.chosendNav = index
      ;(this.loading = 'loading'),
        routerName == 'jobs'
          ? (this.showSponser = false)
          : (this.showSponser = true)
    }
  },
  created() {
    console.log('App.vue created')
    let _this = this
    let currentDots = this.routers.findIndex((item, index) => {
      return item.router == _this.$route.name
    })
    this.chosendNav = currentDots
  },
  mounted() {
    let route = this.$route
    let _this = this
    let currentDots = this.routers.findIndex((item, index) => {
      return item.router == _this.$route.name
    })
    currentDots == -1 ? (this.chosendNav = 0) : (this.chosendNav = currentDots)
  }
}
</script>

<style lang='less' >
@testcolor: red;
#app {
  margin-top: 60px;
}
header {
  height: 55px;
  border-bottom: 1px solid #dcdcdc !important;
  position: relative;
  nav {
    width: 990px;
    margin: auto;
    a {
      margin-left: 35px;
      margin-right: 20px;
      font-size: 22px;
      text-decoration: none;
      color: gray;
      display: inline-block;
      img {
        width: 130px;
        position: relative;
        top: 8px;
      }
    }
  }
}

.navitem {
  margin-top: 7px;
}
nav a:hover {
  color: slateblue;
  // color:@testcolor;
  text-shadow: 1px 0 0;
}
main {
  width: 600px;
  margin-left: 291px;
}

.chosendNav {
  color: steelblue;
}
#loading img {
  display: block;
  margin: auto;
  position: absolute;
  margin-top: 40px;
  width: 70px;
  margin-left: 50%;
  left: -35px;
}
</style>
