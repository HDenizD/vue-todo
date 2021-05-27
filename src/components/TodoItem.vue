<template>
  <div id="todo-item">
    <transition name="slide-fade">
      <v-card
        v-if="todoData.show"
        class="mx-auto d-flex todo-card"
        max-width="500"
        height="auto"
        tile
        elevation="7"
      >
        <v-textarea
          ref="todoInput"
          v-model="todoData.title"
          :style="todoData.completed ? 'text-decoration: line-through' : ''"
          :readonly="!todoData.editMode"
          rows="1"
          auto-grow
          flat
          solo
          class="todo-title"
          @click="todoDone(todoData)"
          @keydown.ctrl.enter="toggleEditMode(todoData)"
        />

        <v-card-actions class="d-flex">
          <v-btn
            v-if="todoData.completed"
            class="btn-check"
            text
            fab
            height="40px"
            width="40px"
            color="success"
            :loading="todoData.updateBuffer"
            @click="todoDone(todoData)"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
            v-else
            class="btn-check"
            text
            fab
            height="40px"
            width="40px"
            :loading="todoData.updateBuffer"
            :color="todoData.editMode ? 'info' : 'warning'"
            @click="toggleEditMode(todoData)"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn
            class="btn-check"
            text
            fab
            height="40px"
            width="40px"
            color="error"
            @click="deleteHandler(todoData)"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    todoData: {
      type: Object,
      default: () => {}
    },
    todoListIndex: {
      type: Number,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['deleteTodo', 'updateTodo']),
    deleteHandler(todoData) {
      const payload = {
        listIndex: this.todoListIndex,
        todoData: todoData
      }
      this.todoData.show = false
      this.deleteTodo(payload)
    },
    updateTodoHandler(todo) {
      todo.updateBuffer = true
      this.updateTodo(todo).then(() => {
        todo.updateBuffer = false
      })
    },
    todoDone(todoData) {
      if (todoData.editMode) return
      todoData.completed = !todoData.completed
      this.updateTodoHandler(todoData)
    },
    toggleEditMode(todoData) {
      if (todoData.editMode) {
        this.updateTodoHandler(todoData)
      }
      todoData.editMode = !todoData.editMode
      if (todoData.editMode) this.$refs.todoInput.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.9s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.todo-card {
  .todo-title {
    top: 15px;
    position: relative;
  }
}
::v-deep textarea {
  cursor: pointer !important;
}
</style>
