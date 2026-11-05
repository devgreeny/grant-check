// ---------- Fake documents (labeled FAKE in the UI) ----------
const FAKE_DOCS = {
  "FIN-07": {
    title: "Finance policy FIN-07: Funding precedence",
    tier: "Organization policy", fake: true,
    sections: [{ head: "FIN-07 Funding precedence (written for this prototype)", paras: [
      "P1. Test each cost against every document that governs the fund it is charged to, in this order: (1) the federal program regulation and 2 CFR part 200, (2) the federal award terms and approved budget, (3) the local or pass-through agreement, (4) the private funder's grant letter.",
      "P2. A cost is allowable on a fund only if every document that governs that fund allows it. When two documents for the same fund disagree, the more restrictive requirement controls.",
      "P3. A funder's restriction governs only that funder's money. A federal restriction does not stop a local or private fund from paying a cost that fund's own terms allow, unless the cost is barred by law or by this policy.",
      "P4. When more than one fund could pay a cost, charge the federal fund whose purpose matches the cost first, then local funds, and use private flexible funds only as payer of last resort.",
      "P5. Costs of managing the program, such as accounting, audit, human resources, executive oversight and general office costs, are Admin. Staff time, supplies and payments that directly serve participants are Program.",
      "P6. If a limit depends on participant history or a document that is not in the invoice packet, such as months of assistance used, prior deposits, other subsidies, income level or a rent reasonableness note, mark the invoice Needs info and do not guess.",
      "P7. If the governing documents do not settle the question, mark the invoice Escalate and write the question for the Grants Accountant.",
      "P8. Every invoice needs a vendor invoice, an approval signature and service dates. Participant assistance must be paid to the third party owed, never to the participant."
    ]}]
  },
  "CHF": {
    title: "County Housing Fund agreement CHF-2026-014, Exhibit B: Eligible costs",
    tier: "Local funder", fake: true,
    sections: [{ head: "Exhibit B. Eligible costs", paras: [
      "B1. Funds may pay monthly rent and security deposits for households with income at or below 50 percent of Area Median Income living in the county.",
      "B2. Monthly rent assistance may not exceed $2,000 per household per month.",
      "B3. Late fees, penalties, court costs and damages are not eligible costs.",
      "B4. A security deposit may not exceed one month's rent for the unit.",
      "B5. County funds may be combined with other housing subsidies only if the total of all subsidies for a month does not exceed that month's rent.",
      "B6. The contractor must keep the lease, the landlord W-9 and a rent ledger for each payment."
    ]}]
  },
  "RIDGE": {
    title: "Ridgeline Foundation grant letter RF-2026-31",
    tier: "Private funder", fake: true,
    sections: [{ head: "Use of funds", paras: [
      "R1. Client flexible assistance: up to $500 per participant in any 12-month period for needs that public funds do not cover, paid to vendors, never as cash or gift cards.",
      "R2. Staff professional development: up to $3,000 per site per calendar year for training that improves services to veterans.",
      "R3. Not eligible: administrative overhead, legal fees, gift cards, alcohol, and payments made directly to participants.",
      "R4. The grantee must confirm that public sources were considered before charging this grant."
    ]}]
  }
};

// Official text is injected as REGS: { "62.34": {head, paras}, ... }
const REG_DOCS = {
  "2CFR200": { title: "2 CFR part 200, Subpart E: Cost principles", tier: "Federal regulation", fake: false, secs: ["200.403", "200.404", "200.405"], src: "https://www.ecfr.gov/current/title-2/subtitle-A/chapter-II/part-200/subpart-E" },
  "38CFR62": { title: "38 CFR part 62: Supportive Services for Veteran Families (SSVF)", tier: "Federal regulation", fake: false, secs: ["62.34", "62.70"], src: "https://www.ecfr.gov/current/title-38/chapter-I/part-62" },
  "24CFR578": { title: "24 CFR part 578: HUD Continuum of Care program", tier: "Federal regulation", fake: false, secs: ["578.37", "578.53", "578.59"], src: "https://www.ecfr.gov/current/title-24/subtitle-B/chapter-V/subchapter-C/part-578" }
};

function allDocs(REGS) {
  const out = {};
  for (const [id, d] of Object.entries(REG_DOCS)) {
    out[id] = { ...d, sections: d.secs.filter(s => REGS[s]).map(s => ({ head: REGS[s].head, paras: REGS[s].paras })) };
  }
  for (const [id, d] of Object.entries(FAKE_DOCS)) out[id] = d;
  return out;
}

// ---------- Fake funds, sites, participants ----------
const FUNDS = {
  "SSVF-H": { name: "SSVF, Harbor site", program: "SSVF", docs: ["38CFR62", "2CFR200"], total: 2400000, adminSpent: 228000, lines: "Temporary financial assistance; supportive services staffing; administration (max 10%)" },
  "COC-SSO-H": { name: "HUD CoC Supportive Services Only, Harbor site", program: "CoC", docs: ["24CFR578", "2CFR200"], total: 600000, adminSpent: 41000, lines: "Supportive services; project administration (max 10%). No rental assistance budget line." },
  "CHF-H": { name: "County Housing Fund, Harbor site", program: "Local", docs: ["CHF"], lines: "Rent and security deposits" },
  "SSVF-D": { name: "SSVF, Desert site", program: "SSVF", docs: ["38CFR62", "2CFR200"], total: 1100000, adminSpent: 61000, lines: "Temporary financial assistance; supportive services staffing; administration (max 10%)" },
  "SSVF-V": { name: "SSVF, Valley site", program: "SSVF", docs: ["38CFR62", "2CFR200"], total: 1500000, adminSpent: 97000, lines: "Temporary financial assistance; supportive services staffing; administration (max 10%)" },
  "COC-SSO-V": { name: "HUD CoC Supportive Services Only, Valley site", program: "CoC", docs: ["24CFR578", "2CFR200"], total: 450000, adminSpent: 30000, lines: "Supportive services; project administration (max 10%). No rental assistance budget line." },
  "RIDGE": { name: "Ridgeline Foundation (all sites)", program: "Private", docs: ["RIDGE"], lines: "Client flexible assistance; staff professional development" }
};

const SITES = {
  Harbor: { funds: ["SSVF-H", "COC-SSO-H", "CHF-H", "RIDGE"], ridgeStaffDevUsed: 800 },
  Desert: { funds: ["SSVF-D", "RIDGE"], ridgeStaffDevUsed: 0 },
  Valley: { funds: ["SSVF-V", "COC-SSO-V", "RIDGE"], ridgeStaffDevUsed: 1500 }
};

const CLIENTS = {
  "C-101": { tier: "Very low income", ami: 45, rent: ["2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08"], unitRent: 1500, securityDeposits: ["2026-03-02"], other: [] },
  "C-102": { tier: "Extremely low income", ami: 28, rent: ["2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"], unitRent: 1650, securityDeposits: [], other: [] },
  "C-103": { tier: "Very low income", ami: 41, rent: ["2026-06", "2026-07"], unitRent: 1400, securityDeposits: [], other: [{ program: "HUD-VASH housing voucher", level: "Federal", from: "2026-08", covers: "rent", monthly: 1150 }] },
  "C-104": { tier: "Very low income", ami: 47, rent: ["2026-10"], unitRent: 1800, securityDeposits: [], other: [{ program: "County Housing Fund rent subsidy", level: "Local", from: "2026-09", covers: "rent", monthly: 600 }] },
  "C-105": { unavailable: "Participant transferred from another provider on 2026-10-28. Case file not yet received." },
  "C-106": { tier: "Very low income", ami: 44, rent: [], moving: ["2025-02-14"], securityDeposits: [], other: [] },
  "C-107": { tier: "Extremely low income", ami: 25, rent: ["2026-07", "2026-08"], ghsa: [], ridgeFlex: [{ date: "2026-05-11", amount: 420 }], securityDeposits: [], other: [] },
  "C-108": { tier: "Very low income", ami: 48, rent: ["2026-08", "2026-09", "2026-10"], unitRent: 2300, securityDeposits: [], other: [] },
  "C-109": { tier: "Very low income", ami: 39, rent: [], utility: [], utilityAccount: "In the veteran's name", securityDeposits: [], other: [] },
  "C-110": { tier: "Very low income", ami: 46, rent: ["2025-12", "2026-01"], unitRent: 1450, securityDeposits: ["2025-12-10"], other: [] }
};

