<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="账号">
        {{ userInfo.userName }}
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userInfo.nickName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="占成">
        0
      </el-form-item>
      <el-form-item label="账户状态">
        {{ userInfo.status | statusFilter}}
      </el-form-item>
      <el-form-item label="信用额度">
        {{ userInfo.credit | isNull}}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
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

      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = ['启用', '锁住', '禁用'];
        return statusMap[status]
      },
      isNull(value){
        if(!value){
          return 0
        }else{
          return value
        }
      }
    },
    created() {
      this.$store.dispatch('GetInfo');
    },
    methods: {
      onSubmit() {
        var that = this;
        fetch({
          method: 'post',
          url: '/sys/updateUserInfo',
          params: {
            'nickName': that.userInfo.nickName,
            'userId': that.userInfo.userId
          }
        }).then((res) => {
          // console.log(res)
          if(res.suc){
            that.$message.success(res.msg);
            that.$store.dispatch('GetInfo');
            // location.reload();
          }else{
            that.$message.error(res.msg)
          }
        })
      }
    }
  }
</script>
