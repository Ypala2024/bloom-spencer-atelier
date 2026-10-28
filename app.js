// Bloom & Spencer Atelier — app logic (vanilla JS, no build step)
(function () {
  "use strict";
  var C = window.CONFIG, STONES = window.STONES, PIECES = window.PIECES,
      CUTS = window.CUTS, METALS = window.METALS, COLLECTION = window.COLLECTION, QUIZ = window.QUIZ;
  var SVGNS = "http://www.w3.org/2000/svg";
  var STORE_KEY = "bs-atelier-designs";
  var MAX_SAVED = 12;

  var state = { piece: "ring", stone: "paraiba", cut: "pear", metal: "white", size: 1.5 };

  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else if (k === "style") n.setAttribute("style", attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    if (text != null) n.textContent = text;
    return n;
  }
  function imgUrl(path) { return C.img + path; }
  function pageUrl(path) { return C.site + path.replace(/\/?$/, "/"); }

  // ---------- Design description ----------
  function describe(d) {
    return CUTS[d.cut] + " " + STONES[d.stone].name.toLowerCase() + " " +
      PIECES[d.piece].name.toLowerCase() + " in " + METALS[d.metal].name.toLowerCase() +
      ", " + Number(d.size).toFixed(2) + " ct";
  }
  function titleCase(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // Drawing lives in render.js
  var renderDesign = window.renderDesign;

  // ---------- Option chips ----------
  function buildChips(containerId, name, entries, swatch) {
    var box = $(containerId);
    Object.keys(entries).forEach(function (key) {
      var wrap = el("div", { class: "chip" });
      var inp = el("input", { type: "radio", name: name, id: name + "-" + key, value: key });
      if (state[name] === key) inp.checked = true;
      var lab = el("label", { for: name + "-" + key });
      if (swatch) lab.appendChild(el("span", { class: "swatch", style: "background:" + swatch(key), "aria-hidden": "true" }));
      lab.appendChild(document.createTextNode(typeof entries[key] === "string" ? entries[key] : entries[key].name));
      inp.addEventListener("change", function () { state[name] = key; update(); });
      wrap.appendChild(inp); wrap.appendChild(lab); box.appendChild(wrap);
    });
  }
  function syncChips() {
    ["piece", "stone", "cut", "metal"].forEach(function (n) {
      var inp = document.getElementById(n + "-" + state[n]);
      if (inp) inp.checked = true;
    });
    $("optSize").value = state.size;
  }

  // ---------- Inspired-by ----------
  function renderInspired() {
    var list = COLLECTION[state.piece].map(function (it) {
      var name = it[0].toLowerCase(), score = 0;
      var cutWord = { round: "round", oval: "oval", pear: "pear", marquise: "marquise", princess: "princess", emerald: "emerald-cut" }[state.cut];
      if (name.indexOf(cutWord) !== -1) score += 3;
      if (state.cut === "round" && (name.indexOf("solitaire") !== -1 || name.indexOf("tennis") !== -1)) score += 1;
      if (name.indexOf(state.stone) !== -1) score += 3;
      return { it: it, score: score };
    }).sort(function (a, b) { return b.score - a.score; }).slice(0, 3);
    var box = $("inspired"); box.innerHTML = "";
    list.forEach(function (o) {
      var a = el("a", { class: "card", href: pageUrl(o.it[1]), target: "_blank", rel: "noopener" });
      var ph = el("div", { class: "ph", role: "img", "aria-label": o.it[0] });
      ph.style.backgroundImage = 'url("' + imgUrl(o.it[1] + ".jpg") + '")';
      a.appendChild(ph);
      a.appendChild(el("span", { class: "title" }, o.it[0]));
      a.appendChild(el("span", { class: "meta" }, "View on bloomandspencer.com ↗"));
      box.appendChild(a);
    });
  }

  // ---------- Update ----------
  function update() {
    $("sizeOut").textContent = Number(state.size).toFixed(2) + " ct";
    renderDesign($("previewSvg"), state);
    $("designName").textContent = titleCase(describe(state));
    var sum = $("summary"); sum.innerHTML = "";
    [["Piece", PIECES[state.piece].name], ["Stone", STONES[state.stone].name], ["Cut", CUTS[state.cut]],
     ["Metal", METALS[state.metal].name], ["Size", Number(state.size).toFixed(2) + " ct"],
     ["Hardness", STONES[state.stone].hardness]].forEach(function (r) {
      sum.appendChild(el("dt", null, r[0])); sum.appendChild(el("dd", null, r[1]));
    });
    renderInspired();
    updateAttach();
  }

  // ---------- Saved designs ----------
  function loadSaved() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (e) { return []; } }
  function storeSaved(list) { try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); return true; } catch (e) { return false; } }
  var memorySaved = null;
  function getSaved() { return memorySaved || (memorySaved = loadSaved()); }
  function setSaved(list) { memorySaved = list; storeSaved(list); renderSaved(); }

  function toast(msg) { $("toast").textContent = msg; clearTimeout(toast.t); toast.t = setTimeout(function () { $("toast").textContent = ""; }, 3500); }

  function renderSaved() {
    var list = getSaved(), box = $("savedGrid");
    $("savedCount").textContent = list.length;
    box.innerHTML = "";
    if (!list.length) { box.appendChild(el("p", { class: "empty" }, "No saved designs yet. Create one in the Atelier and press “Save design”.")); return; }
    list.forEach(function (d, idx) {
      var card = el("div", { class: "card saved-card" });
      var svg = document.createElementNS(SVGNS, "svg");
      svg.setAttribute("viewBox", "0 0 320 320"); svg.setAttribute("role", "img"); svg.setAttribute("aria-label", describe(d));
      renderDesign(svg, d);
      card.appendChild(svg);
      card.appendChild(el("span", { class: "title" }, titleCase(describe(d))));
      card.appendChild(el("span", { class: "meta" }, "Saved " + new Date(d.saved).toLocaleDateString()));
      var row = el("div", { class: "row" });
      var open = el("button", { type: "button", class: "btn" }, "Open");
      open.addEventListener("click", function () {
        ["piece", "stone", "cut", "metal", "size"].forEach(function (k) { state[k] = d[k]; });
        syncChips(); update(); location.hash = "#atelier";
      });
      var del = el("button", { type: "button", class: "btn", "aria-label": "Remove " + describe(d) }, "Remove");
      del.addEventListener("click", function () { var l = getSaved().slice(); l.splice(idx, 1); setSaved(l); });
      row.appendChild(open); row.appendChild(del); card.appendChild(row);
      box.appendChild(card);
    });
  }

  // ---------- Stone guide ----------
  function renderStones() {
    var box = $("stoneGrid");
    Object.keys(STONES).forEach(function (k) {
      var s = STONES[k];
      var card = el("article", { class: "stone" });
      var ph = el("div", { class: "ph", role: "img", "aria-label": s.name + " jewellery by Bloom & Spencer" });
      ph.style.backgroundImage = 'url("' + imgUrl(s.image) + '")';
      card.appendChild(ph);
      var body = el("div", { class: "body" });
      var h = el("h3"); h.appendChild(el("span", { class: "dot", style: "background:" + s.color, "aria-hidden": "true" })); h.appendChild(document.createTextNode(s.name));
      body.appendChild(h);
      body.appendChild(el("p", null, s.character));
      body.appendChild(el("p", { class: "fact" }, "Hardness (Mohs): " + s.hardness));
      body.appendChild(el("p", null, s.why));
      var row = el("div", { class: "row" });
      var use = el("button", { type: "button", class: "btn btn-dark" }, "Design with it");
      use.addEventListener("click", function () { state.stone = k; syncChips(); update(); location.hash = "#atelier"; });
      var view = el("a", { class: "btn", href: pageUrl(s.link), target: "_blank", rel: "noopener" }, "Collection");
      row.appendChild(use); row.appendChild(view); body.appendChild(row);
      card.appendChild(body); box.appendChild(card);
    });
  }

  // ---------- Quiz ----------
  var quiz = { i: 0, scores: {} };
  function renderQuiz() {
    var box = $("quizBox"); box.innerHTML = "";
    if (quiz.i < QUIZ.length) {
      var q = QUIZ[quiz.i];
      box.appendChild(el("p", { class: "progress" }, "Question " + (quiz.i + 1) + " of " + QUIZ.length));
      var h = el("h3", { tabindex: "-1", id: "quizQ" }, q.q); box.appendChild(h);
      var grid = el("div", { class: "answers" });
      q.a.forEach(function (ans) {
        var b = el("button", { type: "button", class: "answer" }, ans[0]);
        b.addEventListener("click", function () {
          Object.keys(ans[1]).forEach(function (s) { quiz.scores[s] = (quiz.scores[s] || 0) + ans[1][s]; });
          quiz.i++; renderQuiz(); var f = $("quizQ"); if (f) f.focus();
        });
        grid.appendChild(b);
      });
      box.appendChild(grid);
    } else {
      var best = Object.keys(STONES).sort(function (a, b) { return (quiz.scores[b] || 0) - (quiz.scores[a] || 0); })[0];
      var s = STONES[best];
      box.appendChild(el("p", { class: "progress" }, "Your stone"));
      var res = el("div", { class: "result" });
      var ph = el("div", { class: "ph", role: "img", "aria-label": s.name });
      ph.style.backgroundImage = 'url("' + imgUrl(s.image) + '")';
      res.appendChild(ph);
      var txt = el("div", { style: "display:flex;flex-direction:column;gap:10px" });
      txt.appendChild(el("h3", { tabindex: "-1", id: "quizQ" }, s.name));
      txt.appendChild(el("p", null, s.tagline + " " + s.why));
      res.appendChild(txt); box.appendChild(res);
      var row = el("div", { class: "row" });
      var use = el("button", { type: "button", class: "btn btn-dark" }, "Use " + s.name + " in my design");
      use.addEventListener("click", function () { state.stone = best; syncChips(); update(); location.hash = "#atelier"; });
      var again = el("button", { type: "button", class: "btn" }, "Retake quiz");
      again.addEventListener("click", function () { quiz = { i: 0, scores: {} }; renderQuiz(); });
      row.appendChild(use); row.appendChild(again); box.appendChild(row);
    }
  }

  // ---------- Booking ----------
  function todayISO() { var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); }
  function updateAttach() { $("attachPreview").textContent = $("bAttach").checked ? "Design: " + titleCase(describe(state)) : ""; }

  function buildMessage() {
    var v = function (id) { return $(id).value.trim(); };
    var date = new Date(v("bDate") + "T12:00:00");
    var dateStr = date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    var lines = [
      "Hello " + C.storeName + ", I'd like to book a consultation.",
      "",
      "Name: " + v("bName"),
      "Phone: " + v("bPhone"),
      "When: " + dateStr + ", " + v("bTime"),
      "Consultation: " + v("bMode"),
      "Occasion: " + v("bOcc"),
      "Budget: " + v("bBudget")
    ];
    if ($("bAttach").checked) lines.push("My design: " + titleCase(describe(state)));
    if (v("bNotes")) lines.push("Notes: " + v("bNotes"));
    lines.push("", "(Sent from the Atelier app)");
    return lines.join("\n");
  }

  function validate() {
    var errors = [];
    function check(id, ok, msg) { $(id).setAttribute("aria-invalid", ok ? "false" : "true"); if (!ok) errors.push(msg); }
    check("bName", $("bName").value.trim().length >= 2, "your name");
    check("bPhone", $("bPhone").value.replace(/\D/g, "").length >= 8, "a valid phone number");
    var d = $("bDate").value;
    check("bDate", !!d && d >= todayISO(), "a date from today onward");
    check("bTime", !!$("bTime").value, "a time");
    var n = $("bookNotice");
    if (errors.length) { n.className = "notice"; n.textContent = "Please add " + errors.join(", ") + "."; var first = document.querySelector('[aria-invalid="true"]'); if (first) first.focus(); return false; }
    n.textContent = ""; return true;
  }

  function bindBooking() {
    $("bDate").min = todayISO();
    $("bAttach").addEventListener("change", updateAttach);
    $("bookWithDesign").addEventListener("click", function () { $("bAttach").checked = true; updateAttach(); });
    $("bookForm").addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;
      var url = "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(buildMessage());
      var w = window.open(url, "_blank", "noopener");
      if (!w) location.href = url;
      var n = $("bookNotice"); n.className = "notice ok"; n.textContent = "WhatsApp is opening with your request. Press send to confirm with the atelier.";
    });
    $("emailBtn").addEventListener("click", function () {
      if (!validate()) return;
      location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Consultation request: " + $("bName").value.trim()) + "&body=" + encodeURIComponent(buildMessage());
      var n = $("bookNotice"); n.className = "notice ok"; n.textContent = "Your email app is opening with the request ready to send.";
    });
  }

  // ---------- Footer / contact ----------
  function fillContact() {
    $("addrLines").textContent = C.address.join(" ");
    $("footAddr").textContent = C.address.join(" ");
    var tel = "tel:+" + C.phoneDisplay.replace(/\D/g, "");
    $("footPhone").href = tel; $("footPhone").textContent = C.phoneDisplay;
    $("footEmail").href = "mailto:" + C.email; $("footEmail").textContent = C.email;
    $("footIg").href = C.instagram; $("footIg").target = "_blank"; $("footIg").rel = "noopener";
    $("footSite").href = C.site; $("footSite").target = "_blank"; $("footSite").rel = "noopener";
  }

  // ---------- Init ----------
  buildChips("optPiece", "piece", PIECES);
  buildChips("optStone", "stone", STONES, function (k) { return STONES[k].color; });
  buildChips("optCut", "cut", CUTS);
  buildChips("optMetal", "metal", METALS, function (k) { return METALS[k].color; });
  $("optSize").addEventListener("input", function (e) { state.size = Number(e.target.value); update(); });
  $("optSize").value = state.size;
  $("saveBtn").addEventListener("click", function () {
    var list = getSaved().slice();
    if (list.length >= MAX_SAVED) { toast("You can keep up to " + MAX_SAVED + " designs. Remove one to save another."); return; }
    list.unshift({ piece: state.piece, stone: state.stone, cut: state.cut, metal: state.metal, size: state.size, saved: Date.now() });
    setSaved(list);
    toast("Saved to My designs.");
  });
  renderStones();
  renderQuiz();
  renderSaved();
  bindBooking();
  fillContact();
  update();
})();
