//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //tabbar
    tabbar: {},
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isIphoneX: app.globalData.systemInfo.model.substring(0, 8) == "iPhone X" ? true : false,
    name: "like-o",
    isLike: false,
    manyLike: 31
  },
  
  onLoad: function () {
    app.editTabbar();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  like: function(){
    if(this.data.name=="like-o"){
      this.setData({
        name: "like",
        isLike: true,
        manyLike: this.data.manyLike + 1
      })
    }else{
      this.setData({
        name: "like-o",
        isLike: false,
        manyLike: this.data.manyLike - 1
      })
    }
    
  },
  cardMain: function(){
    wx.navigateTo({
      url: '../cardMain/cardMain',
    })
  }
})
