// pages/welcome/welcome.js
var num = 5
Page({
  data: {
    name: "dog",
    imgSrc: "",
    btnColor: "btncolor1",
    net: "",//网络环境
    info: ""//影片信息
  }
  , dianji: function () {
    var that = this;
    // 点击按钮时更改样式
    this.setData({ btnColor: "btncolor2" })
    wx.redirectTo({
      url: '../index/index',
      success: function () {
        that.setData({ btnColor: "btncolor1" })
      }
    })
  }, search: function () {
    var that = this;
    num = num + 1;
    wx.request({
      url: "https://api.douban.com/v2/movie/176479" + num,
      // data: {},
      method: 'GET',
      header: {
        'Content-Type': 'json'
      }, // 设置请求的 header
      success: function (res) {
        var result = res.data;
        that.setData({
          info: result.alt_title,
          imgSrc: result.image
        })
      }
    })
  },
  onLoad: function () {//获取网络状态
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        that.setData({
          net: res.networkType
        })
      }
    })
    // 请求接口
    wx.request({
      url: "https://api.douban.com/v2/movie/176479" + num,
      data: {},
      method: 'GET',
      header: {
        'Content-Type': 'json'
      }, // 设置请求的 header
      success: function (res) {
        var result = res.data;
        that.setData({
          info: result.alt_title,
          imgSrc: result.image
        })
      },
    })
  },
  bindblur: function (e) {
    var value = e.detail.value;
    this.setData({
      name: value
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    console.log("初次渲染完成")
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    console.log("页面显示")
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    console.log("页面隐藏")
  }

})