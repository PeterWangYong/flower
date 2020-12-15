// pages/post-detail/post-detail.js
import {postList} from '../../data/data.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData: {},
    collected: false,
    isPlaying: false,
    _pid: null,
    _postsCollected: null,
    _mgr: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData = postList[options.pid]
    this.data._pid = options.pid
    this.data._postsCollected = wx.getStorageSync('posts_collected') || {}
    this.data._mgr = wx.getBackgroundAudioManager()
    const collected = this.data._postsCollected[this.data._pid] || false
    const isPlaying = app.gIsPlayingMusic && this.data._pid === app.gIsPlayingPostId
    this.setData({postData, collected, isPlaying})
    this.data._mgr.onPlay(this.onMusicStart)
    this.data._mgr.onPause(this.onMusicStop)
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
    } catch(err) {
      console.log(err)
    }
    
  },

  onMusicStart(event) {
    const mgr = this.data._mgr
    const music = this.data.postData.music
    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg
    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._pid
    this.setData({isPlaying: true})
  },

  onMusicStop(event) {
    const mgr = this.data._mgr
    mgr.pause()
    app.gIsPlayingMusic = false
    // app.gIsPlayingPostId = -1
    this.setData({isPlaying: false})
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