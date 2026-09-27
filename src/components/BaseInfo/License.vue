<template>
  <v-dialog width="70%" v-model="showLic" persistent>
    <v-card>
      <v-card-title>
        {{$t('Agent.license')}}
        <v-spacer></v-spacer>
            <v-btn
              outlined
              rounded
              height="25px"
              @click.stop="
                AddNew = false;
                $emit('Close-License');
              "
            >
              <span class="mdi mdi-close" style="font-size: 0.8em;">{{
                $t("DrillPlatform.cancel")
              }}</span>
            </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense style="font-weight: bold;">
          <v-col cols="3">{{ $t("Agent.batchDesc") }}</v-col>
          <v-col cols="3">{{ $t("BackendUser.company") }}</v-col>
          <v-col cols="3">{{ $t("BackendUser.name") }}</v-col>
          <v-col cols="2">{{ $t("Agent.usedOn") }}</v-col>
          <v-col cols="1">
</v-col>
        </v-row>
      <v-divider></v-divider>
        <v-row dense v-for="l in lData" :key="l.licenseId">
          <v-col cols="3">{{ l.batchDesc }}</v-col>
          <v-col cols="3">{{ l.companyName }}</v-col>
          <v-col cols="3">{{ l.userName }}</v-col>
          <v-col cols="3">{{ l.usedOn }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "license",
  props: {
    lData: [],
    showLic: false,
  },
  create(){
    console.log(lData)
  }
};
</script>

<style></style>
