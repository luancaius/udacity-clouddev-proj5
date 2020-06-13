<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <h1>Events:</h1>
      </v-col>
      <v-col cols="2">
        <v-row justify="end">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                class="mr-3"
                dark
                v-bind="attrs"
                v-on="on"
                @click="setDefault"
              >New Item</v-btn>
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
                      <v-select
                        :items="groups"
                        item-text="name"
                        item-value="id"
                        v-model="groupId"
                        label="Group"
                        solo
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="value" v-model="value" type="text" required></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
                <v-btn color="blue darken-1" text @click="saveForm">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <EventTable :events="events" :groups="groups" @deleteItem="deleteItem" @editItem="editItem"></EventTable>
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
      groups: [],
      dialog: false,
      date: "",
      groupId: "",
      value: "",
      eventId: ""
    };
  },
  async created() {
    const claims = await this.$auth.getIdTokenClaims();
    const token = claims.__raw;
    // eslint-disable-next-line
    console.log(token);

    this.getGroupsAction();
    this.groups = this.group.groups;

    await this.getEventsAction({ token });
    this.events = this.eventObj.events;
    this.resync();
  },
  computed: {
    ...mapState(["eventObj", "group"])
  },
  methods: {
    ...mapActions("eventObj", [
      "getEventsAction",
      "saveEventAction",
      "deleteEventAction",
      "updateEventAction"
    ]),
    ...mapActions("group", ["getGroupsAction"]),
    async saveForm() {
      var item = {
        date: this.date,
        value: this.value,
        groupId: this.groupId
      };
      const claims = await this.$auth.getIdTokenClaims();
      const token = claims.__raw;

      const eventId = this.eventId;
      if (eventId) {
        const updatedItem = { eventId, ...item };
        await this.updateEventAction({ updatedItem, token });
        this.events = this.eventObj.events;
        this.resync();
      } else {
        const g = this.groups;
        await this.saveEventAction({ item, g, token });
      }
      this.clearDialog();

      this.dialog = false;
    },
    async deleteItem(item) {
      const claims = await this.$auth.getIdTokenClaims();
      const token = claims.__raw;
      await this.deleteEventAction({ eventId: item.eventId, token });
      this.events = this.eventObj.events;
    },
    async editItem(item) {
      this.eventId = item.eventId;
      this.date = item.date;
      this.groupId = item.groupId;
      this.value = item.value;
      this.dialog = true;
    },
    setDefault() {
      this.groupId = 1;
      this.date = new Date().toISOString().substr(0, 10);
    },
    clearDialog() {
      this.eventId = "";
      this.date = "";
      this.groupId = "";
      this.value = "";
    },
    closeDialog() {
      this.clearDialog();
      this.dialog = false;
    },

    resync() {
      const g = this.groups;
      this.events.forEach(element => {
        element["groupName"] = g.find(a => a.id == element["groupId"]).name;
      });
    }
  }
};
</script>
