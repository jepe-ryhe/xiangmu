<template>
    <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
            <span class="el-dropdown-link">
             <i class="el-icon-third-ziyuan23" style="margin-right: 15px"></i>
             {{userName}}
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    userName: function () {
      return this.$store.state.name
    }
  },
  methods: {
    // 注销用户
    logout: function () {
      console.log('logout')
      this.$store.commit('del_name')
      this.$store.commit('del_token')
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped>

</style>
