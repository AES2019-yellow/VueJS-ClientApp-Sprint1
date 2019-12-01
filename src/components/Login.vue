<template>
  <b-form inline @submit.prevent="login">
    <label class="mr-sm-2" for="inline-form-custom-select-pref">Email</label>
    <b-form-input required v-model="email" id="email" type="email" placeholder="Enter email"></b-form-input>
    <label class="mr-sm-2" for="inline-form-custom-select-pref">Password</label>
    <b-form-input required v-model="password" id="password" type="password" placeholder="Password"></b-form-input>
    <hr />
    <b-button type="submit" variant="primary">Login</b-button>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        let user = {
          user: {
            email: this.email,
            password: this.password
          }
        };
        let response = await axios.post("http://localhost:3000/login", user);
        this.$store.state.token = `Bearer ${response.data.token}`;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>