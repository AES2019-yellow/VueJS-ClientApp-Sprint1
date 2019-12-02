<template>
  <div id="app" class="text-center">
      <b-button-group vertical>
          <center>
            <router-link :to="{ name: 'login' }"><b-button variant="primary" v-if="!loggedIn">Login</b-button></router-link>
            <hr>
            <router-link :to="{ name: 'register' }"><b-button variant="primary" v-if="!loggedIn">Register</b-button></router-link>
            <hr>
            <router-link :to="{ name: 'conditions' }"><b-button variant="success" v-if="loggedIn">Conditions</b-button></router-link>
          </center>
      </b-button-group>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>