<template>
  <div>
    <h2 class="login-heading">Login</h2>
    <b-form action="#" @submit.prevent="register">
      <b-form-group id="username-label" label="Username:" label-for="username">
        <b-form-input
          id="username"
          v-model="user.username"
          type="text"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="firstname-label" label="First Name:" label-for="firstname">
        <b-form-input
          id="firstname"
          v-model="user.firstname"
          type="text"
          required
          placeholder="Enter First Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="lastname-label" label="Last Name:" label-for="lastname">
        <b-form-input
          id="lastname"
          v-model="user.lastname"
          type="text"
          required
          placeholder="Enter Last Name"
        ></b-form-input>
      </b-form-group>
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

      <b-form-group id="repassword-label" label="Password:" label-for="repassword">
        <b-form-input
          id="repassword"
          v-model="repassword"
          type="password"
          required
          placeholder="Repeat Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Register</b-button>
      <b-button type="cancel" variant="danger" @click="cancel()">Cancel</b-button>
    </b-form>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      user: {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      },
      repassword: ""
    };
  },
  methods: {
    register() {
      this.$router.push({ name: "conditions" });
      // this.$store
      //   .dispatch("retrieveToken", {
      //     email: this.user.email,
      //     password: this.user.password
      //   })
      //   .then(response => {
      //     console.log(response);
      //     this.$router.push({ name: "conditions" });
      //   });
    },
    cancel() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>