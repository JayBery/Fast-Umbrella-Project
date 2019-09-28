// pages/addressList/addressList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg: true,
    bg1: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({

      title: "地址簿"

    });
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

  },
  addressEdit(){
    wx.navigateTo({
      url: '../addressEdit/addressEdit',
    })
  },
  set() {
    wx.navigateTo({
      url: '../addressEndEdit/addressEndEdit',
    })
  },
  choose() {
    this.setData({
      bg: false,
      bg1: true
    })
  },
  choose1() {
    this.setData({
      bg: true,
      bg1: false
    })
  }
})