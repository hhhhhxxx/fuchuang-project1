<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{marginLeft: left + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import show from '../../utils/show'

const delta = 30 // tag's padding
const padding = 15
export default {
  name: 'scrollPane',
  data() {
    return {
      left: 0
    }
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $containerWidth = this.$refs.scrollContainer.offsetWidth
      const $wrapperWidth = this.$refs.scrollWrapper.offsetWidth
      // show('cw', $containerWidth)
      // show('ww', $wrapperWidth)
      // 滚轮下负上正 下右 上左
      if ($containerWidth > $wrapperWidth) {
        this.left = 0
      } else {
        if (eventDelta > 0) {
          this.left = Math.min(this.left + delta, 0)
        } else {
          this.left = Math.max(this.left - delta, $containerWidth - $wrapperWidth)
        }
      }
    },
    moveToTarget($target) {
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth
      // 激活框在左边溢出
      if ($targetLeft - padding < -this.left) {
        // tag in the left
        this.left = -($targetLeft - padding)
      } else if ($targetLeft - padding >= -this.left && $targetLeft + $targetWidth + padding <= -this.left + $containerWidth) {
        // 处于正确位置   $targetLeft + $targetWidth + padding + this.left - c
      } else {
        // 在右边溢出
        this.left = $containerWidth - $targetLeft - $targetWidth - padding
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  white-space: nowrap; //规定段落中的文本不进行换行：
  overflow: hidden;
  //width: 100%;
  .scroll-wrapper{
    display:inline-block; // 设置行内块 宽度随内容撑开
    position: relative;
  }
}
</style>
