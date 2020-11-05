// pages/login/login.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*disabled:false,*/
    no: '',
    pwd: '',
    noinput: false,
    pwdinput: false,
    result: '',
  },
  noinput: function (e) {
    this.setData({
      no: e.detail.value
    });
    this.setData({
      noinput: true
    });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({
        disabled: false
      });
    }

  },
  pwdinput: function (e) {
    this.setData({
      pwd: e.detail.value
    });
    this.setData({
      pwdinput: true
    });
    if (this.data.pwd.length >= 8 && this.data.pwd.length <= 18)
      if (this.data.noinput == true && this.data.pwdinput == true) {
        this.setData({
          disabled: false
        }); //这一句什么意思
      }
    /*else{
          this.setData({ disabled: true });
        }*/
    if (this.data.pwd.length < 8) {
      this.setData({
        disabled: true
      });
    } //为何直接用else语句不能多次检测字符串长度并执行条件语句
  },
  formSubmit: function (e) {
    var self = this;
    console.log(e);
    self.setData({
      disabled: true
    });
    wx.request({
      url: 'http://127.0.0.1:8000/wechat/dengluzhuce_login/',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        no: this.data.no,
        pwd: this.data.pwd
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          self.setData({
            result: res.data
          })
          if (res.data == "用户名或密码错误") {
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '../login/login',
              })
            }, 2000)
          } else {
            if (res.data == "用户名不存在") {
              wx.showToast({
                title: '用户名不存在',
                icon: 'none',
                duration: 2000
              })
              setTimeout(function () {
                wx.redirectTo({
                  url: '../login/login',
                })
              }, 2000)
            } else {
              if (res.data == "登录成功！") {
                wx.setStorageSync('student', res.data.no);
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1000
                })
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../infoFill/infoFill',
                  })
                }, 2000)
                app.globalData.user = self.data.no;
                console.log(app.globalData.user);
              } else {
                wx.showToast({
                  title: '请求错误',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  /*onLoad: function (options) {
    this.setData({disabled:false});
    var student = wx.getStorageSync('student');
    if (typeof (student) == 'object' && student.no != '' && student.classid != '') {
      wx.switchTab({
        url: '../teacher/teacher',
      })
    }
  },*/

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.no == '' || this.data.pwd == '') {
      this.setData({
        disabled: true
      });
    } else {
      this.setData({
        disabled: false
      });
    }
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