<template>
  <v-container fluid class="pa-6" v-if="Ready">
      <TaskList :BaseData="BaseData" @Row-Clicked="toEdit($event)" @AddClicked="AddClicked()" v-if="!AmendData" />
      <TaskInput
        :Data="EditData" 
        v-if="AmendData"
        @Update-Info="toUpdate($event)"
        @Abort-Clicked="toAbort()"
        />
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import TaskList from '../components/BaseInfo/TaskList'
import TaskInput from '../components/BaseInfo/TaskInput'
export default {
    name: 'Task',
    components: {
        TaskList,
        TaskInput,
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
                taskName: '',
                taskDescription: '',
            },
            AmendData: '',
            BaseData: [],
            BaseClass: [],
            CurrentClass: '',
            HeadRef: [],
            CurrentEdit: -1,
            Ready: false,
        }
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
    },
    methods: {
      async GetInfo(mod, qry, verb, qstr) {
          let qryStr = qstr?qstr:"/backend/task/"
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
      async GetTask() {
          this.BaseData = await this.GetInfo("", "", "POST", "/backend/task/")
          this.Ready=true
      },
      AddClicked() {
          this.toAbort()
          this.AmendData = 'A'
      },
      async toUpdate(ev){
          if (ev.taskDescription){
                this.fetchbuffer.qdata = ev
                const NewData = await this.GetInfo("", "", "PUT", "/backend/task/")
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
          this.EditData.taskName = ev.taskName
          this.EditData.taskDescription = ev.taskDescription
          this.EditData.displayKey = ev.displayKey
          this.EditData.name = ev.name
          this.CurrentEdit = ev.taskName
          this.AmendData = 'E'
//          console.log(this.EditData)
      },
      toAbort() {
          this.EditData.taskName = ''
          this.EditData.taskDescription = ''
          this.EditData.displayKey = ''
          this.EditData.name = ''
          this.CurrentEdit = ''
          this.AmendData = ''        
      },
    },
    async created() {
        await this.GetTask()
    }
}
</script>

<style>

</style>