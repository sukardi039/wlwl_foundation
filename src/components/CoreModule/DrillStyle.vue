<template>
<v-container class="pa-0">
    <div style="font-size: 0.8em;" class="pa-0">
        <v-card
        height="100px"
          dense
          v-for="sty in paramdata.style_det.style"
          :key="sty.styleName"
          @click="$emit('Clicked-Style', sty.styleName)"
          :img="require(currStyle == sty.styleName?'../../assets/selected.png':'../../assets/select.png')"
        ><v-card-text>
        <v-row dense>
          <v-col cols="2"
            ><h3>{{ $t(sty.displayKey) }}</h3></v-col
          >
          <v-col auto
            ><h3>{{ $t(sty.displayKey + "_e") }}</h3></v-col
          ></v-row></v-card-text>
        </v-card>
      <div v-if="oldStyle">
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
      </div>
    </div>
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
