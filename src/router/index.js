import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: '规则',
    hidden: true,
    children: [{ path: 'index', component: _import('page/rule') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/detail',
    component: Layout,
    redirect: 'noredirect',
    name: '明细',
    icon: 'zujian',
    children: [
      { path: 'cargo', name: '总货明细', component: _import('detail/cargo') },
      { path: 'winning', name: '中奖明细', component: _import('detail/winning') },
      { path: 'stoped', name: '拦货明细', component: _import('detail/stoped') }
    ]
  },
  {
    path: '/ledger',
    component: Layout,
    redirect: 'noredirect',
    icon: 'xinrenzhinan',
    name: '分类帐',
    children: [
      { path: 'periods', name: '期数分类帐', component: _import('ledger/periods')},
      { path: 'day', name: '日分类帐', component: _import('ledger/day')},
      { path: 'month', name: '月分类帐', component: _import('ledger/month')},
      { path: 'contribute', name: '贡献度', component: _import('ledger/contribute')},
      { path: 'weekContribute', name: '周贡献度', component: _import('ledger/weekContribute')}
    ]
  },
  {
    path: '/reportForm',
    component: Layout,
    redirect: 'noredirect',
    icon: 'tubiao',
    name: '报表',
    children: [
      { path: 'dayPeriods', name: '日报表（期数）', component: _import('reportForm/dayPeriods')},
      { path: 'day', name: '日（结）报表', component: _import('reportForm/day')},
      { path: 'month', name: '月（结）报表', component: _import('reportForm/month')},
      { path: 'monthDetail', name: '月结明细', component: _import('reportForm/monthDetail')},
      { path: 'week', name: '周报表', component: _import('reportForm/week')}
    ]
  },
  {
    path: '/manger',
    component: Layout,
    redirect: 'noredirect',
    icon: 'table',
    name: '下级管理',
    children: [
      { path: 'accountList', name: '账户列表', component: _import('manger/accountList'), meta: { role: ['admin'] }},
      { path: 'addChild', name: '新增下级', component: _import('manger/addChild'), meta: { role: ['admin'] }},
      { path: 'memberList', name: '会员列表', component: _import('manger/memberList')},
      { path: 'addMember', name: '新增会员', component: _import('manger/addMember')},
    ]
  },
  {
    path: '/lottery',
    component: Layout,
    redirect: '/lottery/index',
    icon: 'zonghe',
    noDropdown: true,
    children: [{ path: 'index', name: '开奖结果',component: _import('lottery/index') }]
  },
  {
    path: '/log',
    component: Layout,
    redirect: 'noredirect',
    icon: 'bug',
    name: '日志',
    children: [
      { path: 'basic', name: '基础日志', component: _import('log/basic')},
      { path: 'stopedSum', name: '烂货金额日志', component: _import('log/stopedSum'), meta: { role: ['admin'] }},
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: 'noredirect',
    icon: 'quanxian',
    name: '设置',
    children: [
      { path: 'stopedMoney', name: '拦获金额', component: _import('setting/stopedMoney'), meta: { role: ['admin'] }},
      { path: 'basicData', name: '基本资料', component: _import('setting/basicData')},
      { path: 'children', name: '子账号', component: _import('setting/children'), meta: { role: ['admin'] }},
      { path: 'changePwd', name: '修改密码', component: _import('setting/changePwd')}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
