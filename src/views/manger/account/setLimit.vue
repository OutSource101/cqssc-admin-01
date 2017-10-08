<template>
  <div class="app-container">
    <el-form ref="form" >
      <el-form-item label="信息提示" style="margin-top: 20px;">
        <span style="margin-right: 20px">设置{{parent.level | levelFilter}}：{{parent.userName}}</span>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label='类别' align="center" prop="betTypeName" width="90"></el-table-column>
      <el-table-column label="最小下注" align="center" prop="minLimitBetAmount">
        <template scope="scope">
          <div v-if="scope.row.minLimitBetAmount">
          <el-input v-model="scope.row.minLimitBetAmount" auto-complete="off" style="width: 60px"></el-input>
          <span style="color: red">>={{scope.row.pMinLimitBetAmount}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="赔率上限(多个用／分开)" align="center" width="100">
        <template scope="scope" >
          <div v-if="scope.row.pLimitOdds1">
          <span v-if="scope.row.pLimitOdds1!=0">{{scope.row.pLimitOdds1}}</span>
          <span v-if="scope.row.pLimitOdds2!=0">/{{scope.row.pLimitOdds2}}</span>
          <span v-if="scope.row.pLimitOdds3!=0">/{{scope.row.pLimitOdds3}}</span>
          <span v-if="scope.row.pLimitOdds4!=0">/{{scope.row.pLimitOdds4}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单注上限" align="center" prop="maxLlimitSigleBet">
        <template scope="scope">
          <div v-if="scope.row.maxLlimitSigleBet">
          <el-input v-model="scope.row.maxLlimitSigleBet" auto-complete="off" style="width: 60px"></el-input>
          <span style="color: red"><={{scope.row.pMaxLimitSigleBet}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单项上限" align="center" prop="maxLimitItemBet">
        <template scope="scope">
          <div v-if="scope.row.maxLimitItemBet">
          <el-input v-model="scope.row.maxLimitItemBet" auto-complete="off" style="width: 80px"></el-input>
          <span style="color: red"><={{scope.row.pMaxLimitItemBet}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="拦货金额" align="center" prop="maxLimitStore" width="80"></el-table-column>
      <el-table-column label="赚水"  align="center" prop="commission" width="130">
        <template scope="scope">
          <div v-if="scope.row.commission!==undefined">
          <el-select v-model="scope.row.commission" @change="handleCange(scope.row)">
            <el-option v-for="item in scope.row.comOptions" :label="item" :value="item"></el-option>
          </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="赔率(多个用／分开)" align="center" prop="" width="100">
        <template scope="scope">
          <div v-if="scope.row.limitOdds1">
          <span v-if="scope.row.limitOdds1!=0">{{scope.row.limitOdds1}}</span>
          <span v-if="scope.row.limitOdds2!=0">/{{scope.row.limitOdds2}}</span>
          <span v-if="scope.row.limitOdds3!=0">/{{scope.row.limitOdds3}}</span>
          <span v-if="scope.row.limitOdds4!=0">/{{scope.row.limitOdds4}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin:20px 0" v-if="!listLoading">
      <el-button class="filter-item" @click="routerBack" style="margin-right: 20px">返回</el-button>
      <el-button type="primary" class="filter-item" @click="">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fetch from '@/utils/fetch'
import { step } from '@/utils/index'
export default {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data() {
    return {
      list: null,
      listLoading: true,
      parent: {
        userId : '',
        level: '',
        userName: ''
      }
    }
  },
  created() {
    if(this.$route.params.userId){
      this.parent.userId = this.$route.params.userId;
      this.parent.userName = this.$route.params.userName;
      this.parent.level = this.$route.params.level;
    }
    this.getData();
  },
  filters : {
    levelFilter(value){
      if(value){
        const levelMap = ['大股东','股东','总代','代理'];
        return levelMap[value]
      }
    }
  },
  methods: {
    //renderHeader(createElement, { _self }) {
//      return createElement(
//        '<el-checkbox v-model="checked">赚水</el-checkbox>',
//      )
    //},
    getData() {
      let _this = this;
      _this.listLoading = true;
      fetch({
        method: 'post',
        url: '/sys/getBetSetting',
        params: {
          'userId': this.parent.userId
        }
      }).then((res) => {
         console.log(res)
        _this.listLoading = false;
        if(res.suc){
          let data = res.data;
          data.forEach((item)=>{
            if(item.spaceBetween && item.maxCommission){
              item.comOptions = step(item.maxCommission,item.spaceBetween,item.beginCommission)
            }
          });
          console.log(data);
          let two = {betTypeName : '二字定'};
          let three = {betTypeName : '三字定'};
          data.unshift(two);
          data.splice(7, 0,three);

          _this.list = data;
        } else {
          _this.$message.error(res.msg)
        }
      })
    },
    handleCange(item){
      let value = item.commission;
      for (var i = 1; i < 5; i++) {
        var calcOdds = item['bLimitOdds' + i] - item['hLimitOdds' + i] * (item.pCommission + value);
        calcOdds = calcOdds.toFixed(9) - 0;
        console.log(calcOdds)
        item['limitOdds' + i] = calcOdds;
      }
    },
    routerBack(){
      this.$router.go(-1);
    }
  }
}
</script>
