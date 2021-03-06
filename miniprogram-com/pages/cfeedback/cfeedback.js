// pages/sfeedback/sfeedback.js企业在点击已结算后对学生进行评价
const app = getApp();
Page({
  data: {
    ow_number: "",
    stu_number: "",
    staticImg: app.globalData.staticImg,
    current: 0,
    attitude: true,
    time: true,
    efficiency: true,
    environment: true,
    professional: true,
    serious: "",
    manner: "",
    timely: "",
    labor: "",
    ability: "",
    more: "",
    code: 1,
    code1: 2,
    userStars: [
      "/images/sx2.png",
      "/images/sx2.png",
      "/images/sx2.png",
      "/images/sx2.png",
      "/images/sx2.png",
    ],
    wjxScore: 5,
    // textarea
    min: 10, //最少字数
    max: 200, //最多字数 (根据自己需求改变)
    pics: [],
  },

  // 获取上一页面所点击对象的兼职号和兼职者
  onLoad: function (options) {
    this.setData({
      stu_number: options.stu_number,
      ow_number: options.ow_number
    })
  },

  // 星星点击事件
  starTap: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = "/images/sx2.png";
        that.setData({
          wjxScore: i + 1,
        })
      } else { // 其他是空心
        tempUserStars[i] = "/images/kx2.png"
      }
    }
    // 重新赋值就可以显示了
    that.setData({
      userStars: tempUserStars
    })
  },
  // 标签
  label: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      attitude: !e.currentTarget.dataset.index,
      serious: "认真负责"
    })
  },
  label1: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      time: !e.currentTarget.dataset.index,
      manner: "态度端正"
    })
  },
  label2: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      efficiency: !e.currentTarget.dataset.index,
      timely: "联系及时"
    })
  },
  label3: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      environment: !e.currentTarget.dataset.index,
      labor: "吃苦耐劳"
    })
  },
  label4: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      professional: !e.currentTarget.dataset.index,
      ability: "工作能力强"
    })
  },
  // 留言
  //字数限制
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最多字数限制
    if (len > this.data.max)
      return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数
      more: value
    });
  },
  
// 提交评价
  change() {
    let that = this;
    wx.request({
      url: app.globalData.url + '/Com_feedbackEr/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        com: app.globalData.user,
        stuNumber: that.data.stu_number,
        ow_number: that.data.ow_number,
        score: that.data.wjxScore,
        serious: that.data.serious,
        manner: that.data.manner,
        timely: that.data.timely,
        labor: that.data.labor,
        ability: that.data.ability,
        more: that.data.more
      },
      success: (res) => {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '评价成功',
            icon: 'success',
            duration: 1500,
            mask: true,
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '../cworkspace/cworkspace?currentTab=4'
            })
          }, 1500)
        }
      }
    })
  }
})