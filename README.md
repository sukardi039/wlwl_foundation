# parentportal

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Evaluation report takeaways

Reports default to personalised takeaways, with no user-facing mode switch.
Administrators can set `paramdata.params_ref.params.personalised_report` to `0`
or `false` (including strings `"0"` or `"false"`) to use the original
seven-pointer section unchanged. An absent setting keeps personalisation enabled.
The same parameter controls both the on-screen report and PDF download.

Personalisation uses `content.summary` member histories (ordered by `step`),
current member competence/morale, recorded style alignment and per-member action
impact and attention counts. It shows up to two strengths and four distinct improvement priorities,
then keeps universal principles not already covered by those priorities.
Historical findings include members who have left the current team.
User-facing history references use the recorded drill `day`, not internal
`step` numbers or week/day conversions. Day 0 is preserved if recorded;
missing or invalid day numbers are labelled unavailable rather than inferred.
Leadership theory types remain internal and are not named in report wording.

Type 2 readiness suggestions require `params_ref.params.theory_type = 2`.
The competence/morale boundary follows the history display's high band: values
above 50 are high, and 50 or below are low. Low/low suggests coaching; low/high
instruction; high/low partnering; high/high delegation. Historical profile
changes prompt reassessment, not retrospective claims about style mistakes.
Score changes are observed associations, not causal claims. Action/alignment
patterns require at least three comparisons; strengths use at least 75% positive
impact/matches, action-review priorities use below 50%, and alignment priorities
require below 75% with at least two mismatches. Missing or incomplete history
and unconfirmed theory are disclosed in the report. Invalid current scores or
analysis counts are also disclosed and excluded from their respective rules.

Findings contain translation keys and evidence rather than generated prose.
English and Chinese templates render the same findings in the selected language,
including translated action/style names. Missing action labels are explicitly
identified in the selected language. Longer report sections are paginated
in PDF exports without stretching their aspect ratio. Fixed-layout sections
(including the radar chart and original takeaways) are scaled to fit one page;
variable-length personalised takeaways are split across pages.
PDF pagination normalises canvas rounding within one source pixel of a page
boundary to avoid effectively blank overflow pages.

Personalised reports include a daily member matrix immediately before the
takeaways. It retains departed members and recorded Day 0 initial readings,
groups multiple steps on the same recorded day, and shows the last readings
with changes since each member's previous recorded readings. Recorded sub-actions
replace their main action using the action definitions' `parentAction` mapping;
main actions remain when no sub-action is recorded. Redundant team main actions
are omitted when member sub-actions already represent them in the same snapshot.
No net change is attributed to one action. Missing actions/readings and cells
for members absent from a day's history remain blank, not zero; departed members'
earlier readings remain visible.
Each reading uses the staff-card colour bands from `public/css/main.css`.
History pages contain at most ten recorded days (plus the initial baseline),
with fewer days when measured content exceeds the available page height.
Member headings and the legend repeat on each page. PDF export discovers these
pages dynamically and measures them against the existing PDF page dimensions,
keeping whole days together rather than slicing table rows. A single day too
tall for the page produces an explicit export error instead of unreadable scaling.
The administrator's legacy-report setting also hides this new history section.

Run focused recommendation and bilingual-render checks:
```
node tests\reportTakeaways.test.js
node tests\reportHistory.test.js
```
