// pages/movie-detail/movie-detail.js
import {convertToCastInfos} from '../../utils/util'
import {moviesAll} from '../../data/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const mid = options.mid
    const data = moviesAll.find(item => item.id === +mid)
    this.processMovieData(data)
  },

  processMovieData(movie) {
    const data = {}
    data.directors = movie.directors.map(item => item.name).join(' / ')
    data.casts = movie.casts.map(item => item.name).join(' / ')
    data.subtitle = movie.countries[0] + '·' + movie.year
    data.rating = movie.rating.stars / 10
    data.average = movie.rating.average
    data.genres = movie.genres.join('、')
    data.castsInfo = convertToCastInfos(movie.casts)
    this.setData({
      movie:{...movie, ...data}
    })
  },

  onViewPost(event) {
    wx.previewImage({
      urls: [this.data.movie.images.large],
    })
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