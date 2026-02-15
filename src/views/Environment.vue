<template>
  <v-container fluid class="pa-6" v-if="Ready">
      <EnvironmentList :BaseData="BaseData" @Row-Clicked="toEdit($event)" @AddClicked="AddClicked()" v-if="!AmendData" />
      <EnvironmentInput
        :Data="EditData"
        :YesNo="YesNo" 
        v-if="AmendData"
        @Update-Info="toUpdate($event)"
        @Abort-Clicked="toAbort()"
        />
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import EnvironmentList from '../components/BaseInfo/EnvironmentList'
import EnvironmentInput from '../components/BaseInfo/EnvironmentInput'
export default {
    name: 'Action',
    components: {
        EnvironmentList,
        EnvironmentInput,
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
                environmentName: '',
                environmentDescription: '',
                orderImpact: 0,
                moraleImpact: 0,
                duration: 1,
                applyAll: 0,
                randomOne: 0,
                lowMorale: 0,
                lowEfficiency: 0,
                highEfficiency: 0,
            },
            AmendData: '',
            BaseData: [],
            BaseClass: [],
            CurrentClass: '',
            HeadRef: [],
            CurrentEdit: -1,
            Ready: false,
            YesNo: [],
        }
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
    },
    methods: {
      async GetInfo(mod, qry, verb, qstr) {
          let qryStr = qstr?qstr:"/backend/environmental/"
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
      async GetEnvironment() {
          this.BaseData = await this.GetInfo("", "", "POST", "/backend/environmental/")
          this.YesNo[0]=this.$t('YesNo.0')
          this.YesNo[1]=this.$t('YesNo.1')
          this.Ready=true
      },
      AddClicked() {
          this.toAbort()
          this.AmendData = 'A'
      },
      async toUpdate(ev){
          if (ev.environmentDescription){
              ev.applyAll = (ev.bapplyAll === this.$t('YesNo.1'))?1:0
              ev.randomOne = (ev.brandomOne === this.$t('YesNo.1'))?1:0
              ev.lowMorale = (ev.blowMorale === this.$t('YesNo.1'))?1:0
              ev.lowEfficiency = (ev.blowEfficiency === this.$t('YesNo.1'))?1:0
              ev.highEfficiency = (ev.bhighEfficiency === this.$t('YesNo.1'))?1:0
                this.fetchbuffer.qdata = ev
                const NewData = await this.GetInfo("", "", "PUT", "/backend/environmental/")
                if (this.AmendData === "A"){
                    if (this.BaseData){
                        this.BaseData = [...this.BaseData, NewData[0]]
                    } else {
                        this.BaseData = NewData
                    }
                }
                if (this.AmendData ==="E") {
                    this.BaseData = this.BaseData.map((inf)=>inf.name === ev.name ? NewData[0] : inf)
                }
                this.AmendData = ''
          } else {
                 alert(this.$t("general.incomplete"))             
          }
      },
      toEdit(ev) {
          this.EditData = {...ev}
          this.EditData.bapplyAll = this.YesNo[ev.applyAll]
          this.EditData.brandomOne = this.YesNo[ev.randomOne]
          this.EditData.blowMorale = this.YesNo[ev.lowMorale]
          this.EditData.blowEfficiency = this.YesNo[ev.lowEfficiency]
          this.EditData.bhighEfficiency = this.YesNo[ev.highEfficiency]
          this.CurrentEdit = ev.environmentName
          this.AmendData = 'E'
      },
      toAbort() {
          this.EditData.environmentName = ''
          this.EditData.environmentDescription = ''
          this.EditData.orderImpact = 1
          this.EditData.name = ''
          this.EditData.moraleImpact = 0
          this.EditData.duration = 1
          this.EditData.applyAll = 0
          this.EditData.randomOne = 0
          this.EditData.lowMorale = 0
          this.EditData.lowEfficiency = 0
          this.EditData.highEfficiency = 0
          this.CurrentEdit = ''
          this.AmendData = ''        
      },
    },
    async created() {
        await this.GetEnvironment()
    }
}
</script>

<style>

</style>