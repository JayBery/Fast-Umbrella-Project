// pages/personalData/personalData.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false,
    schoolShow: false,
    personalShow: false,
    gender: ['男', '女'],
    date: '2000-01-01',
    index: 0,
    array: [100],
    arrayIndex: 60,
    name: '',
    school: '无',
    personal: '无',
    timename: '',
    timeschool: '',
    timepersonal: '',
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({

      title: "编辑资料"

    });
    app.editTabbar();
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
    let a = this.data.array[0];
    for(let i=0;i<100;i++){
      a = a+1;
      this.setData({
        array: this.data.array.concat(a)
      })
    }
    this.setData({
      name: this.data.userInfo.nickName
    })
  },
  changeName() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
    this.setData({ schoolShow: false });
    this.setData({ personalShow: false });
  },
  bindViewEvent: function (e) {
    this.setData({ index: e.detail.value });
  },
  bindViewEvent2: function (e) {
    this.setData({ date: e.detail.value });
  },
  bindPickerChange : function(e){
    this.setData({ arrayIndex: e.detail.value });
  },
  saveNameInput: function(e){
    this.setData({
      timename: e.detail.value
    })
    console.log('暂存名字', e.detail.value)
  },
  saveSchoolInput: function (e) {
    this.setData({
      timeschool: e.detail.value
    })
    console.log('暂存学校', e.detail.value)
  },
  savePersonalInput: function (e) {
    this.setData({
      timepersonal: e.detail.value
    })
    console.log('暂存自我介绍', e.detail.value)
  },
  changeSchool(){
    this.setData({ schoolShow: true });
  },
  saveName(){
    this.setData({
      name: this.data.timename
    })
    this.onClose()
  },
  saveSchool(){
    this.setData({
      school: this.data.timeschool
    })
    this.onClose()
  },
  savePersonal() {
    this.setData({
      personal: this.data.timepersonal
    })
    this.onClose()
  },
  changePersonal() {
    this.setData({ personalShow: true });
  },
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 9) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
      }
    })
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