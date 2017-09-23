<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 20px;">
      <el-form ref="form" :model="listQuery" >
        <el-form-item label="">
          <el-input style="width: 200px;" class="filter-item" placeholder="查账号" v-model="listQuery.account"></el-input>
          <el-input style="width: 200px;" class="filter-item" placeholder="查号码" v-model="listQuery.number"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="listQuery.checked1">现</el-checkbox>
          <span style="margin-left: 10px;">列出</span>
          <el-select @change='' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
            <el-option label="金额" value="0"></el-option>
            <el-option label="赔率" value="1"></el-option>
            <el-option label="退码" value="2"></el-option>
          </el-select>
          <el-input style="width: 130px;margin-left: 10px" class="filter-item" v-model="listQuery.account"></el-input>&nbsp;至
          <el-input style="width: 130px;" class="filter-item" v-model="listQuery.number"></el-input>
        </el-form-item>

        <el-form-item label="">
          <span>分类</span>
          <el-select @change='' style="width: 200px" class="filter-item" v-model="listQuery.type">
            <el-option v-for="item in listQuery.sortOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
          <span style="margin-left: 30px;">期数</span>
          <el-select @change='' style="width: 200px" class="filter-item" v-model="listQuery.periods">
            <el-option v-for="item in listQuery.periodsOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button class="filter-item" type="primary" icon="search" @click="">提交</el-button>
        <el-button class="filter-item" @click="" type="primary" icon="upload">打印</el-button>
      </el-form>

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
        label="注单编号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="qihao"
        label="会员"
        align="center">
      </el-table-column>
      <el-table-column
        prop="qihao"
        label="下单时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="qihao"
        label="号码"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="下注金额"
        align="center">
      </el-table-column>
      <el-table-column
        prop="qihao"
        label="赔率"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="中奖"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="下线回水"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="实收下线"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="自己回水"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="实付上线"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="赚水"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="路径"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="ip"
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

