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
        <EventTable></EventTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventTable from "../components/EventTable";
export default {
  name: "EventPage",
  components: {
    EventTable
  },
  created() {}
};
</script>

<style lang="scss" scoped>
</style>