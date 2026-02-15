<template>
  <v-container class="pa-0">
    <v-dialog persistent v-model="data" width="60%">
      <v-card style="font-size: 0.85em;">
        <v-card-title class="detail-head">
          <v-row dense height="10px" class="text-start align-center">
            <v-col cols="1">
              <span class="mdi mdi-target icon-highlight"></span>
            </v-col>
            <v-col>
              <span v-if="funnelType == 1">{{ $t("DrillFunnel.title") }}</span>
              <span v-if="funnelType == 2">{{
                $t("DrillFunnel.funnel")
              }}</span> </v-col
            ><v-col class="text-end">
              <v-btn
                outlined
                rounded
                height="25px"
                @click.stop="$emit('Close-Funnel')"
              >
                <span class="mdi mdi-close" style="font-size: 0.8em;">{{
                  $t("DrillPlatform.cancel")
                }}</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <div v-if="funnelType == 1">
            <v-row class="font-weight-bold">
              <v-col class="text-center">{{
                $t("DrillFunnel.weekOrdersTarget")
              }}</v-col>
              <v-col class="text-center">{{
                $t("DrillFunnel.weekValueTarget")
              }}</v-col>
              <v-col class="text-center">{{
                $t("DrillFunnel.weekOrders")
              }}</v-col>
              <v-col class="text-center">{{
                $t("DrillFunnel.weekValue")
              }}</v-col>
              <v-col cols="1" class="text-center">{{
                $t("DrillFunnel.week")
              }}</v-col>
              <v-col class="text-center">{{
                $t("DrillFunnel.overallTarget")
              }}</v-col>
              <v-col class="text-center">{{
                $t("DrillFunnel.overallValue")
              }}</v-col>
              <v-col class="text-center">{{ $t("DrillFunnel.orders") }}</v-col>
              <v-col class="text-center">{{ $t("DrillFunnel.value") }}</v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row
              dense
              v-for="w in data"
              :key="w.weekNumber"
              :style="{ background: w.weekNumber == week ? 'lightgrey' : '' }"
            >
              <v-col class="text-center">{{ w.weekOrderTarget }}</v-col>
              <v-col class="text-center">{{ w.weekValueTarget }}</v-col>
              <v-col class="text-center">{{ w.weekOrder }}</v-col>
              <v-col class="text-center">{{ w.weekValue }}</v-col>
              <v-col cols="1" class="text-center">{{ w.weekNumber }}</v-col>
              <v-col class="text-center">{{ w.orderTarget }}</v-col>
              <v-col class="text-center">{{ w.valueTarget }}</v-col>
              <v-col class="text-center">{{ w.order }}</v-col>
              <v-col class="text-center">{{ w.value }}</v-col>
            </v-row>
          </div>
          <div v-if="funnelType == 2">
            <v-row class="font-weight-bold text-center">
              <v-col cols="3"
                ><h3>{{ $t("DrillFunnel.overallTarget") }}</h3></v-col
              >
              <v-col v-if="false"
                ><h3>{{ $t("DrillFunnel.overallValue") }}</h3></v-col
              >
              <v-col cols="6"
                ><h3>{{ $t("DrillOrderDone.task") }}</h3></v-col
              >
              <v-col cols="3"
                ><h3>{{ $t("DrillFunnel.orders") }}</h3></v-col
              >
              <v-col v-if="false"
                ><h3>{{ $t("DrillFunnel.value") }}</h3></v-col
              >
            </v-row>
            <v-divider bold></v-divider>
            <v-row
              dense
              :class="index % 2 ? 'row0' : 'row1'"
              class="text-center"
              v-for="(w, index) in salesFunnel"
              :key="index"
            >
              <v-col cols="3"
                ><h4>{{ w.orderTarget }}</h4></v-col
              >
              <v-col v-if="false"
                ><h4>{{ w.valueTarget }}</h4></v-col
              >
              <v-col cols="6"
                ><h3>{{ w.taskName }}</h3></v-col
              >
              <v-col cols="3"
                ><h4>{{ w.done }}</h4></v-col
              >
              <v-col v-if="false"
                ><h4>{{ w.done * orderValue }}</h4></v-col
              >
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "DrillFunnel",
  data() {
    return {
      salesFunnel: [],
    };
  },
  props: {
    data: [],
    week: 0,
    funnelType: 0,
    stat: [],
    orderValue: 0,
  },
  computed: {
    weekData() {
      return this.data[this.week];
    },
    taskData(s) {
      let x = this.weekData[s];
      console.log(x);
      return x;
    },
  },
  created() {
    for (let c = 1; c <= 5; c++) {
      console.log(c, this.stat[c]);
      if (this.stat[c].orderTarget) {
        this.salesFunnel.push(this.stat[c]);
      }
    }
    console.log("salesFunnel", this.salesFunnel);
  },
};
</script>

<style></style>
