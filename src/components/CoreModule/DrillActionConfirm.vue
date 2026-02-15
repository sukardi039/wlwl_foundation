<template>
  <v-dialog persistent width="60%" v-model="actMsg">
    <v-card class="action-box pa-0 ma-0">
      <v-card-title class="style-confirm">
          <v-row dense>
            <v-col cols="12" style="grey lighten-2" class="text-smaller">
              <h4>{{ actMsg.head }}</h4>
            </v-col>
            <v-col cols="12" class="text-small">
              <h4>{{ actMsg.text }}</h4>
            </v-col>
          </v-row>
      </v-card-title>
      <v-card-text style="background:#e9ecf1;">
          <v-row dense v-if="!applyAll">
            <v-col>
              <v-row
                dense
                v-for="mb in actionMembers(data.content.members)"
                :key="mb.staffName"
              >
                <v-col>
                  <v-row dense class="font-weight-bold">
                    <v-col>
                      <h2 v-if="mb.staffExp">{{ mb.staffExp }}</h2>
                      <h2 v-else>{{ $t('DrillPlatform.vacant') }}</h2>
                      </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="1"></v-col>
                    <v-col auto
                      ><h3>{{ $t(mb.actionExp + "_e") }}</h3></v-col
                    >
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row dense v-else>
            <v-col
              ><h2 v-if="actionInfo.actionName != 'recruit'">
                {{ $t("DrillPlatform.allStaff") }}
              </h2></v-col
            >
          </v-row>
          <v-row dense>
            <v-col v-if="actionInfo.actionName == 'recruit' && selectedRecruit > 0">
              <h2>{{ selectedRecruitExp }}</h2>
            </v-col>
          </v-row>
      </v-card-text>
      <v-card-actions>
        <!-- submit buttons -->
        <v-row dense>
          <v-col cols="12" class="text-end">
            <v-btn
              rounded
              color="#434b5e"
              v-if="actionExp || clicked1to1 || eTime == '0:00'"
              @click.stop="$emit('Close-Action')"
              ><span class="action-btn">{{
                $t("DrillPlatform.cancel")
              }}</span></v-btn
            >
            <v-btn
              rounded
              color="#434b5e"
              v-if="
                actionExp && memberActioned >= actionInfo.minStaff && eTime != '0:00'
              "
              @click.stop="$emit('Submit-Action', data)"
              ><span class="action-btn">{{
                $t("DrillPlatform.confirm")
              }}</span></v-btn
            >
            <v-btn
              rounded
              color="#434b5e"
              v-if="(memberActioned<actionInfo.maxStaff && !applyAll && !clicked1to1) && eTime != '0:00'"
              @click.stop="$emit('More-Action')"
              ><span class="action-btn">{{
                $t("DrillPlatform.addMore")
              }}</span></v-btn
            >
          </v-col>
        </v-row>
         </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DrillActionConfirm",
  data() {
      return {
      };
  },
  props: {
    actMsg: "",
    applyAll: false,
    data: "",
    selectedRecruit: 0,
    selectedRecruitExp: "",
    memberActioned:'',
    actionExp:'',
    clicked1to1: false,
    addMore:false,
    actionInfo:'',
    eTime: '0:00',
  },
  methods:{
        actionMembers(ev) {
      var s = [];
      var m = Object.entries(ev);
      m.forEach((e) => {
        if (e[1].actioned == 1) {
          s.push(e[1]);
        }
      });
      //      console.log(s)
      return s;
    },
  }
};
</script>

<style></style>
