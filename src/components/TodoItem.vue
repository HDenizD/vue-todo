<template>
  <div id="todo-item">
    <v-card
      class="mx-auto d-flex"
      max-width="500"
      height="70px"
      outlined
      tile
    >
      <v-list-item two-line>
        {{ todoContent }}
      </v-list-item>

      <v-card-actions class="d-flex">
        <v-btn
          class="btn-check"
          text
          fab
          height="30px"
          width="30px"
          color="success"
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
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    todoContent: {
      type: String,
      default: 'nothing todo...'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
