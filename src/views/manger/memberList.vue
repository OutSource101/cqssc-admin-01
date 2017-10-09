<template>
  <div class="app-container">
    <el-form ref="form" :model="listQuery" >
      <el-form-item label="级别查询">
        <!--<el-select v-model="listQuery.level" placeholder="等级类别" style="width: 120px">-->
          <!--<el-option-->
            <!--v-for="item in listQuery.levelOptions"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <el-select v-model="listQuery.status" placeholder="状态" style="width: 120px">
          <el-option
            v-for="item in listQuery.statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input style="width: 150px;" class="filter-item" placeholder="查账号" v-model="listQuery.userName"></el-input>
        <el-input style="width: 150px;" class="filter-item" placeholder="查昵称" v-model="listQuery.nickName"></el-input>
        <el-button class="filter-item" @click="handleSearch" type="primary" icon="search">搜索级别</el-button>
      </el-form-item>
      <el-form-item label="信息提示">
        <span style="margin-right: 20px">总代：qq2323424</span><span>可用额度：0</span>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label='序号' align="center" prop="userId"></el-table-column>
      <el-table-column label="上级账号" align="center" prop="parentUserName"></el-table-column>
      <el-table-column label="账号" align="center" prop="userName"></el-table-column>
      <el-table-column label="昵称" align="center" prop="nick"></el-table-column>
      <el-table-column label="信用额度" align="center" prop="credit"></el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusType">{{scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="ip" align="center" prop="lastLoginIp"></el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template scope="scope">
          <el-button class="filter-item" size="mini" @click="edit(scope.row)" type="info" icon="">编辑</el-button>
          <el-button class="filter-item" size="mini" @click="changePwd(scope.row)" type="info" icon="">修改密码</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">设置限额</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">月报表</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">日志</el-button>
        </template>
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

    <!--编辑对话框-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" size="large">
      <el-form :model="editForm" :rules="editRules" ref="editForm" labelWidth="100px">
        <el-form-item label="账号">
          {{editForm.userName}}
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="editForm.nickName" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="信用额度" prop="credit">
          <el-input type="number" v-model="editForm.credit" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="拦货占成上限">
          总代：
          <el-select v-model="editForm.admin" style="width: 100px">
            <el-option label="0" value="0"></el-option>
          </el-select>
          代理：
          <el-select v-model="editForm.child" style="width: 100px">
            <el-option label="0" value="0"></el-option>
          </el-select>
          <br/>
          <span style="color: red">（设置占成，需要在“设置”中添加 拦货金额才生效）。提示:如果庄家先吃满,则不以所设成数来分配,以实际分配到拦货中金额为准。</span>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editForm.status">
            <el-option label="启用" value="0"></el-option>
            <el-option label="锁住" value="1"></el-option>
            <el-option label="禁用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" style="width: 300px" v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改密码对话框-->
    <el-dialog title="修改密码" :visible.sync="dialogPwd">
      <el-form :model="pwdForm" :rules="rules" ref="pwdForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input type="password" v-model="pwdForm.oldPwd" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="newPwd">
          <el-input type="password" v-model="pwdForm.newPwd" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="pwdForm.checkPass" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPwd = false">取 消</el-button>
        <el-button type="primary" @click="changePwdSubmit">确 定</el-button>
      </div>
    </el-dialog>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.pwdForm.checkPass !== '') {
          this.$refs.pwdForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      list: null,
      listLoading: false,
      pageNo: 1,
      pageSize: 10,
      pageCount: 0,
      listQuery: {
        userName: null,
        nickName: '',
        statusOptions: [{
          value: '0',
          label: '启用'
        }, {
          value: '1',
          label: '锁住'
        }, {
          value: '2',
          label: '禁用'
        }],
        status: '',
//        levelOptions: [{
//          value: '3',
//          label: '代理'
//        }, {
//          value: '4',
//          label: '会员'
//        }],
//        level: '',
      },
      dialogFormVisible: false,
      dialogPwd: false,
      pwdForm: {
        oldPwd:'',
        newPwd: '',
        checkPass: '',
        userId: ''
      },
      rules: {
        oldPwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPwd: [
          { validator: validatePass,required: true, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2,required: true, trigger: 'blur' }
        ]
      },
      editForm:{
        userId: '',
        userName: '',
        nickName: '',
        credit: '',
        admin: '0',
        child: '0',
        status: '',
        remark: ''
      },
      editRules: {
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        credit: [{ required: true, message: '请输入信用额度' }],
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = ['启用','锁住','禁用'];
      return statusMap[status]
    },
    statusType(status) {
      const statusType = ['success','gray','danger'];
      return statusType[status]
    }
  },
  created() {
    this.getList(this.pageNo - 1)
  },
  methods: {
    getList(n) {
      var _this = this;
      _this.listLoading = true;
      fetch({
        method: 'post',
        url: '/user/getUserList',
        params: {
          'parentId': this.userInfo.userId,
          'pageNo' : n,
          'pageSize': this.pageSize,
          'userName' : this.listQuery.userName,
          'nickName' : this.listQuery.nickName,
          'status' : this.listQuery.status,
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
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getData(val - 1);
    },
    handleSearch(){
      this.getList(0)
    },
    edit(row) {
      // console.log(row);
      this.editForm.userId = row.userId;
      this.editForm.userName = row.userName;
      this.editForm.nickName = row.nick;
      this.editForm.credit = row.credit;
      this.editForm.status = row.status.toString();
      this.editForm.remark = row.remark;
      this.dialogFormVisible = true
    },
    editSubmit(formName){
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fetch({
            method: 'post',
            url: '/user/updateUserInfo',
            params: {
              'userId': this.editForm.userId,
              'nickName': this.editForm.nickName,
              'credit': this.editForm.credit,
              'status': parseInt(this.editForm.status),
              'remark': this.editForm.remark
            }
          }).then((res) => {
            this.dialogFormVisible = false;
            if(res.suc){
              that.$message.success(res.msg);
              this.getList(this.pageNo - 1)
            }else{
              that.$message.error(res.msg)
            }
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    changePwd(row){
      this.dialogPwd = true;
      this.pwdForm.userId =row.userId;
      this.pwdForm.oldPwd = '';
      this.pwdForm.newPwd = '';
      this.pwdForm.checkPass = '';
    },
    changePwdSubmit(){
      let that = this;
      this.$refs['pwdForm'].validate((valid) => {
        if (valid) {
          fetch({
            method: 'post',
            url: '/user/changePwdForOther',
            params: {
              'userId': this.pwdForm.userId,
              'oldPwd': this.pwdForm.oldPwd,
              'newPwd': this.pwdForm.newPwd
            }
          }).then((res) => {
            this.dialogPwd = false;
            if(res.suc){
              that.$message.success(res.msg);
            }else{
              that.$message.error(res.msg)
            }
          })
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
