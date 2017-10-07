<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-button type="primary" icon="plus" @click="edit()" style="margin-bottom: 20px">添加子账号</el-button>
    </el-form>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="序号" align="center" type="index">
      </el-table-column>
      <el-table-column label="账号" align="center" prop="userName">
      </el-table-column>
      <el-table-column label="昵称" align="center" prop="nickName">
      </el-table-column>
      <el-table-column label="修改时间" align="center" prop="amount1">
      </el-table-column>
      <el-table-column label="修改者" align="center" prop="amount1">
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusType">{{scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="IP" align="center" prop="lastLoginIp">
      </el-table-column>
      <el-table-column label="操作" align="center" prop="">
        <template scope="scope">
          <el-button class="filter-item" size="mini" @click="edit(scope.row)" type="info" icon="">编辑</el-button>
          <el-button class="filter-item" size="mini" @click="dialogPwd = true;pwdForm.userId = scope.row.userId;" type="info" icon="">修改密码</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">删除</el-button>
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
        <el-form-item label="账号" prop="userName">
          <el-input v-model="editForm.userName" :disabled="editForm.userNameDisable" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" :disabled="editForm.userNameDisable" v-model="editForm.password" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="editForm.nickName" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="信用额度" prop="credit">
          <el-input type="number" v-model="editForm.credit" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <div v-for="(role , index) in roleOptions" v-if="role.meta" :key="index">
            <el-checkbox :indeterminate="roleChecked[index].isIndeterminate" v-model="roleChecked[index].checkAll" @change="handleCheckAllChange(index)">{{role.name}}</el-checkbox>
            <el-checkbox-group v-model="roleChecked[index].checked" @change="handleCheckedChange(index)" style="padding-left: 20px;">
              <el-checkbox v-for="item in role.children" v-if="item.meta" :label="item.meta.id" :key="item.name">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
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
import { asyncRouterMap } from '@/router/index'
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
      pageNo: 1,
      pageSize: 10,
      pageCount: 0,
      form: {
        region: '0',
        resource: '0'
      },
      listLoading: false,
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
        userNameDisable: false,
        password: '',
        role: [],
        nickName: '',
        credit: '',
        admin: '0',
        child: '0',
        status: '0',
        remark: ''
      },
      editRules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        credit: [{ required: true, message: '请输入信用额度' },
                 { type: 'number', message: '信用额度必须为数字值'}],
      },
      roleChecked : [
        {
          isIndeterminate: false,
          checked: [],
          checkAll: false,
        },{
          isIndeterminate: false,
          checked: [],
          checkAll: false,
        },{
          isIndeterminate: false,
          checked: [],
          checkAll: false,
        },{
          isIndeterminate: false,
          checked: [],
          checkAll: false,
        },{
          isIndeterminate: false,
          checked: [],
          checkAll: false,
        },{
          isIndeterminate: false,
          checked: [],
          checkAll: false,
        },{
          isIndeterminate: false,
          checked: [],
          checkAll: false,
        }
      ],
      roleOptions : asyncRouterMap
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
  created(){
    this.getList(this.pageNo - 1)
  },
  methods: {
    getList(n) {
      var _this = this;
      _this.listLoading = true;
      fetch({
        method: 'post',
        url: '/sys/getSubAccountList',
        params: {
          'parentId': this.userInfo.userId,
          'pageNo' : n,
          'pageSize': this.pageSize
        }
      }).then((res) => {
        console.log(res)
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
    handleCheckAllChange(index,event) {
      console.log(index)
      let options = [];
      for(let i = 0;i<asyncRouterMap[index].children.length;i++){
        if(asyncRouterMap[index].children[i].meta){
          options.push(asyncRouterMap[index].children[i].meta.id)
        }
      }
      this.roleChecked[index].checked = this.roleChecked[index].checkAll ? options : [];
      this.roleChecked[index].isIndeterminate = false;
    },
    handleCheckedChange(index) {
      let checkedCount = this.roleChecked[index].checked.length;
      let options = [];
      for(let i = 0;i<asyncRouterMap[index].children.length;i++){
        if(asyncRouterMap[index].children[i].meta){
          options.push(asyncRouterMap[index].children[i].meta.id)
        }
      }
      this.roleChecked[index].checkAll = checkedCount === options.length;
      this.roleChecked[index].isIndeterminate = checkedCount > 0 && checkedCount < options.length;
    },
    edit(row) {
      if(row){
        var that = this;
        // console.log(row);
        this.editForm.parentId = this.userInfo.userId;
        this.editForm.userId = row.userId;
        this.editForm.userName = row.userName;
        this.editForm.password = row.password;
        this.editForm.nickName = row.nickName;
        this.editForm.credit = row.credit;
        this.editForm.status = row.status.toString();
        this.editForm.remark = row.remark;
        this.editForm.userNameDisable = true;
        var role = row.role.split(',');
        role = role.map(x => +x);
        role.forEach(function(value){
          if(value <= 6){
            that.roleChecked[value].checkAll = true;
          }else if(value <=9 && value > 6){
            that.roleChecked[0].checked.push(value)
          }else if(value <=14 && value > 9){
            that.roleChecked[1].checked.push(value)
          }else if(value <=19 && value > 14){
            that.roleChecked[2].checked.push(value)
          }else if(value <=22 && value > 19){
            that.roleChecked[3].checked.push(value)
          }else if(value <=24 && value > 22){
            that.roleChecked[5].checked.push(value)
          }else if(value <=28 ){
            that.roleChecked[6].checked.push(value)
          }
        });
      }else{
        for(let i = 0;i<=6;i++){
          let a = {
            isIndeterminate: false,
            checked: [],
            checkAll: false,
          };
          this.roleChecked.push(a)
        }
        this.editForm = {
          userId: '',
          userName: '',
          password: '',
          nickName: '',
          userNameDisable: false,
          credit: '',
          role: [],
          admin: '0',
          child: '0',
          status: '0',
          remark: ''
        }
      }
      this.dialogFormVisible = true
    },
    editSubmit(formName){
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.editForm.userNameDisable){//编辑
            let roleChecked = this.roleChecked,
              role = [];
            for(let i = 0;i<roleChecked.length;i++){
              if(roleChecked[i].isIndeterminate || roleChecked[i].checkAll){
                role.push(i)
              }
              role.push(...roleChecked[i].checked)
            }
            this.editForm.role = role.toString();
            this.$store.dispatch('UpdateUserInfo', this.editForm).then((res) => {
              // console.log(res)
              this.dialogFormVisible = false;
              if(res.suc){
                that.$message.success(res.msg);
                this.getList(this.pageNo - 1)
              }else{
                that.$message.error(res.msg)
              }
            })
          }else{//新增
            let roleChecked = this.roleChecked,
                role = [];
            for(let i = 0;i<roleChecked.length;i++){
              if(roleChecked[i].isIndeterminate || roleChecked[i].checkAll){
                role.push(i)
              }
              role.push(...roleChecked[i].checked)
            }
            // console.log(role.toString());
            fetch({
              method: 'post',
              url: '/sys/addSubAccount',
              params: {
                'parentId': this.userInfo.userId,
                'userName':this.editForm.userName,
                'password': this.editForm.password,
                'nickName': this.editForm.nickName,
                'credit': this.editForm.credit,
                'role': role.toString(),
                'status': parseInt(this.editForm.status),
                'remark': this.editForm.remark
              }
            }).then((res) => {
              // console.log(res)
              that.dialogFormVisible = false;
              if(res.suc){
                that.$message.success(res.msg);
                this.getList(this.pageNo - 1)
              }else{
                that.$message.error(res.msg)
              }
            })
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    changePwdSubmit(){
      let that = this;
      this.$refs['pwdForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('ChangePwdForOther', this.pwdForm).then((res) => {
            // console.log(res)
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
