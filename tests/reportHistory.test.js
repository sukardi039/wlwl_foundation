const assert = require("assert");
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const compiler = require("vue-template-compiler");
const Vue = require("vue");
const VueI18n = require("vue-i18n");
const Vuex = require("vuex");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const transform = source => babel.transformSync(source, {
  babelrc: false, configFile: false, plugins: ["@babel/plugin-transform-modules-commonjs"],
}).code;
function load(source, resolve = require) {
  const exports = {};
  new Function("exports", "require", transform(source))(exports, resolve);
  return exports;
}
const engine = load(read("src\\utils\\reportHistory.js"));
const { buildReportHistory, paginateHistory, readingColour } = engine;
const snapshot = (step, day, member, team) => ({ step, day, member, team });
const alex = (skills, morale = 60, efficiency = 70, action = "") =>
  ({ staff: "Alex", skills, morale, efficiency, action });
const fixture = { content: { summary: [
  snapshot(2, 1, [alex(45, 55, 72, "_u.a_coach")], { action: "_u.a_interview" }),
  snapshot(0, 0, [alex(30), { ...alex(80), staff: "Departed" }]),
  snapshot(1, 1, [alex(40, 60, 71, "_u.a_interview")]),
  snapshot(3, 2, [alex(50, 25, 75)]),
] } };
const before = JSON.stringify(fixture);
const history = buildReportHistory(fixture);
assert.strictEqual(JSON.stringify(fixture), before);
assert.deepStrictEqual(history.members, ["Alex", "Departed"]);
assert.deepStrictEqual(history.days.map(day => day.day), [0, 1, 1, 2]);
assert.deepStrictEqual(history.days[1].members.Alex.actions, ["_u.a_interview"]);
assert.deepStrictEqual(history.days[2].members.Alex.actions, ["_u.a_coach"]);
assert.strictEqual(history.days[1].members.Alex.skills, 40);
assert.strictEqual(history.days[2].members.Alex.skills, 45);
assert.deepStrictEqual(history.days[1].members.Alex.changes, { skills: 10, morale: 0, efficiency: 1 });
assert.deepStrictEqual(history.days[2].members.Alex.changes, { skills: 5, morale: -5, efficiency: 1 });
assert.strictEqual(new Set(history.days.map(entry => entry.key)).size, 4);
assert.deepStrictEqual(history.days[0].members.Alex.changes, { skills: null, morale: null, efficiency: null });
assert.strictEqual(history.days[2].members.Departed, undefined, "missing members must not be carried forward");
assert.deepStrictEqual(history.days[1].teamActions, []);
assert.deepStrictEqual(history.days[2].teamActions, [], "member actions exclude group events");
assert(!history.incomplete);
const paramdata = { action_det: { action: [
  { actionName: "coach", parentAction: "coach", displayKey: "_u.a_coach" },
  { actionName: "coach1", parentAction: "coach", displayKey: "_u.a_coach1" },
  { actionName: "interview", parentAction: "interview", displayKey: "_u.a_interview" },
  { actionName: "interview1", parentAction: "interview", displayKey: "_u.a_interview1" },
] } };
const subactionFixture = { content: { summary: [
  snapshot(0, 0, [alex(0)]),
  snapshot(1, 1, [alex(40, 50, 60, "_u.a_coach/_u.a_coach1/_u.a_interview")]),
  snapshot(2, 2, [alex(41, 51, 61, "_u.a_interview/_u.a_interview1")],
    { action: "_u.a_interview" }),
  snapshot(3, 3, [alex(42, 52, 62)], { action: "_u.a_coach" }),
] } };
const subactions = buildReportHistory(subactionFixture, paramdata);
assert.deepStrictEqual(subactions.days[1].members.Alex.actions, ["_u.a_coach1", "_u.a_interview"]);
assert.deepStrictEqual(subactions.days[2].members.Alex.actions, ["_u.a_interview1"]);
assert.deepStrictEqual(subactions.days[2].teamActions, []);
assert.deepStrictEqual(subactions.days[3].teamActions, ["_u.a_coach"]);
const eventFixture = { content: { summary: [
  snapshot(2, 1, [alex(45, 55, 72, "_u.a_coach1")]),
  snapshot(0, 0, [alex(30), { ...alex(80), staff: "Departed" }]),
  snapshot(1, 1, [alex(40, 60, 71)], { action: "_u.a_interview" }),
] } };
const events = buildReportHistory(eventFixture, paramdata);
assert.deepStrictEqual(events.days[1].teamActions, ["_u.a_interview"]);
assert.deepStrictEqual(events.days[1].members.Alex.actions, []);
assert.deepStrictEqual(events.days[2].teamActions, []);
assert.deepStrictEqual(events.days[2].members.Alex.actions, ["_u.a_coach1"]);
assert.deepStrictEqual(events.days.map(entry => entry.day), [0, 1, 1]);
const invalid = buildReportHistory({ content: { summary: [
  snapshot(0, 0, [alex(0)]), snapshot(1, "bad", [alex("", null, 101)]),
  snapshot(2, 2, [null]), snapshot("bad", 3, [alex(30)]),
  snapshot(1, "bad", [alex(80)]),
] } });
assert(invalid.incomplete);
assert.strictEqual(invalid.days.length, 3, "even repeated steps must be displayed separately");
assert.notStrictEqual(invalid.days[1].key, invalid.days[2].key);
assert.strictEqual(invalid.days[2].members.Alex.skills, 80);
assert.strictEqual(invalid.days[1].day, null);
assert.strictEqual(invalid.days[1].members.Alex.skills, null);
assert.strictEqual(invalid.days[0].members.Alex.skills, 0);
assert.deepStrictEqual(buildReportHistory(null).days, []);
assert.strictEqual(buildReportHistory({ content: { summary: [snapshot(0, 0, [
  { ...alex(30), staff: "__proto__" },
])] } }).days[0].members.__proto__.skills, 30);
for (const [value, colour] of [[null, ""], [0, "value-ll"], [25, "value-ll"],
  [25.1, "value-ml"], [50, "value-ml"], [50.1, "value-mh"],
  [75, "value-mh"], [75.1, "value-hh"], [100, "value-hh"]]) {
  assert.strictEqual(readingColour(value), colour);
}
const days = Array.from({ length: 26 }, (_, day) => ({ key: "day-" + day, day }));
assert.deepStrictEqual(paginateHistory(days).map(page => page.length), [8, 8, 8, 2]);
assert.deepStrictEqual(paginateHistory(days.slice(1)).map(page => page.length), [8, 8, 8, 1]);
const heights = Object.fromEntries(days.map(day => [day.key, 100]));
assert.deepStrictEqual(paginateHistory(days, heights, 350).map(page => page.length),
  [3, 3, 3, 3, 3, 3, 3, 3, 2]);
