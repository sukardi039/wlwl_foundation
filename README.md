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
shows every recorded entry separately in step order, including multiple entries
on the same day, with changes since each member's previous recorded entry. Recorded sub-actions
replace their main action using the action definitions' `parentAction` mapping;
main actions remain when no sub-action is recorded. Individual user actions and
system-generated group events are mutually exclusive per entry. Entries with
recorded member actions display only those actions; otherwise recorded team
events occupy a single shared row labelled as system-generated, not user decisions.
System events retain their recorded step order, including earlier entries on the
same day as later user actions.
No net change is attributed to one action. Missing actions/readings and cells
for members absent from a day's history remain blank, not zero; departed members'
earlier readings remain visible.
Each reading uses the staff-card colour bands from `public/css/main.css`.
History pages contain at most ten distinct recorded days (plus the initial baseline),
with fewer entries when measured content exceeds the available page height.
Entries sharing a day repeat the day label and may continue on the next page.
Member headings and the legend repeat on each page. History pages use the
standard report background, with the shared 200px top spacer
and inset white content card. Compact 12px table text preserves room for member
columns without placing content over the background's header.
On-screen history backgrounds end after their content, without a forced full-page
empty tail. Full page height is applied temporarily for PDF capture and restored
after success or failure. PDF capture uses a fixed canvas scale of 1 and removes
other report frames from each cloned capture to avoid rendering the entire long
report at once. Invalid capture dimensions are logged before reaching jsPDF.
PDF export discovers these
pages dynamically and measures them against the existing PDF page dimensions,
keeping whole entries together rather than slicing table rows. A single entry too
tall for the page produces an explicit export error instead of unreadable scaling.
The administrator's legacy-report setting also hides this new history section.

Run focused recommendation and bilingual-render checks:
```
node tests\reportTakeaways.test.js
node tests\reportHistory.test.js
```
