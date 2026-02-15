<template>
  <v-dialog persistent v-model="ShowBatch" width="80%">
    <v-card>
      <v-card-title>
        <v-row dense>
          <v-col>{{ agentName }}</v-col
          ><v-col class="text-end">
            <v-btn
              outlined
              rounded
              height="25px"
              @click.stop="
                initNew();
                AddNew = true;
              "
              v-if="!AddNew"
            >
              <span class="mdi mdi-plus" style="font-size: 0.8em;">{{
                $t("Agent.add")
              }}</span>
            </v-btn>
            <v-btn
              outlined
              rounded
              height="25px"
              @click.stop="
                AddNew = false;
                $emit('Close-Batch');
              "
            >
              <span class="mdi mdi-close" style="font-size: 0.8em;">{{
                $t("DrillPlatform.cancel")
              }}</span>
            </v-btn>
          </v-col></v-row
        >
      </v-card-title>
      <v-card-text>
        <v-row dense style="font-weight: bold;">
          <v-col cols="4">{{ $t("Agent.batchDesc") }}</v-col>
          <v-col cols="2">{{ $t("Agent.issued") }}</v-col>
          <v-col cols="2">{{ $t("Agent.expire") }}</v-col>
          <v-col cold="2" class="text-end">{{ $t("Agent.volume") }}</v-col>
          <v-col cols="2" class="text-end">{{ $t("Agent.used") }}</v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row
          dense
          v-for="d in data"
          :key="d.batchId"
          @click="$emit('Batch-Clicked', d)"
        >
          <v-col cols="4">{{ d.batchDesc }}</v-col>
          <v-col cols="2">{{ d.issueDate }}</v-col>
          <v-col cols="2">{{ d.availableTill }}</v-col>
          <v-col cols="2" class="text-end">{{ d.licenseVolume }}</v-col>
          <v-col cols="2" class="text-end">{{ d.licenseUsed }}</v-col>
        </v-row>
        <div>
          <v-row dense>
            <v-col></v-col>
          </v-row>
          <v-row dense v-if="AddNew">
            <v-col cols="4">
              <v-text-field
                outlined
                v-model="AddBatch.batchDesc"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-date-picker
                v-model="AddBatch.issueDate"
                v-if="showFrom"
                @change="showFrom = false"
              ></v-date-picker>
              <v-text-field
                readonly
                outlined
                v-model="AddBatch.issueDate"
                @click.stop="showFrom = true"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-date-picker
                v-model="AddBatch.availableTill"
                v-if="showTill"
                @change="showTill = false"
              ></v-date-picker>
              <v-text-field
                readonly
                outlined
                v-model="AddBatch.availableTill"
                @click.stop="showTill = true"
              >
              </v-text-field
            ></v-col>
            <v-col cols="2">
              <v-text-field
                outlined
                type="number"
                v-model="AddBatch.licenseVolume"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <span class="mdi mdi-check" @click="AddingBatch(AddBatch)"></span>
              <span class="mdi mdi-restore" @click="AddNew = false"></span>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LicenseBatch",
  data() {
    return {
      AddBatch: {
        agentId: null,
        batchDesc: "",
        issueDate: "",
        availableTill: "",
        licenseVolume: 0,
      },
      showFrom: false,
      showTill: false,
      AddNew: false,
      showBatch: "",
    };
  },
  props: {
    data: [],
    ShowBatch: "",
    agentName: "",
    agentId: "",
  },
  methods: {
    initNew() {
      this.AddBatch.agentId = this.agentId;
      this.AddBatch.batchDesc = "";
      this.AddBatch.issueDate = new Date().toJSON().slice(0, 10);
      this.AddBatch.availableTill = new Date().toJSON().slice(0, 10);
      this.AddBatch.licenseVolume = 0;
    },
    AddingBatch(b) {
      console.log(b);
      if (b.batchDesc && b.issueDate < b.availableTill && b.licenseVolume > 0) {
        this.$emit("Add-Batch", b);
        this.AddNew = false;
      } else {
        alert(this.$t("general.incomplete"));
      }
    },
  },
  created() {},
};
</script>

<style></style>
