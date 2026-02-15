<template>
  <v-dialog persistent width="40%" v-model="data">
    <v-container class="action-box">
      <v-card>
        <v-card-title>
          <v-row dense height="10px" class="text-start align-center"><v-col cols="1">
            <v-img src="../../assets/style-badge.gif" height="20px" width="20px"></v-img></v-col>
          <v-col>{{$t('DrillPlatform.styleConfirm')}}</v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row dense class="font-weight-bold">
            <v-col cols="8" class="text-left style-confirm"
              ><h3>
                {{ $t("DrillPlatform.memberName") }}
              </h3></v-col
            >
            <v-col cols="4" class="text-center style-confirm"
              ><h3>
                {{ $t("DrillPlatform.leadStyle") }}
              </h3></v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-row
            style="font-size: 0.9em;"
            dense
            v-for="(member, index) in data.content.members"
            :key="member.staffName"
 :class="index % 2?'row0':'row1'"          >
            <v-col cols="8" class="text-left" v-if="member.staffName"
              ><h4>{{ member.staffExp }}</h4></v-col
            >
            <v-col cols="4" class="text-center" v-if="member.staffName"
              ><h4>{{ $t(member.styleExp) }}</h4></v-col
            >
          </v-row>
        </v-card-text>
        <v-card-actions>
            <v-row>
                <v-col class="text-end">
          <v-btn
            rounded
            color="#434b5e"
            v-if="data.action == 'SELECT_STYLE' || eTime == '0:00'"
            @click.stop="$emit('Abort-Style')"
            ><span class="action-btn">{{ $t("DrillPlatform.cancel") }}</span></v-btn
          >
          <v-btn
            rounded
            color="#434b5e"
            v-if="data.action == 'SELECT_STYLE' && eTime != '0:00'"
            @click.stop="$emit('Submit-Style', data)"
            ><span class="action-btn">{{ $t("DrillPlatform.confirm") }}</span></v-btn
          >
                </v-col>
            </v-row>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  name: "DrillStyleConfirm",
  props: {
    data: [],
    paramdata: [],
    eTime: '0:00',
  },
};
</script>

<style>
.row0{
  background: #ffffff;
}
.row1{
  background: #e9ecf1;
}  
</style>
