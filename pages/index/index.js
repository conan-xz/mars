const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },

  onLoad() {
    // Initialize star positions
    const stars = Array(12).fill(0).map(() => ({
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animationDelay: Math.random() * 2 + 's'
    }))
    this.setData({ stars })

    // Try to restore saved user info
    const savedUserInfo = wx.getStorageSync('userInfo')
    if (savedUserInfo && savedUserInfo.nickName && savedUserInfo.avatarUrl) {
      this.setData({
        userInfo: savedUserInfo,
        hasUserInfo: true
      })
    }
  },

  bindViewTap() {
    if (this.data.hasUserInfo) {
      console.log('进入主页面', this.data);
      wx.navigateTo({
        url: '../horos/index'
      })
    }else{
      console.log('无法进入主页面', this.data);
    }
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      "userInfo.avatarUrl": avatarUrl
    })
    this.saveUserInfo()
    console.log('用户头像', this.data);
  },

  onInputChange(e) {
    const nickName = e.detail.value
    this.setData({
      "userInfo.nickName": nickName
    })
    this.saveUserInfo()
    console.log('用户姓名', this.data);
  },

  saveUserInfo() {
    wx.setStorageSync('userInfo', this.data.userInfo)
    this.setData({
      hasUserInfo: Boolean(this.data.userInfo.nickName !== "" && this.data.userInfo.avatarUrl !== "" && this.data.userInfo.avatarUrl !== defaultAvatarUrl),
    })
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
        this.saveUserInfo()
      },
      fail: (err) => {
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        })
      }
    })
  },
})