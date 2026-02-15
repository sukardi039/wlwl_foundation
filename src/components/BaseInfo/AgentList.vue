<template>
  <v-container>
    <v-row style="background-color: lightgrey">
      <v-col cols="3">{{ $t("Agent.name") }}</v-col>
      <v-col cols="1">{{ $t("Agent.active") }}</v-col>
      <v-col cols="2">{{ $t("Agent.till") }}</v-col>
      <v-col cols="2" class="text-end">{{ $t("Agent.volume") }}</v-col>
      <v-col cols="2" class="text-end">{{ $t("Agent.used") }}</v-col>
      <v-col cols="2"
        ><span class="mdi mdi-plus" @click="$emit('AddClicked')"></span
      ></v-col>
    </v-row>
    <v-row
      flat
      v-for="Data in BaseData"
      :key="Data.packageId"
      @click="$emit('Row-Clicked', Data)"
    >
      <v-col cols="3">{{ Data.agentName }}</v-col>
      <v-col cols="1">{{ YesNo[Data.active] }}</v-col>
      <v-col cols="2">{{ Data.availableTill }}</v-col>
      <v-col cols="2" class="text-end">{{ Data.licenseVolume }}</v-col>
      <v-col cols="2" class="text-end">{{ Data.licenseUsed }}</v-col>
      <v-col cols="2">
        <v-btn
          outlined
          rounded
          height="25px"
          @click.stop="
            AddNew = false;
            $emit('License-Clicked', Data);
          "
        >
          <span class="mdi mdi-ticket" style="font-size: 0.8em;">{{
            $t("Agent.licenseBatch")
          }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AgentList",
  props: {
    BaseData: [],
    modelExp: [],
    modelRef: [],
    YesNo: [],
  },
};
</script>

<style></style>
