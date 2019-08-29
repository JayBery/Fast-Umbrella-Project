// pages/setting/setting.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      wx.login({
        success: function (res) {
          console.log(res);
        }
      })
      app.globalData.userInfo = e.detail.userInfo
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        hasUserInfo: true
      })
      wx.navigateBack({
        delta: 1,
      })
      // wx.reLaunch({
      //   url: '../mine/mine'
      // })
      
    } else {
      wx.showModal({
      title: '提示',
      confirmText: '去设置',
      showCancel: false,
      content: "请允许授权",
      success: function (res) {}
    })
    }
  },
})