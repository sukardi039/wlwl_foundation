<template>
  <v-row dense class="text-center" style="height: 45px; overflow: hideen; width: 100px;">
    <v-col class="text-center">
      <v-img
      :src="require('../../assets/triangle-'+graphSize(ratio)+'.gif')"
      width="57px"
      style="position: relative; top:0px; left:14px;"
      cover
      >
      </v-img>
      <v-row
        dense
        class="text-center align-end"
        style="width: 100px; position: relative; left: -5px; top:-32px; overflow: wrap;color: black; font-size: 0.8em; font-weight: bold; z-index: 2;"
      >
          <v-col>
            <v-row dense class="pa-0 ma-0" style="height: 13px;">
              <v-col> {{ value }}</v-col>
            </v-row>
            <v-row dense class="pa-0 ma-0" style="height: 10px;">
              <v-col>
                {{ pName }}
              </v-col>
            </v-row>
          </v-col>
      </v-row>
    </v-col></v-row
  >
</template>

<script>
export default {
  name: "DrillTriangleProgress",
  data() {
    return {
      color_hh: "#20a434",
      color_mh: "#20a434",
      color_ml: "#fbc155",
      color_ll: "#d70512",
    };
  },
  props: {
    value: 0,
    ratio: 0,
    pName: "",
  },
  methods: {
    graphSize(v){
      let c=''
      if (v>=100){
        c="100"
      } else if (v==0){
        c="0"
      } else {
        c=Math.trunc(v/5)*5
      }
      return c
    },
    valueColor(v) {
      let c = "";
      if (v > 75) {
        c = this.color_hh;
      } else if (v > 50) {
        c = this.color_mh;
      } else if (v > 25) {
        c = this.color_ml;
      } else {
        c = this.color_ll;
      }
      return c;
    },
  },
};
</script>

<style></style>
