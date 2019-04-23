<template>
    <el-container direction="vertical">
        <Header/>
        <el-container>
            <Aside/>
            <el-main class="main">
                <transition mode="out-in" name="fade">
                    <!--************************ROUTER************************-->
                    <router-view/>
                    <!--******************************************************-->
                </transition>
            </el-main>
        </el-container>
        <Footer/>
    </el-container>

</template>

<script>
import Header from './Header'
import Aside from './Aside'
import Footer from './Footer'

export default {
  name: 'Home',
  components: {Header, Aside, Footer},
  methods: {}
}
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .main{
        min-height: 700px;
    }
</style>
