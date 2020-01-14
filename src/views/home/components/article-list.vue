<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list v-model="upLoading" :finished="finished" @load="onLoad">
        <van-cell v-for="articles in articles" :key="articles" :title="articles"></van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 是否加载数据 true 上拉加载数据 false关闭
      finished: false, // 是否加载数据 当为true的时候加载完毕
      articles: [], // 定义一个数组自己定义数据渲染页面
      refreshSuccessText: '更新成功',
      downLoading: false // 是否开启下拉刷新
    }
  },
  methods: {
    //   上拉加载
    onLoad () {
      setTimeout(() => {
        if (this.articles.length < 50) {
          // 自己 模拟数据渲染页面 当页面的条数小于50条的时候渲染数据
          let arr = Array.from(
            Array(10),
            (value, index) => this.articles.length + index + 1
          )
          this.articles.push(...arr)
          this.upLoading = false
        } else {
          this.finished = true // 告诉组件内容已经渲染完成 关闭加载
        }
      }, 1000)
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        let arr = Array.from(Array(10), (value, index) => ('追加' + (index + 1)))
        this.articles.unshift(...arr) // 在原有数据之前添加数据
        this.downLoading = false // 关闭下拉刷新
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
