<template>
  <div class="scroll-wrapper">
    <van-list v-model="upLoading" :finished="finished" @load="onLoad">
        <van-cell v-for="articles in articles" :key='articles' :title="articles"></van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 是否加载数据 true 上拉加载数据 false关闭
      finished: false, // 是否加载数据 当为true的时候加载完毕
      articles: [] // 定义一个数组自己定义数据渲染页面
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        if (this.articles.length < 50) {
        // 自己 模拟数据渲染页面 当页面的条数小于50条的时候渲染数据
          let arr = Array.from(Array(10), (value, index) => this.articles.length + index + 1)
          this.articles.push(...arr)
          this.upLoading = false
        } else {
          this.finished = true // 告诉组件内容已经渲染完成 关闭加载
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
