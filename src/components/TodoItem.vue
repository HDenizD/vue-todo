<template>
  <div id="todo-item">
    <transition name="slide-fade">
      <v-card
        v-if="todoData.show"
        class="mx-auto d-flex"
        max-width="500"
        height="auto"
        outlined
        tile
      >
        <v-textarea
          :style="todoData.completed ? 'text-decoration: line-through' : ''"
          :value="todoData.title"
          readonly
          solo
          rows="1"
          auto-grow
          flat
          class="todo-title"
        >
          {{ todoData.title }}
        </v-textarea>

        <v-card-actions class="d-flex">
          <v-btn
            class="btn-check"
            text
            fab
            height="30px"
            width="30px"
            color="success"
            @click="todoDone(todoData)"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
            class="btn-check"
            text
            fab
            height="30px"
            width="30px"
            color="error"
            @click="submitDelete(todoData.id)"
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
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['deleteTodo']),
    submitDelete() {
      this.todoData.show = false
      this.deleteTodo(this.todoData.id)
    },
    todoDone(todoData) {
      todoData.completed = !todoData.completed
    }
  }
}
</script>

<style lang="scss" scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.todo-title {
  top: 15px;
  position: relative;
}
</style>
