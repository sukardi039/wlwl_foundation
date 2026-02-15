<template>
  <v-container>
        <v-row style="background-color: lightgrey">
            <v-col cols="3">{{$t('BackendUser.name')}}</v-col>
            <v-col cols="4">{{$t('BackendUser.loginName')}}</v-col>
            <v-col cols="2" class="text-end">{{$t('BackendUser.level')}}</v-col>
            <v-col cols="2" class="text-center">{{$t('BackendUser.active')}}</v-col>
            <v-col cols="1"><span class="mdi mdi-plus" @click="$emit('AddClicked')"></span></v-col>
        </v-row>
        <v-row flat v-for="Data in BaseData" :key="Data.displayKey" @click="$emit('Row-Clicked', Data)">
            <v-col cols="3" class="font-weight-bold">{{Data.userName}}</v-col>
            <v-col cols="4">{{Data.loginName}}</v-col>
            <v-col cols="2" class="text-end">{{Data.level}}</v-col>
            <v-col cols="2" class="text-center">{{$t('YesNo.'+Data.active)}}</v-col>
            <v-col cols="1"></v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'BackendUserList',
    data() {
        return {
        }
    },
    props: {
        BaseData: [],
        MaxLevel: 0,
        AmendCode: '',
        EditData: {},
        YesNo: [],
    },
}
</script>

<style>

</style>