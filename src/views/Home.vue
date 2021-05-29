<template>
  <div class="home">
    {{ $store.state.name }}: {{ $store.state.age }}
    myAge: {{ $store.getters.myAge }}
    <p><button @click="handleClick">同步</button></p>
    <p><button @click="handleAsyncClick">异步</button></p>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    handleClick() {
      this.$store.commit('changeAge', 1);
    },
    async handleAsyncClick() {
      this.$store.dispatch('asyncChangeAge', 10);
    }
  },
  mounted() {
    console.log('Home', this);
  }
}
</script>
