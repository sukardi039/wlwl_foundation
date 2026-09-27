<template>
    <v-container>
        <v-row>
            <v-col>
                <v-row>
                    <v-col>
                        <v-text-field
                            :label="$t('Staff.name')"
                            outlined
                            v-model="Data.staffName"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            :label="$t('Staff.experience')"
                            outlined
                            v-model="Data.experience"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            :label="$t('Staff.yearsWorked')"
                            outlined
                            v-model="Data.yearsWorked"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col><img :src="getImg(Data.staffPhoto)" width="90%"/></v-col>
                    <v-col cols="1"><span class="mdi mdi-camera" @click="$emit('Get-Photo')"></span></v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                :items="skillsList"
                :label="$t('Staff.skillsProfile')"
                outlined
                v-model="Data.skillsExp"
                i18n="true"
                />
            </v-col>
            <v-col>
                <iSelect
                :items="moraleList"
                :label="$t('Staff.moraleProfile')"
                outlined
                v-model="Data.moraleExp"
                i18n="true"
                />
            </v-col>
            <v-col>
                <iSelect
                :items="efficiencyList"
                :label="$t('Staff.efficiencyProfile')"
                outlined
                v-model="Data.efficiencyExp"
                i18n="true"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea
                    :label="$t('Staff.description')"
                    outlined
                    v-model="Data.staffDescription"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea
                    :label="$t('Staff.selfIntroduction')"
                    outlined
                    v-model="Data.staffSelfIntroduction"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea
                    :label="$t('Staff.interviewSpeech')"
                    outlined
                    v-model="Data.staffInterview"
                ></v-textarea>
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
import iSelect from "../../components/Base/iSelect"

export default {
    name: 'StaffInput',
    components: {
        iSelect,
    },
    props: {
        Data: [],
        skillsList: [],
        moraleList: [],
        efficiencyList: [],
        param: {},
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