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
    }]
  },
  onLoad: function () {
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
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },
  startFinish(e) {
    this.data.postAll.startPlace = e.detail.value
    if (this.data.postAll.startPlace && this.data.postAll.endPlace && this.data.postAll.phone){
      //如果都填写完 1.未授权跳转授权页然后跳转确认订单 2.授权过了直接确认订单
      console.log('finish')
    }
  }, 
  endFinish(e) {
    this.data.postAll.endPlace = e.detail.value
    if (this.data.postAll.startPlace && this.data.postAll.endPlace && this.data.postAll.phone) {
      console.log('finish')
    }
  },
  phoneFinish(e) {
    this.data.postAll.phone = e.detail.value
    if (this.data.postAll.startPlace && this.data.postAll.endPlace && this.data.postAll.phone) {
      console.log('finish')
    }
  },
  onReady: function () {

  }
})