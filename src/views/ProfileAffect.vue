<template>
  <v-container fluid class="pa-6" v-if="Ready">
      <Select :Label="$t('Impact.type')" :Options="BaseClass" :Selected="$t(CurrentClass)" :i18n="'Yes'" @selected="SelectClass($event)" />
      <Select :Label="$t('Impact.action')" :Options="ImpactList" :Selected="CurrentImpact" v-if="CurrentClass" :i18n="true" @selected="SelectImpact($event)" />
      <ProfileAffectList :InfoData="BaseData" :HeadData="HeadData" :EditData="EditData" :CurrentEdit="CurrentEdit" v-if="BaseData" @Row-Clicked="toEdit($event)" @Update-Info="toUpdate($event)" @Abort-Info="toAbort()" />
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import Select from '../components/Base/Select'
import ProfileAffectList from '../components/BaseInfo/ProfileAffectList'

export default {
    name: 'ProfileAffect',
    components: {
        ProfileAffectList,
        Select,
    },
    data() {
        return {
            fetchbuffer: {
                restkey: '',
                mod: "",
                limit: 0,
                qdata: {},
                method: 'POST',
            },
            limit: 0,
            EditData: {
                profileSensitivityKey: 0,
                impactClass: '',
                skillsClass: '',
                moraleClass: '',
                efficiencyClass: '',
                skillsSensitivity: 0,
                moraleSensitivity: 0,
                efficiencySensitivity: 0,
                affectMsg: '',
            },
            BaseClass: [],
            CurrentClass: '',
            HeadRef: [],
            CurrentAction: '',
            AllImpacts: [],
            ImpactList:[],
            CurrentImpact: '',
            BaseData: [],
            ImpactRef: [],
            Impact: '',
            HeadData: [],
            CurrentEdit: -1,
            Ready: false,
            GotParam: false,
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
          this.BaseData = await this.GetInfo(this.Impact, "", "POST", "/backend/profileaffect/")
        //   const Data = await this.GetInfo("baseinfo", "", "POST", "/backend/idx_baseinfo/")
        //   this.HeadData = Data.lst.profiles
      },
      async GetBase() {
//          const bData = await this.GetInfo("", "", "POST", "/backend/idx_baseclass/")
          const bData = await this.GetInfo("", "", "POST", "/backend/basicinformation/")
          this.BaseClass = await bData.act_lst.impact
          this.HeadRef = await bData.act_ref.impact
 //         this.AllImpacts = await this.GetInfo("", "", "POST", "/backend/idx_baseinfo/")
          this.AllImpacts = await bData
          this.HeadData = await bData.base_lst.profiles
      },
      SelectClass(ev){
          this.CurrentAction = this.HeadRef[ev]
          this.ImpactList = this.AllImpacts.base_lst[this.CurrentAction]
          this.CurrentClass = ev
          this.ImpactRef = this.AllImpacts.base_ref[this.CurrentAction]
          this.CurrentImpact = ''
          this.BaseData = false;
      },
      async SelectImpact(ev){
          this.BaseData = false;
          this.CurrentImpact = ev
          this.Impact = this.ImpactRef[ev]
          await this.GetClasses()
      },
      toEdit(ev){
          this.EditData.profileImpactKey = ev.profileImpactKey
          this.EditData.skillsClass = ev.skillsClass
          this.EditData.moraleClass = ev.moraleClass
          this.EditData.efficiencyClass = ev.efficiencyClass
          this.EditData.skillsAffect = ev.skillsAffect
          this.EditData.moraleAffect = ev.moraleAffect
          this.EditData.efficiencyAffect = ev.efficiencyAffect
          this.EditData.compareTo = ev.compareTo
          this.EditData.compareOn = ev.compareOn
          this.EditData.affectMsg = ev.affectMsg
          this.CurrentEdit = ev.profileImpactKey
      },
      async toUpdate(ev){
          this.fetchbuffer.qdata = ev
          const eData = await this.GetInfo(this.Impact, "", "PUT", "/backend/profileaffect/")
          if (eData){
              this.BaseData = this.BaseData.map((inf)=>inf.profileImpactKey === this.CurrentEdit ? eData[0] : inf)
          }
          this.toAbort()
      },
      toAbort(){
          this.CurrentEdit = -1
          this.EditData.profileImpactKey=0
          this.EditData.skillsClass=''
          this.EditData.moraleClass=''
          this.EditData.efficiencyClass=''
          this.EditData.skillsAffect=0
          this.EditData.moraleAffect=0
          this.EditData.efficiencyAffect=0
          this.EditData.affectMsg=''
      },
      SelectedClass(ev) {
          this.BaseInfo = false
          this.CurrentClass = ev.substr(ev.indexOf('.')+1)
          this.CurrentAction = this.AllActions[CurrentClass]
      },
      ImpactChanged() {
          console.log(this.CurrentImpact)
      }

    },
    async created() {
      this.BaseData = false;
      await this.GetBase()
      this.Ready = true    }
}
</script>

<style>

</style>