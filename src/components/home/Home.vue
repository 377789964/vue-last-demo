<template>
  <div class="home-wrap">
    <el-container class="container">
      <el-header class="header">
        <el-row>
          <el-col :span="20"><div class="home-title">后台管理系统</div></el-col>
          <el-col :span="4"><a @click="loginLout">退出</a></el-col>
        </el-row>
      </el-header>
      <el-container class="container">
        <el-aside width="200px" class="aside">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :unique-opened="false"
                :router="true">
                <el-submenu
                  v-for="(itemLevel1) in menuList"
                  :index="itemLevel1.path"
                  :key="itemLevel1.id">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ itemLevel1.authName }}</span>
                  </template>
                    <el-menu-item
                      v-for="(itemLevel2) in itemLevel1.children"
                      :key="itemLevel2.id"
                      :index="itemLevel2.path">{{ itemLevel2.authName }}</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {removeUserInfo} from '@/assets/js/auth.js'
export default {
  data () {
    return {
      menuList: {}
    }
  },
  created () {
    this.loadMeanu()
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    loginLout () {
      removeUserInfo()
      this.$router.push({
        name: 'login'
      })
    },
    async loadMeanu () {
      const res = await this.$http.get('/menus')
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.menuList = data
      }
    }
  }
}
</script>

<style>
.home-wrap, .container{
  height: 100%;
}
.header{
  background-color: #B3C0D1;
  padding-top: 20px;
}
.aside{
  height: 100%;
  background-color: #fff;
}
.main{
  height: 100%;
  background-color: #E9EEF3;
}
.home-title{
  float: left;
}
</style>
