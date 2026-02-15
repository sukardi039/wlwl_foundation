<template>
     <v-container>
        <v-row dense class="align-top">
            <v-col cols="2">
                <v-text-field
                    outlined
                    v-model="InfoData.profileClassCode"
                >
                </v-text-field>
            </v-col>
            <v-col cols="2">
                <Select :Selected="InfoData.profileDisplayName" :Options="ProfileInfo" :i18n="'true'" @selected="Selected($event)" />
                <!-- <iSel
                    :items="ProfileInfo"
                    :Label="$t('BaseInfo.profiles')"
                    v-model="InfoData.profileDisplayName"
                /> -->
                <!-- <v-select
                :items="ProfileInfo"
                outlined
                :label="$t('BaseInfo.profiles')"
                v-model="InfoData.profileDisplayName"
                ></v-select> -->
            </v-col>
            <v-col cols="3">
                <v-text-field
                    outlined
                    v-model="InfoData.profileClassDisplayName"
                >
                </v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    outlined
                    v-model="InfoData.profileClassMin"
                    type="number"
                >
                </v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    outlined
                    v-model="InfoData.profileClassMax"
                    type="number"
                >
                </v-text-field>
            </v-col>
            <v-col cols="1">
                <span class="mdi mdi-check" @click="$emit('Update-Info', InfoData)"></span>
                <span class="mdi mdi-restore" @click="$emit('Abort-Clicked')"></span>
            </v-col>
        </v-row>
    </v-container> 
</template>

<script>
import Select from '../Base/Select'
export default {
    name: 'ProfileClassInput',
    components: {
        Select,
    },
    props: {
        InfoData: {},
        ProfileInfo: [],
    },
    methods:{
        Selected(ev){
            this.InfoData.profileDisplayName = ev
        }
    }
}
</script>

<style>

</style>