const userInfo = 'userInfo'

// 保存用户信息
const saveUserInfo = function (userObj = {}) {
  window.localStorage.setItem(userInfo, JSON.stringify(userObj))
}

// 获取用户信息
const getUserInfo = function () {
  if (window.localStorage.getItem(userInfo)) {
    return JSON.parse(window.localStorage.getItem(userInfo))
  }
  return {}
}

// 移除用户信息
const removeUserInfo = function () {
  window.localStorage.removeItem(userInfo)
}

// 读取用户的身份令牌
const getUserToken = function () {
  if (window.localStorage.getItem(userInfo)) {
    return JSON.parse(window.localStorage.getItem(userInfo)).token
  }
  return ''
}

export {
  saveUserInfo,
  getUserInfo,
  removeUserInfo,
  getUserToken
}
