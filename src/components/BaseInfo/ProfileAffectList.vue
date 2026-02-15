<template>
    <v-container>
        <v-row dense>
            <v-col cols="4" class="text-center">{{$t("BaseInfo.profiles")}}</v-col>
            <v-col cols="7" class="text-center">{{$t("BaseKey.othersAffect")}}</v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row style="background-color: lightgrey;" dense>
            <v-col cols="4">
                <v-row>
                    <v-col cols="4">{{$t(HeadData[0])}}</v-col>
                    <v-col cols="4">{{$t(HeadData[1])}}</v-col>
                    <v-col cols="4">{{$t(HeadData[2])}}</v-col>
                </v-row>
            </v-col>
            <v-col cols="7">
                <v-row dense>
                    <v-col cols="2" class="text-end">{{$t(HeadData[0])}}</v-col>
                    <v-col cols="2" class="text-end">{{$t(HeadData[1])}}</v-col>
                    <v-col cols="2" class="text-end">{{$t(HeadData[2])}}</v-col>
                    <v-col auto class="text-center">{{$t('Action.impactMsg')}}</v-col>
                </v-row>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row dense v-for="Data in InfoData" :key="Data.profileImpactKey">
            <v-col cols="4">
                <v-row dense>
                    <v-col cols="4">{{$t(Data.skillsExp)}}</v-col>
                    <v-col cols="4">{{$t(Data.moraleExp)}}</v-col>
                    <v-col cols="4">{{$t(Data.efficiencyExp)}}</v-col>
                </v-row>
            </v-col>
            <v-col cols="7">
                <v-row dense>
                    <v-col cols="2" class="text-end" v-if="Data.profileImpactKey!==CurrentEdit" @click="$emit('Row-Clicked', Data)">{{Data.skillsAffect}}</v-col>
                    <v-col cols="2" class="text-end" v-if="Data.profileImpactKey===CurrentEdit">
                        <v-text-field
                            outlined
                            v-model="EditData.skillsAffect"
                            type="number"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="2" class="text-end" v-if="Data.profileImpactKey!==CurrentEdit" @click="$emit('Row-Clicked', Data)">{{Data.moraleAffect}}</v-col>
                    <v-col cols="2" class="text-end" v-if="Data.profileImpactKey===CurrentEdit">
                        <v-text-field
                            outlined
                            v-model="EditData.moraleAffect"
                            type="number"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="2" class="text-end" v-if="Data.profileImpactKey!==CurrentEdit" @click="$emit('Row-Clicked', Data)">{{Data.efficiencyAffect}}</v-col>
                    <v-col cols="2" class="text-end" v-if="Data.profileImpactKey===CurrentEdit">
                        <v-text-field
                            outlined
                            v-model="EditData.efficiencyAffect"
                            type="number"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col auto v-if="Data.profileImpactKey!==CurrentEdit" @click="$emit('Row-Clicked', Data)">{{Data.affectMsg}}</v-col>
                    <v-col auto class="text-end" v-if="Data.profileImpactKey===CurrentEdit">
                        <v-text-field
                            outlined
                            v-model="EditData.affectMsg"
                            type="string"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="1">                
                <span class="mdi mdi-check" v-if="Data.profileImpactKey===CurrentEdit" @click="$emit('Update-Info', EditData)"></span>
                <span class="mdi mdi-restore" v-if="Data.profileImpactKey===CurrentEdit" @click="$emit('Abort-Info')"></span>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>
export default {
    name: 'ProfileImpactList',
    data() {
        return {
            CurrentImpact: '',
        }
    },
    props: {
        InfoData: [],
        HeadData: [],
        CurrentEdit: '',
        EditData: {},
    },

}
</script>

<style>

</style>