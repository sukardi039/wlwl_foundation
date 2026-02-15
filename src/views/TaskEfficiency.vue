<template>
    <v-container fluid class="pa-6" v-if="Ready">
        <v-row>
            <v-col>
                <iSelect
                    :items="ProductList"
                    :label="$t('Product.name')"
                    outlined
                    v-model="SelectedProduct"
                    @input="ShowTask()"
                    :i18n="false"
                />
            </v-col>
        </v-row>
        <TaskEfficiencyList :ListData="BaseData" :CurrentEdit="CurrentEdit" v-if="BaseData" @Abort-Clicked="toAbort()" @Row-Clicked="toEdit($event)" @Update-Info="toUpdate($event)" />
    </v-container>
  
</template>

<script>
import {mapState} from 'vuex'
import iSelect from "../components/Base/iSelect"

import TaskEfficiencyList from '../components/BaseInfo/TaskEfficiencyList'
export default {
    name: 'TaskEfficiency',
    components: {
        TaskEfficiencyList,
        iSelect,
    },
    data() {
        return{
            ProductList: [],
            ProductRef: [],
            fetchbuffer: {
                restkey: '',
                mod: "",
                limit: 0,
                qdata: {},
                method: 'POST',
            },
            limit: 0,
            SelectedProduct: '',
            CurrentProduct: '',
            BaseData: [],
            CurrentEdit: '',
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
      async GetBase() {
//          const Data = await this.GetInfo("", "", "POST", "/backend/idx_baseinfo/")
          const Data = await this.GetInfo("", "", "POST", "/backend/basicinformation/")
          this.ProductList = await Data.product_lst.product
          this.ProductRef = await Data.product_ref.product
          this.Ready= true
      },
      async ShowTask() {
          this.BaseData = false;
          this.CurrentProduct = this.ProductRef[this.SelectedProduct]
          this.BaseData = await this.GetInfo(this.CurrentProduct, "", "POST", "/backend/taskefficiency/")
//          console.log(this.BaseData)
      },
      toEdit(ev){
        if (!this.CurrentEdit){
            this.CurrentEdit = ev.taskEfficiencyId
        }
      },
      toAbort() {
          this.CurrentEdit = ''
      },
      async toUpdate(ev) {
          this.fetchbuffer.qdata = ev
          const eData = await this.GetInfo("", "", "PUT", "/backend/taskefficiency/")
          if (eData){
              this.BaseData = this.BaseData.map((inf)=>inf.taskEfficiencyId === this.CurrentEdit ? eData[0] : inf)
          }
          this.toAbort()
      }    
    },
    async created(){
        this.BaseData = false;
        await this.GetBase()
    }

}
</script>

<style>

</style>