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
    console.log('签名返回结果', resp)

    // Check for return code and handle accordingly
    if (resp.code === "INVALID_HOST") {
      this.setData({
        horoscope: this.data.nickname + "，近期金星与天王星形成微妙夹角，暗示你的人际关系将迎来意外转折。尤其注意本月第三周，某个看似平常的选择会触发连锁反应，事业宫暗藏“双面机遇”——表面波澜不惊，实则暗流涌动。特别留意名字带“L”字母的人，她掌握着你尚未察觉的关键线索。", // Default value when INVALID_HOST
        loading: false
      });
      console.error('错误:', resp.message);
      return; // Exit the function early
    }

    const res = await app.call({
      path:'/api/chat',
      method: 'POST',
      data: {
        nickname: this.data.nickname,
        signature: resp.data,
      },
    })
    if (resp.code === "INVALID_HOST") {
      this.setData({
        horoscope: this.data.nickname + "，近期金星与天王星形成微妙夹角，暗示你的人际关系将迎来意外转折。尤其注意本月第三周，某个看似平常的选择会触发连锁反应，事业宫暗藏“双面机遇”——表面波澜不惊，实则暗流涌动。特别留意名字带“L”字母的人，她掌握着你尚未察觉的关键线索。", // Default value when INVALID_HOST
        loading: false
      });
      console.error('错误:', resp.message);
      return; // Exit the function early
    }
    this.setData({
      horoscope: res.analysis,
      loading: false
    })
    console.log('星座返回结果',res)
  }
})