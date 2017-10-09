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
          <el-input v-model="scope.row.maxLlimitSigleBet" @change="inputChange(scope.row)" auto-complete="off" style="width: 60px"></el-input>
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
          <el-select v-model="scope.row.commission" @change="handleChange(scope.row)">
            <el-option v-for="(item , index) in scope.row.comOptions" :label="item" :value="item" :key="index"></el-option>
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
      <el-button type="primary" class="filter-item" @click="onSubmit">提交</el-button>
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
        userId: '',
        level: '',
        userName: ''
      }
    }
  },
  created() {
    if (this.$route.params.userId) {
      this.parent.userId = this.$route.params.userId;
      this.parent.userName = this.$route.params.userName;
      this.parent.level = this.$route.params.level;
    }
    this.getData();
  },
  filters: {
    levelFilter(value) {
      if (value) {
        const levelMap = ['大股东','股东','总代','代理'];
        return levelMap[value]
      }
    }
  },
  methods: {
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
         // console.log(res)
        _this.listLoading = false;
        if (res.suc) {
          let data = res.data;
          data.forEach((item)=>{
            if(item.spaceBetween && item.maxCommission){
              item.comOptions = step(item.maxCommission,item.spaceBetween,item.beginCommission)
            }
          });
          console.log(data);
          const two = { betTypeName: '二字定'};
          const three = { betTypeName: '三字定'};
          data.unshift(two);
          data.splice(7, 0, three);

          _this.list = data;
        } else {
          _this.$message.error(res.msg)
        }
      });
    },
    inputChange(item) {
      const value = item.maxLlimitSigleBet;
      const betTypeId = item.betTypeId;
      let _this = this;
      if (betTypeId >= 2 && betTypeId <= 7) {
        for (let i = 1; i < 7; i++) {
          _this.list[i].maxLlimitSigleBet = value;
        }
      } else if (betTypeId >= 9 && betTypeId <= 12) {
        for (let i = 8; i < 12; i++) {
          _this.list[i].maxLlimitSigleBet = value;
        }
      }
    },
    handleChange(item) {
      const value = item.commission;
      const betTypeId = item.betTypeId;
      let _this = this;
      if (betTypeId >= 2 && betTypeId <= 7) {
        for (let i = 1; i < 7; i++) {
          _this.list[i].commission = value;
          _this.changeOdds(_this.list[i]);
        }
      } else if (betTypeId >= 9 && betTypeId <= 12) {
        for (let i = 8; i < 12; i++) {
          _this.list[i].commission = value;
          _this.changeOdds(_this.list[i]);
        }
      } else {
        _this.changeOdds(item);
      }
    },
    changeOdds(item) {
      const value = item.commission;
      for (let i = 1; i < 5; i++) {
        let calcOdds = item['bLimitOdds' + i] - item['hLimitOdds' + i] * (item.pCommission + value);
        calcOdds = calcOdds.toFixed(9) - 0;
        item['limitOdds' + i] = calcOdds;
      }
    },
    routerBack() {
      this.$router.go(-1);
    },
    onSubmit() {}
  }
}
</script>