const CATEGORIES = ["TFA-Rent", "TFA-Rent-Fees", "TFA-Utility", "TFA-Security-Deposit", "TFA-Utility-Deposit", "TFA-Moving", "TFA-GHSA", "SS-Case-Management", "SS-Transportation", "SS-Legal", "Client-Flex", "Staff-Training", "Admin"];

const STD = ["Vendor invoice", "Approval signature", "Service dates"];
const RENT_DOCS = ["Lease", "Rent reasonableness note", "Landlord W-9"];

// expected: status = accepted statuses; fund = accepted funds (null = no fund); cite = accepted deciding-section fragments
const INVOICES = [
  { id: "INV-01", site: "Harbor", vendor: "Bayview Apartments LLC", payee: "Bayview Apartments LLC", payeeType: "Landlord", amount: 1650, date: "2026-11-02", period: "2026-11", kind: "rent", client: "C-102", description: "November 2026 rent, unit 4B", backup: [...STD, ...RENT_DOCS],
    analyst: { fund: "SSVF-H", category: "", cost_type: "Program", service_period: "2026-11" },
    expected: { status: ["allowed"], fund: ["SSVF-H"], cite: ["62.34(a)"] }, why: "Extremely low income: 7th month is within the 9-in-12 limit." },
  { id: "INV-02", site: "Harbor", vendor: "Seaside Gardens", payee: "Seaside Gardens", payeeType: "Landlord", amount: 1500, date: "2026-11-02", period: "2026-11", kind: "rent", client: "C-101", description: "November 2026 rent, unit 12", backup: [...STD, ...RENT_DOCS],
    analyst: { fund: "", category: "TFA-Rent", cost_type: "Program", service_period: "2026-11" },
    expected: { status: ["allowed"], fund: ["CHF-H"], cite: ["62.34(a)", "B1", "B2", "P3", "P4"] }, why: "SSVF 6-in-12 limit is used up; County Housing Fund can pay (45% AMI, under $2,000)." },
  { id: "INV-03", site: "Harbor", vendor: "Pier Point Homes", payee: "Pier Point Homes", payeeType: "Landlord", amount: 1400, date: "2026-11-03", period: "2026-11", kind: "rent", client: "C-103", description: "November 2026 contract rent, full amount", backup: [...STD, ...RENT_DOCS],
    analyst: { fund: "SSVF-H", category: "TFA-Rent", cost_type: "Program", service_period: "2026-11" },
    expected: { status: ["not_allowed", "escalate"], fund: [null], cite: ["62.34(a)(6)", "62.34(a)", "B5"] }, why: "A federal HUD-VASH voucher already covers rent for this period." },
  { id: "INV-04", site: "Harbor", vendor: "Harborline Property Mgmt", payee: "Harborline Property Mgmt", payeeType: "Landlord", amount: 95, date: "2026-11-01", period: "2026-10", kind: "late_fee", client: "C-104", description: "Late fee on October 2026 rent, per lease section 7", backup: [...STD, "Lease", "Landlord W-9"],
    analyst: { fund: "CHF-H", category: "", cost_type: "Program", service_period: "2026-10" },
    expected: { status: ["allowed"], fund: ["SSVF-H"], cite: ["B3", "62.34(a)", "P3"] }, why: "County bars late fees; SSVF allows lease fees, so move it to SSVF." },
  { id: "INV-05", site: "Harbor", vendor: "Marina Court", payee: "Marina Court", payeeType: "Landlord", amount: 2200, date: "2026-11-03", period: "2026-11", kind: "deposit", client: "C-110", description: "Security deposit, new unit 3C (monthly rent $1,450)", unitRentOverride: 1450, backup: [...STD, ...RENT_DOCS],
    analyst: { fund: "", category: "", cost_type: "", service_period: "" },
    expected: { status: ["not_allowed", "escalate"], fund: [null, "CHF-H"], cite: ["62.34(c)", "B4"] }, why: "SSVF paid a deposit in Dec 2025 (once per 2 years); county caps deposits at one month's rent." },
  { id: "INV-06", site: "Harbor", vendor: "Harbor Power & Light", payee: "Harbor Power & Light", payeeType: "Utility company", amount: 180, date: "2026-11-01", period: "2026-10", kind: "utility", client: "C-105", description: "October 2026 electric bill", backup: [...STD],
    analyst: { fund: "SSVF-H", category: "TFA-Utility", cost_type: "Program", service_period: "2026-10" },
    expected: { status: ["needs_info"], fund: ["SSVF-H", null], cite: ["P6", "62.34(b)"] }, why: "Participant history is not on file, so the month limits cannot be checked." },
  { id: "INV-07", site: "Harbor", vendor: "Coastal Training Institute", payee: "Coastal Training Institute", payeeType: "Vendor", amount: 1200, date: "2026-10-30", period: "2026-10", kind: "training", client: null, description: "Trauma-informed care workshop for 3 case managers", backup: [...STD],
    analyst: { fund: "COC-SSO-H", category: "", cost_type: "Program", service_period: "2026-10" },
    expected: { status: ["allowed"], fund: ["RIDGE"], cite: ["578.53(d)", "R2", "P3"] }, why: "CoC bars staff training as a supportive service; Ridgeline R2 allows it." },
  { id: "INV-08", site: "Harbor", vendor: "Metro Transit Authority", payee: "Metro Transit Authority", payeeType: "Vendor", amount: 1080, date: "2026-11-01", period: "2026-11", kind: "service", client: null, description: "November transit passes for 12 participants to reach medical and job appointments", backup: [...STD],
    analyst: { fund: "", category: "", cost_type: "Program", service_period: "2026-11" },
    expected: { status: ["allowed"], fund: ["COC-SSO-H"], cite: ["578.53(e)(15)", "578.53(e)"] }, why: "CoC transportation for participants is an eligible supportive service." },
  { id: "INV-09", site: "Harbor", vendor: "Lindqvist & Ortega CPAs", payee: "Lindqvist & Ortega CPAs", payeeType: "Vendor", amount: 4000, date: "2026-10-31", period: "2026-10", kind: "admin", client: null, description: "Quarterly bookkeeping review of the SSVF grant ledger", backup: [...STD],
    analyst: { fund: "SSVF-H", category: "SS-Case-Management", cost_type: "Program", service_period: "2026-10" },
    expected: { status: ["allowed"], fund: ["SSVF-H"], cite: ["62.70(e)", "P5"] }, why: "Accounting is Admin, not Program; SSVF admin stays under 10%." },
  { id: "INV-10", site: "Desert", vendor: "Rivas Legal Aid PC", payee: "Rivas Legal Aid PC", payeeType: "Vendor", amount: 900, date: "2026-10-29", period: "2026-10", kind: "legal", client: "C-107", description: "Attorney fees, landlord-tenant dispute to prevent eviction", backup: [...STD],
    analyst: { fund: "", category: "SS-Legal", cost_type: "Program", service_period: "2026-10" },
    expected: { status: ["escalate", "needs_info"], fund: [null, "SSVF-D"], cite: ["P7", "R3", "62.34"] }, why: "Ridgeline bars legal fees and the loaded SSVF sections do not cover legal services." },
  { id: "INV-11", site: "Desert", vendor: "Sun Valley Movers", payee: "Sun Valley Movers", payeeType: "Vendor", amount: 850, date: "2026-11-02", period: "2026-11", kind: "moving", client: "C-106", description: "Moving company, move to permanent unit", backup: [...STD],
    analyst: { fund: "SSVF-D", category: "TFA-Moving", cost_type: "Program", service_period: "2026-11" },
    expected: { status: ["not_allowed", "escalate"], fund: [null], cite: ["62.34(d)(1)", "62.34(d)", "R1"] }, why: "SSVF paid moving costs in Feb 2025 (once per 3 years); Ridgeline caps flexible help at $500." },
  { id: "INV-12", site: "Desert", vendor: "WorkWear Depot", payee: "WorkWear Depot", payeeType: "Vendor", amount: 140, date: "2026-11-01", period: "2026-11", kind: "ghsa", client: "C-107", description: "Steel-toe boots and uniform shirts for new warehouse job", backup: [...STD],
    analyst: { fund: "RIDGE", category: "Client-Flex", cost_type: "Program", service_period: "2026-11" },
    expected: { status: ["allowed"], fund: ["SSVF-D"], cite: ["62.34(e)", "P4", "R4"] }, why: "SSVF general housing stability assistance covers work uniforms; federal fund goes first." },
  { id: "INV-13", site: "Valley", vendor: "Oakridge Residences", payee: "Oakridge Residences", payeeType: "Landlord", amount: 2300, date: "2026-11-02", period: "2026-11", kind: "rent", client: "C-108", description: "November 2026 rent, unit 210", backup: [...STD, "Lease", "Landlord W-9"],
    analyst: { fund: "SSVF-V", category: "TFA-Rent", cost_type: "Program", service_period: "2026-11" },
    expected: { status: ["needs_info"], fund: ["SSVF-V"], cite: ["62.34(a)(4)", "P6", "200.403(g)"] }, why: "No rent reasonableness note in the packet." },
  { id: "INV-14", site: "Valley", vendor: "Valley Grocers", payee: "Valley Grocers", payeeType: "Vendor", amount: 250, date: "2026-11-01", period: "2026-11", kind: "gift", client: null, description: "Ten $25 grocery gift cards for participant holiday event", backup: [...STD],
    analyst: { fund: "RIDGE", category: "Client-Flex", cost_type: "Program", service_period: "2026-11" },
    expected: { status: ["not_allowed", "escalate"], fund: [null], cite: ["R3", "R1", "578.53(d)"] }, why: "Ridgeline bars gift cards; no other fund lists them." },
  { id: "INV-15", site: "Valley", vendor: "Valley Water & Power", payee: "Participant C-109", payeeType: "Participant", amount: 210, date: "2026-11-02", period: "2026-10", kind: "utility", client: "C-109", description: "Reimburse veteran for October utility bill they paid", backup: [...STD],
    analyst: { fund: "SSVF-V", category: "TFA-Utility", cost_type: "Program", service_period: "2026-10" },
    expected: { status: ["not_allowed"], fund: [null, "SSVF-V"], cite: ["62.34(b)(2)", "P8"] }, why: "SSVF utility payments must go directly to the utility company." }
];

