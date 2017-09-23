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
          <el-button class="filter-item" size="mini" @click="addMember" type="info" icon="">新增会员</el-button>
          <el-button class="filter-item" size="mini" @click="dialogFormVisible = true" type="info" icon="">编辑</el-button>
          <el-button class="filter-item" size="mini" @click="dialogPwd = true" type="info" icon="">修改密码</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">设置限额</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">月报表</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">日志</el-button>
          <el-button class="filter-item" size="mini" @click="" type="info" icon="">拦货金额日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑对话框-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" labelWidth="100px">
        <el-form-item label="账号">
          {{editForm.number}}
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editForm.nick" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="信用额度">
          <el-input v-model="editForm.credit" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="拦货占成上限">
          <el-select v-model="editForm.admin" placeholder="总代" style="width: 100px">
            <el-option label="Zone one" value="shanghai"></el-option>
            <el-option label="Zone two" value="beijing"></el-option>
          </el-select>
          <el-select v-model="editForm.child" placeholder="代理" style="width: 100px">
            <el-option label="Zone one" value="shanghai"></el-option>
            <el-option label="Zone two" value="beijing"></el-option>
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
          <el-input type="textarea" style="width: 300px" v-model="editForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改密码对话框-->
    <el-dialog title="修改密码" :visible.sync="dialogPwd">
      <el-form :model="pwdForm" :rules="rules" ref="pwdForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="pwdForm.pass" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="pwdForm.checkPass" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPwd = false">取 消</el-button>
        <el-button type="primary" @click="dialogPwd = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
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
      } else if (value !== this.pwdForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
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
      dialogFormVisible: false,
      dialogPwd: false,
      pwdForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      editForm:{
        number: 'sdeqwe123',
        nick: '',
        credit: '',
        admin: '',
        child: '',
        status: '',
        desc: ''
      },
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
    addMember(){
      //要传代理id
      this.$router.push({path: '/manger/addMember'})
    }
  }
}
</script>
