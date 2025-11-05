import Message from 'tdesign-miniprogram/message/index'

Page({
  data: {
    id: null, // 帖子 ID
    detail: {}, // 详情信息
    comments: [], // 评论列表
    inputValue: '', // 输入框内容
  },

  onLoad(options) {
    const { id } = options
    this.setData({ id })
    this.loadDetail(id)
  },

  // 模拟加载帖子详情
  loadDetail(id) {
    const mockDetails = {
      1: {
        title: '牛肉面 - 汤浓面滑，香气扑鼻',
        desc: '选用上等牛骨熬制高汤，面条劲道顺滑，汤汁浓郁。',
        url: '/static/home/food1.jpg',
        author: '美食探店官',
      },
      2: {
        title: '烤鸡翅 - 外酥里嫩，口感绝了',
        desc: '炭火烤制，金黄酥脆，咬一口爆汁，香气四溢。',
        url: '/static/home/food2.jpg',
        author: '夜市达人',
      },
      3: {
        title: '寿司拼盘 - 新鲜海味，一口满足',
        desc: '精选海鲜每日直供，搭配独家酱汁，原汁原味。',
        url: '/static/home/food3.jpg',
        author: '料理研究所',
      },
      4: {
        title: '草莓蛋糕 - 香甜软糯，下午茶首选',
        desc: '草莓果酱搭配绵密奶油，甜而不腻，少女心满满。',
        url: '/static/home/food4.jpg',
        author: '甜点笔记',
      },
    }

    const detail = mockDetails[id] || {}
    this.setData({
      detail,
      comments: [
        { user: 'Alice', content: '看起来太好吃了！😋' },
        { user: 'Ben', content: '打卡同款！真的很香～' },
      ],
    })
  },

  // 输入框绑定
  onInput(e) {
    this.setData({ inputValue: e.detail.value })
  },

  // 发送评论
  sendComment() {
    const content = this.data.inputValue.trim()
    if (!content) {
      Message.warning({
        context: this,
        content: '请输入评论内容',
      })
      return
    }

    const newComment = {
      user: '我',
      content,
    }

    this.setData({
      comments: [...this.data.comments, newComment],
      inputValue: '',
    })

    Message.success({
      context: this,
      content: '评论已发送',
    })
  },
})
