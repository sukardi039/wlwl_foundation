<template>
<v-container fluid class="pa-6" v-if="Ready">
    <!-- <Select :Label="$t('BaseInfo.class')" :Selected="CurrentInfo" :Options="BaseInfo" :i18n="true" @selected="Selected($event)" /> -->
    <iSelect :label="$t('BaseInfo.class')" v-model="CurrentInfo" :items="BaseInfo" :i18n="true" @input="Selected($event)" />
    <v-container>
        <v-row v-if="CurrentInfo">
            <v-col>{{$t("BaseInfo.name")}}</v-col>
            <v-col>{{$t("BaseInfo.displayKey")}}</v-col>
            <v-col auto><span class="mdi mdi-plus" @click="AddClicked()" v-if="!AmendData"></span></v-col>
        </v-row>
    </v-container>
    <BaseInfoList :BaseInfos="BaseData" :CurrentBase="CurrentInfo" v-if="AmendData==''" @Add-Info="AddInfo($event)" @Row-Clicked="ChangeInfo($event)" />
    <BaseInfoInput :BaseInfo="InputData" v-if="AmendData" @Update-Info="AddInfo($event)" @Abort-Info="AbortInfo()" />
</v-container>
 
</template>

<script>
import {mapState} from 'vuex'

import iSelect from '../components/Base/iSelect'
import BaseInfoList from '../components/BaseInfo/BaseInfoList'
import BaseInfoInput from '../components/BaseInfo/BaseInfoInput'

export default {
    name: 'BaseInfo',
    components: {
        iSelect,
        BaseInfoList,
        BaseInfoInput,
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
    },
    data() {
        return {
            CurrentInfo: '',
            AmendData: '',
            AddData: 0,
            BaseInfox: [
                'BaseInfo.profiles',
                'BaseInfo.styles',
                'BaseInfo.actions',
                'BaseInfo.products',
                'BaseInfo.orders',
                'BaseInfo.tasks',
                "BaseInfo.staff",
                "BaseInfo.environment",
            ],
            BaseInfo: [],
            fetchbuffer: {
                restkey: '',
                mod: "",
                limit: 0,
                qdata: {},
                method: 'POST',
            },
            limit: 0,
            BaseData: [],
            InputData: {
                key: '',
                name:'',
                displayKey: '',
            },
            Ready: false,
        }
    },
    methods:{
        async GetBaseInfo(mod, qry, verb, qstr) {
            let qryStr = qstr?qstr:"/backend/baseinfo/"
            this.fetchbuffer.restkey = this.signedinuser.restkey
            this.fetchbuffer.classes = this.signedinuser.classes
            this.fetchbuffer.mod=mod
            this.fetchbuffer.limit=this.limit
            this.fetchbuffer.method=(verb)?verb:'POST'
            if (qry) {
                qryStr = qryStr+"?"+qry
            }
            const res = await fetch(qryStr, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(this.fetchbuffer),
            })
            if (res.status === 200){
                const baseData = await res.json()
                return await baseData;
            }
        },
        async Selected(ev){
            this.BaseData = false;
//            this.CurrentInfo = ev
            this.BaseData = await this.GetBaseInfo(this.CurrentInfo.substr(this.CurrentInfo.indexOf('.')+1))
            this.AmendData = ''
        },
        async AddInfo(ev){
            if (ev.name && ev.displayKey){
                this.fetchbuffer.qdata = ev
                const NewData = await this.GetBaseInfo(this.CurrentInfo.substr(this.CurrentInfo.indexOf('.')+1), "", "PUT")
                if (this.AmendData === "A"){
                    if (this.BaseData){
                        this.BaseData = [...this.BaseData, NewData[0]]
                    } else {
                        this.BaseData = NewData
                    }
                }
                if (this.AmendData ==="E") {
                    this.BaseData = this.BaseData.map((inf)=>inf.key === this.InputData.key ? NewData[0] : inf)
                }
                this.AmendData = ''
            } else {
                alert(this.$t("general.incomplete"))
            }
        },
        async ChangeInfo(ev){
            this.InputData.key=ev.key
            this.InputData.name=ev.name
            this.InputData.displayKey=ev.displayKey
            this.AmendData = 'E'
        },
        AddClicked() {
            this.InputData.key=''
            this.InputData.name=''
            this.InputData.displayKey=''
            this.AmendData = 'A'
        },
        AbortInfo() {
            this.InputData.key=''
            this.InputData.name=''
            this.InputData.displayKey=''
            this.AmendData = ''
        },

    },
    async created() {
        const dd = await this.GetBaseInfo('baseinfo', '', "POST", '/backend/basicinformation/')
        this.BaseInfo = dd.baseclass_lst.baseclass
        this.Ready = true
    },

}
</script>

<style>

</style>