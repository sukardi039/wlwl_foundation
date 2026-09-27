<template>
  <v-container class="scroll-y pa-0">
    <v-dialog persistent v-model="data" scrollable>
      <v-card style="font-size: 0.85em;">
        <v-card-title class="detail-head" id="scroll-target">
          <h4>{{ $t("DrillReport.title") }}</h4>
          <v-spacer></v-spacer>
          <div v-if="genPDF" class="body-2">
            {{ $t("DrillReport.report-wait") }}
            <v-progress-circular
              :rotate="-90"
              :size="30"
              :width="3"
              :value="(x / len) * 100"
              color="primary"
            >
            </v-progress-circular>
          </div>
          <v-spacer></v-spacer>
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
          <v-btn
            outlined
            rounded
            height="25px"
            @click.stop="$emit('Close-Report')"
          >
            <span class="mdi mdi-close" style="font-size: 0.8em;">{{
              $t("DrillPlatform.cancel")
            }}</span>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <section id="theReport">
            <ReportBase :data="data" />
          </section>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ReportBase from "../report/ReportBase.vue";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  name: "DrillReport",
  components: {
    ReportBase,
  },
  data() {
    return {
      genPDF: 0,
      x: 0,
      len: 0,
      fab: false,
      // img1: '',
      // img2: '',
      listPDF: [
        ".reportDiv",
        ".reportDiv1",
        ".reportDiv2",
        ".reportDiv3",
        ".reportDiv4",
        ".reportDiv5",
        ".reportDiv6",
        ".reportDiv7",
      ],
      forPDF: [],
    };
  },
  props: {
    data: {},
  },
  methods: {
    async doPDF() {
      //            this.genPDF = 1
      var imgData;
      var width = document.getElementById("hdr").scrollWidth;
      var height = document.getElementById("hdr").scrollHeight;
      //      var forPDF = document.querySelectorAll(".reportDiv");
      for (var c = 0; c < this.listPDF.length; c++) {
        this.forPDF[c] = document.querySelector(this.listPDF[c]);
        //        console.log(c, this.listPDF[c], this.forPDF[c])
      }
      this.len = this.forPDF.length;
      //      console.log(this.len, this.forPDF)
      //      console.log(width, height, this.len);
      var doc = new jsPDF("p", "px", [width, height]);
      this.x = 0;
      for (var i = 0; i < this.len; i++) {
        await html2canvas(this.forPDF[i]).then((canvas) => {
          doc.addImage(
            canvas.toDataURL("image/jpg", 0.8),
            "jpg",
            0,
            0,
            width,
            height,
            "",
            "FAST"
          );
          this.x++;
          if (this.x === this.len) {
            doc.save(
              this.data.content.analysis.reportUser +
                "-" +
                this.data.content.analysis.reportDate +
                `.pdf`
            );
            this.genPDF = 0;
          } else {
            doc.addPage();
          }
          //                    }
        });
      }
      return true;
    },
  },
};
</script>

<style></style>
