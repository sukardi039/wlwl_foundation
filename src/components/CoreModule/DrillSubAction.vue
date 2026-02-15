<template>
  <v-container class="pa-0">
    <div style="font-size: 0.8em;" class="pa-0">
      <v-card>
        <v-card-title>
          <v-row dense class="subAction" v-if="actMsg">
            <v-col
              ><h3>{{actMsg.title}}</h3>
              </v-col
            >
          </v-row>
        </v-card-title>
      </v-card>
      <v-card
              height="90px"
          dense
          v-for="act in ranList"
            :key="act.actionName"
            :v-if="!act.evaluation"
          @click="$emit('SubAction-Clicked', act.displayKey)"
          :img="require(myAction == act.displayKey?'../../assets/act-selected.png':'../../assets/act-select.png')"
>
        <v-card-text>
          <v-row
            dense
          >
            <v-col cols="2"
            ></v-col>
            <v-col
              ><h3>{{ $t(act.displayKey + "_e") }}</h3></v-col
            >
          </v-row>
        </v-card-text>
        <v-card-actions v-if="oldStyle">
          <v-row dense class="align-middle">
            <v-col cols="2">
              <v-btn
                rounded
                style="font-weight: bold"
                v-if="myAction"
                @click="$emit('Submit-SubAction', myAction)"
                >{{ $t("DrillPlatform.continue") }}</v-btn
              >
            </v-col>
            <v-col v-if="myAction"
              >{{ $t("DrillPlatform.duration")
              }}{{
                paramdata.action_det.action.find(
                  (a) => a.displayKey == myAction
                ).duration
              }}{{ $t("DrillPlatform.days") }}</v-col
            >
            <v-col auto class="text-end">
              <v-btn
                rounded
                style="font-weight: bold"
                @click="$emit('Close-SubAction')"
                >{{ $t("DrillPlatform.cancel") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "DrillSubAction",
  data() {
    return {
      ranList: [],
    };
  },
  props: {
    subAction: [],
    paramdata: [],
    mainAction: "",
    actMsg: [],
    oldStyle: false,
    myAction: "",
  },
  computed: {},
  methods: {},
  created() {
//    console.log(this.myAction,',',this.mainAction)
    this.ranList = this.subAction.sort(function() {
      return 0.5 - Math.random();
    });
  },
};
</script>

<style></style>
