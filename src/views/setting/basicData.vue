<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="账号">
        qq123
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.number" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="占成">
        q阿瑟费短发
      </el-form-item>
      <el-form-item label="账户状态">
        启动
      </el-form-item>
      <el-form-item label="信用额度">
        0
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        number: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    }
  }
}
</script>
