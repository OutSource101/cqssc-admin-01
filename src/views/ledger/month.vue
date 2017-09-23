<template>
  <div class="app-container">
    <div class="block" style="margin-bottom: 20px">
      <el-date-picker
        v-model="value"
        type="daterange"
        align="right"
        placeholder="选择日期范围"
        range-separator="/"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="search" @click="">查询</el-button>
    </div>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="拼命加载中"
      border
      show-summary
      :summary-method="getSummaries"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="类别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="qihao"
        label="笔数"
        align="center">
      </el-table-column>
      <el-table-column
        prop="qihao"
        label="下注金额"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="回水"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="中奖"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="盈亏"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      pickerOptions: {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
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
      value: '',
      listLoading: false
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0){
          sums[index] = '合计';
          return;
        }
        if (index === 1) {
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
      });

      return sums;
    },
    handleSearch(){},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

