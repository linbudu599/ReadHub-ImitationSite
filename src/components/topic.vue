<template>
  <div>
    <div ref="itemList">
      <div class="item" v-for="item in detail" :key="item.id">
        <!-- 不能用：href，会把item.id拼在路由的前面，页面会重定向到默认路由/topic -->
        <a class="title" href="javascript:void(0)" @click="handleEnterItem(item)">{{ item.title }}</a>
        <!-- <p>{{ item.id }}</p> -->
        <!-- <p>{{ item.order }}</p> -->
        <span
          class="timeBefore"
          v-if="$route.name == 'topic'"
        >{{ timeBefore(currentDate,item.createdAt,item.publishDate) }}</span>
        <div class="summary">{{ item.summary }}</div>
        <span class="site" v-if="$route.name !== 'topic'">{{item.siteName}}</span>
        <span
          class="timeBefore"
          v-if="$route.name !== 'topic'"
        >{{ timeBefore(currentDate,item.createdAt,item.publishDate) }}</span>
        <!-- <section v-for="newsItem in item.newsArray" :key="newsItem.id"> -->
        <!-- <p>{{ newsItem.title }}</p> -->
        <!-- <p>{{ newsItem.siteName }}</p> -->
        <!-- <p>{{ newsItem.url }}</p> -->
        <!-- </section> -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import itemCom from './itemCom.vue'
import jobs from './jobs'
import errRouter from './errRouter'
import Axios from 'axios'
import { timeBefore, axiosDeal, confirmHashVal } from '../../static/publicFuncs'
import { bus } from '../main'

let detail
export default {
  name: 'topic',
  data() {
    return {
      detail: '',
      itemDetail: [],
      currentDate: Date.now(),
      showingItemId: [],
      routers: this.$parent.routers,
      listType: 'other',
      hashValue: location.hash
    }
  },
  components: {
    itemCom,
    errRouter
  },
  created() {
    let _this = this
    this.currentDate = Date.now()
    this.axiosDeal(this.$route.name, _this)
    // console.log(this.$route);
    //无效路由界面
    bus.$on('backToHome', function(para) {
      console.log(_this.$route)
      _this.$router.push({
        path: '/topic'
      })
      _this.listTyp = 'other'
      window.location.replace(location.href) // 禁用返回按钮

      _this.$parent.chosendNav = 0
    })
    window.scrollTo(0, 0)
    this.$parent._data.showSponser = true
  },
  mounted() {
    window.addEventListener('scroll', this.throttle(this.handleUpdate, 1000))
    let routers = this.routers
    let _this = this
    window.onhashchange = function() {
      _this.confirmHashVal(location.hash, _this)
    }
  },
  beforeUpdate() {},
  updated() {},
  computed: {},
  methods: {
    throttle(fn, delay) {
      let prevTime = Date.now()
      return function() {
        let triggerTime = Date.now()
        if (triggerTime - prevTime > delay) {
          fn()
          prevTime = Date.now()
        }
      }
    },
    recordItemId() {
      let len = this.detail.length
      for (let i = 0; i < len; i++) {
        this.showingItemId[i] = this.detail[i].id
      }
    },
    handleUpdate() {
      let docuele = document.documentElement
      let scrollTop = docuele.scrollTop, // 滚动条在Y轴上方高度
        clientH = docuele.clientHeight, // 页面可视内容区域高度（受浏览器窗口尺寸影响）
        scrollH = docuele.scrollHeight // 内容可视区域的高度加上溢出（滚动）的距离
      let pending = [] // 声明一个数组用于存储每个请求的取消函数和axios标识
      let cancelToken = axios.CancelToken
      console.log(pending)
      let removePending = config => {
        for (let i in pending) {
          if (pending[i].url === axios.defaults.baseURL + config.url) {
            // 当当前请求在数组中存在时执行函数体
            pending[i].f() // 执行取消操作
            pending.splice(i, 1)
            console.log(pending[i].url)
          }
        }
      }
      axios.interceptors.request.use(
        config => {
          removePending(config)

          // 在一个axios发送前执行一下判定操作，在removePending中执行取消操作
          config.cancelToken = new cancelToken(function executor(c) {
            // 本次axios请求的配置添加cancelToken
            pending.push({
              // url: config.url,不可使用该方式配置url
              url: axios.defaults.baseURL + config.url,
              f: c
            })

            // console.log(axios.defaults.baseURL+config.url);
            // 将本次的url添加到pending中，因此对于某个url第一次发起的请求不会被取消，因为还没有配置取消函数
          })
          return Promise.resolve(config)
        },
        error => {
          return Promise.reject(error)
        }
      )
      axios.interceptors.response.use(
        data => {
          // removePending(data.config); //在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
          // console.log(data.config);//如果返回undefined说明被拦截了
          return Promise.resolve(data)
        },
        error => {
          //加载失败
          return { data: {} }
        }
      )

      console.log(this.detail.length)
      if (scrollTop + clientH + 1500 > scrollH) {
        let routerName = this.$route.name
        let timeStamp = Date.now() - 30 * 60 * 1000
        axios({
          url: `/${routerName}?lastCursor=${this.detail[this.detail.length - 1].order}&pageSize=20`
          // :`/${routerName}?lastCursor=${timeStamp}&pageSize=10`
        })
          .then(newRes => {
            console.log(newRes, newRes.status)
            if (typeof newRes.status !== undefined) {
              let updateList = newRes.data.data
              let _this = this
              //暂不清楚其余四个板块的更新时间戳算法
              updateList.forEach(function(item) {
                _this.detail.push(item)
              })
            }
          })
          .catch(function(err) {
            console.error(err)
          })
      }
    },
    handleEnterItem(item) {
      window.scrollTo(0, 0)
      let patt = /topic/gi
      if (patt.test(window.location.href)) {
        this.$router.push({
          path: `/topic/${item.id}`
        })
        sessionStorage.setItem(item.id, JSON.stringify(item))
        this.$parent._data.showSponser = false
      } else {
        window.open(item.mobileUrl, '_blank')
      }
    }
  },
  watch: {
    $route(to, from) {
      let params = this.$route.params
      if ('pathMatch' in params) {
        return
      }
      let _this = this
      console.log(this.$parent)
      this.axiosDeal(this.$route.name, _this)
    }
  }
}
</script>

<style lang="less">
@normalgrey: #999;
@deepergrey: #737373;
@titlefont: 18px;
@articlefont: 14px;
@steelblue: steelblue;
[v-cloak] {
  display: none !important;
}
.title {
  text-decoration: none;
  color: black;
  font-size: @titlefont;
  letter-spacing: 1px;
}
.title:hover {
  border-bottom: 1.2px solid @steelblue;
  padding-bottom: 1px;
  color: @steelblue;
}
.timeBefore {
  color: @normalgrey;
  font-size: @articlefont;
}
.summary {
  color: @deepergrey;
  line-height: 24px;
  margin-top: 16px;
  margin-bottom: 28px;
  height: auto;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item {
  border-bottom: 1px solid lightgray;
  margin-top: 30px;
  padding-bottom: 7px;
}
.site {
  font-size: @articlefont;
  color: @deepergrey;
}
</style>
