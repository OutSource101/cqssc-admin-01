<template>
    <div>
      {{ label }}
    </div>
</template>

<script>

	export default {
		name: 'Periodsbar',
		data() {
		  var periodsMainInterval,getInterval;
			return {
//			  data: {
//          "CompanyID": "37614",
//          "ID": "45930",
//          "CloseDt": "2017/9/29 20:59:00",
//          "DrawDt": "2017/9/29 21:00:00",
//          "OpenDt": "2017/9/29 20:50:00",
//          "PeriodsStatus": 1,
//          "status": true,
//          "PeriodsNumber": "20170929090",
//          "info": "获取成功",
//          "nowDateTime": "2017/9/29 20:58:39"
//        },
        data : {"CompanyID":"37614","ID":"45932","CloseDt":"2017/9/29 21:19:00","DrawDt":"2017/9/29 21:20:00","OpenDt":"2017/9/29 21:10:00","PeriodsStatus":0,"status":true,"PeriodsNumber":"20170929092","info":"获取成功","nowDateTime":"2017/9/29 21:09:53"},
        label : ''
      }
		},
    created() {
      this.handleData(this.data)
    },
    methods: {
      getLastPeriods() {
        console.log('getLastPeriods')
//        this.$store.dispatch('GetLastPeriods').then((res) => {
//          this.data = res.data;
//        })
      },
      handleData(data) {
        var _this = this;
        if(!data.status){
          _this.label = '最近无开盘';
        }else{
          switch(data.PeriodsStatus){
            case 0 :
              var temp = new Date(data.OpenDt);
              temp.setSeconds(temp.getSeconds() + 5);
              _this.calcDiff(temp, data.nowDateTime, function (day, hours, minute, seconds, flags) {
                if (flags) {
                  _this.label = '距离[' + data.PeriodsNumber + ']期开盘还有' + day + '天' + hours + '小时' + minute + '分钟' + seconds + '秒';
                } else {
                  _this.label = '[正在开盘中......]';
                  if (periodsMainInterval) {
                    clearInterval(periodsMainInterval);
                    periodsMainInterval = null;
                  }
                  if (!periodsMainInterval) {
                    setTimeout(function (){
                      _this.getLastPeriods()
                      }, 5000
                    );
                    var periodsMainInterval = setInterval(_this.getLastPeriods(), 180000);
                  }
                }
              })
              break;
            case 1:
              var temp = new Date(data.CloseDt);
              temp.setSeconds(temp.getSeconds() + 3);
              _this.calcDiff(temp, data.nowDateTime, function (day, hours, minute, seconds, flags) {
                if (flags) {
                  _this.label = '距离[' + data.PeriodsNumber + ']期封盘还有' + day + '天' + hours + '小时' + minute + '分钟' + seconds + '秒';
                }
                else {
                  _this.label = '[正在开盘中......]';
                  if (getInterval != null) {
                    clearInterval(getInterval);
                    getInterval = null;
                  }
                  if (getInterval == null) {
                    //periods.main();
                    setTimeout(function () {
                      _this.getLastPeriods()
                    }, 5000);
                    var getInterval = setInterval(_this.getLastPeriods(), 180000);
                  }
                }
              });
              break;
          }
        }
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