assert.deepStrictEqual(paginateHistory([]), []);
const sameDay = Array.from({ length: 12 }, (_, index) => ({ key: "entry-" + index, day: 1 }));
assert.deepStrictEqual(paginateHistory(sameDay).map(page => page.length), [8, 4],
  "entry limit applies even when every entry shares the same day");
assert.deepStrictEqual(paginateHistory(days.slice(0, 8)).map(page => page.length), [8]);
assert.deepStrictEqual(paginateHistory(days.slice(0, 9)).map(page => page.length), [8, 1]);
const entryHeights = Object.fromEntries(sameDay.map(entry => [entry.key, 100]));
const splitEntries = paginateHistory(sameDay, entryHeights, 350);
assert.deepStrictEqual(splitEntries.map(page => page.length), [3, 3, 3, 3]);
assert.deepStrictEqual(splitEntries.flat(), sameDay, "pagination must not lose or merge entries");
const repeatedInitial = buildReportHistory({ content: { summary: [
  snapshot(0, 0, [alex(0)]), snapshot(1, 0, [alex(10)]),
] } });
assert.strictEqual(repeatedInitial.days[1].members.Alex.changes.skills, 10);

const messages = Object.fromEntries(["en", "cn"].map(locale =>
  [locale, JSON.parse(read("src\\locales\\" + locale + ".json"))]));
