<template>
    <v-container>
        <v-row>
            <v-col class="font-weight-bold">{{$t(Data.displayKey)}}</v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea
                    :label="$t('Template.description')"
                    outlined
                    v-model="Data.templateDescription"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Template.numberOfStaff')"
                    outlined
                    v-model="Data.numberOfStaff"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Template.numberOfDays')"
                    outlined
                    v-model="Data.numberOfDays"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Template.duration')"
                    outlined
                    v-model="Data.duration"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Template.environmentEvents')"
                    outlined
                    v-model="Data.environmentEvents"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Template.recruits')"
                    outlined
                    v-model="Data.recruits"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Template.report')"
                    :items="YesNo"
                    outlined
                    v-model="Data.report"
                />
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
    name: 'TemplateInput',
    components:{
        iSelect,
    },
    data() {
        return{
        }
    },
    props: {
        Data: [],
        YesNo: [],
    },
    computed:{
        disp() {
            return this.$t(this.Data.displayKey+'_e')
        }
    },
}
</script>

<style>

</style>