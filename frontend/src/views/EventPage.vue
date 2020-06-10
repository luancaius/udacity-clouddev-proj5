<template>
  <v-container>
    <v-row>
      <v-col xs="10">
        <h1>Events:</h1>
      </v-col>
      <v-col xs="2">
        <v-btn color="primary">New Item</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <EventTable :events="events"></EventTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventTable from "../components/EventTable";
import { mapActions, mapState } from "vuex";

export default {
  name: "EventPage",
  components: {
    EventTable
  },
  data() {
    return {
      events: []
    };
  },
  async created() {
    const userId = this.$auth.user.sub;
    const claims = await this.$auth.getIdTokenClaims();
    const token = claims.__raw;
    console.log(token);

    await this.getEventsAction({ userId, token });
    console.log("EventPage getEventsAction");

    this.events = this.eventObj.events;
    console.log(this.events);
  },
  computed: {
    ...mapState(["eventObj"])
  },
  methods: {
    ...mapActions("eventObj", ["getEventsAction", "saveEventAction"])
  }
};
</script>
