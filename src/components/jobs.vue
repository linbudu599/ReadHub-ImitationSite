<template>
  <div ref="jobList">
    <div class="conclusion" v-for="item in detail" :key="item.id">
      <p>{{ item.jobTitle }}</p>
      <p class="jobsArray">
        <span v-for="job in item.jobsArray" :key="job.id">{{ job.title }}·</span>
      </p>
      <p class="description">
        <span v-for="(city,index) in item.cities" :key="city.index">{{ index }}</span>
        等地共更新了{{ item.jobCount }}个职位，待遇集中在{{ item.salaryLower }}k到{{ item.salaryUpper }}k之间，一般要求{{ item.experienceLower }}到{{ item.experienceUpper }}年之间
      </p>
      <a class="togglemore" href="javascript:void(0)" @click="showJobDetail($event)">查看详情</a>
      <div class="more" data-toggle-showing="none">
        <a :href="job.url" v-for="job in item.jobsArray" :key="job.id">
          <span>{{job.title}}·</span>
          <span class="company">{{job.company}}</span>
          <div>
            <span class="salary">{{ expectedCondition("salary",job.salaryLower,job.salaryUpper) }}</span>
            <span
              class="experience"
            >{{ expectedCondition("experience",job.experienceLower,job.experienceUpper) }}</span>
            <span>{{job.city}}</span>
            <span class="sitename">{{job.siteName}}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { timeBefore, axiosDeal, confirmHashVal } from '../../static/publicFuncs'

export default {
  name: 'jobs',
  data() {
    return {
      detail: '',
      showDetails: false,
      currentJobsArray: []
    }
  },
  created() {
    this.$parent._data.showSponser = false
  },
  mounted() {
    var _this = this
    this.axiosDeal('jobs', _this)
  },
  computed: {
    // salary(lower, upper) {
    //   return `${lower}-${upper}`
    // }
  },
  methods: {
    expectedCondition(issue, lower, upper) {
      let res
      issue == 'salary'
        ? lower !== -1 && upper !== -1
          ? (res = `${lower}k-${upper}k`)
          : (res = '面议')
        : lower !== -1 && upper !== -1
        ? (res = `${lower}到${upper}年`)
        : lower == -1 && upper == -1
        ? (res = '经验不限')
        : (res = `${lower}年以上`)
      return res
    },

    showJobDetail($event) {
      // this.$nextTick(function() {
      let jobList = $event.target.nextElementSibling
      let jobListShow = jobList.dataset.toggleShowing
      jobListShow == 'none'
        ? ((jobList.style.display = jobList.dataset.toggleShowing = 'block'))
        : (jobList.style.display = jobList.dataset.toggleShowing = 'none')
      // })
    }
  }
}
</script>
<style lang="less">
@lightgrey: lightgrey;
@normalgrey: #999;
@deepergrey: #737373;
@titlefont: 18px;
@articlefont: 14px;
@steelblue: steelblue;
.conclusion {
  border: 0.5px solid lightgrey;
  padding: 15px 0;
  margin-top: 40px;
  color: @deepergrey;
  width: 570px;
  p:first-child {
    font-size: 25px;
    line-height: 0px;
    color: black;
    margin-left: 10px;
  }
  .jobsArray {
    margin-left: 10px;
    height: 20px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: @deepergrey;
  }
  .description,
  .togglemore {
    margin-left: 10px;
  }
}
.conclusion:hover {
  box-shadow: 1px 1px @lightgrey;
}

.more {
  display: none;
  margin-top: 20px;
  margin-bottom: -17px;
  a {
    display: block;
    padding-top: 12px;
    padding-left: 9px;
    display: block;
    height: 80px;
    font-size: @titlefont - 1px;
    text-decoration: none;
    color: @normalgrey;
    border-bottom: 1.3px solid @lightgrey;
    span:first-child {
      color: black;
    }
    div {
      padding-top: 28px;
      position: relative;
      span.salary {
        color: red;
      }
    }
    .sitename {
      text-align: right;
      /* display: block; */
      margin-right: 8px;
      position: absolute;
      right: 0;
    }
  }
}
.togglemore {
  text-decoration: none;
  color: @steelblue;
}
.more a:hover {
  background-color: #f7f7f7;
}
</style>
