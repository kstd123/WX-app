// pages/detail/detail.js
var img_arr = [];
Page({
  data: {
    title: "食神",
    type1: "剧情",
    time: "2005/1/2",
    actor: "周星驰",
    id: "3821067",
    detail: "",
    triangle: "triangle1",//按钮样式
    detail1: "detail1",
    toView: 'green',
    scrollTop: 100,
    scrollLeft: 0
  },
  onLoad: function (res) {
    this.setData({
      id: parseInt(res.id),
      title: res.info
    })
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    var movie_type = "";
    var that = this;
    wx.request({
      url: "https://api.douban.com/v2/movie/" + that.data.id,
      method: 'GET',
      header: {
        'Content-type': 'json'
      },
      success: function (res) {
        var result = res.data;
        movie_type = result.attrs.movie_type.join(",");
        that.setData({
          detail: result.summary,//简介
          title: result.alt_title,//原名
          time: result.attrs.pubdate[0],  //  上映时间
          image: result.image,
          type1: movie_type
        })
        console.log(res.data)
      },
      fail: function (res) {
        console.log("请求失败" + res)
      }
    })
    wx.request({
      url: "https://api.douban.com/v2/movie/subject/" + that.data.id,
      method: 'GET',
      header: {
        'Content-type': 'json'
      },
      success: function (res) {
        var result = res.data,
          actor = [];
        console.log(res)
        for (let i in result.casts) {
          actor[i] = { "imgsrc": result.casts[i].avatars.large, "name": result.casts[i].name }
          img_arr[i] = result.casts[i].avatars.large;
        }
        that.setData({ actor_img: actor })
      }
    })
  },
  // detail: function () {//改变按钮样式
  //   this.data.triangle == "triangle1" ? this.setData({ triangle: "triangle2", detail1: "" }) : this.setData({ triangle: "triangle1", detail1: "detail1" })
  // },

  detail: function () {//延迟改变按钮样式
    var that = this;
    if (this.data.detail1 == "detail1") {
      this.setData({
        triangle: "triangle2",
        detail1: "",
        detail_box: "detailbox2"
      })
    } else {
      this.setData({
        triangle: "triangle1",
        detail_box: ""
      })
      setTimeout(function () {
        that.setData({
          detail1: "detail1"
        })
      }, 450)

    }
  },
  actorbind: function (e) { // 预览图片
    wx.previewImage({
      current: e.target.dataset.id, 
      urls: img_arr,
      success: function(res){        
      }
    })
  },
  //滚动条滚到left的时候触发
  upper: function (e) {
    console.log(e)
  },
  //滚动条滚到right的时候触发
  lower: function (e) {
    console.log(e)
  },
  //滚动条滚动后触发
  scroll: function (e) {
    console.log(e)
  },
  //点击按钮切换到下一个view
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  //通过设置滚动条位置实现画面滚动
  tapMove: function (e) {
    this.setData({
      scrollLeft: this.data.scrollLeft + 10
    })
  }

})