Component({
  properties: {
    url: String,   // 图片地址
    desc: String,  // 文字描述
    tags: Array,   // 标签数组
    id: Number,    // 唯一标识
  },

  methods: {
    // 点击卡片触发事件
    onTap() {
      // 向父级页面发出点击事件
      this.triggerEvent('tapcard', { id: this.data.id })
    },
  },
})
