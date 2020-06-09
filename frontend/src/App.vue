<template>
  <v-app id="app">
    <v-container>
      <nav-bar />
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
