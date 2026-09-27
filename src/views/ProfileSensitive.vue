<template>
  <v-container fluid class="pa-6" v-if="Ready">
    <ProfileSensList :InfoData="BaseData" :HeadData="HeadData" :EditData="EditData" :CurrentEdit="CurrentEdit" @Row-Clicked="toEdit($event)" @Update-Info="toUpdate($event)" @Abort-Info="toAbort()" />
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import ProfileSensList from '../components/BaseInfo/ProfileSensList'

export default {
    name: 'ProfileSensitive',
    components: {
        ProfileSensList,
    },
    data() {
        return {
            fetchbuffer: {
                restkey: '',
                mod: "",
                limit: 0,
                qdata: {},
                methods: 'POST',
            },
            limit: 0,
            BaseData: [],
            HeadData: [],
            CurrentEdit: 0,
            Ready: false,
            EditData: {
                profileSensitivityKey: 0,
                skillsClass: '',
                moraleClass: '',
                efficiencyClass: '',
                skillsSensitivity: 0,
                moraleSensitivity: 0,
                efficiencySensitivity: 0,
            },
        }
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
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
//          console.log(this.fetchbuffer)
          const res = await fetch(qryStr, {
              method: 'POST',
              cache: 'no-cache',
              headers: {
                  "content-type": "application/json",
              },
              body: JSON.stringify(this.fetchbuffer),
          })
          if (res.status === 200){
              const Data = await res.json()
              return await Data;
          }
      },
      async GetClasses() {
          this.BaseData = await this.GetInfo("", "", "POST", "/backend/profilesens/")
      },
      GetParam() {
        //   const Data = await this.GetInfo("", "", "POST", "/backend/basicinformation/")
        //   this.HeadData = await Data.base_lst.profiles
        const tData = this.BaseData[0]
        this.HeadData = [tData['skillsPrf'], tData['moralePrf'], tData['efficiencyPrf']]
      },
      toEdit(ev){
          this.EditData.profileSensitivityKey = ev.profileSensitivityKey
          this.EditData.skillsClass = ev.skillsClass
          this.EditData.moraleClass = ev.moraleClass
          this.EditData.efficiencyClass = ev.efficiencyClass
          this.EditData.skillsSensitivity = ev.skillsSensitivity
          this.EditData.moraleSensitivity = ev.moraleSensitivity
          this.EditData.efficiencySensitivity = ev.efficiencySensitivity
          this.CurrentEdit = ev.profileSensitivityKey
      },
      async toUpdate(ev){
          this.fetchbuffer.qdata = ev
          const eData = await this.GetInfo("", "", "PUT", "/backend/profilesens/")
          console.log(eData)
          if (eData){
              this.BaseData = this.BaseData.map((inf)=>inf.profileSensitivityKey === this.CurrentEdit ? eData[0] : inf)
          }
          this.toAbort()
      },
      toAbort(){
          this.CurrentEdit = -1
          this.EditData.profileSensitivityKey=0
          this.EditData.skillsClass=''
          this.EditData.moraleClass=''
          this.EditData.efficiencyClass=''
          this.EditData.skillsSensitivity=0
          this.EditData.moraleSensitivity=0
          this.EditData.efficiencySensitivity=0
      }

    },
    async mounted() {
      await this.GetClasses()
      await this.GetParam()
      this.Ready=true    }
}
</script>

<style>

</style>