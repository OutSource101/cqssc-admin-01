<template>
  <div class="app-container">
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
      listQuery: {
        checked: false,
        checked1: false,
        account: '',
        number: '',
        user: null,
        sort: '0',
        type: '0',
        periods: '',
        periodsOptions: [{
          label: '2014444444',
          key: '0'
        },{
          label: '2014214444',
          key: '1'
        }],
        sortOptions: [{
          label: '全部',
          key: '0'
        },{
          label: '一定位',
          key: '1'
        }],
      },

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

