<template>
  <div class="member-detail">
    <strong>{{ $t(paramdata.base_lst.profiles[0]) }}</strong>
        <v-progress-linear
        round-pill
          background-color="#c8cbd4"
          :height="slim?10:16"
          :value="myStaff.skillsValue"
          :color="valueColor(myStaff.skillsValue)"  >
          <span class="progress-bar">{{myStaff.skillsValue}}</span>
          </v-progress-linear>
    <strong>{{ $t(paramdata.base_lst.profiles[1]) }}</strong>
        <v-progress-linear
          background-color="#c8cbd4"
          :height="slim?10:16"
          :value="myStaff.moraleValue"
          :color="valueColor(myStaff.moraleValue)"
        ><span class="progress-bar">{{myStaff.moraleValue}}</span></v-progress-linear>
    <strong>{{ $t(paramdata.base_lst.profiles[2]) }}</strong>
        <v-progress-linear
          background-color="#c8cbd4"
          :height="slim?10:16"
          :value="myStaff.efficiencyValue"
          :color="valueColor(myStaff.efficiencyValue)"
        ><span class="progress-bar">{{myStaff.efficiencyValue}}</span></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: "DrillStaffStatus",
  props: {
    paramdata: [],
    myStaff: [],
    slim: false,
  },
  methods: {
    avgValue(m) {
      return Math.round(
        (m.skillsValue * 1 + m.moraleValue * 1 + m.efficiencyValue * 1) / 3
      );
    },
    valueColor(v) {
      let c = "";
      if (v > 75) {
        c = "value-hh";
      } else if (v > 50) {
        c = "value-mh";
      } else if (v > 25) {
        c = "value-ml";
      } else {
        c = "value-ll";
      }
      return c;
    },
    redOrGreen(v) {
      let c = "transparent";
      if (v < 0) {
        c = "red lighten-4";
      }
      if (v > 0) {
        c = "green lighten-4";
      }
      return c;
    },
  },
};
</script>

<style></style>
