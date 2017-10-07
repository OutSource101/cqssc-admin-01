<template>
    <div>
      {{ label }}
    </div>
</template>

<script>

	export default {
		name: 'Periodsbar',
		data() {
			return {
        label : '',
        getInterval: '',
        periodsStatus: 0
      }
		},
    created() {
      this.getLastPeriods();
    },
    methods: {
      getLastPeriods() {
        var _this = this;
        _this.$store.dispatch('GetNextPeriods').then((res) => {
          // console.log(res.data)
          if(!res.suc)return;
          var data = res.data;
          if(!data.status){
            _this.label = '最近无开盘';
          }else{
            switch(data.PeriodsStatus){
              case 1 :
                var temp = new Date(data.DrawDt);
                temp.setSeconds(temp.getSeconds() + 5);
                _this.calcDiff(temp, data.nowDateTime, function (day, hours, minute, seconds, flags) {
                  var tempvalue;
                  if (flags) {
                    tempvalue = 0;
                    _this.label = '距离[20' + data.PeriodsNumber + ']期开盘还有' + day + '天' + hours + '小时' + minute + '分钟' + seconds + '秒';
                  } else {
                    tempvalue = 1;
                    _this.label = '[正在开盘中......]';
                    //会重复跑
                    if(_this.periodsStatus !== tempvalue){
                      setTimeout(function (){
                      _this.getLastPeriods()
                      }, 5000);
                    }
                  }
                  _this.periodsStatus = tempvalue;
                })
                break;
              case 0:
                var temp = new Date(data.CloseDt);
                temp.setSeconds(temp.getSeconds() + 3);
                _this.calcDiff(temp, data.nowDateTime, function (day, hours, minute, seconds, flags) {
                  var tempvalue;
                  if (flags) {
                    tempvalue = 0;
                    _this.label = '距离[20' + data.PeriodsNumber + ']期封盘还有' + day + '天' + hours + '小时' + minute + '分钟' + seconds + '秒';
                  }
                  else {
                    tempvalue = 2;
                    _this.label = '[正在封盘中......]';
                    if (_this.periodsStatus !== tempvalue) {
                      setTimeout(function () {
                        _this.getLastPeriods()
                      }, 3000);
                    }
                  }
                  _this.periodsStatus = tempvalue;
                });
                break;
            }
          }
        })
      },
      calcDiff (e, n, callback) {
        var end = new Date(e),
          now = new Date(n),
          secondsCount = (end - now) / 1000,
          day = (secondsCount / 86400) | 0,
          hours = (secondsCount % 86400) / 3600 | 0,
          minute = (secondsCount % 3600) / 60 | 0,
          seconds = (secondsCount % 60);
        if (calcInterval !== null) {
          clearInterval(calcInterval);
        }
        var last = +(new Date());
        var calcInterval = setInterval(function () {
          if (seconds <= 0) {
            if (minute > 0) {
              minute = minute - 1;
              seconds = 60;
            }
            else if (hours > 0) {
              hours = hours - 1;
              minute = 59;
              seconds = 60;
            }
            else if (day > 0) {
              day = day - 1;
              hours = 23;
              minute = 59;
              seconds = 60;
            }
            else {
              clearInterval(calcInterval);
              callback(day, hours, minute, seconds, (day + hours + minute + seconds) <= 0 ? false : true);
              return;
            }
          }
          var n = +(new Date());
          var sc = Math.round((n - last) / 1000);
          n = last + sc*1000;
          seconds -= sc;
          last = n;
          callback(day, hours, minute, seconds, (day + hours + minute + seconds) <= 0 ? false : true);
        }, 1000);
        callback(day, hours, minute, seconds, (day + hours + minute + seconds) <= 0 ? false : true);
      },
    }
	}
</script>
