<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list v-model="upLoading" :finished="finished" @load="onLoad" finished-text="没有了">
        <van-cell v-for="article in articles" :key="article.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{ article.title }}</h3>
            <!--  三途模式 -->
            <div class="img_box" v-if="article.cover.type === 3">
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[0]" />
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[1]" />
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[2]" />
            </div>

            <!--  单图模式 -->

            <div class="img_box" v-if="article.cover.type === 1">
              <van-image lazy-load class="w100" fit="cover" :src="article.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{ article.aut_name }}</span>
              <span>{{ article.comm_count }}评论</span>
              <!-- 使用过滤器  表达式 | 过滤器名称 -->
              <span>{{ article.pubdate | relTime}}</span>
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
import { getArticles } from '@/api/article'
export default {
  data () {
    return {
      upLoading: false, // 是否加载数据 true 上拉加载数据 false关闭
      finished: false, // 是否加载数据 当为true的时候加载完毕
      articles: [], // 定义一个数组自己定义数据渲染页面
      refreshSuccessText: '更新成功',
      downLoading: false, // 是否开启下拉刷新
      timestamp: null // 定义一个时间戳
    }
  },
  //   接受父组件传的值 使用props
  props: {
    channel_id: {
      required: true,
      type: Number,
      default: null
    }
  },
  methods: {
    //   上拉加载 获取真实数据
    async onLoad () {
      await this.$sleep() // 等待 sleep  resovle
      let data = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now()
      })
      //   追加数据到队尾
      this.articles.push(...data.results)
      this.upLoading = false
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
      //   setTimeout(() => {
      //     if (this.articles.length < 50) {
      //       // 自己 模拟数据渲染页面 当页面的条数小于50条的时候渲染数据
      //       let arr = Array.from(
      //         Array(10),
      //         (value, index) => this.articles.length + index + 1
      //       )
      //       this.articles.push(...arr)
      //       this.upLoading = false
      //     } else {
      //       this.finished = true // 告诉组件内容已经渲染完成 关闭加载
      //     }
      //   }, 1000)
    },
    // 下拉刷新
    async onRefresh () {
      await this.$sleep() // 等待 sleep  resovle
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: Date.now()
      })
      this.downLoading = false // 关闭下拉刷新
      if (data.results.length) {
        this.articles = data.results // 将历史的数据全部覆盖
        this.finished = false
        this.timestamp = data.pre_timestamp
        this.refreshSuccessText = `更新了${data.results.length}条数据`
      } else {
        //   如果没有数据更新，什么都不需要变化
        this.refreshSuccessText = '已是最新的数据'
      }

      //   setTimeout(() => {
      //     let arr = Array.from(Array(10), (value, index) => '追加' + (index + 1))
      //     this.articles.unshift(...arr) // 在原有数据之前添加数据
      //     this.downLoading = false // 关闭下拉刷新
      //     this.refreshSuccessText = `更新了${arr.length}条数据`
      //   }, 1000)
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
