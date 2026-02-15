<template>
  <v-container>
      <v-row v-for="Info in BaseInfos" :key="Info.name" @click="$emit('Row-Clicked',Info)">
        <v-col>{{ Info.name }}</v-col>
        <v-col>{{ $t(Info.displayKey) }}</v-col>
        <v-col auto></v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BaseInfoList",
  data() {
    return {
      ChoosedData: {
          key: '',
          name: '',
          displayKey: '',
      },
    };
  },
  props: {
    BaseInfos: [],
    CurrentBase: '',
  },
  methods: {

}
};
</script>

<style></style>
