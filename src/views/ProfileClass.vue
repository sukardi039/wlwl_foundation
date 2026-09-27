<template>
    <v-container fluid class="pa-6" v-if="Ready">
        <v-container>
            <v-row style="background: lightgrey">
                <v-col cols="2">{{$t('BaseInfo.profileClassCode')}}</v-col>
                <v-col cols="2">{{$t('BaseInfo.profiles')}}</v-col>
                <v-col cols="3">{{$t('BaseInfo.displayKey')}}</v-col>
                <v-col cols="2" class="text-end">{{$t('BaseInfo.profileClassMin')}}</v-col>
                <v-col cols="2" class="text-end">{{$t('BaseInfo.profileClassMax')}}</v-col>
                <v-col cols="1" auto><span class="mdi mdi-plus" @click="AddClicked()" v-if="!AmendData"></span></v-col>
            </v-row>
        </v-container>
        <ProfileClassList :ClassInfos="ProfileClasses" v-if="!AmendData" @Row-Clicked="EditClicked($event)" />
        <ProfileClassInput :InfoData="ProfileClass" :ProfileInfo="ProfileInfo" v-if="AmendData" @Update-Info="SaveInfo($event)" @Abort-Clicked="AbortClicked()" />
    </v-container>
</template>

<script>
import {mapState} from 'vuex'

import ProfileClassList from '../components/BaseInfo/ProfileClassList'
import ProfileClassInput from '../components/BaseInfo/ProfileClassInput'

export default {
    name: 'ProfileClass',
    components:{
        ProfileClassList,
        ProfileClassInput,
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
    },
    data() {
        return {
            ProfileClass: {
                profileClassCode: '',
                profileName: '',
                profileClassDisplayName: '',
                profileClassMin: 0,
                profileClassMax: 100,
                key: '',
            },
            ProfileClasses: [],
            fetchbuffer: {
                restkey: '',
                mod: "",
                limit: 0,
                qdata: {},
                method: 'POST',
            },
            limit: 0,
            AmendData: '',
            ProfileInfo: [],
            ProfileList: [],
            Ready: false,
            GotParam: false,
        }
    },
    methods: {
        async GetInfo(mod, qry, verb, qstr) {
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
       async  GetClasses() {
            this.ProfileClasses = await this.GetInfo("profileclass", "", "POST", "/backend/profileclass/")
       },
       async GetParam() {
            const info = await this.GetInfo("", "", "POST", "/backend/basicinformation/")
            this.ProfileList = await info.base_ref.profiles
            this.ProfileInfo = await info.base_lst.profiles
            this.GotParam = true
         },
        async SaveInfo(ev){
            if (ev.profileClassCode && ev.profileClassDisplayName && ev.profileDisplayName){
                ev.profileName = this.ProfileList[ev.profileDisplayName]
//                console.log(ev)
                this.fetchbuffer.qdata = ev
                const NewData = await this.GetInfo("profileclass", "", "PUT", "/backend/profileclass/")
                if (this.AmendData === "A"){
                    if (this.ProfileClasses){
                        this.ProfileClasses = [...this.ProfileClasses, NewData[0]]
                    } else {
                        this.ProfileClasses = NewData
                    }
                }
                if (this.AmendData ==="E") {
                    this.ProfileClasses = this.ProfileClasses.map((inf)=>inf.key === this.ProfileClass.key ? NewData[0] : inf)
                }
                this.AmendData = ''
            } else {
                alert(this.$t("general.incomplete"))
            }
        },
        async AddClicked() {
            if (!this.GotParam) {
                await this.GetParam()
            }
                this.ProfileClass.profileClassCode= ''
                this.ProfileClass.profileName= ''
                this.ProfileClass.profileClassDisplayName= ''
                this.ProfileClass.profileClassMin= 0
                this.ProfileClass.profileClassMax= 100
                this.ProfileClass.key= ''
                this.AmendData = 'A'
        },
        AbortClicked(){
                this.ProfileClass.profileClassCode= ''
                this.ProfileClass.profileName= ''
                this.ProfileClass.profileClassDisplayName= ''
                this.ProfileClass.profileClassMin= 0
                this.ProfileClass.profileClassMax= 100
                this.ProfileClass.key= ''
                this.AmendData = ''
        },
        EditClicked(ev){
            if (!this.GotParam){
                this.GetParam()
            }
                this.ProfileClass.profileClassCode= ev.profileClassCode
                this.ProfileClass.profileName= ev.profileName
                this.ProfileClass.profileClassDisplayName= ev.profileClassDisplayName
                this.ProfileClass.profileClassMin= ev.profileClassMin
                this.ProfileClass.profileClassMax= ev.profileClassMax
                this.ProfileClass.profileDisplayName = ev.profileDisplayName
                this.ProfileClass.key= ev.key
                this.AmendData = 'E'
        }
    },
    async created() {
        await this.GetClasses()
        this.Ready=true
    }
}
</script>

<style>

</style>