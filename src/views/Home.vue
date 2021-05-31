<template>
  <div class="home">
    {{ $store.state.name }}: {{ $store.state.age }}
    <p>myAge-getters: {{ $store.getters.myAge }}</p>
    <p>moduleA: {{$store.state.a.name}} {{$store.state.a.age}}</p>
    <p>moduleB: {{$store.state.b.name}} {{$store.state.b.age}}</p>
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
    console.log(111, this.$store);
  }
}
</script>
