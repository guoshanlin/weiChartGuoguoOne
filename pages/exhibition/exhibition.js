// pages/exhibition/exhibition.js
const app = getApp()

Page({
  data: {
    userInfo: null,
    isLoginPopup: false,
    hasUserInfo: false,
    list: { name: '2018雁栖湖企业家论坛', time: '2018-10-29至2018-10-31', imgUrl: '../../images/activity.jpg', address: '北京市怀柔区' }
  },
  //事件处理函数
  bindViewTap: function (event) {
    console.log(event);
    wx.navigateTo({
      url: event.target.dataset.url
    })
  },
  onLoad: function () {
    console.log('onLoad', this.data.isLoginPopup)
    console.log('onLoad', this.data.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        isLoginPopup: false
      })
    } else {
      this.openLoginPopup()
    }
  },
  getUserInfo: function (e) {

    console.log('getUserInfo', e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      // isLoginPopup: false
    })
  },

  agreeGetUser: function (e) {
    console.log(JSON.stringify(e))
    var userInfo = e.detail.userInfo;
    console.log(userInfo)
    var self = this;
    if (userInfo) {
      self.setData({ userInfo: userInfo })
      app.globalData.userInfo = userInfo
      // 获取unionId
      // auth.getUnionId(app, e.detail.encryptedData, e.detail.iv)
      // auth.updateMembers(userInfo, app)
      setTimeout(function () {
        self.setData({ isLoginPopup: false })
      }, 1200);
    }
  },
  closeLoginPopup() {
    this.setData({ isLoginPopup: false });
  },
  openLoginPopup() {
    this.setData({ isLoginPopup: true });
  }
})