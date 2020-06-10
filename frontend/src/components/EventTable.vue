<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Event Id</th>
          <th class="text-left">Group Name</th>
          <th class="text-left">Date</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in events" :key="item.eventId">
          <td>{{ item.eventId }}</td>
          <td>{{ item.groupId }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "EventTable",
  props: {
    events: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
</style>