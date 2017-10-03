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
    meta: {id: 0},
    icon: 'zujian',
    children: [
      { path: 'cargo', name: '总货明细', component: _import('detail/cargo'), meta: {id: 7} },
      { path: 'winning', name: '中奖明细', component: _import('detail/winning'), meta: {id: 8} },
      { path: 'stoped', name: '拦货明细', component: _import('detail/stoped'), meta: {id: 9} }
      //{ path: 'stoped', name: '打包拦货白单数据', component: _import('detail/stoped'), meta: {id: 10} },
    ]
  },
  {
    path: '/ledger',
    component: Layout,
    redirect: 'noredirect',
    icon: 'xinrenzhinan',
    name: '分类帐',
    meta: {id: 1},
    children: [
      { path: 'periods', name: '期数分类帐', component: _import('ledger/periods'), meta: {id: 10}},
      { path: 'day', name: '日分类帐', component: _import('ledger/day'), meta: {id: 11}},
      { path: 'month', name: '月分类帐', component: _import('ledger/month'), meta: {id: 12}},
      { path: 'contribute', name: '贡献度', component: _import('ledger/contribute'), meta: {id: 13}},
      { path: 'weekContribute', name: '周贡献度', component: _import('ledger/weekContribute'), meta: {id: 14}}
    ]
  },
  {
    path: '/reportForm',
    component: Layout,
    redirect: 'noredirect',
    icon: 'tubiao',
    name: '报表',
    meta: {id: 2},
    children: [
      { path: 'dayPeriods', name: '日报表（期数）', component: _import('reportForm/dayPeriods'), meta: {id: 15}},
      { path: 'day', name: '日（结）报表', component: _import('reportForm/day'), meta: {id: 16}},
      { path: 'month', name: '月（结）报表', component: _import('reportForm/month'), meta: {id: 17}},
      { path: 'monthDetail', name: '月结明细', component: _import('reportForm/monthDetail'), meta: {id: 18}},
      { path: 'week', name: '周报表', component: _import('reportForm/week'),meta: {id: 19}}
    ]
  },
  {
    path: '/manger',
    component: Layout,
    redirect: 'noredirect',
    icon: 'table',
    name: '下级管理',
    meta: {id: 3},
    children: [
      { path: 'accountList', name: '账户列表', component: _import('manger/accountList'), meta: {id: 20}},
      { path: 'addChild', name: '新增下级', component: _import('manger/addChild'), meta: {id: 21}},
      { path: 'memberList', name: '会员列表', component: _import('manger/memberList'), meta: {id: 22}},
      { path: 'addMember', name: '新增会员', component: _import('manger/addMember'), meta: {id: 23}},
    ]
  },
  {
    path: '/lottery',
    component: Layout,
    redirect: '/lottery/index',
    icon: 'zonghe',
    noDropdown: true,
    meta: {id: 4},
    children: [{ path: 'index', name: '开奖结果',component: _import('lottery/index') }]
  },
  {
    path: '/log',
    component: Layout,
    redirect: 'noredirect',
    icon: 'bug',
    name: '日志',
    meta: {id: 5},
    children: [
      { path: 'basic', name: '基础日志', component: _import('log/basic'), meta: {id: 24}},
      { path: 'stopedSum', name: '烂货金额日志', component: _import('log/stopedSum'), meta: {id: 25}},
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: 'noredirect',
    icon: 'quanxian',
    name: '设置',
    meta: {id: 6},
    children: [
      { path: 'stopedMoney', name: '拦获金额', component: _import('setting/stopedMoney'), meta: {id: 26}},
      { path: 'basicData', name: '基本资料', component: _import('setting/basicData'), meta: {id: 27}},
      { path: 'children', name: '子账号', component: _import('setting/children'), meta: {id: 28}},
      { path: 'changePwd', name: '修改密码', component: _import('setting/changePwd'), meta: {id: 29}}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
