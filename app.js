// app.js
App({
  async onLaunch() {    
    // 初始化云服务
    wx.cloud.init({
      env: 'prod-5gg03znv016787f1', // 必填：云开发环境ID
      traceUser: true // 可选：开启用户行为日志
    });
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  /**
   * 封装的微信云托管调用方法
   * @param {*} obj 业务请求信息，可按照需要扩展
   * @param {*} number 请求等待，默认不用传，用于初始化等待
   */
  async call(obj, number=0){
    try{
      const result = await wx.cloud.callContainer({
        path: obj.path, // 填入业务自定义路径和参数，根目录，就是 / 
        method: obj.method||'GET', // 按照自己的业务开发，选择对应的方法
        // dataType:'text', // 如果返回的不是json格式，需要添加此项
        header: {
          'X-WX-SERVICE': 'stars', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
          // 其他header参数
        },
        data: obj.data,
        timeout: 30000,
      })
      return result.data // 业务数据在data中
    } catch(e){
      const error = e.toString()
      console.log(`微信云托管调用结果${error}`)
    }
  }
})