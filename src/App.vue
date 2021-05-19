<template>
  <v-app>
    <nav-bar />
    <v-main>
      <todo-app />
    </v-main>
  </v-app>
</template>

<script>
import TodoApp from './components/TodoApp'
import NavBar from './components/NavBar'

export default {
  name: 'App',

  components: {
    TodoApp,
    NavBar
  },

  data: () => ({
    //
  })
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
