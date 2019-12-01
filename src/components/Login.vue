<template>
  <div>
    <h2 class="login-heading">Login</h2>
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
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("retrieveToken", {
          email: this.user.email,
          password: this.user.password
        })
        .then(response => {
          console.log(response)
          this.$router.push({ name: "conditions" });
        });
    }
  }
};
</script>