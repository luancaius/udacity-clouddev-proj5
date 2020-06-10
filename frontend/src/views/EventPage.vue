<template>
  <v-container>
    <v-row>
      <v-col xs="10">
        <h1>Events:</h1>
      </v-col>
      <v-col xs="2">
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Diary Info</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Picker without buttons"
                          prepend-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="groupId" v-model="groupId" type="text" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="value" v-model="value" type="text" required></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="saveForm">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <EventTable :events="events" @deleteItem="deleteItem"></EventTable>
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
      events: [],
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      groupId: "",
      value: ""
    };
  },
  async created() {
    const claims = await this.$auth.getIdTokenClaims();
    const token = claims.__raw;
    console.log(token);

    await this.getEventsAction({ token });

    this.events = this.eventObj.events;
  },
  computed: {
    ...mapState(["eventObj"])
  },
  methods: {
    ...mapActions("eventObj", [
      "getEventsAction",
      "saveEventAction",
      "deleteEventAction"
    ]),
    async saveForm() {
      var item = {
        date: this.date,
        value: this.value,
        groupId: this.groupId
      };
      const claims = await this.$auth.getIdTokenClaims();
      const token = claims.__raw;
      await this.saveEventAction({ item, token });
      this.dialog = false;
    },
    async deleteItem(item) {
      const claims = await this.$auth.getIdTokenClaims();
      const token = claims.__raw;
      await this.deleteEventAction({ eventId: item.eventId, token });
      this.events = this.eventObj.events;
    }
  }
};
</script>
