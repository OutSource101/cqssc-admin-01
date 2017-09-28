import fetch from '@/utils/fetch'

export function login(userName, password) {
  return fetch({
    url: '/login?userName='+userName+'&password='+password,
    method: 'post',
    // data: {
    //   userName: userName,
    //   password: password
    // }
  })
}

export function getInfo() {
  return fetch({
    url: '/sys/getUserInfo',
    method: 'post'
  })
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}
