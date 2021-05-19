<template>
  <div
    id="add-todo-input"
    class="d-flex"
  >
    <v-textarea
      v-model="newTodo"
      class="ma-5"
      name="Add Todo"
      label="What needs to be done...?"
      auto-grow
      rows="1"
      outlined
    />
    <v-btn
      color="#42b883"
      width="30px"
      class="add-btn ml-1"
    >
      <v-icon color="#35495e">
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: ''
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
