// index.js
const app = getApp()
Page({
  data: {
    nickname: 'Jack',
    signature: '40687c8206d15373954d8b27c6724f62',
    loading: true,
    horoscope: null
  },
  async onLoad() {
    const res = await app.call({
      path:'/api/chat',
      method: 'POST',
      data: {
        // 新增参数（假设昵称和签名已存储在data中）
        nickname: this.data.nickname,
        signature: this.data.signature,
        // ... 其他已有参数（如果有的话）...
      },
    })
    this.setData({
      horoscope: res.analysis,
      loading: false
    })
    console.log('业务返回结果',res)
  }
})