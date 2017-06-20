<template>
<div class="demo-infinite-container">
  <mu-list>
    <template v-for="item in list">
      <mu-list-item :title="item"/>
      <mu-divider/>
    </template>
  </mu-list>
  <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
</div>
</template>

<script>
export default {
  data () {
    const list = []
    for (let i = 0; i < 10; i++) {
      list.push('item' + (i + 1))
    }
    return {
      list,
      num: 10,
      loading: false,
      scroller: null
    }
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    loadMore () {
        console.log("this.scroller",this.scroller)
      this.loading = true
      setTimeout(() => {
        // for (let i = this.num; i < this.num + 10; i++) {
        //   this.list.push('item' + (i + 1))
        // }
        console.log("this.scroller",this.scroller)
        this.num += 10
        this.loading = false
      }, 200)
    }
  }
}
</script>

<style lang="css">
.demo-infinite-container{
  height: calc(100vh - 160px);     
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #d9d9d9;
}
</style>