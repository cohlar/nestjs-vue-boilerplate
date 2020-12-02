<template>
  <main>
    <h3>Login</h3>
    <form @submit.prevent="login">
      <input type="text" required v-model="user.email" placeholder="Email" />
      <input type="password" required v-model="user.password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "Login",
  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions("auth", ["loginUser"]),
    async login() {
      this.loginUser(this.user).then(this.redirectToHomeOrLastRequestRoute);
    },
    redirectToHomeOrLastRequestRoute() {
      const nextRoute: string = this.$route.query.redirect ? String(this.$route.query.redirect) : "/";
      this.$router.push(nextRoute);
    },
  },
});
</script>
