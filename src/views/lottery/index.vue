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
        <el-table-column prop="periods" label="期号" align="center">
        </el-table-column>
        <el-table-column prop="openTime" label="开奖时间" align="center">
        </el-table-column>
        <el-table-column label="仟" align="center" class-name="ballblue" width="100">
          <template scope="scope">
            <span>{{scope.row.result | splitRes(0)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="佰" align="center" class-name="ballblue" width="100">
          <template scope="scope">
            <span>{{scope.row.result | splitRes(1)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="拾" align="center" class-name="ballblue" width="100">
          <template scope="scope">
            <span>{{scope.row.result | splitRes(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="个" align="center" class-name="ballblue" width="100">
          <template scope="scope">
            <span>{{scope.row.result | splitRes(3)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="球五" align="center" class-name="ballblack" width="100">
          <template scope="scope">
            <span>{{scope.row.result | splitRes(4)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
        </el-table-column>
      </el-table>

      <div class="pt10" v-if="!listLoading">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :page-size="100"
          layout="total, prev, pager, next"
          :total = "pageCount*pageSize"
          :page-count="pageCount">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import fetch from '@/utils/fetch'

export default {
  data() {
    return {
      listLoading: true,
      pageNo: 1,
      pageSize: 10,
      pageCount: 1,
      listQuery: {
        date: ''
      },
      list: null
    }
  },
  created(){
    this.getData(this.pageNo - 1);
  },
  filters:{
    splitRes(value, n) {
      return value.split('-')[n]
    }
  },
  methods:{
    formatDate(value) {
      if(value){
        var year = value.getFullYear();
        var month = value.getMonth()+1<10?'0'+ (value.getMonth()+1): value.getMonth()+1;
        var day = value.getDate()<10?'0'+ value.getDate():  value.getDate();
        return year + '-' + month + '-' + day;
      }
    },
    handleSearch() {
      let start = this.formatDate(this.listQuery.date[0]);
      let end = this.formatDate(this.listQuery.date[1]);
      if(this.listQuery.date){
        this.getData(0,start,end)
      }
    },
    getData(pageNo , start , end) { // 获取数据
      var that = this;
      if(!start) start = '';
      if(!end) end = '';
      that.listLoading = true;
      fetch({
        method: 'post',
        url: '/lottery/getResultHistory',
        params: {
          'pageNo': pageNo,
          'start' : start,
          'end' : end,
          'pageSize': this.pageSize
        }
      }).then((res) => {
        that.listLoading = false;
        if (res.suc){
          that.list = res.data.data;
          that.pageCount = res.data.totalPage;
        } else {
          that.$message.error(res.msg)
        }
      });
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.getData(val - 1);
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
