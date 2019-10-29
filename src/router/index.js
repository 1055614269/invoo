import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index';
import HelloWorld from '@/components/HelloWorld';
import Highcharts from '@/components/highcharts';
import Login from '@/components/login/login'; //登录页面
import Home from '@/components/home/home';
import HomePage from '@/components/home.page/HomePage'; //首页
import BigScreen from '@/components/big.screen';
import xx from '@/components/xx'; // 消息
import lscb from '@/components/cbgl/lscb'; // 超标管理  历史超标
import jrcb from '@/components/cbgl/jrcb'; // 超标管理  今日超标
import sbsj from '@/components/cbgl/sbsj'; // 超标管理  设备数据
import gdgl from '@/components/gdgl'; // 工地管理
import gysgl from '@/components/gysgl'; // 供应商管理
import gysrz from '@/components/gysrz'; // 供应商入住
import sbxx from '@/components/sbxx'; // 设备信息
import zdgz from '@/components/zdgz'; // 重点关注

import geocoding from '@/components/pages/geocoding.vue'; // 地理编码（坐标 -> 地址）

//APP
import App from '@/components/app'; //登录页面
import EquipmentData from '@/components/app/EquipmentData'; //  设备数据
import Equipment from '@/components/app/Equipment'; // 工地信息
import Appeal from '@/components/app/Appeal'; // 我要申诉
import PersonalCenter from '@/components/app/PersonalCenter'; // 个人中心
import PersonalEquipment from '@/components/app/PersonalEquipment'; // 个人设备
import PersonalPunishment from '@/components/app/PersonalPunishment'; // 个人处罚
import PersonalAppeal from '@/components/app/PersonalAppeal'; // 个人申诉



Vue.use(Router)
//路由配置
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/geocoding',
      name: 'geocoding',
      component: geocoding
    },
    
    //---------------------------------app
    {
      path: '/App',
      name: 'App',
      component: App
    },
    {
      path: '/EquipmentData',
      name: 'EquipmentData',
      component: EquipmentData
    },
    {
      path: '/Equipment/:id',
      name: 'Equipment',
      component: Equipment
    },
    {
      path: '/Appeal',
      name: 'Appeal',
      component: Appeal
    },
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    {
      path: '/PersonalEquipment',
      name: 'PersonalEquipment',
      component: PersonalEquipment
    },
    {
      path: '/PersonalPunishment',
      name: 'PersonalPunishment',
      component: PersonalPunishment
    },
    {
      path: '/PersonalAppeal',
      name: 'PersonalAppeal',
      component: PersonalAppeal
    },
    // end -----------------------------------------app

    {
      path: '/BigScreen',
      name: 'BigScreen',
      component: BigScreen
    },
    // {
    //   path: '/gysrz',
    //   name: 'gysrz',
    //   meta: {
    //     requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
    //   },
    //   component: gysrz
    // },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/index',
          name: 'index',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: Index
        },
        {
          path: '/highcharts',
          name: 'highcharts',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: Highcharts
        },
        {
          path: '/HomePage',  //首页
          name: 'HomePage',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: HomePage
        },
        {
          path: '/xx', //消息
          name: 'xx',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: xx
        },
        {
          path: '/gysrz',
          name: 'gysrz',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: gysrz
        },
        {
          path: '/sbsj',
          name: 'sbsj',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: sbsj
        },
        {
          path: '/lscb',
          name: 'lscb',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: lscb
        },
        {
          path: '/jrcb',
          name: 'jrcb',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: jrcb
        },
        {
          path: '/gdgl',
          name: 'gdgl',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: gdgl
        },
        {
          path: '/gysgl',
          name: 'gysgl',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: gysgl
        },
        
        {
          path: '/sbxx',
          name: 'sbxx',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: sbxx
        },
        {
          path: '/zdgz',
          name: 'zdgz',
          meta: {
            requireAuth: true // 配置此条，进入页面前判断是否需要登陆 
          },
          component: zdgz
        },
      ]
    }
  ]
})
