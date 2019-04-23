<template>
<div>

    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-col :span="24">
        <el-form-item label="摆药单ID" prop="out">
          <el-input v-model="form.out"></el-input>
        </el-form-item>
      </el-col>
      <h2>药品信息</h2>
      <div style="margin-top: 0;">
      </div>
      <el-col :span="12">
        <el-form-item label="药品ID" prop="in">
          <el-input v-model="form.in"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="数量">
          <el-input v-model="item.num"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label='价格'>
          <el-input v-model.number="item.price" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  <div>
    <el-button type="primary" round @click="compute">计算退款金额</el-button>
    <el-button type="primary" round @click="confirm1">确认退款</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'TestPage2',
  data () {
    return {
      form: {
        out: '',
        in: ''
      },
      item: {
        num: 0,
        price: 0
      },
      itemList: [],
      rules: {
        out: [{required: true, message: '请输入摆药单ID', trigger: 'blur'}],
        in: [{required: true, message: '请输入药品ID', trigger: 'blur'}]
      }
    }
  },
  computed: {
    itemSum: function () {
      return 20 * this.item.num
    }
  },
  methods: {
    compute () {
      this.item.price = this.item.num * 10
    },
    confirm1 () {
      this.$confirm('确认退款, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/ConfirmReturnDrug')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消成功！'
        })
      })
    }
  }}
</script>

<style scoped>

</style>
