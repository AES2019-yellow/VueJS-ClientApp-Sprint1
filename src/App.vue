<template>
    <b-container id="app" class="container">
    <b-row >
      <b-col pull-left>
        <p style="font-weight: bold" v-if="loggedIn">Hello {{username}}</p>
      </b-col>      
      <b-col class="text-right" pull-right>
        <router-link :to="{ name: 'logout' }" v-if="loggedIn" @click="logout()" style="font-weight: bold">Logout</router-link>
      </b-col>
      <b-col class="text-center" md = "12">
        <h2>Automatic Suffocation Detection System</h2>
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
    }, 
    username(){
      return this.$store.getters.userName
    }
  }
}
</script>