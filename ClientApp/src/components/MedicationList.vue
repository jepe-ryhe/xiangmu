<template>
    <el-container direction="vertical">
        <h2>摆药单列表</h2>
        <el-table
                :data="medicationLists"
                style="width: 100%"
                max-height="675"
                stripe
                border>
            <el-table-column
                    prop="id"
                    label="摆药单ID"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="medicalOrderId"
                    label="医嘱ID"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="addTime"
                    label="生成时间"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    label="操作"
                    min-width="120">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="showDetail(scope.$index)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    small
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    layout="prev, pager, next, total, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </el-container>
</template>

<script>
export default {
  name: 'MedicationList',
  data () {
    return {
      total: 0,
      currentPage: 1,
      medicationLists: [ ]
    }
  },
  methods: {
    showDetail: function (index) {
      let ID = this.medicationLists[index].id
      this.$store.commit('set_currentMedicationID', ID)
      this.$store.commit('set_medCurrentPage', 'detail')
    },
    handleCurrentChange: function (index) {
      console.log('当前页：' + index)
      return this.$axios.get('/medicinetable/list', {
        params: {
          index: index
        }
      })
        .then((res) => {
          let data = res.data.data
          let status = res.data.status
          if (status === 'success') {
            this.medicationLists = data.list
            this.total = data.total
          } else if (status === 'fail') {
            this.$message.error('获取数据失败')
          }
        })
        .catch((error) => {
          this.$message.error(error.toString())
        })
    }
  },
  beforeMount: function () {
    return this.$axios.get('/medicinetable/list', {
      params: {
        index: 1
      }
    })
      .then((res) => {
        let data = res.data.data
        let status = res.data.status
        if (status === 'success') { // 登录成功关闭模态窗口
          this.medicationLists = data.list
          this.total = data.total
        } else if (status === 'fail') {
          this.$message.error('获取数据失败')
        }
      })
      .catch((error) => {
        console.log(this.total)
        this.$message.error(error.toString())
      })
  }
}
</script>

<style scoped>
.pagination{
    margin-top: 30px;
}
</style>
