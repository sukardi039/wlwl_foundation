<template>
<div style="position: relative; left: 0; top: 0;" text-center>
  <v-img :src="getPhoto(myStaff.staffName)" class="p1" width="210"></v-img>
  <v-img src="../../assets/halo.gif" class="p2"></v-img>
  <v-row dense class="t1"><v-col><h2>{{myStaff.staffExp}}</h2></v-col></v-row>
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
.t1{
  position: absolute;
  bottom: 1px;
  left: 11px;
  z-index: 6;
  text-align: center;
  border-left:'thick solid black';
  width: 175px;
}
</style>
