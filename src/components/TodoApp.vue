<template>
  <div id="todo-app">
    <v-card
      class="mx-auto mt-8"
      max-width="500"
      elevation="24"
      outlined
    >
      <add-todo-input />
      <todo-item
        v-for="(todo, index) in todos"
        :key="index"
        :todo-data="todo"
        :todo-list-index="index"
      />
      <Summary />
    </v-card>
  </div>
</template>

<script>
import AddTodoInput from '@/components/AddTodoInput'
import TodoItem from '@/components/TodoItem'
import Summary from '@/components/Summary'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    TodoItem,
    AddTodoInput,
    Summary
  },
  computed: {
    ...mapGetters(['todos'])
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
