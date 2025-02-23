// index.js
const app = getApp()
Page({
  data: {
    loading: true,
    nickname: wx.getStorageSync('userInfo').nickName||'星主',
    horoscope: null
  },
  async onLoad() {
    console.log('用户昵称',this.data.nickname)
    const resp = await app.call({
      path:'/api/sign',
      method: 'POST',
      data: {
        nickname: this.data.nickname
      },
    })
    console.log('签名返回结果',resp)
    const res = await app.call({
      path:'/api/chat',
      method: 'POST',
      data: {
        nickname: this.data.nickname,
        signature: resp.data,
      },
    })
    this.setData({
      horoscope: res.analysis,
      loading: false
    })
    console.log('星座返回结果',res)
  }
})