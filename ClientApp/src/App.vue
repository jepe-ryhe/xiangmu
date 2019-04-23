<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  name: 'App',
  methods: {}
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .register:only-child {
        min-width: 350px;
    }
</style>
