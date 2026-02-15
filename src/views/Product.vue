<template>
  <v-container fluid class="pa-6" v-if="Ready">
    <ProductList
      :BaseData="BaseData"
      @Row-Clicked="toEdit($event)"
      @AddClicked="AddClicked()"
      v-if="!AmendData"
    />
    <ProductInput
      :Data="EditData"
      v-if="AmendData"
      @Update-Info="toUpdate($event)"
      @Abort-Clicked="toAbort()"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import ProductList from "../components/BaseInfo/ProductList";
import ProductInput from "../components/BaseInfo/ProductInput";
export default {
  name: "Product",
  components: {
    ProductList,
    ProductInput,
  },
  data() {
    return {
      fetchbuffer: {
        restkey: "",
        mod: "",
        limit: 0,
        qdata: {},
        method: "POST",
      },
      limit: 0,
      EditData: {
        productName: "",
        productDescription: "",
        ordersPerDay: 1,
        minOrderValue: 1,
        maxOrderValue: 99999,
      },
      AmendData: "",
      BaseData: [],
      BaseClass: [],
      CurrentClass: "",
      HeadRef: [],
      CurrentEdit: -1,
      Ready: false,
    };
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
    }),
  },
  methods: {
    async GetInfo(mod, qry, verb, qstr) {
      let qryStr = qstr ? qstr : "/backend/product/";
      this.fetchbuffer.restkey = this.signedinuser.restkey;
      this.fetchbuffer.classes = this.signedinuser.classes;
      this.fetchbuffer.mod = mod;
      this.fetchbuffer.limit = this.limit;
      this.fetchbuffer.method = verb ? verb : "POST";
      if (qry) {
        qryStr = qryStr + "?" + qry;
      }
      //          console.log(this.fetchbuffer)
      const res = await fetch(qryStr, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(this.fetchbuffer),
      });
      if (res.status === 200) {
        const Data = await res.json();
        return await Data;
      }
    },
    async GetProduct() {
      this.BaseData = await this.GetInfo("", "", "POST", "/backend/product/");
      this.Ready = true;
      console.log(this.BaseData);
    },
    AddClicked() {
      this.toAbort();
      this.AmendData = "A";
    },
    async toUpdate(ev) {
      if (ev.productDescription) {
        this.fetchbuffer.qdata = ev;
        const NewData = await this.GetInfo("", "", "PUT", "/backend/product/");
        if (this.AmendData === "A") {
          if (this.BaseData) {
            this.BaseData = [...this.BaseData, NewData[0]];
          } else {
            this.BaseData = NewData;
          }
        }
        if (this.AmendData === "E") {
          this.BaseData = this.BaseData.map((inf) =>
            inf.productId === ev.productId ? NewData[0] : inf
          );
        }
        this.AmendData = "";
      } else {
        alert(this.$t("general.incomplete"));
      }
    },
    toEdit(ev) {
      this.EditData = { ...ev };
      //   this.EditData.productName = ev.productName
      //   this.EditData.productDescription = ev.productDescription
      //   this.EditData.displayKey = ev.displayKey
      this.EditData.productName = ev.productShortName;
      this.CurrentEdit = ev.productName;
      this.AmendData = "E";
      //          console.log(this.EditData)
    },
    toAbort() {
      this.EditData.productName = "";
      this.EditData.productDescription = "";
      this.EditData.ordersPerDay = 1;
      this.EditData.minOrderValue = 1;
      this.EditData.maxOrderValue = 99999;
      this.EditData.displayKey = "";
      this.EditData.name = "";
      this.EditData.productShortName = "";
      this.CurrentEdit = "";
      this.AmendData = "";
    },
  },
  async created() {
    await this.GetProduct();
  },
};
</script>

<style></style>