const labels = locale => messages[locale].DrillReport.history;
assert.deepStrictEqual(Object.keys(labels("en")).sort(), Object.keys(labels("cn")).sort());
for (const key of Object.keys(labels("en"))) {
  assert.deepStrictEqual((labels("en")[key].match(/\{[^}]+\}/g) || []).sort(),
    (labels("cn")[key].match(/\{[^}]+\}/g) || []).sort());
}
const sfc = compiler.parseComponent(read("src\\components\\report\\ReportHistory.vue"));
assert.deepStrictEqual(compiler.compile(sfc.template.content).errors, []);
assert(sfc.template.content.includes('class="report-frame history-frame"'));
assert(sfc.template.content.includes('class="report-result-spacer"'));
assert(sfc.template.content.includes('class="history-content"'));
assert(sfc.styles[0].content.includes("background-size: max(100%, 1100px) auto;"),
  "compact history pages must retain the standard report background scale");
assert(sfc.styles[0].content.includes("background-repeat: no-repeat;"));
const component = load(sfc.script.content, request => request === "vuex" ? require(request) : engine).default;
Vue.use(VueI18n);
Vue.use(Vuex);
const store = new Vuex.Store({ state: { paramdata } });
const i18n = new VueI18n({ locale: "en", messages });
const vm = new Vue({ ...component, ...compiler.compileToFunctions(sfc.template.content),
  i18n, store, propsData: { data: fixture } });
const text = node => (node.text || "") + (node.children || []).map(text).join(" ");
for (const locale of ["en", "cn"]) {
  i18n.locale = locale;
  const rendered = text(vm._render());
  assert(rendered.includes(labels(locale).title));
  assert(rendered.includes(labels(locale).baseline));
  assert(rendered.includes("40 (+10)"));
  assert(rendered.includes("45 (+5)"));
  assert(rendered.includes("55 (-5)"));
  assert(rendered.includes("Departed"));
  assert(!rendered.includes("Not recorded"));
  assert(!rendered.includes("未记录"));
  assert.strictEqual(vm.readingLabel(history.days[1], "Departed", "skills"), "");
  assert.strictEqual(vm.readingLabel(invalid.days[1], "Alex", "skills"), "");
  assert.strictEqual(vm.readingLabel(invalid.days[0], "Alex", "skills"), "0");
  assert(!rendered.includes("DrillReport.history."));
  const nodes = node => [node, ...(node.children || []).flatMap(nodes)];
  const blocks = nodes(vm._render()).filter(node => node.tag === "tbody");
  assert.strictEqual(blocks.length, 4);
  assert.strictEqual(blocks.filter(node =>
    text(nodes(node).find(child => child.tag === "th")).trim() === "1").length, 2,
    "same-day records must have separate blocks with repeated day labels");
}
vm.data = subactionFixture;
assert.deepStrictEqual(vm.actions(vm.history.days[1], "Alex"), ["_u.a_coach1", "_u.a_interview"]);
assert.strictEqual(vm.readingLabel(vm.history.days[0], "Alex", "skills"), "0");
vm.data = eventFixture;
for (const locale of ["en", "cn"]) {
  i18n.locale = locale;
  const nodes = node => [node, ...(node.children || []).flatMap(nodes)];
  const blocks = nodes(vm._render()).filter(node => node.tag === "tbody");
  assert.strictEqual(blocks.length, 3);
  blocks.forEach(block => {
    assert.strictEqual(block.children.filter(node => node.tag === "tr").length, 4,
      "each entry has only one action/event row plus three readings");
  });
  const system = text(blocks[1]);
  assert(system.includes(labels(locale)["team-actions"]));
  assert(!system.includes(labels(locale).actions));
  const user = text(blocks[2]);
  assert(user.includes(labels(locale).actions));
  assert(!user.includes(labels(locale)["team-actions"]));
  const sharedCell = nodes(blocks[1]).find(node => node.tag === "td" &&
    node.data && node.data.attrs && node.data.attrs.colspan === 2);
  assert(sharedCell, "group events span member columns");
}
vm.$destroy();

