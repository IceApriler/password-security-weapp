// pages/index/index.js
let { CryptoJS, Encrypt, Decrypt } = require("../../utils/util.js")
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '/pages/index/index',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  handleChange({ detail }) {
    wx.switchTab({
      url: detail.key
    })
  },
  getUserInfo (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  entry() {
    const key256Bits = CryptoJS.PBKDF2("Secret Passphrase", 'salt', { keySize: 256 / 32 })
    const iv16 = CryptoJS.enc.Hex.parse('hehe')
    const key = CryptoJS.enc.Utf8.parse(key256Bits)  //十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Utf8.parse(iv16)   //十六位十六进制数作为密钥偏移量
    let str = Encrypt('你好', { key, iv })
    let str2 = Decrypt(str, { key, iv })
    console.log(str, str.length)
    console.log(str2)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.entry()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})