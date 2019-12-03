<template>
    <b-container id="app" class="container">
          <b-row>
      <b-col class="text-center">
        <h5>Automatic Suffocation Detection System</h5>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col class="mr-auto" md="3">
        <temperature />
      </b-col>
      <b-col class="mx-auto" md="3">
        <co2 />
      </b-col>
      <b-col class="ml-auto" md="3">
        <pressure />
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
        <conditions />
      </b-col>
    </b-row>
    <router-view></router-view>
     <div>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
  </b-container>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import Temperature from "../dashboard/Temperature";
import Co2 from "../dashboard/Co2";
import Pressure from "../dashboard/Pressure";
import Conditions from "../dashboard/Conditions";

export default {
  components: {
    Temperature,
    Co2,
    Pressure,
    Conditions
  }
    // computed: {
    //     ...mapState({
    //         account: state => state.account,
    //         users: state => state.users.all
    //     })
    // },
    // created () {
    //     this.getAllUsers();
    // },
    // methods: {
    //     ...mapActions('users', {
    //         getAllUsers: 'getAll',
    //         deleteUser: 'delete'
    //     })
    // }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: auto;
}
</style>