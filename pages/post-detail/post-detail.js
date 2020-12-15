// pages/post-detail/post-detail.js
import {postList} from '../../data/data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    collected: false,
    _pid: null,
    _postsCollected: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData = postList[options.pid]
    this.data._pid = options.pid
    this.data._postsCollected = wx.getStorageSync('posts_collected') || {}
    const collected = this.data._postsCollected[this.data._pid] || false
    this.setData({postData, collected})
  },

  onCollect(event) {
    this.setData({
      collected: !this.data.collected
    })
    const postsCollected = this.data._postsCollected
    postsCollected[this.data._pid] = this.data.collected
    wx.setStorageSync('posts_collected', postsCollected)
    wx.showToast({
      title: this.data.collected ? '收藏成功' : '取消成功',
      duration: 3000
    })
  },

  async onShare(event) {
    try {
      const result = await wx.showActionSheet({
        itemList: ['分享到QQ', '分享到微信', '分享到朋友圈'],
      })
      console.log(result)
    } catch(err) {
      console.log(err)
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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