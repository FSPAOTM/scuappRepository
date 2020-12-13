// pages/cfabu/cfabu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobinfo1: [],
    jobinfo2: [],
    jobinfo3: [],
    jobinfo4: [],
    jobinfo5: [],
    operation: "",
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
  },

  fabu() {
    wx.navigateTo({
      url: '../cjobRelease/cjobRelease',
    })
  },

  jieshu() {
    var that = this;
    console.log(that.data.jobinfo4);
    var e = ev.currentTarget.dataset.index;
    console.log(e);
    console.log(that.data.jobinfo4[e]);
    var ow_number = that.data.jobinfo4[e].ow_number;
    wx.request({
      url: app.globalData.url + '/Get_outwork_info/',//待修改
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        user: app.globalData.user,
        ow_number:ow_number
      },
      success: function (res) {
        console.log(res);
        if(res.statusCode==200){
          if(res.data=="修改成功"){
            wx.reLaunch({
              url: '../cfabu/cfabu',
            })
          }
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    /** 
     * 获取系统信息,系统宽高
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    if (options.operation == "已申请") {
      that.setData({
        operation: "重新申请 >"
      })
    } else {
      that.setData({
        operation: "申请面试时间 >"
      })
    }

    wx.request({
      url: app.globalData.url + '/Get_outwork_info/',
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        user: app.globalData.user
      },
      success: function (res) {
        console.log(res);
        var i;
        for (i = 0; i < res.data.length; i++) {
          if (res.statusCode == 200) {
            if (res.data[i].status == "待审核") {
              that.data.jobinfo1.push(res.data[i])
              that.setData({
                jobinfo1: that.data.jobinfo1
              })
            } else if (res.data[i].status == "报名中") {
              that.data.jobinfo1.push(res.data[i])
              that.setData({
                jobinfo1: that.data.jobinfo1
              })
            } else if (res.data[i].status == "报名结束") {
              that.data.jobinfo2.push(res.data[i])
              that.setData({
                jobinfo2: that.data.jobinfo2
              })
            } else if (res.data[i].status == "面试中") {
              that.data.jobinfo3.push(res.data[i])
              that.setData({
                jobinfo3: that.data.jobinfo3
              })
            } else if (res.data[i].status == "工作中") {
              that.data.jobinfo4.push(res.data[i])
              that.setData({
                jobinfo4: that.data.jobinfo4
              })
            } else if (res.data[i].status == "已结束") {
              that.data.jobinfo5.push(res.data[i])
              that.setData({
                jobinfo5: that.data.jobinfo5
              })
            }
          }
        }
      }
    })
  },


  cjobshow1: function (ev) {
    var that = this;
    console.log(that.data.jobinfo1);
    var e = ev.currentTarget.dataset.index;
    console.log(e);
    console.log(that.data.jobinfo1[e]);
    var ow_number = that.data.jobinfo1[e].ow_number;
    console.log("++++++", ev, that)
    wx.setStorageSync("ow_number", ow_number), wx.navigateTo({
      url: "../cjobShow/cjobShow?show1=true&show2=false&show3=false"
    })
  },

  cjobshow2: function (ev) {
    var that = this;
    console.log(that.data.jobinfo2);
    var e = ev.currentTarget.dataset.index;
    console.log(e);
    console.log(that.data.jobinfo2[e]);
    var ow_number = that.data.jobinfo2[e].ow_number;
    console.log("++++++", ev, that)
    wx.setStorageSync("ow_number", ow_number), wx.navigateTo({
      url: "../cjobShow/cjobShow?show1=false&show2=true&show3=false"
    })
  },

  cjobshow3: function (ev) {
    var that = this;
    console.log(that.data.jobinfo3);
    var e = ev.currentTarget.dataset.index;
    console.log(e);
    console.log(that.data.jobinfo3[e]);
    var ow_number = that.data.jobinfo3[e].ow_number;
    console.log("++++++", ev, that)
    wx.setStorageSync("ow_number", ow_number), wx.navigateTo({
      url: "../cjobShow/cjobShow?show1=false&show2=false&show3=false"
    })
  },

  cjobshow4: function (ev) {
    var that = this;
    console.log(that.data.jobinfo4);
    var e = ev.currentTarget.dataset.index;
    console.log(e);
    console.log(that.data.jobinfo4[e]);
    var ow_number = that.data.jobinfo4[e].ow_number;
    console.log("++++++", ev, that)
    wx.setStorageSync("ow_number", ow_number), wx.navigateTo({
      url: "../cjobShow/cjobShow?show1=false&show2=false&show3=false"
    })
  },


  cjobshow5: function (ev) {
    var that = this;
    console.log(that.data.jobinfo5);
    var e = ev.currentTarget.dataset.index;
    console.log(e);
    console.log(that.data.jobinfo5[e]);
    var ow_number = that.data.jobinfo5[e].ow_number;
    console.log("++++++", ev, that)
    wx.setStorageSync("ow_number", ow_number), wx.navigateTo({
      url: "../cjobShow/cjobShow?show1=false&show2=false&show3=true"
    })
  },



  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  checkCor: function () {
    if (this.data.currentTab > 5) {
      this.setData({
        scrollleft: 300
      })
    } else {
      this.setData({
        scrollleft: 0
      })
    }
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
    app.editTabBar1();
  },
  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.getData();
  },
  getData() {
    let that = this;
    that.setData({
      jobinfo1: [],
      jobinfo2: [],
      jobinfo3: [],
      jobinfo4: [],
      jobinfo5: [],
    })
    wx.request({
      url: app.globalData.url + '/Get_outwork_info/',
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        user: app.globalData.user
      },
      success: function (res) {
        console.log(res);
        var i;
        for (i = 0; i < res.data.length; i++) {
          if (res.statusCode == 200) {
            if (res.data[i].status == "报名中") {
              that.data.jobinfo1.push(res.data[i])
              that.setData({
                jobinfo1: that.data.jobinfo1
              })
            } else if (res.data[i].status == "报名结束") {
              that.data.jobinfo2.push(res.data[i])
              that.setData({
                jobinfo2: that.data.jobinfo2
              })
            } else if (res.data[i].status == "面试中") {
              that.data.jobinfo3.push(res.data[i])
              that.setData({
                jobinfo3: that.data.jobinfo3
              })
            } else if (res.data[i].status == "工作中") {
              that.data.jobinfo4.push(res.data[i])
              that.setData({
                jobinfo4: that.data.jobinfo4
              })
            } else if (res.data[i].status == "已结束") {
              that.data.jobinfo5.push(res.data[i])
              that.setData({
                jobinfo5: that.data.jobinfo5
              })
            }
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
    //调用刷新时将执行的方法
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

  }
})