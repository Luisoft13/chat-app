<template>
  <v-container
    class="d-flex justify-center flex-column"
    fill-height
  >
    <v-card
      width="500"
      class="mb-2"
    >
      <v-card-text>
        <h1>Login User</h1>
        <v-form
          :id="FORM_LOGIN"
          :ref="FORM_LOGIN"
          v-model="validForm"
          lazy-validation
          @submit.prevent="userLogin"
        >
          <v-text-field
            v-model.trim="form.email"
            persistent-placeholder
            type="email"
            :disabled="processingForm"
            label="Email"
            outlined
            :rules="rules.email"
          />
          <v-text-field
            v-model.trim="form.password"
            persistent-placeholder
            :disabled="processingForm"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            outlined
            :rules="rules.password"
            :error="!!errors.password"
            :error-messages="errors.password"
            @keyup="errors.password = null"
            @click:append="showPassword = !showPassword"
          />
          <div class="text-center">
            <v-btn
              :disabled="!validForm || processingForm"
              type="submit"
              :form="FORM_LOGIN"
              color="primary"
              large
              class="white--text"
              :loading="processingForm"
              @click.prevent="userLogin"
            >
              Login
            </v-btn> <br>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" large class="white--text">
          <NuxtLink to="/register">Register</NuxtLink>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
const EMAIL_VALID_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const FORM_LOGIN = 'FORM_LOGIN'

export default {
  data () {
    return {
      FORM_LOGIN,
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          (v) => !!v || 'Email es requerido',
          (v) => EMAIL_VALID_REGEX.test(v) || 'Email es invalido'
        ],
        password: [(v) => !!v || 'Contraseña es requerida']
      },
      errors: {
        password: null
      },
      validForm: true,
      showPassword: false,
      processingForm: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    })
  },
  methods: {
    ...mapActions ({
      setUser: 'user/setUser',
    }),
    async userLogin () {
      if (!this.$refs[FORM_LOGIN].validate()) return

      this.processingForm = true
      const data = JSON.parse(JSON.stringify(this.form))
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          data.email,
          data.password
        );

        const token = this.$fire.auth.currentUser.getIdToken();
        console.log('token', token)

        const {email, uid} = this.$fire.auth.currentUser

        const user = {
          email, uid
        }
        this.setUser ({user})

        await this.$fire.firestore.collection("users").doc(user.uid).update({
          status: true
        })


        this.$router.push("/chat");
      } catch (e) {
        handleError(e);
      }

    },
  }

}
</script>

<style lang="scss" scoped>
.background-hover:hover {
  background-color: white !important;
}
.store-container{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media(max-width: 374px){
    grid-template-columns: 1fr;
    gap: 4px 0px;
  }
}
</style>
