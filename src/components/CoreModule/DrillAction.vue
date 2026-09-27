<template>
  <v-container class="pa-0">
    hello
    <v-row dense>
      <v-col
        cols="12"
        class="pa-2"
        v-if="data.action == 'MORE_ACTIONS' && !flashAdded && !parentMsgCount"
      >
        <v-container class="pa-0" v-if="!actionExp">
          <v-container class="pb-1 pt-1" v-if="clicked1to1 === 0">
            <h3>{{ $t("DrillPlatform.1toMore") }}</h3>
            <v-row
              dense
              v-for="act in paramdata.action_det.action"
              :key="act.actionExp"
            >
              <v-hover v-slot="{ hover }">
                <v-col
                  :class="{ 'action-hover': hover }"
                  v-if="
                    act.actionName == act.parentAction &&
                      act.show > 0 &&
                      (act.maxStaff > 1 ||
                        (act.applyAll > 0 && act.maxStaff > 0))
                  "
                  @click.stop="
                    actionExp = act.displayKey;
                    selectedAction(act.displayKey);
                  "
                  >{{ $t(act.displayKey) }}</v-col
                >
              </v-hover>
            </v-row>
          </v-container>
          <v-divider v-if="clicked1to1 < 1"></v-divider>
          <v-container class="pb-1">
            <h3>{{ $t("DrillPlatform.1to1") }}</h3>
            <v-row
              dense
              v-for="act in paramdata.action_det.action"
              :key="act.actionExp"
            >
              <v-hover v-slot="{ hover }">
                <v-col
                  :class="{ 'action-hover': hover }"
                  v-if="
                    act.actionName == act.parentAction &&
                      act.show > 0 &&
                      act.maxStaff == 1 &&
                      act.applyAll == 0
                  "
                  @click.stop="
                    actionExp = act.displayKey;
                    selectedAction(act.displayKey);
                  "
                  >{{ $t(act.displayKey) }}</v-col
                >
              </v-hover>
            </v-row>
          </v-container>
          <v-divider v-if="clicked1to1 < 1"></v-divider>
          <v-container class="pb-1" v-if="clicked1to1 === 0">
            <h3>{{ $t("DrillPlatform.management") }}</h3>
            <v-row
              dense
              v-for="act in paramdata.action_det.action"
              :key="act.actionExp"
            >
              <v-hover v-slot="{ hover }">
                <v-col
                  :class="{ 'action-hover': hover }"
                  v-if="
                    act.actionName == act.parentAction &&
                      act.show > 0 &&
                      act.maxStaff < 1
                  "
                  @click.stop="
                    actionExp = act.displayKey;
                    selectedAction(act.displayKey);
                  "
                  >{{ $t(act.displayKey) }}</v-col
                >
              </v-hover>
            </v-row>
          </v-container>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DrillAction",
  props: {
    paramdata: [],
    data: [],
    act: "",
  },
};
</script>

<style></style>
