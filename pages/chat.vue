<template>
  <Chat v-if="!!user"/>
  <ListUsers v-else @openChat="user = $event"/>
</template>

<script>
export default {
  name: 'ChatPage',
  layout: 'defaultLayout',
  data() {
    return {
      user: null
    }
  },
  mounted () {
    console.log('user', this.user);
    console.log('user2', !!this.user)
  },
}
</script>
