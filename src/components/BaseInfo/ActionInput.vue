<template>
    <v-container>
        <v-row>
            <v-col class="font-weight-bold">{{$t(Data.displayKey)}}</v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea
                    readonly
                    :label="$t('Action.description')"
                    outlined
                    v-model="ADesc"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Action.parentAction')"
                    :items="BaseInfo.action_lst.action"
                    v-model="Data.bparentAction"
                    @input="Data.parentAction=BaseInfo.action_ref.action[Data.bparentAction]"
                    :i18n="true"
                />
                <!-- <v-select
                    :label="$t('Action.parentAction')"
                    :items="BaseInfo.action_lst.action"
                    outlined
                    v-model="Data.bparentAction"
                    @change="Data.parentAction=BaseInfo.action_ref.action[Data.bparentAction]"
                ></v-select> -->
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Action.minMember')"
                    outlined
                    v-model="Data.minMemberSize"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Action.away')"
                    outlined
                    v-model="Data.away"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Action.duration')"
                    outlined
                    v-model="Data.duration"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Action.applyAll')"
                    :items="YesNo"
                    outlined
                    v-model="Data.bapplyAll"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Action.minStaff')"
                    outlined
                    v-model="Data.minStaff"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Action.maxStaff')"
                    outlined
                    v-model="Data.maxStaff"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <!-- <v-select
                    :label="$t('Action.actionType')"
                    :items="BaseInfo.actionType_lst.actionType"
                    outlined
                    v-model="Data.typeExp"
                    @change="Data.actionType=BaseInfo.actionType_ref.actionType[Data.typeExp]"
                ></v-select> -->
                <iSelect
                    :label="$t('Action.actionType')"
                    :items="BaseInfo.actionType_lst.actionType"
                    outlined
                    v-model="Data.typeExp"
                    @input="Data.actionType=BaseInfo.actionType_ref.actionType[Data.typeExp]"
                    i18n="true"
                />

            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <!-- <v-select
                    :label="$t('Action.withTask')"
                    :items="YesNo"
                    outlined
                    v-model="Data.bwithTask"
                ></v-select> -->
            <iSelect
                    :label="$t('Action.withTask')"
                    :items="YesNo"
                    outlined
                    v-model="Data.bwithTask"
                    @input="showData(Data.bwithTask)"
            />

            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Action.swapTask')"
                    :items="YesNo"
                    outlined
                    v-model="Data.bswapTask"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Action.affectCheckProfile')"
                    :items="BaseInfo.base_lst.profiles"
                    outlined
                    v-model="Data.affectText"
                    @input="Data.affectedWhen=BaseInfo.base_ref.profiles[Data.affectText]"
                    i18n="true"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :label="$t('Action.affectCheck')"
                    :items="BaseInfo.base_lst.affected"
                    outlined
                    v-model="Data.affectCode"
                    i18n="true"
                    @input="Data.affectedIf=BaseInfo.base_ref.affected[Data.affectCode]"
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
    name: 'ActionInput',
    components: {
        iSelect,
    },
    props: {
        Data: [],
        YesNo: [],
        BaseInfo: [],
    },
    computed: {
        ADesc() {
            return this.$t(this.Data.displayKey+'_e')
        }
    },
    methods:{
        showData(ev){
            console.log("showData", ev)
        }
    }
}
</script>

<style>

</style>