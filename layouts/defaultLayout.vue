<template>
  <v-app id="app">
    <DefaultLayoutAppBar/>
    <v-main class="main">
      <template>
        <nuxt />
      </template>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      showDrawer: false
    }
  },
  created() {
    this.$fire.auth.onAuthStateChanged(() => {
      this.loaded = true
      const user = this.$fire.auth.currentUser;
    })
  },
}
</script>
<style lang="scss" scoped>
#app {
  background-color: #fff
}
</style>

