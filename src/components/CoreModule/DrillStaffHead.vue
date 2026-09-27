<template>
  <div text-center style="width:220px;">
    <v-img
      :src="getPhoto(myStaff.staffName)"
      width="220"
    ></v-img>
    <div style="height:4px;"></div>
    <v-btn class="progress-btn" block elevation="8" outlined rounded>
      <span
        ><h2 v-if="myStaff.staffExp">{{ myStaff.staffExp }}</h2><h2 v-else>{{ $t("DrillPlatform.vacancy") }}</h2></span
      ></v-btn
    >
  </div>
</template>

<script>
export default {
  name: "DrillstaffHead",
  props: {
    paramdata: [],
    myStaff: [],
  },
  methods: {
    getPhoto(staffId) {
      if (staffId) {
        if (staffId == -1) {
          return this.paramdata.params_ref.params.fileURL + "allStaff.png";
        }
        return (
          this.paramdata.params_ref.params.fileURL +
          this.paramdata.staff_det.staff[staffId].staffPhoto
        );
      }
      return this.paramdata.params_ref.params.fileURL + "default.png";
    },
  },
};
</script>

<style>
.p1 {
  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
}
.p2 {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
}
.t1 {
  position: absolute;
  bottom: 1px;
  left: 11px;
  z-index: 6;
  text-align: center;
  border-left: "thick solid black";
  width: 175px;
}
</style>
