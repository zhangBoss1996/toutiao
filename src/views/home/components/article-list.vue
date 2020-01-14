<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list v-model="upLoading" :finished="finished" @load="onLoad" finished-text="没有了">
        <van-cell v-for="articles in articles" :key="articles">
          <div class="article_item">
            <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
            <!--  三途模式 -->
            <div class="img_box">
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>

            <!--  单图模式 -->

            <div class="img_box">
              <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="info_box">
              <span>你像一阵风</span>
              <span>8评论</span>
              <span>10分钟前</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
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
        let arr = Array.from(Array(10), (value, index) => '追加' + (index + 1))
        this.articles.unshift(...arr) // 在原有数据之前添加数据
        this.downLoading = false // 关闭下拉刷新
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
