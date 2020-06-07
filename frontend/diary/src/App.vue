<template>
  <v-app>
    <Toolbar :login="login" :logout="logout" :profile="profile" :loggedIn="loggedIn" />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <v-footer app></v-footer>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Toolbar from "./components/Toolbar.vue";

export default {
  name: "App",
  components: {
    Toolbar
  },
  methods: {
    ...mapActions("user", ["login", "logout"])
  },
  computed: {
    ...mapGetters("user", ["profile", "loggedIn"])
  }
};
</script>
