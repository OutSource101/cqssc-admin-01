import { login, logout, getInfo, getNextPeriods, changePwd, changePwdForOther, updateUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    userInfo: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data;
          setToken(data.token);
          commit('SET_TOKEN', data.token);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then((res) => {
          const data = res.data;
          if(data){
            commit('SET_ROLES', data.role);
            commit('SET_USERINFO', data);
          }
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.userInfo.userName).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    //获取最新一期
    GetNextPeriods({ commit, state }) {
      return new Promise((resolve, reject) => {
        getNextPeriods().then((res) => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },
    //修改密码
    ChangePwd({commit},form){
      return new Promise((resolve, reject) => {
        changePwd(form.userId,form.oldPwd,form.newPwd).then((res) => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },
    //修改下级密码
    ChangePwdForOther({commit},form){
      return new Promise((resolve, reject) => {
        changePwdForOther(form.userId,form.oldPwd,form.newPwd).then((res) => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },
    //修改用户信息
    UpdateUserInfo({commit},form){
      return new Promise((resolve, reject) => {
        updateUserInfo(form.userId,form.nickName,form.credit,form.role,form.status,form.remark).then((res) => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve()
      })
    }
  }
}

export default user
