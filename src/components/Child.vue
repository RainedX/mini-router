<template>
  <div>child</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // 拿到根实例
    console.log('child', this._routerRoot);
  }
}
</script>
