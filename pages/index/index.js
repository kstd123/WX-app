// pages/index/index.js
Page({
  data: {
    name: "SUCCESS",
    actor: "吴亦凡",
    imgArr: [],
    inputShowed: false,
    inputVal: "",
    isShow: true,
    id: "0000001"
  },
  search: function () {
    var info = [],//影人信息
      that = this;
    wx.request({
      url: "https://api.douban.com/v2/movie/search?q=" + that.data.actor,
      method: 'GET',
      header: {
        'Content-Type': 'json'
      }, // 设置请求的 header
      success: function (res) {
        var size = res.data.subjects.length,
          temp_arr = [],//电影信息
          obj = [],//海报
          id = [];
        console.log(size);
        temp_arr = res.data.subjects;
        for (let i = 0; i < size; i++) {
          for (let j in temp_arr[i].casts) {
            temp_arr[i].casts[j] = temp_arr[i].casts[j].name;
          }
          info[i] = temp_arr[i].casts.join(",");//影人信息
          id[i] = res.data.subjects[i].id
          obj[i] = {
            "imgSrc": temp_arr[i].images.large,
            "title": temp_arr[i].title,
            "score": temp_arr[i].rating.average,
            "info": info[i],
            "id": id[i] + "index" + i
          }
        }//构造对象
        that.setData({
          imgArr: obj,
          actor: "",
          inputShowed: false

        })
        // console.log(obj);
        // console.log(info);
      }
    })
  },
  bindblur: function (e) {
    var value = e.detail.value;
    if (value != "") {
      this.setData({
        actor: value
      })
    }
  },
  onLoad: function () {
    var info = [];//影人信息
    var that = this;
    wx.request({
      url: "https://api.douban.com/v2/movie/search?q=" + that.data.actor,
      method: 'GET',
      header: {
        'Content-Type': 'json'
      }, // 设置请求的 header
      success: function (res) {
        var size = res.data.subjects.length;
        console.log(size);
        var temp_arr = [];//电影信息
        var obj = [];//海报
        var id = [];
        temp_arr = res.data.subjects;
        for (let i = 0; i < size; i++) {
          for (let j in temp_arr[i].casts) {
            temp_arr[i].casts[j] = temp_arr[i].casts[j].name;
          }
          info[i] = temp_arr[i].casts.join(",");//影人信息
          id[i] = res.data.subjects[i].id
          obj[i] = {
            "imgSrc": temp_arr[i].images.large,
            "title": temp_arr[i].title,
            "score": temp_arr[i].rating.average,
            "info": info[i],
            "id": id[i] + "index" + i
          }
        }//构造对象
        that.setData({
          imgArr: obj,
          actor: "",
          inputShowed: false,
          isShow: false

        })
        console.log(obj);
        console.log(info);
      }
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  detail1: function (e) { //自定义详情事件
    var num = 0;
    var that = this;
    var id = e.target.dataset.id.split("index")[0] || "error";
    var index = e.target.dataset.id.split("index")[1] || "error";
    console.log(e.target.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id + "&info=" + that.data.imgArr[index].title,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})

