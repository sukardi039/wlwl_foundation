<template>
  <v-container>
        <v-row style="background-color: lightgrey">
            <v-col cols="3">{{$t('Task.name')}}</v-col>
            <v-col cols="9">{{$t('Task.description')}}</v-col>
        </v-row>
        <v-row flat v-for="Data in BaseData" :key="Data.displayKey" @click="$emit('Row-Clicked', Data)">
            <v-col cols="3" class="font-weight-bold">{{$t(Data.displayKey)}}</v-col>
            <v-col cols="9">{{$t(Data.displayKey+'_e')}}</v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'TasktList',
    props: {
        BaseData: [],
    },
}
</script>

<style>

</style>