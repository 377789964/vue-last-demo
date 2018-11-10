<template>
  <div class="login-wrap">
    <el-form
      ref="form"
      :model="user"
      label-width="80px"
      label-position="top"
      class="login-form">
      <h2>用户登陆</h2>
      <el-form-item label="用户名">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="userLogin">立即登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    userLogin () {
      // console.log('submit!')
      axios.post('http://localhost:8888/api/private/v1/login', {
        username: this.user.name,
        password: this.user.password
      })
        .then((res) => {
          // console.log(res)
          const {status, msg} = res.data.meta
          if (status === 400) {
            this.user.name = ''
            this.user.password = ''
            this.$message({
              showClose: true,
              message: msg,
              type: 'warning'
            })
          }
          if (status === 200) {
            this.$message({
              showClose: true,
              message: msg,
              type: 'warning'
            })
            // console.log(res.data.data)
            // console.log(JSON.stringify(res.data.data))
            window.localStorage.setItem('userInfo', JSON.stringify(res.data.data))
            // this.$router.push({
            //   name: 'home'
            // })
            // console.log(window.localStorage.getItem('userInfo'))
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.login-wrap{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form{
  background-color: #fff;
  width: 450px;
  padding: 30px;
  border-radius: 7px
}
.loginBtn{
  width: 100%;
}
</style>
