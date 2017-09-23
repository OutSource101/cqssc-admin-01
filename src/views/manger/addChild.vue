<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="信息提示">
        <span>可用额度：0</span>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.name" style="width: 300px"></el-input>
        <el-button type="primary" @click="">账号检查</el-button>
        <span style="color: red">(只能是字母和数字，并字母开头，长度为3-12位)</span>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" auto-complete="off" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" auto-complete="off" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nick" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="信用额度">
        <el-input v-model="form.nick" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="拦货占成上限">
        <el-select v-model="form.admin" placeholder="总代">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
        <el-select v-model="form.child" placeholder="代理">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
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
      <el-form-item label="信用额度">
        <el-input v-model="form.nick" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" style="width: 300px" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
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
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      form: {
        name: '',
        pass: '',
        checkPass: '',
        nick: '',
        admin: '',
        child:'',
        status: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
