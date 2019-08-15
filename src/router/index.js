import Vue from 'vue'
import Router from 'vue-router'
import topic from '@/components/topic'
import jobs from '@/components/jobs'
import itemCom from '@/components/itemCom'
import errRouter from '@/components/errRouter'

Vue.use(Router)


export default new Router({
  routes: [
    
    {
      path:'/',
      name:'topicc',
      redirect:'/topic',
      
    },
    
    {
      path: '/topic',
      name: 'topic',
      component: topic,
      // meta:{
      //   keepAlive:true
      // }
      
    },
    {
      path: '/news',
      name: 'news',
      component: topic,
      
      
    },
    {
      path: '/technews',
      name: 'technews',
      component: topic,
      
    },
    {
      path: '/blockchain',
      name: 'blockchain',
      component: topic,
      
    },
    {
      path:'/topic/*',
      name:'/topic/*',
      component:itemCom
    },
    {
      path:'/jobs',
      name:'jobs',
      component:jobs
    },
    {
      path:'/error',
      name:'error',
      component:errRouter
    }
  ]
})
