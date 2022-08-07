<template>
  <div>
    <v-app-bar
      clipped-left
      color="primary"
      dark
      app
      :dense="$vuetify.breakpoint.xsOnly"
    >
      <div class="d-flex justify-space-between align-center" style="width:100%">
        <v-app-bar-nav-icon @click="drawer = true"/>
        <v-btn dark color="secondary" @click="logoutUser">
          <v-icon color="primary">mdi-power</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
 data() {
  return {
    drawer: false,
    group: null
  }
 },
 mounted () {
  console.log('user', this.user);
 },
 computed: {
    ...mapState({
      user: state => state.user.user,
    })
  },
 methods: {
  ...mapActions ({
    logout: 'user/logout',
  }),
  async logoutUser() {
    await this.$fire.firestore.collection("users").doc(this.user.uid).update({
      status: false
    })
    await this.$fire.auth.signOut()
    this.logout ()
    this.$router.push('/login')
  }
 },
}

</script>

<style lang="scss" scoped>
</style>
