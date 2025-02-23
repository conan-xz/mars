// index.js
const app = getApp()

Page({
  data: {
    loading: true,
    showContent: false,
    nickname: wx.getStorageSync('userInfo').nickName || '星主',
    zodiacSign: '星座',
    horoscope: null,
    stars: [],
    defaultHoroscope: "，近期金星与天王星形成微妙夹角，暗示你的人际关系将迎来意外转折。尤其注意本月第三周，某个看似平常的选择会触发连锁反应，事业宫暗藏\"双面机遇\"——表面波澜不惊，实则暗流涌动。特别留意名字带\"L\"字母的人，她掌握着你尚未察觉的关键线索。",
  },

  async onLoad() {
    // 生成随机星星背景
    const stars = Array.from({length: 50}, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2
    }));
    
    this.setData({ stars });

    //console.log('用户昵称', this.data.nickname);

    try {
      // 获取签名
      const signResp = await app.call({
        path: '/api/sign',
        method: 'POST',
        data: {
          nickname: this.data.nickname
        },
      });
      //console.log('签名返回结果', signResp);

      // 处理签名错误
      if (signResp.code === "INVALID_HOST") {
        this.handleError();
        return;
      }

      // 获取运势分析
      const chatResp = await app.call({
        path: '/api/chat',
        method: 'POST',
        data: {
          nickname: this.data.nickname,
          signature: signResp.data,
        },
      });

      // 处理运势分析错误
      if (chatResp.code === "INVALID_HOST") {
        this.handleError();
        return;
      }

      //console.log('星座返回结果', chatResp);
      
      // 设置运势内容
      this.setData({
        loading: false,
        horoscope: chatResp.analysis
      });

      // 添加内容显示动画
      setTimeout(() => {
        this.setData({ showContent: true });
      }, 100);

    } catch (error) {
      console.error('API调用错误:', error);
      this.handleError();
    }
  },

  // 错误处理函数
  handleError() {
    this.setData({
      horoscope: this.data.nickname + this.data.defaultHoroscope,
      loading: false
    });

    // 添加内容显示动画
    setTimeout(() => {
      this.setData({ showContent: true });
    }, 100);
  },

  // 获取星座
  getZodiacSign() {
    // 这里可以添加获取星座的逻辑
    // 可以基于生日或其他用户信息
    return '星座';
  },

  // 页面显示时的动画效果
  onShow() {
    // 可以添加页面显示时的动画效果
  },

  // 页面隐藏时的清理工作
  onHide() {
    // 可以添加页面隐藏时需要清理的内容
  }
});