<template>
  <div>
    <b-alert
      v-model="error"
      variant="danger"
      dismissible
    > {{error_message}} </b-alert>
    <h2 class="login-heading">Register</h2>
    <b-form action="#" @submit.prevent="register" @reset="reset">
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
          variant="danger"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="repeat_password-label" label="Repeat Password:" label-for="repeat_password">
        <b-form-input
          id="repeat_password"
          v-model="user.repeat_password"
          type="password"
          required
          placeholder="Repeat Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Register</b-button>
      <b-button type="reset" variant="danger" class="mx-1">Reset</b-button>
    </b-form>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      error: false,
      error_message : "",
      user: {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repeat_password: ""
      }
    };
  },
  methods: {
    async register() {
      if (this.user.repeat_password == this.user.password) {
        let res = await this.$store.dispatch("register", {
          username: this.user.username,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          password: this.user.password
        });

        let status =
          res.data != undefined ? res.data.status : res.response.status;
        if (status.toString().toLowerCase() == "activated") {
          this.$router.push({ name: "login" });
        } else {
          this.error = true;
          this.error_message = "There is an account associated to this email";
        }
      }
      else{
        this.error = true;
        this.error_message = "The passwords do not match";
        document.getElementById("password").focus();
      }
    },
    reset() {
      (this.user.username = ""),
        (this.user.firstname = ""),
        (this.user.lastname = ""),
        (this.user.email = ""),
        (this.user.password = "");
    }
  }
};
</script>