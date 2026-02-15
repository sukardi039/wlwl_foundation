<template>
  <v-container>
        <v-row style="background-color: lightgrey">
            <v-col cols="3">{{$t('Staff.name')}} / {{$t('Staff.description')}}</v-col>
            <v-col cols="8">
              <v-row>
                    <v-col>{{$t('Staff.skillsProfile')}}</v-col>
                    <v-col>{{$t('Staff.moraleProfile')}}</v-col>
                    <v-col>{{$t('Staff.efficiencyProfile')}}</v-col>
                </v-row>
            </v-col>
            <v-col cols="1"><span class="mdi mdi-plus" @click="$emit('AddClicked')"></span></v-col>
        </v-row>
        <v-row flat v-for="Data in BaseData" :key="Data.staffId" @click="$emit('Row-Clicked', Data)">
            <v-col cols="3">
                <img :src="getImg(Data.staffPhoto)" width="100%"/>
            </v-col>
            <v-col cols="8">
                <v-row>
                    <v-col  cols="2" class="font-weight-bold">
                        {{Data.staffName}}
                    </v-col>
                    <v-col style="font-size: 0.8em">
                        {{Data.staffSelfIntroduction}}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        {{Data.staffDescription}}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        {{$t(Data.skillsExp)}}
                    </v-col>
                    <v-col>
                        {{$t(Data.moraleExp)}}
                    </v-col>
                    <v-col>
                        {{$t(Data.efficiencyExp)}}
                    </v-col>
                </v-row>
            </v-col>
            <v-col clos="1"></v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'StaffList',
    props: {
        BaseData: [],
        param:{},
    },
    methods:{
        getImg(img){
            return this.param.fileURL.concat((img)?img:this.param.defaultImage)
        }
    }
}
</script>

<style>

</style>