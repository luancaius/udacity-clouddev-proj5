<template functional>
  <v-app-bar app dark color="primary">
    <v-toolbar-title class="white--text ml-5">Personal Diary</v-toolbar-title>
    <v-spacer />
    <v-menu v-if="props.loggedIn" auto offset-y bottom>
      <template v-slot:activator="{ on }">
        <v-avatar class="mr-5" v-on="on">
          <img :src="props.profile.picture" />
        </v-avatar>
      </template>
      <v-list>
        <v-list-item @click="props.logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn class="mr-5" v-else @click="props.login">Login</v-btn>
  </v-app-bar>
</template>

<script>
export default {};
</script>