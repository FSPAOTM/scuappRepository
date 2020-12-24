// pages/cxiaoxi/cxiaoxi.js
const app = getApp()
var chat = require('../../utils/chat.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mianshitongzhi:[],
    dahuitongzhi:[],
    count1:"",
    count2:"",
    show1:true,
    show2:true,
    name: '',
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */

  tongzhi() {
    wx.navigateTo({
      url: '../cmianshitongzhi/cmianshitongzhi?user=' + app.globalData.user,
    })
  },

  dahui() {
    wx.navigateTo({
      url: '../cmianshidahui/cmianshidahui?user=' + app.globalData.user,
    })
  },

  goPage(e) {
    let newlist = this.data.list
    const index = e.currentTarget.dataset.index
    newlist[index].count = 0;
    this.setData({
      list: newlist
    })
    wx.navigateTo({
      url: '../schatting/schatting?name=' + e.currentTarget.dataset.name  /**?? */
    })
  },

  onLoad: function (options) {
    this.setData({
      name: app.globalData.user
    })
    this.initlist();
    let that = this;
    wx.request({
      url: app.globalData.url + '/Com_interview_notice_show/', 
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        user: app.globalData.user
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            mianshitongzhi: res.data,
            count1:res.data.length
          })
          if(that.data.count1==0){
            that.setData({
              show1:false
            })
          }
        }
      }
    })

    wx.request({
      url: app.globalData.url + '/Com_interview_back_show/',
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        user: app.globalData.user
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            dahuitongzhi: res.data,
            count2:res.data.length
          })
          if(that.data.count2==0){
            that.setData({
              show2:false
            })
          }
        }
      }
    })
  },

  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    this.getData();
  },
  getData() {
    let that = this;
    wx.request({
      url: app.globalData.url + '/Com_interview_notice_show/', 
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        user: app.globalData.user
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            mianshitongzhi: res.data,
            count1:res.data.length
          })
          if(that.data.count1==0){
            that.setData({
              show1:false
            })
          }
        }
      }
    })

    wx.request({
      url: app.globalData.url + '/Com_interview_back_show/', 
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        user: app.globalData.user
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            dahuitongzhi: res.data,
            count2:res.data.length
          })
          if(that.data.count2==0){
            that.setData({
              show2:false
            })
          }
        }
        //隐藏loading 提示框
        wx.hideLoading();
        //隐藏导航条加载动画
        wx.hideNavigationBarLoading();
        //停止下拉刷新
        wx.stopPullDownRefresh();
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
    this.updatelist();
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    console.log(currentPage.route);
    wx.onSocketMessage((result) => {
      console.log("我在chatlist.js")
      let msg = JSON.parse(result.data)["message"];
      chat.update_globalData_msgList_default(msg); //更新全局变量消息列表
      this.updatelist(); //更新当前页面的list列表
    })
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
    this.onRefresh();
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
  initlist: function () {//初始化聊天列表
    console.log("init list")
    var list = {
      "2018141093036": {
        id: "001",
        count: 2,
        avatar: "../../images/head.png",
        text: "",
        updated: "2020.11.02"
      },
      "show": {
        id: "002",
        count: 0,
        avatar: "../../images/head.png",
        text: "",
        updated: "2020.11.02"
      },
      "as先生": {
        id: "003",
        count: 0,
        avatar: "../../images/head.png",
        text: "",
        updated: "2020.11.02"
      },
      "练习生": {
        id: "004",
        count: 0,
        avatar: "../../images/head.png",
        text: "",
        updated: "2020.11.02"
      },
      "练习生o": {
        id: "005",
        count: 0,
        avatar: "../../images/head.png",
        text: "",
        updated: "2020.11.02"
      },
    }
    this.setData({
      list: list
    });
  },
  updatelist: function () { //收到新消息后更新聊天列表
    for (let i in app.globalData.msgList) {
      if(app.globalData.msgList[i].length==0)//与此用户的聊天记录长度为0，就直接处理与下一个人的
      continue;
      var count=0;//用来统计和每个人有多少条聊天记录
      let length = app.globalData.msgList[i].length;
      if (!(i in this.data.list)) { //未存在新先建一项
        this.data.list[i] = {};
        this.data.list[i]["id"] = "009";
        this.data.list[i]["count"] = 0;
        this.data.list[i]["text"] = app.globalData.msgList[i][length - 1]["content"];
        this.data.list[i]["updated"] = app.globalData.msgList[i][length - 1]["time"];
      } else {
        this.data.list[i]["text"] = app.globalData.msgList[i][length - 1]["content"];
        this.data.list[i]["updated"] = app.globalData.msgList[i][length - 1]["time"];
      }
      for (let j = 0; j < app.globalData.msgList[i].length; j++) { //查看有多少条未读消息
        if (app.globalData.msgList[i][j]["to"] == app.globalData.user && app.globalData.msgList[i][j]["isread"] == 0) {//当是发给我的消息并且未读时，未读数量加一（加第一个条件判断是为了防止我发出的消息还是未读的情况被统计进去，因为正常情况下未读消息肯定是对方发来的而我们未读的，不考虑我们发的而对方未读的）
          count++;
        }
      }
      this.data.list[i]["count"]=count;
    }
    this.setData({ //更新消息列表
      list: this.data.list
    });
    console.log(this.data.list);
  },
})