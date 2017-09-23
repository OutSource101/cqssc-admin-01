<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery" >
      <el-form-item label="级别查询">
        <el-select v-model="listQuery.value" placeholder="等级类别" style="width: 120px">
          <el-option
            v-for="item in listQuery.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="listQuery.value" placeholder="状态" style="width: 120px">
          <el-option
            v-for="item in listQuery.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input style="width: 150px;" class="filter-item" placeholder="查账号" v-model="listQuery.account"></el-input>
        <el-input style="width: 150px;" class="filter-item" placeholder="查昵称" v-model="listQuery.account"></el-input>
        <el-button class="filter-item" @click="" type="primary" icon="search">搜索级别</el-button>
      </el-form-item>
      <el-form-item label="信息提示">
        <span style="margin-right: 20px">总代：qq2323424</span><span>可用额度：0</span>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label='序号' align="center" prop="id"></el-table-column>
      <el-table-column label="上级账号" align="center" prop="qihao"></el-table-column>
      <el-table-column label="账号" align="center" prop="amount1"></el-table-column>
      <el-table-column label="直属会员" align="center" prop="amount1"></el-table-column>
      <el-table-column label="昵称" align="center" prop="amount1"></el-table-column>
      <el-table-column label="拦获占成上限(%)" align="center" prop="amount1" width="200">
        <template scope="scope">
          总代(占)0/0 代理(占)0/0
        </template>
      </el-table-column>
      <el-table-column label="信用额度" align="center" prop="amount2"></el-table-column>
      <el-table-column label="状态" align="center" prop="amount1">
        <template scope="scope">
          启用
        </template>
      </el-table-column>
      <el-table-column label="ip" align="center" prop="amount2"></el-table-column>
      <el-table-column label="操作" align="center" prop="amount1" width="300">
        <template scope="scope">
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">新增会员</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">编辑</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">修改密码</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">设置限额</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">月报表</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">日志</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">拦货金额日志</el-button>
        </template>
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
      listLoading: false,
      listQuery: {
        title: null,
        date: '',
        options: [{
          value: '选项1',
          label: '所有用户'
        }, {
          value: '选项2',
          label: 'admin'
        }],
        value: ''
      }
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
