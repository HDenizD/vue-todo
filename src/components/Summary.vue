<template>
  <div id="summary">
    <v-card
      class="todo-card"
      max-width="500"
      min-height="50"
      height="auto"
      tile
      elevation="7"
    >
      <v-card-actions class="d-flex justify-space-around">
        <v-chip
          label
          outlined
          class="chip d-flex justify-center"
        >
          {{ todosTodoWording }}: {{ todosCount }}
          <!-- <v-icon color="success">
            mdi-check
          </v-icon> -->
        </v-chip>

        <v-chip
          label
          outlined
          class="chip d-flex justify-center"
        >
          Completed: {{ todosCompletedCount }}
          <v-icon
            color="success"
            class="ml-2"
          >
            mdi-check
          </v-icon>
        </v-chip>

        <v-chip
          label
          outlined
          class="chip d-flex justify-center"
          @click="deleteAllTodos()"
        >
          Delete All
          <v-icon
            color="error"
            class="ml-2"
          >
            mdi-delete
          </v-icon>
        </v-chip>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'todosCount',
      'todosCompletedCount',
      'todosUncompletedCount'
    ]),
    todosTodoWording: function() {
      if (this.todosCount === 1) return 'Todo'
      else return 'Todos'
    }
  },
  methods: {
    ...mapActions(['deleteTodo']),
    deleteAllTodos() {
      this.deleteTodo('deleteAll')
    }
  }
}
</script>

<style lang="scss" scoped>
#summary {
  .chip {
    width: 150px;
  }
}
</style>
