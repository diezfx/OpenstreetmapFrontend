<template>
  <div>
    <v-snackbar top v-model="snackbar" :color="color">{{ text }}</v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.state.notifications;
    }
  },
  data() {
    return {
      text: null,
      snackbar: false,
      color: "red",
      mode: "",
      timeout: 6000
    };
  },
  methods: {},
  watch: {
    notifications() {
      if (this.notifications == null) {
        return;
      }
      this.text=this.notifications.Title
      this.snackbar = true;
    }
  }
};
</script>

<style>
</style>
