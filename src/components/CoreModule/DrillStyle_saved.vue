<template>
<v-container class="pa-0">
  <!-- <v-dialog persistent width="80%" v-model="paramdata"> -->
    <v-card style="font-size: 0.8em;" class="pa-0">
      <v-card-title class="style-head" v-if="oldStyle">
        <h5>{{ $t("DrillPlatform.leadStyle") }}</h5>
      </v-card-title>
      <v-card-text class="style-box">
        <h4>{{$t('DrillPlatform.tickStyle')}}</h4><br>
        <v-row
          dense
          :style="{ background: currStyle == sty.styleName ? 'lightgrey' : '' }"
          v-for="sty in paramdata.style_det.style"
          :key="sty.styleName"
          @click="$emit('Clicked-Style', sty.styleName)"
        >
          <v-col cols="1"
            ><span
              class="mdi mdi-check-bold"
              v-if="currStyle == sty.styleName"
            ></span>
            <span class="mdi mdi-circle-medium" v-else></span
          ></v-col>
          <v-col cols="2"
            ><h5>{{ $t(sty.displayKey) }}</h5></v-col
          >
          <v-col auto
            ><h5>{{ $t(sty.displayKey + "_e") }}</h5></v-col
          >
        </v-row>
      </v-card-text>
      <v-card-actions v-if="oldStyle">
        <v-btn
          rounded
          style="font-weight: bold"
          v-if="currStyle"
          @click="$emit('Submit-Style', currStyle)"
          >{{ $t("DrillPlatform.continue") }}</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          rounded
          style="font-weight: bold"
          @click="$emit('Close-Style')"
          >{{ $t("DrillPlatform.cancel") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  <!-- </v-dialog> -->
</v-container>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "DrillStyle",
  props: {
    styling: false,
    currStyle: "",
    paramdata: [],
    oldStyle:false,
  },
  // computed: {
  //   ...mapState({
  //     paramdata: "paramdata",
  //   }),
  // },
};
</script>

<style></style>
