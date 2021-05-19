<template>
  <div id="todo-item">
    <v-card
      class="mx-auto mt-10 d-flex"
      max-width="500"
      height="100px"
      outlined
    >
      <v-list-item two-line>
        <v-list-item-content>
          <div class="overline mb-4">
            OVERLINE
          </div>
          <v-list-item-title class="headline mb-1">
            Headline 5
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn
          outlined
          rounded
          text
        >
          Button
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>
