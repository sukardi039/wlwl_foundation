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
          <v-alert v-if="exportError" type="error">{{ exportError }}</v-alert>
          <section id="theReport" ref="report">
            <ReportBase ref="reportBase" :data="data" :personalisedTakeaways="personalisedTakeaways" />
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
import { mapState } from "vuex";
import { personalisedReportEnabled } from "../../utils/reportTakeaways";

export default {
  name: "DrillReport",
  components: {
    ReportBase,
  },
  data() {
    return {
      genPDF: 0,
      exportError: "",
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
        ".report-history-page",
        ".reportDiv8",
      ],
      forPDF: [],
    };
  },
  props: {
    data: {},
  },
  computed: {
    ...mapState({ paramdata: "paramdata" }),
    personalisedTakeaways() {
      return personalisedReportEnabled(this.paramdata);
    },
  },
  methods: {
    async doPDF() {
      this.exportError = "";
      const history = this.$refs.reportBase && this.$refs.reportBase.$refs.history;
      try {
        await this.$nextTick();
        const report = this.$refs.report;
        const header = report.querySelector("#hdr");
        const width = header.scrollWidth;
        const height = header.scrollHeight;
        if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
          throw new Error("Report header has invalid dimensions: " + width + " x " + height);
        }
        if (history) await history.prepareForExport(width, height);
        this.forPDF = this.listPDF.flatMap(selector => selector === ".report-history-page"
          ? (this.personalisedTakeaways ? Array.from(report.querySelectorAll(selector)) : [])
          : [report.querySelector(selector)]);
        this.len = this.forPDF.length;
        this.x = 0;
        const doc = new jsPDF("p", "px", [width, height]);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        for (const section of this.forPDF) {
          if (!section) throw new Error("Report section is missing");
          const canvas = await html2canvas(section, {
            scale: 1,
            onclone: (document, clonedSection) => {
              const clonedReport = clonedSection.closest("#theReport");
              if (!clonedReport) return;
              clonedReport.querySelectorAll(".report-frame").forEach(frame => {
                if (!clonedSection.contains(frame) && frame !== clonedSection) frame.remove();
              });
              clonedSection.scrollIntoView();
            },
          });
          if (!Number.isFinite(canvas.width) || canvas.width <= 0 ||
              !Number.isFinite(canvas.height) || canvas.height <= 0) {
            throw new Error("Report section " + section.className +
              " produced an invalid canvas: " + canvas.width + " x " + canvas.height);
          }
          const image = canvas.toDataURL("image/jpeg", 0.8);
          const paginate = this.personalisedTakeaways && section.matches(".reportDiv8");
          if (!paginate) {
            const scale = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
            const imageWidth = canvas.width * scale;
            const imageHeight = canvas.height * scale;
            if (this.x) doc.addPage();
            doc.addImage(image, "JPEG", (pageWidth - imageWidth) / 2, 0,
              imageWidth, imageHeight, "", "FAST");
            this.x++;
            continue;
          }
          let imageHeight = canvas.height * pageWidth / canvas.width;
          const pixelHeight = pageWidth / canvas.width;
          const nearestPageHeight = Math.round(imageHeight / pageHeight) * pageHeight;
          // Canvas/PDF rounding can leave a sub-pixel tail on an otherwise full page.
          if (nearestPageHeight > 0 &&
              Math.abs(imageHeight - nearestPageHeight) <= pixelHeight) {
            imageHeight = nearestPageHeight;
          }
          const pageCount = Math.max(1, Math.ceil(imageHeight / pageHeight));
          // Preserve aspect ratio and paginate long translated takeaways rather than squash them.
          for (let page = 0; page < pageCount; page++) {
            const offset = page * pageHeight;
            if (this.x || page) doc.addPage();
            doc.addImage(image, "JPEG", 0, -offset, pageWidth, imageHeight, "", "FAST");
          }
          this.x++;
        }
        doc.save(this.data.content.analysis.reportUser + "-" +
          this.data.content.analysis.reportDate + ".pdf");
      } catch (error) {
        console.error("Failed to export drill report", error);
        this.exportError = this.$t("DrillReport.personal-takeaways.export-error");
      } finally {
        try {
          if (history) await history.finishExport();
        } finally {
          this.genPDF = 0;
        }
      }
    },
  },
};
</script>

<style></style>
