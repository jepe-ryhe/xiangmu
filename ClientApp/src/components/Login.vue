<template>

    <el-form :model="loginForm" :rules="rules2" class="demo-ruleForm login-container" label-position="left"
             label-width="0px"
             ref="loginForm">
        <h2>住院药房管理子系统登录</h2>
        <el-form-item class="item" prop="account">
            <el-input auto-complete="off" placeholder="账号" prefix-icon="el-icon-third-ziyuan23" type="text"
                      v-model="loginForm.account" @keyup.enter.native.prevent="login" >
            </el-input>
        </el-form-item>
        <el-form-item class="item" prop="checkPass">
            <el-input auto-complete="off" placeholder="密码" prefix-icon="el-icon-third-ziyuan37" type="password"
                      v-model="loginForm.checkPass" @keyup.enter.native.prevent="login" >
            </el-input>
        </el-form-item>
        <el-form-item class="submit" style="width:100%;">
          <el-button :loading="logining" @click.native.prevent="login"
                     class="button" style="width:100%;" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item class="submit" style="width:100%;">
            <el-button :loading="logining" @click.native.prevent="cancel"
                       class="button" style="width:100%;" type="primary">登录_FAKE
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import md5 from 'js-md5' // 引用md5加密
export default {
  name: 'Login',
  data () {
    return {
      logining: false,
      loginForm: {
        account: '',
        checkPass: ''
      },
      // 输入规则
      rules2: {
        account: [
          {required: true, message: '请输入账号', trigger: ['blur', 'change']}
        ],
        checkPass: [
          {required: true, message: '请输入密码', trigger: ['blur', 'change']}
        ]
      },
      checked: true
    }
  },
  methods: {
    // 登录
    login: function () {
      this.$refs.loginForm.validate()
        .then(() => {
          this.logining = true
          return this.$axios.post('/account/login', {
            account: this.loginForm.account,
            encryptPassword: this.encrypt(this.loginForm.checkPass)
            // encryptPassword: this.encrypt(this.loginForm.checkPass + this.$moment().format()) // 加了时间戳

          })
            .then((res) => {
              let data = res.data
              if (data.status === 'success') { // 登录成功关闭模态窗口
                this.$store.commit('set_token', data.data.token)
                this.$store.commit('set_name', data.data.name)

                if (this.$store.state.token) {
                  this.$router.push('/home')
                } else {
                  this.$router.replace('/login')
                }
                this.$message.success('登录成功')
              } else if (data.status === 'fail') {
                this.$message.error('登录失败')
                this.$router.replace('/login')
              }
              this.logining = false
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(err => console.log(err))
    },
    printInput: function () {
      console.log(this.loginForm.account + '\n' + this.loginForm.checkPass)
    },
    encrypt (password) {
      return md5(password)
    },
    cancel: function () {
      this.$store.commit('set_token', 'nooooooob')
      this.$store.commit('set_name', 'lyf')
      this.$store.commit('set_userDept', 'nothing')
      this.$store.commit('set_userDeptID', '114514')
      if (this.$store.state.token) {
        this.$router.push('/home')
      } else {
        this.$router.replace('/login')
      }
      this.$message.success('登录成功')

      console.log('login')
    }
  }
}

</script>
<style>

    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin:70px auto;
        width: 400px;
        padding: 15px 50px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .submit {
        margin-top: 50px;
    }

    .button {
        font-size: large;
    }

    .remember {
        margin: 0px 0px 35px 0px;
    }
</style>

})
