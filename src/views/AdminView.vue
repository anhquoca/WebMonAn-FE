<template>
  <v-container fluid>
    <v-row>
      <v-col :cols="2">
        <Sidebar ></Sidebar>
      </v-col>
      <v-col :cols="10">
        <Content ></Content>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Content from '@/components/Content.vue';

export default {
  components: {
    Sidebar,
    Content,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
