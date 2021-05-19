<template>
  <div id="todo-app">
    <v-card
      class="mx-auto mt-10"
      max-width="500"
      outlined
    >
      <add-todo-input />
      <todo-item />
    </v-card>
  </div>
</template>

<script>
import AddTodoInput from '@/components/AddTodoInput'
import TodoItem from '@/components/TodoItem'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    TodoItem,
    AddTodoInput
  },
  computed: {
    ...mapGetters(['getTodos'])
  },
  created() {
    this.fetchTodos()
  },
  methods: {
    ...mapActions(['fetchTodos'])
  }
}
</script>

<style lang="scss" scoped>
</style>
