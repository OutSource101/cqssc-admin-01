<template>
  <div class="app-container">
    <el-form ref="form" >
      <el-button class="filter-item" @click="routerBack" icon="arrow-left">返回</el-button>
      <el-form-item label="信息提示" style="margin-top: 20px;">
        <span style="margin-right: 20px">设置代理：qq2323424</span>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label='类别' align="center" prop="id"></el-table-column>
      <el-table-column label="最小下注" align="center" prop="qihao"></el-table-column>
      <el-table-column label="赔率上限(多个用／分开)" align="center" prop="amount1"></el-table-column>
      <el-table-column label="单注上限" align="center" prop="amount1"></el-table-column>
      <el-table-column label="单项上限" align="center" prop="amount1"></el-table-column>
      <el-table-column label="拦货金额" align="center" prop="amount1"></el-table-column>
      <el-table-column label="赚水"  align="center" prop="amount2">
        <template scope="scope">

        </template>
      </el-table-column>
      <el-table-column label="赔率(多个用／分开)" align="center" prop="amount1">
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
      listLoading: false
    }
  },
  created() {
  },
  methods: {
    renderHeader(createElement, { _self }) {
//      return createElement(
//        '<el-checkbox v-model="checked">赚水</el-checkbox>',
//      )
    },
    routerBack(){
      this.$router.go(-1);
    }
  }
}
</script>
