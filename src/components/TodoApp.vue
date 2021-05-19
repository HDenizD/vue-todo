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
export default {
  components: {
    TodoItem,
    AddTodoInput
  }
}
</script>

<style lang="scss" scoped>
</style>
