<template>
  <v-row dense style="height: 45px; width: 90px; overflow: hidden;">
    <v-col>
      <v-progress-circular
        :rotate="-180"
        :size="80"
        :width="10"
        :value="ratio / 2"
        :color="valueColor(ratio)"
      >
        <v-row
          dense
          class="text-center align-end"
          style="width: 150px; position: absolute; left:-30px; top:7px; overflow: wrap;color: black; font-size: 0.8em; font-weight: bold;"
        >
          <v-col>
            <v-row dense class="pa-0 ma-0" style="height: 13px;">
              <v-col>
                {{ value }} 
              </v-col>
            </v-row>
            <v-row dense class="pa-0 ma-0" style="height: 10px;">
              <v-col>
                {{ pName }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DrillCircleProgress",
  data() {
    return {
      color_hh: "#20a434",
      color_mh: "#20a434",
      color_ml: "#fbc155",
      color_ll: "#d70512",
      sWidth:0,
      sHeight: 0,
    };
  },
  props: {
    value: 0,
    ratio: 0,
    pName: "",
  },
  methods: {
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
  created(){
    this.sWidth=screen.width
    this.sHeight=screen.height
  }
};
</script>

<style></style>
