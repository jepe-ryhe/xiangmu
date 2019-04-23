<template>
  <el-container direction="vertical">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>出库管理</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>出库管理</h2>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-col :span="12">
        <el-form-item label="出库单位" prop="out">
          <!--<el-input :value="this.$store.state.userDept" disabled></el-input>-->
          <el-select v-model="form.out" class="el-input" filterable>
            <el-option v-for="item in outDept" :key="item.deptId" :value="item.deptId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="入库单位" prop="in">
          <el-select v-model="form.in" class="el-input" filterable>
            <el-option v-for="item in inList" :key="item.deptId" :value="item.deptId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-form ref="item" :model="item" label-width="80px" :rules="rules">
        <el-col :span="10">
          <el-form-item label="ID" prop="id">
            <el-input v-model.number="item.id"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="药品名称" prop="name">
            <el-input v-model="item.name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button @click="searchItem" :loading="isSearching">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label='数量' prop="num">
            <el-input v-model.number="item.num"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label='剩余数量'>
            <el-input v-model.number="item.left" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label='单价'>
            <el-input v-model.number="item.price" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label='总价'>
            <el-input v-model.number="itemSum" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button @click="addItem" type="primary">添加</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <el-table :data="itemList" style="width: 100%" header-cell-class-name="cell" class="el-form-item">
        <el-table-column prop="name" label="药品名称"></el-table-column>
        <el-table-column prop="id" label="药品ID"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="price" label="药品单价"></el-table-column>
        <el-table-column prop="sum" label="总价"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="onDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: 'OutStock',
  data () {
    let validate = (rule, value, callback) => {
      if (value > this.item.left) {
        callback(new Error('数量过多'))
      } else if (value <= 0) {
        callback(new Error(('数量过少')))
      } else {
        callback()
      }
    }
    return {
      isSearching: false,
      form: {
        out: '',
        in: '',
        itemList: ''
      },
      item: {
        name: '',
        id: '',
        num: 0,
        price: 0,
        left: 0
      },
      itemList: [],
      inList: [{name: 'qwe', deptId: 123}, {name: 'asd', deptId: 456}, {name: 'zxc', deptId: 789}],
      outDept: [],
      rules: {
        out: [{required: true, message: '请输入出库单位', trigger: 'blur'}],
        in: [{required: true, message: '请输入入库单位', trigger: 'blur'}],
        id: [{required: true, message: '请输入药品ID', trigger: 'blur'}],
        num: [{required: true, validator: validate, trigger: 'blur'}],
        name: [{required: true, message: '请先查询', trigger: 'blur'}]
      }
    }
  },
  computed: {
    itemSum: function () {
      return (this.item.price * this.item.num).toFixed(2)
    }
  },
  methods: {
    onSubmit () {
      this.itemList.forEach(item => delete item['sum'])
      this.form.itemList = JSON.stringify(this.itemList)
      console.log(this.itemList)
      this.$axios
        .post('/stockout/add', this.form)
        .then(res => {
          if (res.data.status === 'success') {
            this.$message.success(res.data)
          }
        })
        .catch(err => console.log(err))
      this.itemList = []
      this.item = {id: '', name: '', num: 0, price: 0, left: 0}
      this.form = {out: '', in: '', itemList: []}
    },
    onDelete (index) {
      this.itemList.splice(index, 1)
      console.log(index)
    },
    addItem () {
      this.$refs.item.validate()
        .then(() => {
          let titem = {
            id: this.item.id,
            name: this.item.name,
            num: this.item.num,
            price: this.item.price,
            sum: this.itemSum
          }
          this.itemList.forEach(item => {
            if (item.id === titem.id) {
              if (item.num + titem.num > this.item.left) {
                this.$message.error('已添加数量过多')
                this.item = {id: '', name: '', num: 0, price: 0, left: 0}
                titem = null
              }
              item.num += titem.num
              item.sum += titem.sum
              titem = null
            }
          })
          if (titem) this.itemList.push(titem)
          this.item = {id: '', name: '', num: 0, price: 0, left: 0}
        })
        .catch(err => console.log(err))
    },
    searchItem () {
      this.isSearching = true
      this.$axios
        .get('/drug/get', {params: {id: this.item.id}})
        .then(res => {
          let data = res.data
          if (data.status === 'success') {
            this.item.name = data.data.name
            this.item.price = data.data.price
            this.item.left = data.data.stock
            this.item.num = 0
          } else if (data.status === 'fail') {
            this.$message.error(data.data.errMsg)
            this.item.id = ''
            this.item.price = 0
            this.item.num = 0
          }
          this.isSearching = false
        })
        .catch(err => {
          console.log(err)
          this.isSearching = false
        })
      /* if (this.item.name === '123') {
        this.item.id = 456
        this.item.price = 7
        this.item.num = 0
      } else {
        this.item.id = '请手动输入'
        this.item.price = 0
        this.item.num = 0
        this.found = false
      } */
    }
  },
  created: function () {
    this.$axios
      .get('/stockout/deptlist')
      .then((res) => { this.inList = res.data.data })
      .catch(err => console.log(err))
    this.$axios
      .get('/stockout/deptlist')
      .then((res) => { this.outDept = res.data.data })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>

</style>
