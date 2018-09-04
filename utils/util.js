const CryptoJS = require("./crypto-js/index.js")

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//加密
const Encrypt = (word, { key, iv } = {}) =>  {
  // encode to utf8
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  // 加密后得到的密文还不是字符串。encrypted，是一个密码参数对象。
  // 加密参数对象允许您访问加密过程中使用的所有参数。比如iv, key, raw ciphertext itself.
  // 返回base64加密字符串
  return encrypted.ciphertext.toString().toUpperCase()
}

// 解密
const Decrypt = (word, {key, iv} = {}) => {
  // 格式化为CryptoJS格式
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  // base64解密
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

module.exports = {
  formatTime,
  CryptoJS,
  Encrypt,
  Decrypt
}
