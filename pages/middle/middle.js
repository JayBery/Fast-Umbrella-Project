const app = getApp()
// import Notify from '/miniprogram_npm/vant-weapp/notify/notify';
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify'
Page({
  data: {
    postAll: {},
    markers: [{
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 13.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    result: '',
    phoneIf: false,
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
  getUserInfo: function (e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              app.globalData.userInfo = res.userInfo
              that.setData({
                name: res.userInfo.nickName,
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              wx.login({
                success: function (res) {
                  console.log(res);
                }
              })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          that.showSettingToast("请授权")
        }
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
    var key = e.target.id
    if (key == "startPlace") {
      this.data.postAll.startPlace = e.detail.value
    } else if (key == "endPlace") {
      this.data.postAll.endPlace = e.detail.value
    } else if (key == "phone") {
      this.data.postAll.phone = e.detail.value
    }
    // debugger
    if (this.data.phoneIf == false){
      return;
    }
    if (this.data.postAll.startPlace && this.data.postAll.endPlace && this.data.postAll.phone){
      if (this.data.hasUserInfo){
        wx.redirectTo({
          url: '../confirmOrder/confirmOrder',
        })
      }else{
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
  telChange: function (event) {
    const phone = event.detail || event;
    let message = '';
    let disable = '';
    if (phone) {
      if (/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
        message = '';
        disable = false;
        this.data.phoneIf = true;
        Notify({
          text: '输入正确',
          duration: 1000,
          selector: '#custom-selector',
          backgroundColor: '#07c160'
        });
        this.startFinish()
      } else {
        Notify({
          text: '您输入的手机号码有误',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: '#ee0a24'
        });
        disable = true;
      }
    } else {
      Notify({
        text: '您输入的手机号码有误',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: '#ee0a24'
      });
      disable = true
    }
    this.setData({
      telMessage: message,
      disabled: disable,
      txn_tel: phone
    });
    if (this.data.disabled === true) {
      return false;
    } else {
      return true;
    }
  },
  onReady: function () {

  }
})