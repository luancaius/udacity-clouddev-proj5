<template>
  <v-data-table :headers="headers" :items="events" sort-by="date" class="elevation-1">
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.eventId" label="Event Id"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.groupId" label="Group Id"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.date" label="Date"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.value" label="Value"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "EventTable",
  props: {
    events: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Event Id",
          align: "start",
          sortable: false,
          value: "eventId"
        },
        { text: "Group Id", value: "groupId" },
        { text: "Date", value: "date" },
        { text: "Value", value: "value" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedItem: {
        eventId: "",
        groupId: "",
        date: "",
        value: ""
      }
    };
  },
  methods: {
    async deleteItem(item) {
      this.$emit("deleteItem", item);
    },
    editItem(item) {}
  }
};
</script>

<style lang="scss" scoped>
</style>