<template>
  <div class="fill-height px-2">
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="w-200"
    >
      <div :class="message.email === user.email ? 'text-right': 'text-left'">
        <div>{{ message.email }}</div>
        <div
          :class="message.email === user.email ? 'primary': 'green'"
        >
          {{ message.content }}
        </div>
      </div>
    </div>
    <div
      v-if="messagesData.length === 0"
      class="w-200"
    >
        <span>No se encontraron mensajes</span>
    </div>
    <v-form class="footer">
      <v-text-field
        v-model="message"
        append-outer-icon="mdi-send"
        filled
        dense
        hide-details
        label="Message"
        type="text"
        @click:append-outer="sendMessage"
        @keydown.enter="sendMessage"
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      message: '',
      data: null,
      loading: false,
      messagesData: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
    messageRef () {
      return this.$fire.database.ref('messages')
    },
    messages () {
      this.messageRef.on('value', snapshot => {
        const data = snapshot.val()
        const dataFormatted = Object.entries(data).map(([id, obj]) => ({ id, ...obj }))

        this.messagesData = dataFormatted
        return dataFormatted
      })
      return this.messagesData
    }
  },
  methods: {
    async sendMessage() {
      const message = {
        email: this.user.email,
        content: this.message
      }

      await this.messageRef.push(message)
      this.message = ''
    }
  },
}
</script>
<style lang="scss" scoped>
.footer {
  background-color: white;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 12px
}
</style>
