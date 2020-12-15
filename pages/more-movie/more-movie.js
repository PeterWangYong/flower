// pages/more-movie/more-movie.js
import {movieList} from '../../data/data'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    _type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type
    this.data._type = type
    this.setData({
      movies: movieList[type].slice(0, 12)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let title = '电影'
    switch(this.data._type) {
      case 'in_theaters':
        title = '正在热映'
        break
      case 'coming_soon':
        title = '即将上映'
        break
      case 'top250':
        title = '豆瓣Top250'
        break
    }
    wx.setNavigationBarTitle({
      title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('pull down')
    this.setData({
      movies: movieList[this.data._type].slice(0,12)
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading()
    const currentNumber = this.data.movies.length
    this.setData({
      movies: this.data.movies.concat(movieList[this.data._type].slice(currentNumber, currentNumber + 12))
    })
    wx.hideNavigationBarLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
