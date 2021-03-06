// pages/movies/movies.js
import {movieList, moviesAll} from '../../data/data'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: [],
    top250: [],
    searchResult: false,
    searchData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      inTheaters: movieList.in_theaters.slice(0,3),
      comingSoon: movieList.coming_soon.slice(0,3),
      top250: movieList.top250.slice(0,3)
      
    })
  },

  onGotoMore(event) {
    const type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + type,
    })
  },

  onConfirm(event) {
    this.setData({
      searchResult: true,
    })
    const temp = []
    const searchData = moviesAll.filter(item => {
      if (item.title.match(event.detail.value)) {
        if (temp.indexOf(item.id) !== -1) { 
          return false
        } else {
          temp.push(item.id)
          return true
        }
      } else {
        return false
      }
    })
    this.setData({
      searchData
    })
  },

  onSearchCancel() {
    this.setData({
      searchResult: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
