// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    horoscope: null,
    nickname: 'Jack',
    signature: '40687c8206d15373954d8b27c6724f62'
  },
  onLoad() {
    this.fetchHoroscope();
  },
  fetchHoroscope() {
    // 确认已经在 onLaunch 中调用过 wx.cloud.init 初始化环境（任意环境均可，可以填空）
    const res = wx.cloud.callContainer({
      config: {
        env: 'prod-5gg03znv016787f1', // 微信云托管的环境ID
      },
      path: '/api/chat', // 填入业务自定义路径和参数，根目录，就是 / 
      method: 'POST', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': 'express-v2qc-008', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
        // 其他header参数
      },
      // dataType:'text', // 默认不填是以JSON形式解析返回结果，若不想让SDK自己解析，可以填text
      // 其余参数同 wx.request
      data: {
        // 新增参数（假设昵称和签名已存储在data中）
        nickname: this.data.nickname,
        signature: this.data.signature,
        // ... 其他已有参数（如果有的话）...
      },
      success: (res) => {
        this.setData({
          horoscope: res.data
        });
      },
      fail: (err) => {
        console.error('Failed to fetch horoscope:', err);
      }
    });

    console.log(res);
  }
})