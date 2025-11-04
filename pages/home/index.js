import Message from 'tdesign-miniprogram/message/index'
//import request from '~/api/request' // 如果没有真实接口，这行可以先注释掉

Page({
  data: {
    enable: false,
    swiperList: [],
    cardInfo: [],
    focusCardInfo: [],
    // 用户信息相关
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  async onReady() {
    // 如果暂时没有后端接口，用 mock 数据代替
    try {
      const [cardRes, swiperRes] = await Promise.all([
        this.getMockCards(),
        this.getMockSwipers(),
      ])
      this.setData({
        cardInfo: cardRes,
        focusCardInfo: cardRes.slice(0, 3),
        swiperList: swiperRes,
      })
    } catch (err) {
      console.error('加载数据失败:', err)
      Message.error({
        context: this,
        content: '加载失败，请稍后重试',
      })
    }
  },

  onLoad(option) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    if (option.oper) {
      let content = ''
      if (option.oper === 'release') {
        content = '发布成功'
      } else if (option.oper === 'save') {
        content = '保存成功'
      }
      this.showOperMsg(content)
    }
  },

  // 模拟请求卡片数据
  async getMockCards() {
    // 模拟异步
    await new Promise((res) => setTimeout(res, 300))
    return [
      {
        id: 1,
        desc: '牛肉面 - 汤浓面滑，香气扑鼻',
        url: '/static/home/food1.jpg',
        tags: ['面食', '热腾腾'],
      },
      {
        id: 2,
        desc: '烤鸡翅 - 外酥里嫩，口感绝了',
        url: '/static/home/food2.jpg',
        tags: ['烧烤', '小吃'],
      },
      {
        id: 3,
        desc: '寿司拼盘 - 新鲜海味，一口满足',
        url: '/static/home/food3.jpg',
        tags: ['日料', '生鲜'],
      },
      {
        id: 4,
        desc: '草莓蛋糕 - 香甜软糯，下午茶首选',
        url: '/static/home/food4.jpg',
        tags: ['甜品', '下午茶'],
      },
    ]
  },

  // 模拟请求轮播图数据
  async getMockSwipers() {
    await new Promise((res) => setTimeout(res, 300))
    return [
      { image: '/static/home/banner1.jpg', link: '' },
      { image: '/static/home/banner2.jpg', link: '' },
      { image: '/static/home/banner3.jpg', link: '' },
    ]
  },

  // 下拉刷新
  onRefresh() {
    this.refresh()
  },

  async refresh() {
    this.setData({
      enable: true,
    })

    const [cardRes, swiperRes] = await Promise.all([
      this.getMockCards(),
      this.getMockSwipers(),
    ])

    setTimeout(() => {
      this.setData({
        enable: false,
        cardInfo: cardRes,
        swiperList: swiperRes,
      })
      Message.success({
        context: this,
        content: '刷新成功',
      })
    }, 1000)
  },

  showOperMsg(content) {
    Message.success({
      context: this,
      offset: [120, 32],
      duration: 3000,
      content,
    })
  },

  goRelease() {
    wx.navigateTo({
      url: '/pages/release/index',
    })
  },
})
