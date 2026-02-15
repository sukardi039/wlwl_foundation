<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          :label="$t('Package.name')"
          outlined
          v-model="Data.companyName"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          :items="agentList"
          :label="$t('Agent.name')"
          outlined
          v-model="Data.agentName"
          @change="Data.agentId = agentRef[Data.agentName]"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-date-picker
          v-model="Data.availableFrom"
          v-if="showFrom"
          @change="showFrom = false"
        ></v-date-picker>
        <v-text-field
          :label="$t('Package.from')"
          readonly
          outlined
          v-model="fromDisp"
          @click.stop="showFrom = true"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-date-picker
          v-model="Data.availableTill"
          v-if="showTill"
          @change="showTill = false"
        ></v-date-picker>
        <v-text-field
          :label="$t('Package.till')"
          readonly
          outlined
          v-model="tillDisp"
          @click.stop="showTill = true"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          :label="$t('Package.commonPW')"
          outlined
          v-model="Data.commonPW"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          :items="companyType"
          :label="$t('Package.companyType')"
          outlined
          v-model="Data.companyType"
        >
          <template v-slot:item="data1">
            {{ $t("CompanyType."+data1.item) }}
          </template>
          <template v-slot:selection="data1">
            {{ $t("CompanyType."+data1.item) }}
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          :items="languages"
          :label="$t('Package.language')"
          outlined
          v-model="Data.lang"
        >
          <template v-slot:item="data1">
            {{ $t("Language." + data1.item) }}
          </template>
          <template v-slot:selection="data1">
            {{ $t("Language." + data1.item) }}
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          :items="modelList"
          :label="$t('Package.runOne')"
          outlined
          v-model="Data.runOneExp"
          @change="Data.runOne = modelRef[Data.runOneExp]"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          :items="modelList"
          :label="$t('Package.runTwo')"
          :clearable="true"
          outlined
          v-model="Data.runTwoExp"
          @change="Data.runTwo = modelRef[Data.runTwoExp]"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          :items="modelList"
          :label="$t('Package.runThree')"
          :clearable="true"
          outlined
          v-model="Data.runThreeExp"
          @change="Data.runThree = modelRef[Data.runThreeExp]"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="center">
      <v-col auto></v-col>
      <v-col cols="1">
        <span class="mdi mdi-check" @click="$emit('Update-Info', Data)"></span>
      </v-col>
      <v-col cols="1">
        <span class="mdi mdi-restore" @click="$emit('Abort-Clicked')"></span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PackageInput",
  data() {
    return {
      showFrom: false,
      showTill: false,
    };
  },
  props: {
    Data: [],
    modelList: [],
    modelRef: [],
    YesNo: [],
    agentList: [],
    agentRef: [],
    languages: [],
    companyType: [],
  },
  computed: {
    fromDisp() {
      return this.Data.availableFrom;
    },
    tillDisp() {
      return this.Data.availableTill;
    },
  },
};
</script>

<style></style>
