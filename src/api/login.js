import fetch from '@/utils/fetch'

export function login(userName, password) {
  return fetch({
    url: '/login',
    method: 'post',
    params: {
      userName: userName,
      password: password
    }
  })
}

export function getInfo() {
  return fetch({
    url: '/sys/getUserInfo',
    method: 'post'
  })
}

export function logout(userName) {
  return fetch({
    url: '/logout',
    method: 'post',
    params: {
      userName: userName
    }
  })
}

export function getNextPeriods() {
  return fetch({
    url: '/lottery/getNextPeriods',
    method: 'post'
  })
}

export function changePwd(userId,oldPwd,newPwd) {
  return fetch({
    url: '/sys/changePwd',
    method: 'post',
    params: {
      'oldPwd' : oldPwd,
      'newPwd': newPwd,
      'userId': userId
    }
  })
}

export function changePwdForOther(userId,oldPwd,newPwd) {
  return fetch({
    url: '/sys/changePwdForOther',
    method: 'post',
    params: {
      'oldPwd' : oldPwd,
      'newPwd': newPwd,
      'userId': userId
    }
  })
}

export function updateUserInfo(userId,nickName,credit,role,status,remark) {
  return fetch({
    url: '/sys/updateUserInfo',
    method: 'post',
    params: {
      'userId': userId,
      'nickName': nickName,
      'credit': credit,
      'role': role,
      'status': parseInt(status),
      'remark': remark
    }
  })
}
