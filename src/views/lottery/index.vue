<template>
  <div class="app-container">
      <el-form ref="form" :model="listQuery">
        <el-form-item label="">
          <el-date-picker
            v-model="listQuery.date"
            type="daterange"
            range-separator="/"
            placeholder="选择日期范围"
            style="width: 310px">
          </el-date-picker>
          <el-button class="filter-item" @click="handleSearch" type="primary" icon="search">按日期查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="list"
        v-loading.body="listLoading"
        element-loading-text="拼命加载中"
        border
        style="width: 100%;margin-bottom: 20px">
        <el-table-column
          prop="id"
          label="期号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="amount1"
          label="开奖时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="amount2"
          label="仟"
          align="center"
          class-name="ballblue">
        </el-table-column>
        <el-table-column
          prop="amount2"
          label="佰"
          align="center"
          class-name="ballblue">
        </el-table-column>
        <el-table-column
          prop="amount2"
          label="拾"
          align="center"
          class-name="ballblue">
        </el-table-column>
        <el-table-column
          prop="amount2"
          label="个"
          align="center"
          class-name="ballblue">
        </el-table-column>
        <el-table-column
          prop="amount2"
          label="球五"
          align="center"
          class-name="ballblack">
        </el-table-column>
        <el-table-column
          prop="amount2"
          label="更新时间"
          align="center">
        </el-table-column>
      </el-table>

      <div class="pt10" v-if="!listLoading">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listLoading: false,
      currentPage: 5,
      listQuery: {
        startNum: null,
        endNum: null,
        date: ''
      },
      list: [{
        id: 0,
        amount1: 5,
        qihao: '1111111',
        amount2: 10

      },{
        id: 1,
        amount1: 10,
        qihao: '2222222',
        amount2: 20

      }],
    }
  },
  methods:{
    handleSearch(){},
    handleSearch2(){},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }

}
</script>

<style>
  .ballred{background:no-repeat url(../../assets/red_32.png) center center;text-align:center;}
  .ballblue{background:no-repeat url(../../assets/blue_32.png) center center;text-align:center;}
  .ballgreen{background:no-repeat url(../../assets/green_32.png) center center;text-align:center;}
  .ballblack{background:no-repeat url(../../assets/black_32.png) center center; text-align:center;}
</style>
