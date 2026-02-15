<template>
  <v-container class="pa-0">
      <v-container class="message-box">
        <v-row
          class="pa-0"
          align="center"
          style="font-size: 0.8em;"
        >
          <v-col cols="1" class="text-end"
            >{{ currentMessage }} / {{ msgCount }}</v-col
          >
          <v-col
            cols="2"
            class="text-center font-weight-bold"
            v-if="!drillStaff"
          >
            {{ myMessage[currentMessage].from }}
          </v-col>
          <v-col cols="fluid">
            {{ myMessage[currentMessage].text }}
          </v-col>
          <v-col
            cols="2"
            class="text-center"
            v-if="data.action != 'INTRODUCTION'"
          >
            <v-btn
              rounded
              dense
              style="font-weight: bold"
              v-if="currentMessage < msgCount"
              @click.stop="$emit('Next-Message')"
              >{{ $t("DrillPlatform.next") }}</v-btn
            >
            <v-btn
              rounded
              dense
              style="font-weight: bold"
              v-if="currentMessage === msgCount"
              @click.stop="$emit('End-Message', myMessage[currentMessage].act)"
              >{{ $t("DrillPlatform.noted") }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
  </v-container>
</template>

<script>
export default {
  name: "DrillMessageBar",
  props: {
    myMessage: [],
    currentMessage: 0,
    mCount: 0,
    curMsg: 0,
    blocking: false,
    oldStyle: false,
    data: [],
    drillStaff: false,
  },
  computed: {
    msgCount: function() {
      return this.mCount * 1;
    },
  },
  methods: {
    nextMessage() {
      alert(this.currentMessage);
      this.currentMessage = this.currentMessages + 1;
      alert(this.currentMessage);
    },
  },
};
</script>

<style></style>
