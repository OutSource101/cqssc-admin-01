<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名">
        {{userInfo.userName}}
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input type="password" v-model="ruleForm.oldPwd" auto-complete="off" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="newPwd">
        <el-input type="password" v-model="ruleForm.newPwd" auto-complete="off" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
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
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          oldPwd: '',
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
        }
      };
    },
    created(){
      this.ruleForm.userId = this.userInfo.userId;
    },
    methods: {
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('ChangePwd', this.ruleForm).then((res) => {
              // console.log(res)
              if(res.suc){
                that.$message.success(res.msg+ '请重新登陆');
                setTimeout(()=>{
                  that.$store.dispatch('FedLogOut').then(() => {
                    location.reload()// 为了重新实例化vue-router对象 避免bug
                  })
                },2000);
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
