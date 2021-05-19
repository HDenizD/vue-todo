<template>
  <div
    id="add-todo-input"
    class="d-flex"
  >
    <v-textarea
      v-model="newTodo.title"
      class="ma-5 mb-0"
      name="Add Todo"
      label="What needs to be done...?"
      outlined
      rows="1"
      auto-grow
      :error-messages="invalidInput ? 'nothing todo?' : ''"
      @keydown.ctrl.enter="submitTodo(newTodo)"
      @input="invalidInput = false"
    />
    <v-btn
      color="success"
      width="30px"
      class="add-btn ml-1"
      text
      outlined
      :loading="requestBuffer"
      @click="submitTodo(newTodo)"
    >
      <v-icon color="success">
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      newTodo: {
        title: '',
        show: false
      },
      invalidInput: false
    }
  },
  computed: {
    ...mapGetters(['requestBuffer'])
  },
  methods: {
    ...mapActions(['addTodo']),
    submitTodo(newTodo) {
      if (this.newTodo.title.length !== 0) {
        this.invalidInput = false
        this.addTodo(newTodo)
        this.newTodo.title = ''
      } else {
        this.invalidInput = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#add-todo-input {
  .add-btn {
    position: relative;
    height: 56px;
    width: 30px;
    top: 20px;
    left: -20px;
  }
}
</style>
