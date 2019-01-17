!<template>
  <div v-if="info" class="info">
    <v-data-table :headers="headers" :items="info['roadTypes']" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.type }}</td>
        <td>{{ props.item.count }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  computed: {
    info() {
      return this.$store.state.info;
    }
  },
  data() {
    return {
      /*
      info: {
        roadTypes: [{ type: "Street", count: 10 }, { type: "bla", count: 5 }]
      },*/
      headers: [{ text: "Type" }, { text: "Count" }]
    };
  },
  mounted() {
    console.log("test");
    this.$store.dispatch("requestMetaInfo");
  }
};
</script>

<style>
</style>
