// pages/repwd1/repwd1.js忘记密码信息验证
var app = getApp();
Page({
  data: {
    user: "",
    phone: "",
  },

  usser(e) {
    this.setData({
      user: e.detail.value
    });
  },

  phhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  formSubmit() {
    wx.request({
      url: app.globalData.url + '/Reset_password_f1/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        user: this.data.user,
        phone: this.data.phone,
      },
      success: (res) => {
        if (res.statusCode == 200) {
          console.log(res.data);
          if (res.data == "身份验证失败") {
            wx.showToast({
              title: '身份信息有误，请重新输入！',
              icon: 'none',
              duration: 3000
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../repwd1/repwd1',
              })
            }, 3000)
          } else if (res.data == "身份验证成功") {
            wx.redirectTo({
              url: '../repwd1-1/repwd1-1?user=' + this.data.phone,
            })
          } else if (res.data == "用户不存在") {
            wx.showToast({
              title: '用户不存在或身份信息有误',
              duration: 3000
            })
          }
        }
      }
    })
  }
})