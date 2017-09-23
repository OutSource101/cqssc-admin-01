<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" show-summary border fit highlight-current-row>
      <el-table-column align="center" label='' prop="id">

      </el-table-column>

      <el-table-column label="会员" align="center">
        <el-table-column label="笔数" align="center" prop="amount1"></el-table-column>
        <el-table-column label="总投" align="center" prop="amount1"></el-table-column>
        <el-table-column label="盈亏" align="center" prop="amount1"></el-table-column>
      </el-table-column>
      <el-table-column label="代理" align="center">
        <el-table-column label="总投" align="center" prop="amount2"></el-table-column>
        <el-table-column label="盈亏" align="center" prop="amount2"></el-table-column>
      </el-table-column>
      <el-table-column label="总代" align="center">
        <el-table-column label="占成金额" align="center" prop="amount1"></el-table-column>
        <el-table-column label="占成盈亏" align="center" prop="amount1"></el-table-column>
        <el-table-column label="赚水" align="center" prop="amount1"></el-table-column>
        <el-table-column label="总盈亏" align="center" prop="amount1"></el-table-column>
      </el-table-column>
      <el-table-column label="股东" align="center">
        <el-table-column label="总投" align="center" prop="amount2"></el-table-column>
        <el-table-column label="盈亏" align="center" prop="amount2"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: [{
        id: 0,
        amount1: 5,
        qihao: '2017091822',
        amount2: 10

      },{
        id: 1,
        amount1: 10,
        qihao: '2017092212',
        amount2: 20

      }],
      listLoading: false,
      listQuery: {
        title: null
      }
    }
  },
  created() {
  },
  methods: {
    handleCreate() {
    }
  }
}
</script>
