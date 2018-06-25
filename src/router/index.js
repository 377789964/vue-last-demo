import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import {getUserToken} from '@/assets/js/auth.js'
import Home from '@/components/home/Home'
import UserList from '@/components/user-list/user-list'
import RoleList from '@/components/role-list/role-list'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/users',
          name: 'userList',
          component: UserList
        },
        {
          path: '/roles',
          name: 'roleList',
          component: RoleList
        }
      ]
    }
  ]
})

// 通过导航守卫beforeEach(全局守卫)来进行路由拦截
// 所有路由导航视图都必须经过该方法
// to要去哪里， from从哪里来， next用来放行
router.beforeEach((to, from, next) => {
  // 思路：如果是登陆组件直接放行，如果非登陆组件
  // 检查令牌，令牌合格通行，令牌不合格跳转至登陆页面
  // console.log(to)
  // console.log(from)
  if (to.name === 'login') {
    next()
  } else {
    const userToken = getUserToken()
    if (userToken) {
      next()
    } else {
      next({name: 'login'})
    }
  }
})

export default router
