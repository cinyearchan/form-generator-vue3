<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "App",
  mounted() {
    // 取消开始的 loading 动画
    const preLoader = document.querySelector("#pre-loader")
    ;(preLoader as HTMLElement).style.display = "none"

    // fix: firefox 下 拖拽 会新打开一个选项卡
    // https://github.com/JakHuang/form-generator/issues/15
    document.body.ondrop = event => {
      event.preventDefault()
      event.stopPropagation()
    }
  }
})
</script>
