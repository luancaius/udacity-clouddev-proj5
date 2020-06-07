<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <Quiz v-if="this.profile.email" :user="profile" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import Quiz from "../components/Quiz";
export default {
  name: "home",
  components: { Quiz },
  computed: {
    ...mapGetters("user", ["loggedIn", "profile"]),
  },
};
</script>
