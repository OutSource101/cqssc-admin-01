<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="被操作账号">
        <el-input v-model="form.userName" style="width: 300px"></el-input>
        <el-button type="primary" @click="handleSearch">提交</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="拼命加载中"
      border
      style="width: 100%">
      <el-table-column
        prop="operator"
        label="操作账号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="toUser"
        label="被操作账号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="content"
        label="操作内容"
        align="center">
      </el-table-column>
      <el-table-column
        prop="opTime"
        label="操作时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="opIp"
        label="操作ip"
        align="center">
      </el-table-column>
    </el-table>
    <div style="padding-top: 15px" v-if="!listLoading">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total = "pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fetch from '@/utils/fetch'
export default {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data() {
    return {
      list: null,
      form: {
        userName: ''
      },
      listLoading: false,
      pageNo: 1,
      pageSize: 10,
      pageCount: 0
    }
  },
  created(){
    this.getList(this.pageNo - 1)
  },
  methods: {
    getList(n) {
      var _this = this;
      _this.listLoading = true;
      fetch({
        method: 'post',
        url: '/log/getLogList',
        params: {
          'userId': this.userInfo.userId,
          'toUserName': this.form.userName,
          'pageNo' : n,
          'pageSize': this.pageSize
        }
      }).then((res) => {
        // console.log(res)
        _this.listLoading = false;
        if(res.suc){
          _this.list = res.data.data;
          _this.pageCount = res.data.totalCount;
        } else {
          _this.$message.error(res.msg)
        }
      })
    },
    handleSearch(){
      this.getList(this.pageNo - 1)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getList(val - 1);
    },
  }
}
</script>

