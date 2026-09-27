<template>
  <v-container>
        <v-row flat v-for="Data in BaseData" :key="Data.displayKey" @click="$emit('Row-Clicked', Data)">
            <v-col>
                <v-row>
                    <v-col>{{$t('Model.name')}}</v-col>
                    <v-col class="font-weight-bold">{{Data.modelName}}</v-col>
                    <v-col>{{$t('Template.name')}}</v-col>
                    <v-col>{{Data.templateDescription}}</v-col>
                </v-row>
                <v-row dense style="background: lightgrey">
                   <v-col cols="3">{{$t('Product.name')}}</v-col>
                    <v-col class="text-center">{{$t('Template.numberOfStaff')}}</v-col>
                    <v-col class="text-center">{{$t('Template.numberOfDays')}}</v-col>
                    <v-col class="text-center">{{$t('Template.duration')}}</v-col>
                    <v-col class="text-center">{{$t('Template.environmentEvents')}}</v-col>
                </v-row>
                <v-row dense>
                        <v-col cols="3">{{Data.modelContent.productExp}}</v-col>
                        <v-col class="text-center">{{Data.numberOfStaff}}</v-col>
                        <v-col class="text-center">{{Data.numberOfDays}}</v-col>
                        <v-col class="text-center">{{Data.duration}}</v-col>
                        <v-col class="text-center">{{Data.environmentEvents}}</v-col>
                </v-row>
                <v-row dense style="background: lightgrey">
                    <v-col cols="4" class="text-center">{{$t('Model.staff')}}</v-col>
                    <v-col cols="4" class="text-center">{{$t('Model.environment')}}</v-col>
                    <v-col cols="4" class="text-center">{{$t('Model.recruit')}}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="4" class="text-center">
                        <v-row v-for="staff in Data.modelContent.staffs" :key="staff.staffName">
                            <v-col auto v-if="staff.staffExp">{{staff.staffExp}} ({{staff.taskExp}})</v-col>
                            <v-col cols="2" v-if="staff.skillsInit">{{staff.skillsInit}}</v-col>
                            <v-col cols="2" v-if="staff.moraleInit">{{staff.moraleInit}}</v-col>
                            <v-col cols="2" v-if="staff.efficiencyInit">{{staff.efficiencyInit}}</v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="4" class="text-center">
                        <v-row v-for="environment in Data.modelContent.environments" :key="environment.environmentName">
                            <v-col cols="8">{{$t(environment.environmentExp)}}</v-col>
                            <v-col cols="4">{{$t(environment.happenOn)}}</v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="4" class="text-center">
                        <v-row v-for="recruit in Data.modelContent.recruits" :key="recruit.staffName">
                            <v-col>{{recruit.staffExp}}</v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col></v-col>
                </v-row>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'ModelList',
    props: {
        BaseData: [],
        AmendData: '',
    },
}
</script>

<style>

</style>