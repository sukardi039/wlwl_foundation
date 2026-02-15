<template>
  <v-container>
        <v-row style="background-color: lightgrey">
            <v-col>
                <v-row dense>
                    <v-col cols="2">{{$t('Environment.name')}}</v-col>
                    <v-col cols="4">{{$t('Environment.description')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Environment.duration')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Environment.orderImpact')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Environment.moraleImpact')}}</v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="2"></v-col>
                    <v-col cols="2" class="text-center">{{$t('Environment.applyAll')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Environment.randomOne')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Environment.lowMorale')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Environment.lowEfficiency')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Environment.highEfficiency')}}</v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row flat v-for="Data in BaseData" :key="Data.displayKey" @click="$emit('Row-Clicked', Data)">
            <v-col>
                <v-row dense>
                    <v-col cols="2" class="font-weight-bold">{{$t(Data.displayKey)}}</v-col>
                    <v-col cols="4">{{$t(Data.displayKey+'_e')}}</v-col>
                    <v-col cols="2" class="text-center">{{Data.duration}}</v-col>
                    <v-col cols="2" class="text-center">{{Data.orderImpact}}</v-col>
                    <v-col cols="2" class="text-center">{{Data.moraleImpact}}</v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="2"></v-col>
                    <v-col cols="2" class="text-center">{{$t('YesNo.'+Data.applyAll)}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('YesNo.'+Data.randomOne)}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('YesNo.'+Data.lowMorale)}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('YesNo.'+Data.lowEfficiency)}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('YesNo.'+Data.highEfficiency)}}</v-col>
                </v-row>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'ActionList',
    props: {
        BaseData: [],
    },
}
</script>

<style>

</style>