// ---------- Deterministic checks ----------
const mIdx = s => { const [y, m] = s.split("-").map(Number); return y * 12 + (m - 1); };
const money = n => "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

function windowCount(history, period, per12, per24) {
  if (!history || !history.length) return { used12: 0, used24: 0, ok: true, anchor: null };
  const anchor = Math.min(...history.map(mIdx));
  const t = mIdx(period);
  const b12 = Math.floor((t - anchor) / 12), b24 = Math.floor((t - anchor) / 24);
  const in12 = history.filter(h => Math.floor((mIdx(h) - anchor) / 12) === b12 && h !== period).length;
  const in24 = history.filter(h => Math.floor((mIdx(h) - anchor) / 24) === b24 && h !== period).length;
  return { used12: in12, used24: in24, ok: in12 + 1 <= per12 && in24 + 1 <= per24, anchor: history.slice().sort()[0] };
}

function yearsBetween(a, b) { return (new Date(b) - new Date(a)) / (365.25 * 24 * 3600 * 1000); }

function computeChecks(inv) {
  const out = [];
  const add = (label, value, state) => out.push({ label, value, state });
  const site = SITES[inv.site];
  const has = f => site.funds.includes(f);
  const ssvf = site.funds.find(f => FUNDS[f].program === "SSVF");
  const c = inv.client ? CLIENTS[inv.client] : null;

  const req = [...STD, ...(["rent", "deposit"].includes(inv.kind) ? RENT_DOCS : [])];
  const missing = req.filter(d => !inv.backup.includes(d));
  add("Backup in packet", missing.length ? "Missing: " + missing.join(", ") : "All required backup attached", missing.length ? "bad" : "ok");

  if (inv.client) {
    add("Payee", inv.payeeType === "Participant" ? "Paid to the participant, not a third party" : inv.payeeType + " (third party)", inv.payeeType === "Participant" ? "bad" : "ok");
    if (c.unavailable) { add("Participant history", c.unavailable, "missing"); return out; }
    add("Participant income level", c.tier + " (" + c.ami + "% of Area Median Income)", "info");
  }

  const eli = c && c.tier === "Extremely low income";
  const lim = eli ? [9, 12] : [6, 10];

  if ((inv.kind === "rent" || inv.kind === "late_fee") && ssvf) {
    const w = windowCount(c.rent, inv.period, lim[0], lim[1]);
    if (inv.kind === "rent") add("SSVF rent months used", w.anchor ? `${w.used12} in current 12-month period, ${w.used24} in current 2-year period (from ${w.anchor}). This invoice would be month ${w.used12 + 1}. Limit: ${lim[0]} in 12, ${lim[1]} in 24.` : "No SSVF rent paid yet. This would be month 1.", w.ok ? "ok" : "bad");
    else add("SSVF rent months used", `${w.used12} in current 12-month period, ${w.used24} in current 2-year period. Fee relates to ${inv.period}.`, "info");
  }
  if (inv.kind === "rent" || inv.kind === "late_fee") {
    for (const o of c.other) {
      const active = mIdx(o.from) <= mIdx(inv.period);
      add("Other subsidy: " + o.program, `${o.level}, covers ${o.covers}, ${money(o.monthly)} a month from ${o.from}${active ? " (active for " + inv.period + ")" : ""}`, active && o.level === "Federal" ? "bad" : "info");
      if (active && o.level !== "Federal" && c.unitRent && inv.kind === "rent") add("Total subsidy vs rent", `${money(o.monthly)} + this ${money(inv.amount)} = ${money(o.monthly + inv.amount)}; unit rent ${money(c.unitRent)}`, o.monthly + inv.amount <= c.unitRent ? "ok" : "bad");
    }
    if (!c.other.length) add("Other subsidies", "None on file", "ok");
    if (has("CHF-H") && inv.kind === "rent") add("County rent cap (B2)", `${money(inv.amount)} vs ${money(2000)} limit; income ${c.ami}% AMI vs 50% limit`, inv.amount <= 2000 && c.ami <= 50 ? "ok" : "bad");
  }
  if (inv.kind === "deposit") {
    const last = (c.securityDeposits || []).slice().sort().pop();
    if (ssvf) add("SSVF security deposits", last ? `Last paid ${last}; ${yearsBetween(last, inv.date) < 2 ? "within" : "outside"} the 2-year period` : "None paid", last && yearsBetween(last, inv.date) < 2 ? "bad" : "ok");
    const rent = inv.unitRentOverride || c.unitRent;
    if (has("CHF-H")) add("County deposit cap (B4)", `${money(inv.amount)} deposit vs ${money(rent)} monthly rent`, inv.amount <= rent ? "ok" : "bad");
  }
  if (inv.kind === "utility" && ssvf) {
    const w = windowCount(c.utility || [], inv.period, lim[0], lim[1]);
    add("SSVF utility months used", `${w.used12} in current 12-month period. This would be month ${w.used12 + 1}. Limit: ${lim[0]} in 12.`, w.ok ? "ok" : "bad");
    if (c.utilityAccount) add("Utility account", c.utilityAccount, "info");
  }
  if (inv.kind === "moving" && ssvf) {
    const last = (c.moving || []).slice().sort().pop();
    add("SSVF moving costs", last ? `Last paid ${last}; ${yearsBetween(last, inv.date) < 3 ? "within" : "outside"} the 3-year period` : "None paid", last && yearsBetween(last, inv.date) < 3 ? "bad" : "ok");
  }
  if (inv.kind === "ghsa" && ssvf) {
    const used = (c.ghsa || []).reduce((s, g) => s + g.amount, 0);
    add("SSVF general housing stability assistance", `${money(used)} used + ${money(inv.amount)} = ${money(used + inv.amount)} vs ${money(1800)} base cap (CPI-adjusted yearly; current figure not loaded)`, used + inv.amount <= 1800 ? "ok" : "bad");
  }
  if (has("RIDGE") && ["ghsa", "moving", "gift", "legal"].includes(inv.kind) && c) {
    const used = (c.ridgeFlex || []).reduce((s, g) => s + g.amount, 0);
    add("Ridgeline flexible assistance (R1)", `${money(used)} used in last 12 months + ${money(inv.amount)} = ${money(used + inv.amount)} vs ${money(500)} limit`, used + inv.amount <= 500 ? "ok" : "bad");
  }
  if (inv.kind === "training" && has("RIDGE")) {
    const used = site.ridgeStaffDevUsed;
    add("Ridgeline staff development (R2)", `${money(used)} used this year at ${inv.site} + ${money(inv.amount)} = ${money(used + inv.amount)} vs ${money(3000)} limit`, used + inv.amount <= 3000 ? "ok" : "bad");
  }
  if (inv.kind === "admin") {
    for (const f of site.funds.filter(f => FUNDS[f].total)) {
      const F = FUNDS[f], after = F.adminSpent + inv.amount, pct = after / F.total * 100;
      add("Admin cap: " + f, `${money(F.adminSpent)} spent + ${money(inv.amount)} = ${money(after)} (${pct.toFixed(1)}% of ${money(F.total)}; limit 10%)`, pct <= 10 ? "ok" : "bad");
    }
  }
  return out;
}

