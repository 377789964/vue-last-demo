export default {
  created () {
    this.getUserList()
    this.getUserNum()
  },
  data () {
    return {
      searchInfoText: '',
      userList: [],
      currentPage: 4,
      userTotalNum: 0,
      currentPage: 1,
      pageSize: 2,
      queryInfo: '',
      dialogFormVisible: false,
      formLabelWidth: '80px',
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    // 获取用户信息
    async getUserList () {
      const res = await this.$http.get('/users',{
        params: {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          query: this.queryInfo
        }
      })
      // console.log(res)
      const {data, meta} = res.data
      // console.log(data.users)
      if (meta.status === 200) {
        this.userList = data.users
      }
    },
    // 修改显示用户数量的时候重新加载
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.currentPage = 1
      // console.log(this.currentPage)
      this.getUserList()
      this.getUserNum()
    },
    // 修改当前显示第几页用户数据的时候重新加载
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getUserList()
      this.getUserNum()
    },
    // 获取用户总数量
    async getUserNum () {
      const res = await this.$http.get('/users',{
        params: {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          query: this.queryInfo
        }
      })
      // console.log(res)
      const {data, meta} = res.data
      // console.log(data.users)
      if (meta.status === 200) {
        this.userTotalNum = data.total
      }
    },
    // 点击滑块需改用户状态，整个用户信息直接作为参数传递进来
    async changeUserStatus (currentUserInfo) {
      // console.log(currentUserInfo)
      const res = await this.$http.put(`users/${currentUserInfo.id}/state/${currentUserInfo.mg_state}`)
      // console.log(res)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.$message({
          showClose: true,
          message: '用户状态修改成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '用户状态修改失败',
          type: 'error'
        })
      }
    },
    // 搜索用户信息
    searchUserInfo () {
      this.queryInfo = this.searchInfoText
      // console.log(this.queryInfo)
      this.getUserList()
      this.getUserNum()
      this.searchInfoText = ''
    },
    // 取消添加用户
    cancelAddUser () {
      this.addUserForm = {
        username: '',
        password: '',
        email: '',
        telephone: ''
      }
      this.dialogFormVisible = false
    },
    async confirmAddUser () {
      // console.log(this.addUserForm)
      const res = await this.$http.post('/users',{
        username: this.addUserForm.username,
        password: this.addUserForm.password,
        email: this.addUserForm.email,
        mobile: this.addUserForm.mobile
      })
      // console.log(res)
      const {data, meta} = res.data
      // console.log(meta.status)
      if (meta.status === 201){
      	this.$message({
          showClose: true,
          message: '添加用户成功',
          type: 'success'
        })
        this.getUserList()
        this.getUserNum()
      } else {
      	this.$message({
          showClose: true,
          message: meta.msg,
          type: 'error'
        })
      }
      this.addUserForm = {
        username: '',
        password: '',
        email: '',
        telephone: ''
      }
      this.dialogFormVisible = false
    },


  }
}
