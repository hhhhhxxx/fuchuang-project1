<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{ marginTop : top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import show from '../../utils/show'

const delta = 30

export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0
    }
  },
  mounted() {
    // 屏幕改变 滚动
    window.addEventListener('resize', () => {
      const $containerHeight = this.$refs.scrollContainer.offsetHeight
      const $wrapperHeight = this.$refs.scrollWrapper.offsetHeight
      // show('ch', $containerHeight)
      // show('wr', $wrapperHeight)
      if ($containerHeight >= $wrapperHeight) {
        this.top = 0
      }
    })
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $containerHeight = this.$refs.scrollContainer.offsetHeight
      const $wrapperHeight = this.$refs.scrollWrapper.offsetHeight
      if ($containerHeight > $wrapperHeight) {
        this.top = 0
      } else {
        if (eventDelta > 0) { // 滚轮向上 页面下移
          this.top = Math.min(0, this.top + delta)
        } else {
          this.top = Math.max($containerHeight - $wrapperHeight, this.top - delta)
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

.scroll-container {
  width: auto;
  height: 100%;

  .scroll-wrapper {
    padding-bottom: 20px;
  }
}
</style>
