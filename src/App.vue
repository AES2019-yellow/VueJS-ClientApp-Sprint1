<template>
    <b-container id="app" class="container">
    <b-row >
      <b-col class="text-center">
        <h2>Automatic Suffocation Detection System</h2>
        <router-link :to="{ name: 'logout' }" v-if="loggedIn" @click="logout()">Logout</router-link>
      </b-col>
    </b-row>
    <router-view></router-view>
  </b-container>
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