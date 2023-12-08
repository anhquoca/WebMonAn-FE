<template>
    <v-container>
        <router-view></router-view>
    </v-container>
  </template>
  <script>
  export default {
    props: {
      selectedItem: Object,
    },
    data() {
      return {
      }
    },
    methods: {
    },
  };
  </script>
  
  <style scoped>

  </style>
  