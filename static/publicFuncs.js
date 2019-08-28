const timeBefore = function(currentDate, date, publishDate) {
  let createdDate = date || publishDate;
  let timeGap = currentDate - new Date(createdDate).getTime(); //计算出相差天数
  let days = Math.floor(timeGap / (24 * 3600 * 1000));
  if (days == 0) {
    //计算出小时数
    let leftMs_day = timeGap % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    let hours = Math.floor(leftMs_day / (3600 * 1000));
    if (hours == 0) {
      //计算相差分钟数
      let leftMs_hour = leftMs_day % (3600 * 1000); //计算小时数后剩余的毫秒数
      let minutes = Math.floor(leftMs_hour / (60 * 1000));
      if (minutes == 0) {
        //计算相差秒数
        let leftMs_minute = leftMs_hour % (60 * 1000); //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leftMs_minute / 1000);
        return seconds + '秒前';
      }
      return minutes + '分钟前';
    }
    return hours + '小时前';
  }
  return days + '天前';
};

const currentDots = function(arr, router) {
  arr.findIndex((item, index) => {
    return item.router == router;
  });
};
import axios from 'axios';
const axiosDeal = function(routerName, _this) {
  if (routerName == 'topic' || routerName == 'jobs') {
    axios({
      url: `/${routerName}`
    })
      .then(res => {
        _this.detail = res.data.data;
        _this.$parent.loading = 'finished';
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    let timeStamp = _this.currentDate;
    axios({
      url: `/${routerName}?lastCursor=${timeStamp}&pageSize=10`
    })
      .then(res => {
        _this.detail = res.data.data;
        _this.$parent.loading = 'finished';
        // console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
//保存一份axios配置
// axiosDeal(routerName,_this){
//     axios({
//     url:`/${routerName}`
//         }).then(res=>{
//             console.log(res);
//             _this.$data.detail = res.data.data;
//             // console.log(this.$data.detail[0].title);
//             _this.recordItemId();
//             console.log(_this.showingItemId);
//         }).catch(function(err){

//             console.log(err);
//     });
// },

//确认当前界面路由是否有效
const confirmHashVal = function(hash, _this) {
  let hashValue = hash.slice(2);
  if (
    _this.routers.every(item => {
      return item.router !== hashValue;
    })
  ) {
    _this.$router.push({
      path: '/error'
    });
  }
};

export { timeBefore, currentDots, axiosDeal, confirmHashVal };
