<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="患者">
      <el-input v-model="form.name" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="医生">
      <el-input v-model="form.doc" :disabled="true"></el-input>
    </el-form-item>
    <h2>药品信息</h2>
    <el-form-item label="药品ID">
      <el-input v-model="form.id" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="药品名称">
      <el-input v-model="form.medicine" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="数量">
      <el-input v-model="form.num" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="form.price" :disabled="true"></el-input>
    </el-form-item>
    <el-button type="primary" round @click="print1">确认打印</el-button>
  </el-form>
</template>
<script>
export default {
  name: 'TestPage3',
  data () {
    return {
      form: {
        name: '张三',
        doc: '李四',
        id: '0002',
        medicine: '藿香正气',
        num: '10',
        price: '100'
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    print1 () {
      this.$confirm('确认打印, 是否继续?', '提示', {
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
