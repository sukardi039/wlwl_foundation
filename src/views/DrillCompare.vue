<template>
  <v-container class="pa-3">
    <v-row>
      <v-col class="text-end">
        <v-btn
          outlined
          rounded
          height="25px"
          @click.stop="radioClicked()"
          v-if="false"
        >
          <span class="mdi mdi-refresh" style="font-size: 0.8em;">{{
            $t("Drill.refresh")
          }}</span>
        </v-btn>
        <v-btn
          v-if="!genPDF"
          outlined
          rounded
          height="25px"
          @click.stop="
            genPDF = 1;
            doPDF();
          "
        >
          <span class="mdi mdi-download" style="font-size: 0.8em;">{{
            $t("DrillReport.download")
          }}</span>
        </v-btn>
      </v-col>
    </v-row>
    <div id="hdr" class="comp">
      <div class="text-center pa-2">
        <span style="font-size: large; font-weight: bold;">
          {{ $t("DrillCompare.title") }}
        </span>
      </div>
      <!-- Bar chart - not used -->
      <div v-if="false">
        <v-row dense style="font-weight: bold;">
          <v-col cols="1"></v-col>
          <v-col cols="2">
            <v-row dense>
              <v-col cols="6">{{ $t("DrillCompare.student") }}</v-col>
              <v-col cols="3" class="text-end">{{
                $t("DrillCompare.start")
              }}</v-col>
              <v-col cols="3" class="text-end">{{
                $t("DrillCompare.end")
              }}</v-col>
            </v-row>
          </v-col>
          <v-col cols="8" class="text-center">{{
            $t("DrillCompare.description")
          }}</v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row
          dense
          v-for="dt in BaseData"
          :key="dt.userName"
          class="pa-0 ma-0"
        >
          <v-col cols="!"></v-col>
          <v-col cols="2">
            <v-row dense>
              <v-col cols="6">{{ dt.userName }}</v-col>
              <v-col cols="3" class="text-end">{{ dt.startEff }}</v-col>
              <v-col cols="3" class="text-end">{{ dt.endEff }}</v-col>
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-row
              dense
              style="position: relative; top:0px; left:0px; z-index:5;"
            >
              <v-col style="position: absolute;">
                <v-progress-linear
                  height="25"
                  background-color="grey lighten-2"
                  class="pa-0 ma-0"
                  :value="dt.endEff"
                  color="orange"
                ></v-progress-linear>
              </v-col>
            </v-row>
            <v-row
              dense
              style="position: relative; top:0px; left:0px; z-index:10;"
            >
              <v-col>
                <v-progress-linear
                  background-opacity="0"
                  height="25"
                  :value="dt.startEff"
                  color="blue darken-3"
                  class="pa-0 ma-0"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="!"></v-col>
        </v-row>
        <v-divider height="20"> </v-divider>
        <v-row dense style="font-size: small; font-color: gray;">
          <v-col cols="3"></v-col>
          <v-col cols="3" class="text-start">0</v-col>
          <v-col cols="2" class="text-center">50</v-col>
          <v-col cols="3" class="text-end">100</v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="1"
            ><v-progress-linear
              color="blue darken-3"
              value="100"
              height="25"
            ></v-progress-linear
          ></v-col>
          <v-col cols="3">{{ $t("DrillCompare.startName") }}</v-col>
          <v-col cols="1"
            ><v-progress-linear
              color="orange"
              value="100"
              height="25"
            ></v-progress-linear
          ></v-col>
          <v-col cols="3">{{ $t("DrillCompare.endName") }}</v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </div>
      <!-- Line chart -->
      <div>
        <LineChartGenerator
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
          v-if="Ready"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "DrillCompare",
  components: {
    LineChartGenerator,
  },
  data() {
    return {
      BaseData: [],
      fetchbuffer: {
        restkey: "",
        mod: "",
        limit: 0,
        qdata: {},
        method: "POST",
      },
      limit: 0,
      Ready: false,
      AmendCode: "",
      SelectedPackage: "",
      LevelList: [],
      YesNo: [],
      InfoData: [],
      sel: "",
      selectedDrill: 0,
      currentPackage: [],
      genPDF: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Line Chart",
            data: [],
            fill: false,
            borderColor: "orange",
            backgroundColor: "orange",
            borderWidth: 2,
          },
          {
            label: "Line Chart1",
            data: [],
            fill: false,
            borderColor: "red",
            backgroundColor: "red",
            borderWidth: 2,
          },
        ],
      },
      stEff: {
        label: "",
        data: [],
        fill: true,
        borderColor: "orange",
        backgroundColor: "orange",
        borderWidth: 3,
      },
      enEff: {
        label: "",
        data: [],
        fill: true,
        borderColor: "red",
        backgroundColor: "red",
        borderWidth: 3,
      },
      chartOptions: {
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
      paramdata: "paramdata",
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
    async GetUser(se) {
      this.BaseData = false;
      this.AmendCode = "";
      this.fetchbuffer.package = se;
      this.BaseData = await this.GetInfo(
        "",
        "",
        "POST",
        "/backend/drillcompare/"
      );
      // let c = 0;
      // while (c <= 0) {
      //   this.LevelList = [...this.LevelList, c.toString()]
      //   c++;
      // }
      // this.YesNo[0] = this.$t("YesNo.0");
      // this.YesNo[1] = this.$t("YesNo.1");
      // this.SelectedPackage = se
    },
    async GetParam() {
      this.InfoData = await this.GetInfo(
        "",
        "",
        "POST",
        "/backend/basicinformation/"
      );
      this.paramdata = await this.InfoData;
    },
    // async drillReset(ev){
    //   console.log("reset")
    //   await this.resetDrill(ev)
    //   await this.GetUser(this.InfoData.package_ref.package[this.sel], this.selectedDrill)
    // },
    // async resetDrill(ev){
    //   console.log("resetting...")
    //   this.fetchbuffer.qdata = ev;
    //   this.drillStatus = "RESET";
    //   this.drillEndPage = false;
    //   this.paramData = false;
    //   await this.GetInfo("RESET", "", "PUT", "/backend/drill/");
    // },
    currentDrill() {
      var s = 0;
      if (this.currentPackage.activeThree == 1) {
        s = 3;
        //        document.getElementById("r3").click()
      } else if (this.currentPackage.activeTwo == 1) {
        s = 2;
        //        document.getElementById("r2").click()
      } else if (this.currentPackage.activeOne == 1) {
        s = 1;
        //        document.getElementById("r1").click()
      }
      //      console.log('s', s)
      this.selectedDrill = s;
    },
    getCurrentPackage() {
      for (var c = 0; c < this.paramdata.package_det.package.length; c++) {
        if (
          this.paramdata.package_det.package[c].packageId ==
          this.signedinuser.companyName
        ) {
          return this.paramdata.package_det.package[c];
        }
      }
    },
    async radioClicked() {
      //      console.log(this.selectedDrill)
      await this.GetUser(this.signedinuser.companyName);
      this.buildTable();
    },
    buildTable() {
      console.log(this.BaseData.length, this.BaseData);
      var c = 0;
      if (true) {
        this.stEff.data = [];
        this.enEff.data = [];
        this.stEff.label =
          this.$t("DrillCompare.startName") + this.$t("DrillCompare.label");
        this.enEff.label =
          this.$t("DrillCompare.endName") + this.$t("DrillCompare.label");
        this.chartData.labels = [];
        this.BaseData.forEach((v) => {
          // this.chartData.labels = [...this.chartData.labels, v.userName+' '+v.startEff+', '+v.endEff];
          this.chartData.labels = [...this.chartData.labels, v.userName];
          this.stEff.data = [...this.stEff.data, v.startEff];
          this.enEff.data = [...this.enEff.data, v.endEff];
        });
        this.chartData.datasets = [this.stEff, this.enEff];
      }
      // this.chartData.datasets[0].data = st
      console.log(this.chartData);
    },
    async doPDF() {
      var width = document.getElementById("hdr").scrollWidth;
      var height = document.getElementById("hdr").scrollHeight;
      var cop = document.querySelector(".comp");
      var doc = new jsPDF("l", "px", [height, width]);
      await html2canvas(cop).then((canvas) => {
        console.log(canvas);
        doc.addImage(
          canvas.toDataURL("image/jpeg", 1),
          "jpg",
          0,
          0,
          width,
          height,
          "",
          "NONE"
        );
        doc.save(`compare.pdf`);
        //                    }
      });
      this.genPDF = false;
    },
  },
  async created() {
    //    await this.GetUser();
    // await this.GetParam();
    // this.Ready = true;
    this.currentPackage = this.getCurrentPackage();
    //console.log('package', this.currentPackage)
    this.currentDrill();
    if (this.selectedDrill < 2) {
      alert(this.$t("DrillCompare.incompleteDrill"));
    } else {
      //    console.log('selected', this.selectedDrill)
      await this.GetUser(this.signedinuser.companyName);
      this.buildTable();
      this.Ready = true;
    }
  },
  mounted() {},
};
</script>

<style></style>
