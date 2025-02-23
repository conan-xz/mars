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
      wx.navigateTo({
        url: '../horos/index'
      })
    }
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
    this.saveUserInfo()
  },

  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
    this.saveUserInfo()
  },

  saveUserInfo() {
    wx.setStorageSync('userInfo', this.data.userInfo)
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
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