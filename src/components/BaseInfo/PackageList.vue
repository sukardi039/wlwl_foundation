<template>
  <v-container>
        <v-row style="background-color: lightgrey">
            <v-col cols="w">{{$t('Package.name')}}</v-col>
            <v-col cols="2">{{$t('Package.from')}}</v-col>
            <v-col cols="2">{{$t('Package.till')}}</v-col>
            <v-col cols="5">
                <v-row dense>
                    <v-col>{{$t('Package.runOne')}}</v-col>
                    <v-col>{{$t('Package.runTwo')}}</v-col>
                    <v-col>{{$t('Package.runThree')}}</v-col>
                </v-row>
            </v-col>
            <v-col cols="1"><span class="mdi mdi-plus" @click="$emit('AddClicked')"></span></v-col>
        </v-row>
        <v-row flat v-for="Data in BaseData" :key="Data.packageId" @click="$emit('Row-Clicked', Data)">
            <v-col cols="2">{{Data.companyName}}</v-col>
            <v-col cols="2">{{Data.availableFrom}}</v-col>
            <v-col cols="2">{{Data.availableTill}}</v-col>
            <v-col cols="5">
                <v-row dense>
                    <v-col>{{modelExp[Data.runOne]}}</v-col>
                    <v-col>{{modelExp[Data.runTwo]}}</v-col>
                    <v-col>{{modelExp[Data.runThree]}}</v-col>
                </v-row>
            </v-col>
            <v-col cols="1">
                        <v-btn
          outlined
          rounded
          height="25px"
          @click.stop="
            AddNew = false;
            $emit('License-Clicked', Data.packageId);
          "
        >
          <span class="mdi mdi-ticket" style="font-size: 0.8em;">{{
            $t("Agent.license")
          }}</span>
        </v-btn>
</v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'PackageList',
    props: {
        BaseData: [],
        modelExp: [],
        modelRef: [],
    },
}
</script>

<style>

</style>