// components/num-lock/index.js
const { $Message } = require('../../libs/base/index');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    passLength: {
      type: Number,
      value: 6
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    passWord: [],
    keyboard: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['#', 0, '*']
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 键盘点击
     */
    buttonHandleTap (e) {
      const item = e.currentTarget.dataset.item
      let passWord = this.data.passWord
      if (passWord.length < this.data.passLength) {
        passWord.push(item)
        this.setData({
          passWord
        })
      } else {
        $Message({
          content: `密码已经达到最大长度`,
          type: 'warning'
        })
      }
    },
    /**
     * 重置
     */
    clear () {
      this.setData({
        passWord: []
      })
    },
    /**
     * 确定
     */
    confirm () {
      console.log(this.data.passWord)
    }
  },

  attached () {
  }
})
