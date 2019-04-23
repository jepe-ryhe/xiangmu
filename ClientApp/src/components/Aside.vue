<template>
  <el-aside  width="200px">
    <el-col :span="24">
      <el-menu align="left" :default-openeds="['6-药品调拨']" default-active="首页"
               router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="home">
          <i class="ele-icon-my-zhuye"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2-信息维护">
          <template slot="title">
            <i class="ele-icon-my-liebiao"></i>
            <span>信息维护</span>
          </template>
          <el-menu-item index="medicationListManagement">摆药单维护</el-menu-item>
          <el-menu-item index="1-1-2" route="test2">摆药台维护</el-menu-item>
        </el-submenu>
        <el-submenu index="3-摆药退药">
          <template slot="title">
            <i class="ele-icon-my-guahao"></i>
            <span>摆药退药</span>
          </template>
          <el-menu-item index="摆药">摆药</el-menu-item>
          <el-menu-item index="returnDrug">退药</el-menu-item>
        </el-submenu>
        <el-menu-item index="4-配置系统" route="test2">
          <i class="ele-icon-my-gongneng"></i>
          <span slot="title">配置系统</span>
        </el-menu-item>
        <el-submenu index="5-统计查询">
          <template slot="title">
            <i class="ele-icon-my-fangdajing"></i>
            <span>统计查询</span>
          </template>
          <el-menu-item index="工作量">工作量统计</el-menu-item>
          <el-menu-item index="盘点">药房盘点</el-menu-item>
        </el-submenu>
        <el-submenu index="6-药品调拨">
          <template slot="title">
            <i class="ele-icon-my-yiyuan"></i>
            <span>药品调拨</span>
          </template>
          <el-menu-item index="调拨控制" route="allocateCtrl">调拨控制</el-menu-item>
          <el-menu-item index="inStock">药品入库</el-menu-item>
          <el-menu-item index="outStock">药品出库</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside'
}
</script>

<style scoped>
  /*.el-menu{*/
  /*align:"left";*/
  /*default-openeds: 1;*/
  /*router:"true";*/
  /*background-color: #545c64;*/
  /*text-color: #fff;*/
  /*active-text-color: #ffd04b;*/
  /*}*/
  .el-aside{
    background-color:#99a9bf;
    /*background-color: rgb(238, 241, 246);*/
  }
  .el-submenu{
    width:200px;
  }
  .el-menu-item{
    width:200px;
  }
  .grid-content {
    /*border-radius: 4px;*/
    min-height: 36px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }

</style>
