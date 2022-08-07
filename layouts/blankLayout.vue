<template>
  <v-app class="app">
    <v-main>
      <template>
        <nuxt />
      </template>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
