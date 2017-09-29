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

export function logout() {
  return fetch({
    url: '/logout',
    method: 'post'
  })
}
