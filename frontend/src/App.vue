<template>
  <v-app id="app">
    <nav-bar />
    <v-container>
      <error />
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import Error from "./components/Error";

export default {
  components: {
    NavBar,
    Error
  }
};
</script>
