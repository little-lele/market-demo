import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)
const About = () => import( /* webpackChunkName: "about" */ '../views/About.vue')
const Goods = () => import( /* webpackChunkName: "about" */ '../views/goods/GoodList.vue')
const Categories = () => import( /* webpackChunkName: "about" */ '../views/goods/Categories.vue')
const Params = () => import( /* webpackChunkName: "about" */ '../views/goods/Params.vue')
const Reports = () => import( /* webpackChunkName: "about" */ '../views/report/Report.vue')
const Orders = () => import( /* webpackChunkName: "about" */ '../views/order/OrderList.vue')
const Rights = () => import( /* webpackChunkName: "about" */ '../views/power/Right.vue')
const Login = () => import( /* webpackChunkName: "about" */ '../views/login/Login.vue')
const User = () => import( /* webpackChunkName: "about" */ '../views/users/UserList.vue')
const Layout = () => import( /* webpackChunkName: "about" */ '../views/home/layout/Layout.vue')
const Roles = () => import( /* webpackChunkName: "about" */ '../views/power/Roles.vue')
const AddGood = () => import( /* webpackChunkName: "about" */ '../views/goods/AddGood.vue')




const routes = [{
    path: '/admin/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    component: Home,
    redirect: '/layout',
    children: [{
        path: '/layout',
        name: 'layout',
        meta: {
          requiresAuth: true

        },
        component: Layout
      },
      {
        path: '/users',
        name: 'users',
        meta: {
          requiresAuth: true,
          breadName: '用户列表'
        },
        component: User
      },
      {
        path: '/goods',
        name: 'goods',
        meta: {
          requiresAuth: true,
          breadName: '商品列表'
        },
        component: Goods,

      },
      {
        path: '/orders',
        name: 'order',
        meta: {
          requiresAuth: true,
          breadName: '订单列表'
        },
        component: Orders
      },
      {
        path: '/rights',
        name: 'rights',
        meta: {
          requiresAuth: true,
          breadName: '权限列表'
        },
        component: Rights
      },
      {
        path: '/roles',
        name: 'roles',
        meta: {
          requiresAuth: true,
          breadName: '用户列表'
        },
        component: Roles
      },
      {
        path: '/categories',
        name: 'categories',
        meta: {
          requiresAuth: true,
          breadName: '分类列表'
        },
        component: Categories
      },
      {
        path: '/params',
        name: 'params',
        meta: {
          requiresAuth: true,
          breadName: '分类参数'
        },
        component: Params
      },
      {
        path: '/reports',
        name: 'report',
        meta: {
          requiresAuth: true,
          breadName: '数据统计'
        },
        component: Reports
      },
      {
        path: '/addgoods',
        name: 'addgoods',
        meta: {
          requiresAuth: true,
          breadName: '添加商品'
        },
        component: AddGood
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((from, to, next) => {
//   let isLogin = window.sessionStorage.getItem('isLogin')
//   if (!isLogin) {
//     router.push({
//       name: 'login'
//     })
//   }
//   if (to.name !== 'login') {
//     router.push({
//       name: 'login'
//     })
//   }
//   next()
// })

export default router