<template>
  <div>
    <h2 class="login-heading">Login</h2>
    <b-alert
      v-model="error"
      variant="danger"
      dismissible
    >The email or password is wrong</b-alert>
    <b-form action="#" @submit.prevent="login">
      <b-form-group id="email-label" label="Email address:" label-for="email">
        <b-form-input
          id="email"
          v-model="user.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password-label" label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="user.password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      error:false,
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      let res = await this.$store.dispatch("retrieveToken", {
        email: this.user.email,
        password: this.user.password
      });
      let status = res.data != undefined ? res.data.status : res.response.status;
      if (status.toString().toLowerCase() == "ok") {
        this.$router.push({ name: "conditions" });
      }
      else{
        this.error = true;
      }
    }
  }
};
</script>