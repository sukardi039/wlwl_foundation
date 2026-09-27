<template>
  <v-container fluid class="pa-6" v-if="Ready">
      <StyleList :BaseData="BaseData" @Row-Clicked="toEdit($event)" @AddClicked="AddClicked()" v-if="!AmendData" />
      <StyleInput
        :Data="EditData" 
        v-if="AmendData"
        @Update-Info="toUpdate($event)"
        @Abort-Clicked="toAbort()"
        />
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import StyleList from '../components/BaseInfo/StyleList'
import StyleInput from '../components/BaseInfo/StyleInput'
export default {
    name: 'Task',
    components: {
        StyleList,
        StyleInput,
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
      async GetStyle() {
          this.BaseData = await this.GetInfo("", "", "POST", "/backend/style/")
          this.Ready=true
      },
      AddClicked() {
          this.toAbort()
          this.AmendData = 'A'
      },
      async toUpdate(ev){
          if (ev.styleDescription){
                this.fetchbuffer.qdata = ev
                const NewData = await this.GetInfo("", "", "PUT", "/backend/style/")
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
          this.EditData.styleName = ev.styleName
          this.EditData.styleDescription = ev.styleDescription
          this.EditData.displayKey = ev.displayKey
          this.EditData.name = ev.name
          this.CurrentEdit = ev.styleName
          this.AmendData = 'E'
//          console.log(this.EditData)
      },
      toAbort() {
          this.EditData.styleName = ''
          this.EditData.styleDescription = ''
          this.EditData.displayKey = ''
          this.EditData.name = ''
          this.CurrentEdit = ''
          this.AmendData = ''        
      },
    },
    async created() {
        await this.GetStyle()
    }
}
</script>

<style>

</style>