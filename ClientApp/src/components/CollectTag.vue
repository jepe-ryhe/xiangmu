<template>
  <div class="boxShadow">
    <div>
      <el-button type="primary" round @click="collect">采集配置数据</el-button>
      <el-button type="primary" round @click="confirm1">摆药核准确认</el-button>
    </div>
    <div style="margin-top: 0;">医嘱药品信息
      <el-table
        :data="tables1"
        height="300px"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change='selectArInfo' header-cell-class-name="cell">
        <el-table-column :label="ID" style="align-items: center" >
          <el-table-column label="序号" width="200px" type="index">
          </el-table-column>
          <template v-for='(col) in tableData1'>
            <el-table-column
              sortable
              :show-overflow-tooltip="true"
              :prop="col.dataItem"
              :label="col.dataName"
              :key="col.dataItem"
              width="167%">
            </el-table-column>

          </template>
        </el-table-column>

      </el-table>

    </div>
    <div style="margin-top: 0">摆药单
      <el-table
        :data="tables3"
        height="300px"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change='selectArInfo' header-cell-class-name="cell">
        <el-table-column label="摆药单ID" >
          <el-table-column label="序号" width="200px" type="index">
          </el-table-column>
          <template v-for='(col) in tableData3'>
            <el-table-column
              sortable
              :show-overflow-tooltip="true"
              :prop="col.dataItem"
              :label="col.dataName"
              :key="col.dataItem"
              width="335%">
            </el-table-column>

          </template>
        </el-table-column>

      </el-table>

    </div>
    <div>
      <el-button @click="print1">打印确认</el-button>
    </div>
  </div>

</template>

<script>

export default {

  name: 'TestPage1',
  data () {
    return {
      ID: 123456,
      tables1: [{
        yisheng: '465',
        huanzhe: '4546',
        yaopin: '123',
        mingcheng: '123',
        yongfa: '123',
        yongliang: '123',
        jiage: '123',
        youxian: '11',
        beizhu: '123'
      }],
      tableData1: [{
        dataItem: 'yisheng',
        dataName: '医生id'
      },
      {
        dataItem: 'huanzhe',
        dataName: '患者id'
      },
      {
        dataItem: 'yaopin',
        dataName: '所用药品id'
      },
      {
        dataItem: 'mingcheng',
        dataName: '药品名称'
      }, {
        dataItem: 'yongfa',
        dataName: '药品用法用量'
      },
      {
        dataItem: 'jiage',
        dataName: '价格'
      }, {
        dataItem: 'youxian',
        dataName: '优先级'
      }, {
        dataItem: 'beizhu',
        dataName: '备注'
      }
      ],
      tableData3: [{
        dataItem: 'yaopin',
        dataName: '所用药品'
      }, {
        dataItem: 'yongfa',
        dataName: '药品用法'
      }, {
        dataItem: 'yongliang',
        dataName: '药品用量'
      }, {
        dataItem: 'beizhu',
        dataName: '备注'
      }
      ]
    }
  },
  methods: {
    // 获取表格选中时的数据
    selectArInfo (val) {
      this.selectArr = val
    },
    collect () {
      return this.$axios.post('/account/collect', {
        account: 1

      })
        .then((res) => {
          let data = res.data
          if (data.status === 'success') {
            this.$message.success('采集成功')
            this.tables1 = data
          } else if (data.status === 'fail') {
            this.$message.fail('采集失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })

      // this.tables1 = [{
      //   yaopin: '456',
      //   yongfa: '798',
      //   yongliang: '9852',
      //   jiage: '13213',
      //   beizhu: '123'
      // },
      // {
      //   yaopin: '456',
      //   yongfa: 'xxxx',
      //   yongliang: '9852',
      //   jiage: '13213',
      //   beizhu: '123'
      // }]
    },
    confirm1 () {
      this.$confirm('确认完成摆药操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '确认成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消成功！'
        })
      })
    },
    print1 () {
      this.$confirm('确认无误将进行打印, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '打印成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消成功！'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
