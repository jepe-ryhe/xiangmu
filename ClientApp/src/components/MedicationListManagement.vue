<template>
    <el-container direction="vertical">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item @click.native.prevent="toList" :to="{ path: '/medicationListManagement' }">摆药单管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="showPage==='list'||showPage==='detail'">摆药单详情</el-breadcrumb-item>
            <el-breadcrumb-item v-if="showPage==='edit'">摆药单编辑</el-breadcrumb-item>
        </el-breadcrumb>

        <MedicationList v-if="showPage==='list'"/>
        <MedicationDetail v-if="showPage==='detail'"/>
        <MedicationEdit v-if="showPage==='edit'"/>

    </el-container>

</template>

<script>
import MedicationList from './MedicationList'
import MedicationDetail from './MedicationDetail'
import MedicationEdit from './MedicationEdit'

export default {
  name: 'MedicationListManagement',
  components: {MedicationDetail, MedicationList, MedicationEdit},
  data () {
    return {
    }
  },
  computed: {
    showPage: function () {
      return this.$store.state.medCurrentPage
    }
  },
  methods: {
    toList: function () {
      this.$store.commit('set_medCurrentPage', 'list')
    }
  }
}
</script>

<style scoped>
    .el-breadcrumb {
        padding: 10px;
    }
</style>