// ---------- Prompt + quote verification ----------
function docText(doc) {
  return doc.sections.map(s => s.head + "\n" + s.paras.join("\n")).join("\n\n");
}

function buildPrompt(inv, DOCS) {
  const site = SITES[inv.site];
  const docIds = ["FIN-07", ...new Set(site.funds.flatMap(f => FUNDS[f].docs))];
  const funds = site.funds.map(f => `- ${f}: ${FUNDS[f].name}. Governing documents: ${FUNDS[f].docs.join(", ")}. Approved budget lines: ${FUNDS[f].lines}.`).join("\n");
  const checks = computeChecks(inv).map(c => `- ${c.label}: ${c.value} [${c.state}]`).join("\n");
  const packet = { id: inv.id, site: inv.site, vendor: inv.vendor, payee: inv.payee, payee_type: inv.payeeType, amount: inv.amount, invoice_date: inv.date, description: inv.description, participant: inv.client, backup_in_packet: inv.backup };
  const docs = docIds.map(id => `[${id}] ${DOCS[id].title} (${DOCS[id].fake ? "organization or funder document" : "official federal text"})\n${docText(DOCS[id])}`).join("\n\n");
  return `You check the grant coding on one invoice for a nonprofit that serves homeless veterans. A site budget analyst filled in some coding fields and left others blank. Decide which fund can pay this cost and how to code it.

Rules for your answer:
- Use only the documents in this prompt. Do not rely on outside knowledge of grant rules. If these documents do not settle a question, say so.
- Follow policy FIN-07 for which document controls and which fund to charge first.
- Trust the COMPUTED CHECKS. They come from code, not from you.
- status must be one of: "allowed" (a fund at this site can pay it, as entered or as you suggest), "not_allowed" (no fund at this site can pay it as submitted), "needs_info" (a needed fact or document is missing), "escalate" (the documents conflict or do not cover it, so finance must decide).
- Every quote must be copied word for word from the document text below, 8 to 40 words, no ellipses.
- Write for a site analyst: plain words, short sentences.

FUNDS AT THIS SITE (${inv.site}):
${funds}

COST CATEGORIES: ${CATEGORIES.join(", ")}

INVOICE PACKET:
${JSON.stringify(packet, null, 1)}

ANALYST ENTRIES (empty string means left blank):
${JSON.stringify(inv.analyst, null, 1)}

COMPUTED CHECKS:
${checks}

DOCUMENTS:
${docs}

Reply with only one JSON object in this shape:
{"status":"allowed","suggested":{"fund":"SSVF-H","category":"TFA-Rent","cost_type":"Program","service_period":"2026-11"},"summary":"One or two sentences for the analyst.","deciding":{"doc":"38CFR62","section":"38 CFR 62.34(a)(1)","quote":"exact words from the document"},"precedence":"One sentence: which document controls here and why, citing FIN-07.","supporting":[{"doc":"FIN-07","section":"FIN-07 P4","quote":"exact words"}],"flags":[{"field":"fund","entered":"","suggested":"SSVF-H","why":"short reason"}],"funds":[{"fund":"SSVF-H","verdict":"pays","why":"Under the 9-month limit."},{"fund":"CHF-H","verdict":"not_needed","why":"Federal fund pays first (FIN-07 P4)."}],"question":"","explain":"Two or three sentences for someone new to grants: what the deciding rule means in everyday words and how it led to this answer."}
funds lists every fund at this site, in the order given under FUNDS AT THIS SITE, with verdict "pays" (the one fund you suggest), "cannot" (its documents bar this cost or a limit is reached), "not_needed" (could pay, but FIN-07 says another fund goes first), or "unclear" (its documents do not settle it). Each why is under 12 words, plain language.
Use null for suggested.fund and suggested.category when no fund can pay. cost_type is "Program" or "Admin". Give at most 2 supporting quotes. Put a flag only on fields the analyst left blank or got wrong. question is the specific question for finance or the case manager when status is needs_info or escalate, otherwise "".`;
}

