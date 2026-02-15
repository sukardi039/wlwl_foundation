<template>
    <v-container>
        <v-row>
            <v-col class="font-weight-bold">{{$t(Data.displayKey)}}</v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea
                    readonly
                    :label="$t('Environment.description')"
                    outlined
                    v-model="disp"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Environment.duration')"
                    outlined
                    v-model="Data.duration"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Environment.orderImpact')"
                    outlined
                    v-model="Data.orderImpact"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Environment.moraleImpact')"
                    outlined
                    v-model="Data.moraleImpact"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Environment.applyAll')"
                    :items="YesNo"
                    outlined
                    v-model="Data.bapplyAll"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Environment.randomOne')"
                    :items="YesNo"
                    outlined
                    v-model="Data.brandomOne"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Environment.lowMorale')"
                    :items="YesNo"
                    outlined
                    v-model="Data.blowMorale"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Environment.lowEfficiency')"
                    :items="YesNo"
                    outlined
                    v-model="Data.blowEfficiency"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Environment.highEfficiency')"
                    :items="YesNo"
                    outlined
                    v-model="Data.bhighEfficiency"
                />
            </v-col>
        </v-row>
        <v-row class="center">
            <v-col auto></v-col>
            <v-col cols="1">
                <span class="mdi mdi-check" @click="$emit('Update-Info', Data)"></span>
            </v-col>
            <v-col cols="1">
                <span @click="$emit('Abort-Clicked')">mdi-restore</span>
            </v-col>
        </v-row>            
    </v-container>
  
</template>

<script>
import iSelect from "../../components/Base/iSelect"
export default {
    name: 'ActionInput',
    components:{
        iSelect,
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