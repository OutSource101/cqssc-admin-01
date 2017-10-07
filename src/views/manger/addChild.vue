<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="信息提示">
        <span>可用额度：0</span>
      </el-form-item>
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" style="width: 300px"></el-input>
        <el-button type="primary" :disabled="btnFlag" @click="checkUser">账号检查</el-button>
        <!--<div style="color: red">(只能是字母和数字，并字母开头，长度为3-12位)</div>-->
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" auto-complete="off" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" auto-complete="off" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nick">
        <el-input v-model="form.nick" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="信用额度" prop="credit">
        <el-input v-model="form.credit" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="拦货占成上限">
        总代：
        <el-select v-model="form.admin" style="width: 100px">
          <el-option label="0" value="0"></el-option>
        </el-select>
        代理：
        <el-select v-model="form.child" style="width: 100px">
          <el-option label="0" value="0"></el-option>
        </el-select>
        <br/>
        <span style="color: red">（设置占成，需要在“设置”中添加 拦货金额才生效）。提示:如果庄家先吃满,则不以所设成数来分配,以实际分配到拦货中金额为准。</span>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status">
          <el-option label="启用" value="0"></el-option>
          <el-option label="锁住" value="1"></el-option>
          <el-option label="禁用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" style="width: 300px" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import fetch from '@/utils/fetch'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else if (value.length < 3 || value.length > 12  ){
        callback(new Error('账号长度为3-12'));
      } else if (!(/^[A-Za-z]/.test( value ))){
        callback(new Error('账号只能字母开头'));
      } else {
        callback();
        this.btnFlag = false;
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        name: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        nick : [
          { required: true, trigger: 'blur', message: '请输入昵称'}
        ],
        credit : [
          { required: true, trigger: 'blur', message: '请输入信用额度'}
        ]
      },
      btnFlag: true,
      form: {
        name: '',
        pass: '',
        checkPass: '',
        nick: '',
        credit: '',
        admin: '0',
        child: '0',
        status: '0',
        desc: ''
      }
    }
  },
  methods: {
    checkUser() {
      if(this.form.name){
        fetch({
          method: 'post',
          url: '/sys/checkUserNameExist',
          params: {
            'userName': this.form.name
          }
        }).then((res) => {
          // console.log(res)
          if(res.msg){
            this.$message(res.msg)
          }
        })
      }
    },
    onSubmit(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fetch({
            method: 'post',
            url: '/sys/createManage',
            params: {
              'parentId': this.userInfo.userId,
              'userName': this.form.name,
              'password': this.form.checkPass,
              'nickName': this.form.nick,
              'credit': this.form.credit,
              'status': parseInt(this.form.status),
              'remark': this.form.desc
            }
          }).then((res) => {
            // console.log(res)
            if(res.suc){
              that.$message.success(res.msg);
              setTimeout(()=>{
                location.reload();
              },2000);
            }else{
              that.$message.error(res.msg)
            }

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
