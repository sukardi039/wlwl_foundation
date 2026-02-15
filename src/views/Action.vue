<template>
  <v-container fluid class="pa-6" v-if="Ready">
      <ActionList :BaseData="BaseData" @Row-Clicked="toEdit($event)" @AddClicked="AddClicked()" v-if="!AmendData" />
      <ActionInput
        :Data="EditData"
        :YesNo="YesNo" 
        :BaseInfo="baseInfo"
        v-if="AmendData"
        @Update-Info="toUpdate($event)"
        @Abort-Clicked="toAbort()"
        />
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import ActionList from '../components/BaseInfo/ActionList'
import ActionInput from '../components/BaseInfo/ActionInput'
export default {
    name: 'Action',
    components: {
        ActionList,
        ActionInput,
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
                actionName: '',
                actionDescription: '',
                duration: 1,
                applyAll: 0,
                minStaff: 1,
                maxStaff: 3,
                actionType: '',
                withTask: 0,
                swapTask: 0,
                parentAct: '',
                parentAction: '',
                minMemberSize: 1,
                affectedWhen: '',
                affectedIf: '',
                away: 0,
            },
            AmendData: '',
            BaseData: [],
            BaseClass: [],
            CurrentClass: '',
            HeadRef: [],
            CurrentEdit: -1,
            Ready: false,
            YesNo: [],
            baseInfo: [],
            gotBasic: false,
        }
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
    },
    methods: {
      async GetInfo(mod, qry, verb, qstr) {
          let qryStr = qstr?qstr:"/backend/action/"
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
      async GetProduct() {
          this.BaseData = await this.GetInfo("", "", "POST", "/backend/action/")
          this.YesNo[0]=this.$t('YesNo.0')
          this.YesNo[1]=this.$t('YesNo.1')
          this.Ready=true
      },
      async GetBaseInfo() {
          if (!this.gotBasic){
              this.baseInfo = await this.GetInfo("", "", "POST", "/backend/basicinformation/")
              this.gotBasic = true
          }
      },
      async AddClicked() {
          this.toAbort()
          await this.GetBaseInfo()
          this.AmendData = 'A'
      },
      async toUpdate(ev){
          if (ev.actionDescription && ev.duration && ev.minStaff && ev.maxStaff){
              ev.applyAll = (ev.bapplyAll === this.$t('YesNo.1'))?1:0
              ev.withTask = (ev.bwithTask === this.$t('YesNo.1'))?1:0
              ev.swapTask = (ev.bswapTask === this.$t('YesNo.1'))?1:0
              if (!ev.parentAction){
                  ev.parentAction = this.baseInfo.action_ref.action[ev.bparentAction]
              }
                this.fetchbuffer.qdata = ev
                const NewData = await this.GetInfo("", "", "PUT", "/backend/action/")
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
      async toEdit(ev) {
          await this.GetBaseInfo()
          this.EditData = {...ev}
          this.EditData.bapplyAll = this.YesNo[ev.applyAll]
          this.EditData.bwithTask = this.YesNo[ev.withTask]
          this.EditData.bswapTask = this.YesNo[ev.swapTask]
          this.EditData.bparentAction = this.getParentAct(ev)
          this.CurrentEdit = ev.actionName
          this.AmendData = 'E'
//          console.log(this.EditData)
      },
      toAbort() {
          this.EditData.actionName = ''
          this.EditData.actionDescription = ''
          this.EditData.duration = 1
          this.EditData.name = ''
          this.EditData.applyAll = 0
          this.EditData.minStaff = 1
          this.EditData.maxStaff = 3
          this.EditData.parentAction = ''
          this.EditData.minMemberSize = 1;
          this.EditData.withTask = 0
          this.EditData.swapTask = 0
          this.EditData.affectedWhen = ''
          this.EditData.affectedIf = 'X'
          this.EditData.away = 0
          this.actionType = ''
          this.CurrentEdit = ''
          this.AmendData = ''        
      },
      getParentAct(ev){
          if (ev.parentAction){
              return this.baseInfo.action_det.action.find(e=>e.actionName==ev.parentAction).displayKey
          } else {
              ev.parentAction = ev.actionName
              return ev.displayKey
          }
      },
    },
    async created() {
        await this.GetProduct()
    }
}
</script>

<style>

</style>