const norm = s => String(s || "").toLowerCase().replace(/[‘’“”"']/g, "").replace(/[^a-z0-9$%]+/g, " ").trim();
function verifyQuote(q, DOCS) {
  if (!q || !q.quote) return false;
  const doc = DOCS[q.doc];
  const hay = norm(doc ? docText(doc) : Object.values(DOCS).map(docText).join(" "));
  const parts = String(q.quote).split(/\.\.\.|…/).map(norm).filter(p => p.length > 3);
  return parts.length > 0 && parts.every(p => hay.includes(p));
}

function scoreResult(inv, r) {
  const e = inv.expected;
  const status = e.status.includes(r.status);
  const fund = e.fund.includes(r.suggested ? (r.suggested.fund || null) : null);
  const sec = norm((r.deciding && r.deciding.section) || "").replace(/\s/g, "");
  const cite = e.cite.some(c => sec.includes(norm(c).replace(/\s/g, "")));
  return { status, fund, cite };
}


// ---------- Tool-calling mode (trace) ----------
const DOC_PLAIN = {
  "FIN-07": "Funding order policy (FIN-07)",
  "2CFR200": "Federal cost rules (2 CFR 200)",
  "38CFR62": "SSVF rules (38 CFR 62)",
  "24CFR578": "HUD CoC rules (24 CFR 578)",
  "CHF": "County Housing Fund agreement",
  "RIDGE": "Ridgeline Foundation letter"
};

function siteDocIds(inv) {
  return ["FIN-07", ...new Set(SITES[inv.site].funds.flatMap(f => FUNDS[f].docs))];
}

function participantSummary(id) {
  const c = CLIENTS[id];
  if (!c) return { found: false, note: "No participant with that ID." };
  if (c.unavailable) return { found: false, note: c.unavailable };
  return {
    found: true, income_level: c.tier, ami_percent: c.ami,
    ssvf_rent_months_paid: c.rent || [], ssvf_security_deposits: c.securityDeposits || [],
    ssvf_moving_costs: c.moving || [], ssvf_utility_months_paid: c.utility || [],
    ssvf_housing_stability_items: c.ghsa || [], ridgeline_flexible_help: c.ridgeFlex || [],
    other_subsidies: c.other || [], unit_rent: c.unitRent || null, utility_account: c.utilityAccount || null
  };
}

function plainParticipant(p) {
  if (!p.found) return p.note;
  const bits = [p.income_level];
  if (p.ssvf_rent_months_paid.length) bits.push(`${p.ssvf_rent_months_paid.length} month${p.ssvf_rent_months_paid.length > 1 ? "s" : ""} of rent paid by SSVF`);
  if (p.ssvf_security_deposits.length) bits.push(`deposit paid ${p.ssvf_security_deposits.join(", ")}`);
  if (p.ssvf_moving_costs.length) bits.push(`moving costs paid ${p.ssvf_moving_costs.join(", ")}`);
  if (p.other_subsidies.length) bits.push(p.other_subsidies.map(o => o.program).join(", "));
  return bits.join(" · ");
}

// log(event) receives {id, kind, title, detail, state} and later updates with the same id
function makeTools(inv, DOCS, log) {
  const allowedDocs = siteDocIds(inv);
  const PAPER = ["Backup in packet", "Payee"];
  const wrap = (kind, titleFn, fn, resultFn) => async (input) => {
    const id = Math.random().toString(36).slice(2);
    log({ id, kind, title: titleFn(input), detail: "", state: "running" });
    await new Promise(r => setTimeout(r, 350));
    try { const out = fn(input); log({ id, detail: resultFn(out, input), state: "done" }); return out; }
    catch (e) { log({ id, detail: String(e.message || e), state: "error" }); throw e; }
  };
  return [
    { name: "check_paperwork", description: "Checks which required documents are in this invoice's packet and whether the payee is a third party. Returns a list of findings. Call this once.",
      execute: wrap("paperwork", () => "Checking the paperwork in the packet", () => computeChecks(inv).filter(c => PAPER.includes(c.label)), out => out.map(c => c.value).join(". ")) },
    { name: "look_up_participant", description: "Returns the participant's history: income level, months of SSVF rent and utility help already paid, deposits, moving costs, other housing subsidies. Call this when the invoice names a participant.",
      inputSchema: { type: "object", properties: { participant_id: { type: "string", description: "For example C-101" } }, required: ["participant_id"] },
      execute: wrap("person", i => `Looking up participant ${String(i.participant_id || inv.client || "")}'s history`, i => participantSummary(String(i.participant_id || inv.client || "")), out => plainParticipant(out)) },
    { name: "check_limits", description: "Runs the exact counts for this invoice: rent and utility months against the SSVF limits, deposit and moving-cost timing, dollar caps for the county fund and Ridgeline, and admin caps. Returns each check with ok, bad, missing or info. Trust these numbers over your own arithmetic.",
      execute: wrap("count", () => "Counting months and dollar limits", () => computeChecks(inv).filter(c => !PAPER.includes(c.label)), out => out.length ? out.filter(c => c.state !== "info").map(c => `${c.label}: ${c.state === "ok" ? "OK" : c.state === "bad" ? "over the limit or not allowed" : c.state === "missing" ? "information missing" : "noted"}`).join(". ") || "Nothing to count for this invoice." : "Nothing to count for this invoice.") },
    { name: "read_document", description: `Returns the full text of one rule document so you can quote it. Documents for this site: ${allowedDocs.map(d => `${d} (${DOCS[d].title})`).join("; ")}. Read every document you quote.`,
      inputSchema: { type: "object", properties: { doc_id: { type: "string", enum: allowedDocs } }, required: ["doc_id"] },
      execute: wrap("doc", i => `Reading ${DOC_PLAIN[String(i.doc_id)] || String(i.doc_id)}`, i => {
        const id = String(i.doc_id);
        if (!allowedDocs.includes(id)) throw new Error(`Not a document for this site. Use one of: ${allowedDocs.join(", ")}`);
        return { doc_id: id, title: DOCS[id].title, kind: DOCS[id].fake ? "organization or funder document" : "official federal text", text: docText(DOCS[id]) };
      }, out => { const pg = Math.max(1, Math.round(out.text.length / 2500)); return `${out.kind === "official federal text" ? "Official federal text from the eCFR" : "Funder or policy document (fake for this demo)"}, about ${pg} page${pg > 1 ? "s" : ""}`; }) }
  ];
}

function buildToolPrompt(inv, DOCS) {
  const site = SITES[inv.site];
  const funds = site.funds.map(f => `- ${f}: ${FUNDS[f].name}. Governing documents: ${FUNDS[f].docs.join(", ")}. Approved budget lines: ${FUNDS[f].lines}.`).join("\n");
  const packet = { id: inv.id, site: inv.site, vendor: inv.vendor, payee: inv.payee, payee_type: inv.payeeType, amount: inv.amount, invoice_date: inv.date, description: inv.description, participant: inv.client };
  const oneShot = buildPrompt(inv, DOCS);
  const shape = oneShot.slice(oneShot.indexOf("Reply with only one JSON object"));
  return `You check the grant coding on one invoice for a nonprofit that serves homeless veterans. A site budget analyst filled in some coding fields and left others blank. Decide which fund can pay this cost and how to code it.

Work with the tools. Call several at once when you can, and finish in at most three rounds:
- Call check_paperwork and check_limits.
- Call look_up_participant if the invoice names a participant.
- Call read_document for policy FIN-07 and for every other document you will quote. Quote only words returned by read_document.

Rules for your answer:
- Use only what the tools return. Do not rely on outside knowledge of grant rules. If the documents do not settle a question, say so.
- Follow policy FIN-07 for which document controls and which fund to charge first.
- Trust the numbers from check_limits over your own arithmetic.
- status must be one of: "allowed" (a fund at this site can pay it, as entered or as you suggest), "not_allowed" (no fund at this site can pay it as submitted), "needs_info" (a needed fact or document is missing), "escalate" (the documents conflict or do not cover it, so finance must decide).
- Every quote must be copied word for word, 8 to 40 words, no ellipses.
- Write for a site analyst who is not technical: plain words, short sentences.

FUNDS AT THIS SITE (${inv.site}):
${funds}

COST CATEGORIES: ${CATEGORIES.join(", ")}

INVOICE:
${JSON.stringify(packet, null, 1)}

ANALYST ENTRIES (empty string means left blank):
${JSON.stringify(inv.analyst, null, 1)}

When you have what you need, ${shape.charAt(0).toLowerCase() + shape.slice(1)}`;
}

// What the page did before a one-shot call, for the trace when tools are unavailable
function oneShotSteps(inv) {
  const ch = computeChecks(inv);
  const PAPER = ["Backup in packet", "Payee"];
  const steps = [
    { kind: "paperwork", title: "Checked the paperwork in the packet", detail: ch.filter(c => PAPER.includes(c.label)).map(c => c.value).join(". ") },
    { kind: "count", title: "Counted months and dollar limits", detail: ch.filter(c => !PAPER.includes(c.label) && c.state !== "info").map(c => c.label).join(", ") || "Nothing to count for this invoice." }
  ];
  if (inv.client) steps.splice(1, 0, { kind: "person", title: `Looked up participant ${inv.client}'s history`, detail: plainParticipant(participantSummary(inv.client)) });
  steps.push({ kind: "doc", title: "Gave Claude these documents", detail: siteDocIds(inv).map(d => DOC_PLAIN[d]).join(", ") });
  return steps.map(s => ({ ...s, state: "done", by: "page" }));
}


// ---------- Practice run: seeded random invoices with an answer key ----------
function seedHash(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  return h1 >>> 0;
}
function makeRng(seed) {
  let a = seedHash(String(seed));
  const next = () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const int = (lo, hi) => lo + Math.floor(next() * (hi - lo + 1));
  const pick = arr => arr[Math.floor(next() * arr.length)];
  return { next, int, pick };
}
const monthStr = idx => `${Math.floor(idx / 12)}-${String(idx % 12 + 1).padStart(2, "0")}`;
const monthsEnding = (endIdx, count) => Array.from({ length: count }, (_, i) => monthStr(endIdx - count + 1 + i));
const NOV = mIdx("2026-11"), OCT = mIdx("2026-10");

const NAMES = {
  landlord: ["Harborview Lofts", "Cypress Court", "Mesa Ridge Apartments", "Linden Terrace", "Oak Hollow Homes", "Bayfront Villas", "Juniper Flats", "Canyon Gate Residences", "Elm Street Partners LLC", "Sunset Arms"],
  utility: ["Coastline Electric", "Valley Gas & Power", "Desert Water District", "Metro Light & Power"],
  movers: ["Two Brothers Moving", "Sun Valley Movers", "QuickHaul Moving Co."],
  cpa: ["Brightline Accounting LLP", "Okafor & Reyes CPAs", "Northgate Bookkeeping"],
  training: ["Coastal Training Institute", "Veteran Care Learning Center", "Bridgeway Workshops"],
  transit: ["Metro Transit Authority", "Valley Regional Transit"],
  store: ["WorkWear Depot", "Home Basics Outlet", "City Supply Co."],
  grocer: ["Valley Grocers", "Fresh Market Co-op"]
};

// Each template returns {inv fields, client?, expected, correct coding}
const PRACTICE_TEMPLATES = [
  { key: "rent_ok", label: "Rent within the SSVF limit", w: 3, make(R, site) {
      const eli = R.next() < 0.4, used = R.int(0, eli ? 7 : 4), rent = R.int(1100, 1950);
      return { site, kind: "rent", vendor: R.pick(NAMES.landlord), payeeType: "Landlord", amount: rent, description: `November 2026 rent, unit ${R.int(1, 40)}${R.pick(["A", "B", "C", ""])}`, backup: [...STD, ...RENT_DOCS],
        client: { tier: eli ? "Extremely low income" : "Very low income", ami: eli ? R.int(18, 30) : R.int(31, 50), rent: monthsEnding(OCT, used), unitRent: rent, securityDeposits: [], other: [] },
        coding: { fund: ssvfOf(site), category: "TFA-Rent", cost_type: "Program", service_period: "2026-11" },
        expected: { status: ["allowed"], fund: [ssvfOf(site)], cite: ["62.34(a)"] } }; } },
  { key: "rent_over_county", label: "SSVF rent limit reached, county fund can pay", w: 1, sites: ["Harbor"], make(R, site) {
      const rent = R.int(1200, 1950);
      return { site, kind: "rent", vendor: R.pick(NAMES.landlord), payeeType: "Landlord", amount: rent, description: `November 2026 rent, unit ${R.int(1, 40)}`, backup: [...STD, ...RENT_DOCS],
        client: { tier: "Very low income", ami: R.int(32, 50), rent: monthsEnding(OCT, 6), unitRent: rent, securityDeposits: [], other: [] },
        coding: { fund: "CHF-H", category: "TFA-Rent", cost_type: "Program", service_period: "2026-11" },
        expected: { status: ["allowed"], fund: ["CHF-H"], cite: ["62.34(a)", "B1", "B2", "P3", "P4"] } }; } },
  { key: "rent_over_none", label: "SSVF rent limit reached, no other fund", w: 1, sites: ["Desert", "Valley"], make(R, site) {
      const eli = R.next() < 0.5, rent = R.int(1100, 1900);
      return { site, kind: "rent", vendor: R.pick(NAMES.landlord), payeeType: "Landlord", amount: rent, description: `November 2026 rent, unit ${R.int(1, 40)}`, backup: [...STD, ...RENT_DOCS],
        client: { tier: eli ? "Extremely low income" : "Very low income", ami: eli ? R.int(18, 30) : R.int(31, 50), rent: monthsEnding(OCT, eli ? 9 : 6), unitRent: rent, securityDeposits: [], other: [] },
        coding: { fund: null, category: null, cost_type: "Program", service_period: "2026-11" },
        expected: { status: ["not_allowed", "escalate"], fund: [null], cite: ["62.34(a)"] } }; } },
  { key: "rent_federal_overlap", label: "Federal voucher already pays rent", w: 1, make(R, site) {
      const rent = R.int(1100, 1800);
      return { site, kind: "rent", vendor: R.pick(NAMES.landlord), payeeType: "Landlord", amount: rent, description: "November 2026 contract rent, full amount", backup: [...STD, ...RENT_DOCS],
        client: { tier: "Very low income", ami: R.int(31, 50), rent: monthsEnding(mIdx("2026-07"), R.int(1, 2)), unitRent: rent, securityDeposits: [], other: [{ program: "HUD-VASH housing voucher", level: "Federal", from: monthStr(R.int(mIdx("2026-08"), OCT)), covers: "rent", monthly: rent - R.int(150, 400) }] },
        coding: { fund: null, category: null, cost_type: "Program", service_period: "2026-11" },
        expected: { status: ["not_allowed", "escalate"], fund: [null], cite: ["62.34(a)(6)", "62.34(a)", "B5"] } }; } },
  { key: "rent_no_reasonableness", label: "Rent reasonableness note missing", w: 1, make(R, site) {
      const rent = R.int(1100, 1950);
      return { site, kind: "rent", vendor: R.pick(NAMES.landlord), payeeType: "Landlord", amount: rent, description: `November 2026 rent, unit ${R.int(1, 40)}`, backup: [...STD, "Lease", "Landlord W-9"],
        client: { tier: "Very low income", ami: R.int(31, 50), rent: monthsEnding(OCT, R.int(0, 3)), unitRent: rent, securityDeposits: [], other: [] },
        coding: { fund: ssvfOf(site), category: "TFA-Rent", cost_type: "Program", service_period: "2026-11" },
        expected: { status: ["needs_info"], fund: [ssvfOf(site), null], cite: ["62.34(a)(4)", "P6", "200.403(g)"] } }; } },
  { key: "late_fee_county", label: "County bars late fees, SSVF can pay", w: 1, sites: ["Harbor"], make(R, site) {
      const rent = R.int(1300, 1900);
      return { site, kind: "late_fee", vendor: R.pick(NAMES.landlord), payeeType: "Landlord", amount: R.int(50, 125), description: "Late fee on October 2026 rent, per the lease", backup: [...STD, "Lease", "Landlord W-9"], period: "2026-10",
        client: { tier: "Very low income", ami: R.int(31, 50), rent: monthsEnding(OCT, 1), unitRent: rent, securityDeposits: [], other: [{ program: "County Housing Fund rent subsidy", level: "Local", from: "2026-09", covers: "rent", monthly: R.int(300, 700) }] },
        coding: { fund: "SSVF-H", category: "TFA-Rent-Fees", cost_type: "Program", service_period: "2026-10" }, wrongFund: "CHF-H",
        expected: { status: ["allowed"], fund: ["SSVF-H"], cite: ["B3", "62.34(a)", "P3"] } }; } },
  { key: "deposit_ok", label: "First security deposit", w: 1, make(R, site) {
      const rent = R.int(1100, 1800);
      return { site, kind: "deposit", vendor: R.pick(NAMES.landlord), payeeType: "Landlord", amount: rent, description: `Security deposit, new unit (monthly rent ${money(rent)})`, unitRentOverride: rent, backup: [...STD, ...RENT_DOCS],
        client: { tier: "Very low income", ami: R.int(31, 50), rent: [], unitRent: rent, securityDeposits: [], other: [] },
        coding: { fund: ssvfOf(site), category: "TFA-Security-Deposit", cost_type: "Program", service_period: "2026-11" },
        expected: { status: ["allowed"], fund: [ssvfOf(site)], cite: ["62.34(c)", "P4"] } }; } },
  { key: "deposit_repeat", label: "Second deposit within 2 years", w: 1, sites: ["Desert", "Valley"], make(R, site) {
      const rent = R.int(1100, 1800);
      return { site, kind: "deposit", vendor: R.pick(NAMES.landlord), payeeType: "Landlord", amount: rent, description: `Security deposit, new unit (monthly rent ${money(rent)})`, unitRentOverride: rent, backup: [...STD, ...RENT_DOCS],
        client: { tier: "Very low income", ami: R.int(31, 50), rent: [], unitRent: rent, securityDeposits: [`${R.pick(["2025", "2026"])}-0${R.int(1, 9)}-1${R.int(0, 9)}`], other: [] },
        coding: { fund: null, category: null, cost_type: "Program", service_period: "2026-11" },
        expected: { status: ["not_allowed", "escalate"], fund: [null], cite: ["62.34(c)(1)", "62.34(c)"] } }; } },
  { key: "utility_ok", label: "Utility bill paid to the utility", w: 2, make(R, site) {
      const used = R.int(0, 4);
      return { site, kind: "utility", vendor: R.pick(NAMES.utility), payeeType: "Utility company", amount: R.int(70, 320), description: "October 2026 utility bill", backup: [...STD], period: "2026-10",
        client: { tier: "Very low income", ami: R.int(31, 50), rent: [], utility: monthsEnding(mIdx("2026-09"), used), utilityAccount: "In the veteran's name", securityDeposits: [], other: [] },
        coding: { fund: ssvfOf(site), category: "TFA-Utility", cost_type: "Program", service_period: "2026-10" },
        expected: { status: ["allowed"], fund: [ssvfOf(site)], cite: ["62.34(b)"] } }; } },
  { key: "utility_to_participant", label: "Utility bill paid to the veteran", w: 1, make(R, site) {
      return { site, kind: "utility", vendor: R.pick(NAMES.utility), payeeType: "Participant", amount: R.int(70, 320), description: "Reimburse veteran for an October utility bill they paid", backup: [...STD], period: "2026-10",
        client: { tier: "Very low income", ami: R.int(31, 50), rent: [], utility: [], utilityAccount: "In the veteran's name", securityDeposits: [], other: [] },
        coding: { fund: ssvfOf(site), category: "TFA-Utility", cost_type: "Program", service_period: "2026-10" }, keepWrong: true,
        expected: { status: ["not_allowed"], fund: [null, ssvfOf(site)], cite: ["62.34(b)(2)", "P8"] } }; } },
  { key: "history_missing", label: "Participant file not received", w: 1, make(R, site) {
      return { site, kind: "utility", vendor: R.pick(NAMES.utility), payeeType: "Utility company", amount: R.int(70, 320), description: "October 2026 utility bill", backup: [...STD], period: "2026-10",
        client: { unavailable: `Participant transferred from another provider on 2026-10-${R.int(10, 30)}. Case file not yet received.` },
        coding: { fund: ssvfOf(site), category: "TFA-Utility", cost_type: "Program", service_period: "2026-10" },
        expected: { status: ["needs_info"], fund: [ssvfOf(site), null], cite: ["P6", "62.34(b)"] } }; } },
  { key: "moving_repeat", label: "Second move within 3 years", w: 1, sites: ["Desert"], make(R, site) {
      return { site, kind: "moving", vendor: R.pick(NAMES.movers), payeeType: "Vendor", amount: R.int(650, 1400), description: "Moving company, move to permanent unit", backup: [...STD],
        client: { tier: "Very low income", ami: R.int(31, 50), rent: [], moving: [`${R.pick(["2024", "2025"])}-0${R.int(1, 9)}-${R.int(10, 28)}`], ridgeFlex: [], securityDeposits: [], other: [] },
        coding: { fund: null, category: null, cost_type: "Program", service_period: "2026-11" },
        expected: { status: ["not_allowed", "escalate"], fund: [null], cite: ["62.34(d)(1)", "62.34(d)", "R1"] } }; } },
  { key: "ghsa_ok", label: "Work or move-in items, SSVF pays first", w: 1, make(R, site) {
      const item = R.pick(["Steel-toe boots and uniform shirts for a new job", "Kitchen utensils and bedding for move-in", "Housing application and background check fees"]);
      return { site, kind: "ghsa", vendor: R.pick(NAMES.store), payeeType: "Vendor", amount: R.int(60, 380), description: item, backup: [...STD],
        client: { tier: "Very low income", ami: R.int(31, 50), rent: [], ghsa: R.next() < 0.5 ? [] : [{ date: "2026-04-02", amount: R.int(100, 900) }], ridgeFlex: [], securityDeposits: [], other: [] },
        coding: { fund: ssvfOf(site), category: "TFA-GHSA", cost_type: "Program", service_period: "2026-11" }, wrongFund: "RIDGE",
        expected: { status: ["allowed"], fund: [ssvfOf(site)], cite: ["62.34(e)", "P4", "R4"] } }; } },
  { key: "admin_miscoded", label: "Accounting cost is Admin, not Program", w: 1, make(R, site) {
      return { site, kind: "admin", vendor: R.pick(NAMES.cpa), payeeType: "Vendor", amount: R.int(1500, 5000), description: "Quarterly bookkeeping review of the SSVF grant ledger", backup: [...STD], period: "2026-10",
        coding: { fund: ssvfOf(site), category: "Admin", cost_type: "Admin", service_period: "2026-10" }, wrongType: true,
        expected: { status: ["allowed"], fund: [ssvfOf(site)], cite: ["62.70(e)", "P5"] } }; } },
  { key: "training", label: "Staff training: CoC bars it, foundation allows it", w: 1, sites: ["Harbor", "Valley"], make(R, site) {
      return { site, kind: "training", vendor: R.pick(NAMES.training), payeeType: "Vendor", amount: R.int(400, 1200), description: `${R.pick(["Trauma-informed care", "Motivational interviewing", "Housing First practice"])} workshop for ${R.int(2, 5)} case managers`, backup: [...STD], period: "2026-10",
        coding: { fund: "RIDGE", category: "Staff-Training", cost_type: "Program", service_period: "2026-10" }, wrongFund: site === "Harbor" ? "COC-SSO-H" : "COC-SSO-V",
        expected: { status: ["allowed"], fund: ["RIDGE"], cite: ["578.53(d)", "R2", "P3"] } }; } },
  { key: "transit", label: "Participant transit passes under CoC", w: 1, sites: ["Harbor", "Valley"], make(R, site) {
      const n = R.int(5, 15);
      return { site, kind: "service", vendor: R.pick(NAMES.transit), payeeType: "Vendor", amount: n * 90, description: `November transit passes for ${n} participants to reach medical and job appointments`, backup: [...STD],
        coding: { fund: site === "Harbor" ? "COC-SSO-H" : "COC-SSO-V", category: "SS-Transportation", cost_type: "Program", service_period: "2026-11" },
        expected: { status: ["allowed"], fund: [site === "Harbor" ? "COC-SSO-H" : "COC-SSO-V"], cite: ["578.53(e)(15)", "578.53(e)"] } }; } },
  { key: "gift_cards", label: "Gift cards", w: 1, make(R, site) {
      const n = R.int(5, 15);
      return { site, kind: "gift", vendor: R.pick(NAMES.grocer), payeeType: "Vendor", amount: n * 25, description: `${n} $25 grocery gift cards for a participant holiday event`, backup: [...STD],
        coding: { fund: null, category: null, cost_type: "Program", service_period: "2026-11" }, wrongFund: "RIDGE",
        expected: { status: ["not_allowed", "escalate"], fund: [null], cite: ["R3", "R1", "578.53(d)"] } }; } }
];
function ssvfOf(site) { return SITES[site].funds.find(f => FUNDS[f].program === "SSVF"); }

function generatePractice(seed, n) {
  const R = makeRng(seed);
  const pool = PRACTICE_TEMPLATES.flatMap(t => Array(t.w).fill(t));
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = R.pick(pool);
    const site = R.pick(t.sites || Object.keys(SITES));
    const g = t.make(R, site);
    const id = `P-${String(i + 1).padStart(2, "0")}`;
    const cid = g.client ? `R-${String(R.int(100, 999))}` + String.fromCharCode(65 + i % 26) : null;
    if (cid) CLIENTS[cid] = g.client;
    // analyst entries: start from correct coding, then blank some fields and plant the template's typical mistake
    const a = {};
    for (const k of ["fund", "category", "cost_type", "service_period"]) a[k] = g.coding[k] || "";
    if (g.wrongFund && R.next() < 0.8) a.fund = g.wrongFund;
    if (g.wrongType) { a.cost_type = "Program"; a.category = "SS-Case-Management"; }
    if (!g.keepWrong) for (const k of ["fund", "category", "cost_type", "service_period"]) if (R.next() < 0.3) a[k] = "";
    if (!g.coding.fund && R.next() < 0.6) a.fund = ssvfOf(site);
    const day = R.int(1, 4);
    out.push({ id, site, vendor: g.vendor, payee: g.payeeType === "Participant" ? `Participant ${cid}` : g.vendor, payeeType: g.payeeType, amount: g.amount, date: `2026-11-0${day}`, period: g.period || "2026-11", kind: g.kind, client: cid, description: g.description, backup: g.backup, unitRentOverride: g.unitRentOverride, analyst: a, expected: g.expected, caseKey: t.key, caseLabel: t.label, practice: true });
  }
  return out;
}


// ---------- Eval framework ----------
const PROMPT_VERSION = "v3 (tools + plain explanation)";

// Code checks: graded by code, never by Claude. critical = a miss sinks the whole case.
const CODE_CHECKS = [
  { id: "C1", label: "Right answer", critical: true },
  { id: "C2", label: "Right fund", critical: true },
  { id: "C3", label: "Right deciding rule", critical: false },
  { id: "C4", label: "Quote found in the rule text", critical: true },
  { id: "C5", label: "Plain-language summary", critical: false },
  { id: "C6", label: "Every fund at the site rated", critical: false },
  { id: "C7", label: "Who pays matches the coding", critical: false }
];
function codeChecks(inv, r, DOCS) {
  const sc = scoreResult(inv, r);
  const plain = !/(CFR|§|\b[PBR]\d\b|\b[A-Z]{3,5}-[A-Z]{1,4}\b|\d{3}\.\d)/.test(`${r.summary || ""} ${r.explain || ""}`);
  const siteFunds = SITES[inv.site].funds;
  const rated = Array.isArray(r.funds) && siteFunds.every(f => r.funds.some(x => x.fund === f));
  const payer = Array.isArray(r.funds) ? (r.funds.find(x => x.verdict === "pays") || {}).fund || null : undefined;
  const sugFund = r.suggested ? (r.suggested.fund || null) : null;
  return {
    C1: sc.status, C2: sc.fund, C3: sc.cite, C4: verifyQuote(r.deciding, DOCS), C5: plain, C6: rated,
    C7: payer === undefined ? false : payer === sugFund
  };
}

// Judge checks: yes/no, one thing each, graded by a separate Claude call that never sees the answer key.
const JUDGE_CHECKS = [
  { id: "J1", label: "Summary agrees with the status", q: "Does the summary agree with the status? Fail if the summary says or implies the invoice can be paid when the status is not \"allowed\", or the reverse." },
  { id: "J2", label: "Names the deciding fact", q: "Does the summary name the specific fact that decided the answer, such as a count of months, a date, a dollar amount, a missing document or who was paid? Fail if it only restates the rule in general terms." },
  { id: "J3", label: "Explanation matches the quoted rule", q: "Does the \"explain\" text describe the quoted deciding rule accurately in everyday words, without adding limits or conditions that are not in the quote?" },
  { id: "J4", label: "Question for finance is specific", q: "Only when status is \"needs_info\" or \"escalate\": does the question name exactly what is missing or what finance must decide? For any other status answer \"na\"." }
];
function buildJudgePrompt(inv, r) {
  const out = { status: r.status, suggested: r.suggested, summary: r.summary, explain: r.explain, question: r.question, deciding_rule: r.deciding };
  const packet = { site: inv.site, vendor: inv.vendor, payee_type: inv.payeeType, amount: inv.amount, description: inv.description, participant: inv.client };
  return `You grade one answer from a grant-coding helper used by non-technical site budget analysts. Do not decide whether the answer is correct; another check does that. Grade only the yes/no questions below, each on its own, from the text given.

INVOICE:
${JSON.stringify(packet, null, 1)}

HELPER'S ANSWER:
${JSON.stringify(out, null, 1)}

QUESTIONS:
${JUDGE_CHECKS.map(j => `${j.id}: ${j.q}`).join("\n")}

Reply with only JSON: {"J1":{"verdict":"yes","why":"under 20 words"},"J2":{...},"J3":{...},"J4":{"verdict":"na","why":"..."}}. verdict is "yes", "no" or "na" (na only for J4).`;
}

const DIAG_BUCKETS = [
  ["check", "Expected answer is wrong (fix the answer key)"],
  ["data", "Invoice or participant data is wrong"],
  ["context", "The right facts or documents did not reach Claude"],
  ["prompt", "Claude was not told clearly"],
  ["model", "All of the above were fine; the model got it wrong"]
];

if (typeof module !== "undefined") module.exports = { codeChecks, buildJudgePrompt, CODE_CHECKS, JUDGE_CHECKS, generatePractice, PRACTICE_TEMPLATES, makeTools, buildToolPrompt, oneShotSteps, INVOICES, computeChecks, buildPrompt, allDocs, verifyQuote, scoreResult, windowCount };