if (process.env.HISTORY_PREVIEW) {
  const preview = { content: { summary: Array.from({ length: 26 }, (_, day) => snapshot(day, day,
    Array.from({ length: 5 }, (_, index) => ({
      staff: ["Alex", "Sam", "Taylor", "Jordan", "Casey"][index],
      skills: 20 + day + index * 10, morale: 80 - day - index * 5,
      efficiency: 45 + index * 8, action: day ? "_u.a_interview/_u.a_coach" : "",
    })))) } };
  const css = read("public\\css\\main.css").match(/\.value-(?:hh|mh|ml|ll)\s*\{[^}]+\}/g).join("\n");
  const frameCss = read("public\\css\\main.css").match(/\.report-(?:frame|result-spacer)\s*\{[^}]+\}/g)
    .join("\n").replace('url("/app-images/reporthead.jpg")',
      'url("data:image/jpeg;base64,' + fs.readFileSync(path.join(root, "public", "app-images", "reporthead.jpg")).toString("base64") + '")');
  const html = `<!doctype html><meta charset="utf-8"><style>
    body { font-family: Arial, sans-serif; margin: 0; } * { box-sizing: border-box; }
    ${read("node_modules\\vuetify\\dist\\vuetify.min.css")}
    ${css}\n${frameCss}\n${sfc.styles[0].content}</style><section id="theReport"><div class="container"><div id="app"></div></div></section>
    <script>${fs.readFileSync(require.resolve("vue/dist/vue.js"), "utf8")}</script>
    <script>${read("node_modules\\vuetify\\dist\\vuetify.min.js")}</script>
    <script>${fs.readFileSync(require.resolve("vue-i18n/dist/vue-i18n.js"), "utf8")}</script>
    <script>${fs.readFileSync(require.resolve("html2canvas/dist/html2canvas.min.js"), "utf8")}</script>
    <script>${fs.readFileSync(require.resolve("jspdf/dist/jspdf.umd.min.js"), "utf8")}</script>
    <script>${fs.readFileSync(path.join(path.dirname(require.resolve("vuex")), "vuex.js"), "utf8")}</script>
    <script>
    const engine = (() => { const exports = {}; ${transform(read("src\\utils\\reportHistory.js"))} return exports; })();
    const component = (() => { const exports = {}; const require = key => key === "vuex" ? Vuex : engine;
      ${transform(sfc.script.content)} return exports.default; })();
    component.template = ${JSON.stringify(sfc.template.content)};
    const messages = ${JSON.stringify(messages)};
    const fixture = ${JSON.stringify(preview)};
    const i18n = new VueI18n({ locale: "en", messages });
    const store = new Vuex.Store({ state: { paramdata: ${JSON.stringify(paramdata)} } });
    window.historyVm = new Vue({ ...component, i18n, store, vuetify: new Vuetify(), propsData: { data: fixture } }).$mount("#app");
    const exporter = (() => { const exports = {}; const require = key => {
      if (key === "jspdf") return jspdf.jsPDF;
      if (key === "html2canvas") return html2canvas;
      if (key === "vuex") return { mapState: () => ({}) };
      if (key === "../../utils/reportTakeaways") return { personalisedReportEnabled: () => true };
      return {};
    }; ${transform(compiler.parseComponent(read("src\\components\\CoreModule\\DrillReport.vue")).script.content)}
      return exports.default; })();
    window.exportHistory = async () => {
      const header = document.createElement("div");
      header.className = "report-frame";
      header.style.cssText = "width:1148px;height:1674px;background:white";
      header.textContent = "Report header";
      document.querySelector("#theReport").prepend(header);
      const selectors = exporter.data().listPDF;
      const sections = new Map(selectors.filter(s => s !== ".report-history-page").map(s => [s, header]));
      let saved;
      const save = jspdf.jsPDF.API.save;
      jspdf.jsPDF.API.save = function () {
        saved = { pages: this.getNumberOfPages(), bytes: this.output("arraybuffer").byteLength };
      };
      const context = { ...exporter.data(), personalisedTakeaways: true,
        data: { content: { analysis: { reportUser: "Preview", reportDate: "2026-11-07" } } },
        $nextTick: () => window.historyVm.$nextTick(), $t: key => i18n.t(key),
        $refs: { reportBase: { $refs: { history: window.historyVm } }, report: {
          querySelector: selector => selector === "#hdr" ? header : sections.get(selector),
          querySelectorAll: selector => document.querySelectorAll(selector),
        } },
      };
      try {
        await exporter.methods.doPDF.call(context);
        return { ...saved, error: context.exportError, sections: context.len };
      } finally {
        jspdf.jsPDF.API.save = save;
        header.remove();
      }
    };
    </script>`;
  fs.writeFileSync(process.env.HISTORY_PREVIEW, html);
}
console.log("PASS: separate same-day entries, baseline, departed members, missing scores, signed changes, colour boundaries, 8-entry/height limits, bilingual history rendering.");
