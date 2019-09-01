const app = getApp()

Page({
  data: {
    postAll: {},
    longitude: 113.324520,
    latitude: 23.099994,
    markers: [{
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      active: 1
    }],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    jump: false,
    result: '',
  },
  onLoad: function () {
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
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        //console.log(res.latitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude
          }]
        })
      }
    })
  },
  onChange(event) {
    if (event.detail.index == 0){
      wx.showToast({
        title: `送伞模式`,
        icon: 'none'
      });
    }else{
      wx.showToast({
        title: `扫码借伞`,
        icon: 'none'
      });
    }
  },
  startFinish(e) {
    this.data.postAll.startPlace = e.detail.value
    if (this.data.postAll.startPlace && this.data.postAll.endPlace && this.data.postAll.phone){
      //如果都填写完 1.未授权跳转授权页然后跳转确认订单 2.授权过了直接确认订单
      if (this.data.hasUserInfo){
        console.log("授权过了直接确认订单")
      }else{
        if (this.jump) {
          return;
        }
        this.jump = true;
        wx.navigateTo({
          url: '../setting/setting',
        })
      }
    }
  }, 
  endFinish(e) {
    this.data.postAll.endPlace = e.detail.value
    if (this.data.postAll.startPlace && this.data.postAll.endPlace && this.data.postAll.phone) {
      if (this.data.hasUserInfo) {
        console.log("授权过了直接确认订单")
      } else {
        if (this.jump) {
          return;
        }
        this.jump = true;
        wx.navigateTo({
          url: '../setting/setting',
        })
      }
    }
  },
  phoneFinish(e) {
    this.data.postAll.phone = e.detail.value
    if (this.data.postAll.startPlace && this.data.postAll.endPlace && this.data.postAll.phone) {
      if (this.data.hasUserInfo) {
        console.log("授权过了直接确认订单")
      } else {
        if (this.jump) {
          return;
        }
        this.jump = true;
        wx.navigateTo({
          url: '../setting/setting',
        })
      }
    }
  },
  getScancode: function () {
    var _this = this;
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log("扫描成功")
      }
    })


  },
  onReady: function () {

  }
})