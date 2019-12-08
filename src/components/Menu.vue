<template>
  <div id="app" class="text-center">
    <b-button-group vertical>
      <center>
        <router-link :to="{ name: 'login' }" v-if="!loggedIn">
          <b-button variant="primary">Login</b-button>
          <hr />
        </router-link>

        <router-link :to="{ name: 'register' }" v-if="!loggedIn">
          <b-button variant="primary">Register</b-button>
          <hr />
        </router-link>

        <router-link :to="{ name: 'conditions' }" v-if="loggedIn">
          <b-button variant="success" >Conditions</b-button>
          <hr />
        </router-link>
      </center>
    </b-button-group>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>