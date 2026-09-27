<template>
  <v-container>
        <v-row style="background-color: lightgrey">
            <v-col>
                <v-row dense>
                    <v-col cols="3">{{$t('Template.name')}}</v-col>
                    <v-col cols="3">{{$t('Template.description')}}</v-col>
                    <v-col class="text-center">{{$t('Template.numberOfStaff')}}</v-col>
                    <v-col class="text-center">{{$t('Template.numberOfDays')}}</v-col>
                    <v-col class="text-center">{{$t('Template.duration')}}</v-col>
                    <v-col class="text-center">{{$t('Template.environmentEvents')}}</v-col>
                    <v-col class="text-center">{{$t('Template.recruits')}}</v-col>
                    <v-col class="text-center">{{$t('Template.report')}}</v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row flat v-for="Data in BaseData" :key="Data.displayKey" @click="$emit('Row-Clicked', Data)">
            <v-col>
                <v-row dense>
                    <v-col cols="3" class="font-weight-bold">{{$t(Data.displayKey)}}</v-col>
                    <v-col cols="3">{{$t(Data.displayKey+'_e')}}</v-col>
                    <v-col class="text-center">{{Data.numberOfStaff}}</v-col>
                    <v-col class="text-center">{{Data.numberOfDays}}</v-col>
                    <v-col class="text-center">{{Data.duration}}</v-col>
                    <v-col class="text-center">{{Data.environmentEvents}}</v-col>
                    <v-col class="text-center">{{Data.recruits}}</v-col>
                    <v-col class="text-center">{{$t('YesNo.'+Data.report)}}</v-col>
                </v-row>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'TemplateList',
    props: {
        BaseData: [],
        AmendData: '',
    },
}
</script>

<style>

</style>