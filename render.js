// Bloom & Spencer Atelier — realistic jewellery renderer (SVG, no libraries)
// Draws faceted stones (brilliant or step cut), polished metal, claw prongs,
// and piece-specific settings: 3/4-view ring, studs, pendant on chain, tennis bracelet.
(function () {
  "use strict";
  var uid = 0;
  var N = 32; // points around a stone outline

  // ---------- colour helpers ----------
  function hexToRgb(h) { h = h.replace("#", ""); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function rgbToHex(c) { return "#" + c.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? "0" : "") + v.toString(16); }).join(""); }
  function mix(a, b, t) { var A = hexToRgb(a), B = hexToRgb(b); return rgbToHex([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t]); }
  function f1(n) { return Math.round(n * 10) / 10; }
  function pts(arr) { return arr.map(function (p) { return f1(p[0]) + "," + f1(p[1]); }).join(" "); }
  function rand(i) { var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

  // ---------- stone outlines (clockwise from the top) ----------
  function outline(cut, cx, cy, r) {
    var P = [], i, t, s, c;
    if (cut === "princess") {
      var h = r * 0.86, corners = [[-h, -h], [h, -h], [h, h], [-h, h]];
      for (i = 0; i < N; i++) {
        var k = Math.floor(i / 8), u = (i % 8) / 8, a = corners[k], b = corners[(k + 1) % 4];
        P.push([cx + a[0] + (b[0] - a[0]) * u, cy + a[1] + (b[1] - a[1]) * u]);
      }
      return P;
    }
    if (cut === "emerald") {
      var w = r * 0.72, ht = r * 1.0, k2 = r * 0.24;
      return [[cx - w + k2, cy - ht], [cx + w - k2, cy - ht], [cx + w, cy - ht + k2], [cx + w, cy + ht - k2],
              [cx + w - k2, cy + ht], [cx - w + k2, cy + ht], [cx - w, cy + ht - k2], [cx - w, cy - ht + k2]];
    }
    for (i = 0; i < N; i++) {
      t = (i / N) * Math.PI * 2; s = Math.sin(t); c = Math.cos(t);
      if (cut === "oval") P.push([cx + s * r * 0.76, cy - c * r]);
      else if (cut === "marquise") P.push([cx + Math.sign(s) * s * s * r * 0.64, cy - c * r * 1.18]);
      else if (cut === "pear") {
        var top = c > 0; // upper half tapers to a point
        var x = top ? Math.sign(s) * s * s * r * 0.84 : s * r * 0.84;
        var y = top ? cy + r * 0.25 - c * r * 1.3 : cy + r * 0.25 - c * r * 0.84;
        P.push([cx + x, y]);
      } else P.push([cx + s * r, cy - c * r]); // round
    }
    return P;
  }
  function centre(cut, cx, cy, r) { return cut === "pear" ? [cx, cy + r * 0.22] : [cx, cy]; }
  function toward(p, c, k) { return [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]; }

  // Facet shade: light comes from the upper left
  function shade(c, p, i, base, bias) {
    var ang = Math.atan2(p[1] - c[1], p[0] - c[0]);
    var light = 0.5 + 0.5 * Math.cos(ang + 2.35);
    var v = Math.max(0, Math.min(1, light * 0.55 + rand(i) * 0.45 + (bias || 0)));
    return v > 0.5 ? mix(base.mid, base.hi, (v - 0.5) * 2) : mix(base.lo, base.mid, v * 2);
  }

  function palette(stone) {
    if (stone.key === "diamond") return { hi: "#ffffff", mid: "#dfe6ec", lo: "#7f8e9a", edge: "#6f7c86" };
    return { hi: mix(stone.color, "#ffffff", 0.62), mid: stone.color, lo: mix(stone.edge, "#000000", 0.35), edge: mix(stone.edge, "#000000", 0.45) };
  }

  // ---------- faceted stone ----------
  function stone(cut, cx, cy, r, st, id) {
    var pal = palette(st), out = "", P = outline(cut, cx, cy, r), C = centre(cut, cx, cy, r), i;
    out += '<polygon points="' + pts(P) + '" fill="' + pal.lo + '" filter="url(#sh' + id + ')"/>';
    if (cut === "emerald") {
      var rings = [1, 0.8, 0.6, 0.42];
      for (var k = 0; k < rings.length - 1; k++) {
        var A = P.map(function (p) { return toward(p, C, rings[k]); }), B = P.map(function (p) { return toward(p, C, rings[k + 1]); });
        for (i = 0; i < 8; i++) {
          var j = (i + 1) % 8, quad = [A[i], A[j], B[j], B[i]];
          var mx = (A[i][0] + A[j][0]) / 2, my = (A[i][1] + A[j][1]) / 2;
          out += '<polygon points="' + pts(quad) + '" fill="' + shade(C, [mx, my], i * 7 + k, pal, k * 0.08) + '"/>';
        }
      }
      var T = P.map(function (p) { return toward(p, C, rings[3]); });
      out += '<polygon points="' + pts(T) + '" fill="' + mix(pal.mid, pal.hi, 0.35) + '"/>';
    } else {
      var T2 = [], M = [];
      for (i = 0; i < 8; i++) { T2.push(toward(P[i * 4], C, 0.52)); M.push(toward(P[i * 4 + 2], C, 0.8)); }
      for (i = 0; i < 8; i++) {
        var nx = (i + 1) % 8, pv = (i + 7) % 8;
        // upper girdle facets
        out += '<polygon points="' + pts([M[i], P[i * 4], P[i * 4 + 1], P[i * 4 + 2]]) + '" fill="' + shade(C, P[i * 4 + 1], i * 3 + 1, pal, -0.05) + '"/>';
        out += '<polygon points="' + pts([M[i], P[i * 4 + 2], P[i * 4 + 3], P[(i * 4 + 4) % N]]) + '" fill="' + shade(C, P[i * 4 + 3], i * 3 + 2, pal, -0.05) + '"/>';
        // kite (bezel) facets
        out += '<polygon points="' + pts([T2[i], M[pv], P[i * 4], M[i]]) + '" fill="' + shade(C, P[i * 4], i * 3 + 3, pal, 0.05) + '"/>';
        // star facets
        out += '<polygon points="' + pts([T2[i], T2[nx], M[i]]) + '" fill="' + shade(C, M[i], i * 3 + 4, pal, 0.12) + '"/>';
      }
      out += '<polygon points="' + pts(T2) + '" fill="' + mix(pal.mid, pal.hi, 0.3) + '"/>';
      // table reflection
      out += '<polygon points="' + pts(T2) + '" fill="url(#tb' + id + ')"/>';
    }
    // girdle line and facet edges
    out += '<polygon points="' + pts(P) + '" fill="none" stroke="' + pal.edge + '" stroke-width="' + Math.max(0.8, r * 0.03) + '" stroke-linejoin="round"/>';
    // diamond fire: tiny coloured glints
    if (st.key === "diamond") {
      ["#ff7aa2", "#7ad7ff", "#ffe27a", "#9dff9a"].forEach(function (col, n) {
        var p = toward(P[(n * 9 + 3) % P.length], C, 0.68);
        out += '<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="' + f1(r * 0.05) + '" fill="' + col + '" opacity=".55"/>';
      });
    }
    // sparkle
    var sp = toward(P[N - 4] || P[7], C, 0.55), s = r * 0.22;
    out += '<path class="tw" d="M' + f1(sp[0]) + ' ' + f1(sp[1] - s) + ' L' + f1(sp[0] + s * 0.18) + ' ' + f1(sp[1] - s * 0.18) + ' L' + f1(sp[0] + s) + ' ' + f1(sp[1]) + ' L' + f1(sp[0] + s * 0.18) + ' ' + f1(sp[1] + s * 0.18) + ' L' + f1(sp[0]) + ' ' + f1(sp[1] + s) + ' L' + f1(sp[0] - s * 0.18) + ' ' + f1(sp[1] + s * 0.18) + ' L' + f1(sp[0] - s) + ' ' + f1(sp[1]) + ' L' + f1(sp[0] - s * 0.18) + ' ' + f1(sp[1] - s * 0.18) + ' Z" fill="#fff"/>';
    return out;
  }

  // ---------- claws ----------
  var CLAWS = { round: [1, 6, 11, 17, 22, 27], oval: [3, 13, 19, 29], pear: [0, 12, 20], marquise: [0, 16], princess: [0, 8, 16, 24], emerald: [0, 2, 4, 6] };
  function claws(cut, cx, cy, r, id, behind) {
    var P = outline(cut, cx, cy, r), C = centre(cut, cx, cy, r), out = "";
    var spots = cut === "emerald"
      ? [[1, 2], [3, 4], [5, 6], [7, 0]].map(function (q) { return [(P[q[0]][0] + P[q[1]][0]) / 2, (P[q[0]][1] + P[q[1]][1]) / 2]; })
      : CLAWS[cut].map(function (i) { return P[i % P.length]; });
    spots.forEach(function (p) {
      var o = toward(p, C, behind ? 1.12 : 1.02), sz = Math.max(2.2, r * 0.11);
      if (behind) out += '<ellipse cx="' + f1(o[0]) + '" cy="' + f1(o[1] + sz * 0.6) + '" rx="' + f1(sz * 0.9) + '" ry="' + f1(sz * 1.5) + '" fill="url(#mt' + id + ')"/>';
      else out += '<circle cx="' + f1(o[0]) + '" cy="' + f1(o[1]) + '" r="' + f1(sz) + '" fill="url(#mr' + id + ')" stroke="url(#md' + id + ')" stroke-width=".6"/>';
    });
    return out;
  }
  function setStone(cut, cx, cy, r, st, id) { return claws(cut, cx, cy, r, id, true) + stone(cut, cx, cy, r, st, id) + claws(cut, cx, cy, r, id, false); }

  // ---------- defs ----------
  function defs(id, metal) {
    var hi = mix(metal.color, "#ffffff", 0.7), lo = mix(metal.dark, "#000000", 0.25);
    return '<defs>' +
      '<radialGradient id="bg' + id + '" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ececec"/></radialGradient>' +
      '<linearGradient id="mt' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + hi + '"/><stop offset=".3" stop-color="' + metal.color + '"/><stop offset=".55" stop-color="' + lo + '"/><stop offset=".8" stop-color="' + metal.color + '"/><stop offset="1" stop-color="' + hi + '"/></linearGradient>' +
      '<linearGradient id="mh' + id + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="' + lo + '"/><stop offset=".25" stop-color="' + metal.color + '"/><stop offset=".5" stop-color="' + hi + '"/><stop offset=".75" stop-color="' + metal.color + '"/><stop offset="1" stop-color="' + lo + '"/></linearGradient>' +
      '<radialGradient id="mr' + id + '" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="' + metal.color + '"/><stop offset="1" stop-color="' + lo + '"/></radialGradient>' +
      '<linearGradient id="md' + id + '"><stop offset="0" stop-color="' + lo + '"/><stop offset="1" stop-color="' + lo + '"/></linearGradient>' +
      '<linearGradient id="tb' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".45" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#ffffff" stop-opacity=".15"/></linearGradient>' +
      '<filter id="sh' + id + '" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity=".25"/></filter>' +
      '<filter id="bl' + id + '"><feGaussianBlur stdDeviation="5"/></filter>' +
      '</defs>';
  }

  // ---------- pieces ----------
  function ring(d, st, metal, id, t) {
    var r = 20 + t * 26, cx = 160, ry = 205, cy = 138 - r * 0.62, out = "";
    out += '<ellipse cx="160" cy="292" rx="96" ry="9" fill="#000" opacity=".16" filter="url(#bl' + id + ')"/>';
    // back of band (thinner, in shadow)
    var hi = mix(metal.color, "#ffffff", 0.7), lo = mix(metal.dark, "#000000", 0.2);
    out += '<defs><linearGradient id="bd' + id + '" gradientUnits="userSpaceOnUse" x1="0" y1="' + (ry - 76) + '" x2="0" y2="' + (ry + 78) + '">' +
      '<stop offset="0" stop-color="' + lo + '"/><stop offset=".3" stop-color="' + metal.color + '"/><stop offset=".55" stop-color="' + metal.dark + '"/>' +
      '<stop offset=".78" stop-color="' + metal.color + '"/><stop offset=".92" stop-color="' + hi + '"/><stop offset="1" stop-color="' + metal.color + '"/></linearGradient></defs>';
    out += '<ellipse cx="' + cx + '" cy="' + ry + '" rx="83" ry="69" fill="none" stroke="url(#bd' + id + ')" stroke-width="13"/>';
    out += '<path d="M' + (cx - 76) + ' ' + (ry - 28) + ' A83 69 0 0 1 ' + (cx + 76) + ' ' + (ry - 28) + '" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="13" stroke-linecap="round"/>';
    // cathedral shoulders / gallery
    var gw = r * 0.62;
    out += '<path fill="url(#mh' + id + ')" d="M' + (cx - 34) + ' 134 C' + (cx - 30) + ' ' + (cy + r * 0.9) + ' ' + (cx - gw - 4) + ' ' + (cy + r * 0.75) + ' ' + (cx - gw) + ' ' + (cy + r * 0.45) +
      ' L' + (cx + gw) + ' ' + (cy + r * 0.45) + ' C' + (cx + gw + 4) + ' ' + (cy + r * 0.75) + ' ' + (cx + 30) + ' ' + (cy + r * 0.9) + ' ' + (cx + 34) + ' 134 Z"/>';
    out += '<path fill="none" stroke="#000" stroke-opacity=".15" d="M' + (cx - gw * 0.6) + ' ' + (cy + r * 0.6) + ' Q' + cx + ' ' + (cy + r * 1.05) + ' ' + (cx + gw * 0.6) + ' ' + (cy + r * 0.6) + '"/>';
    out += setStone(d.cut, cx, cy, r, st, id);
    // front of band: thicker, catching the light
    var arc = 'M' + (cx - 83) + ' ' + (ry + 2) + ' A83 69 0 0 0 ' + (cx + 83) + ' ' + (ry + 2);
    out += '<path d="' + arc + '" transform="translate(0 4)" fill="none" stroke="' + mix(metal.dark, "#000", 0.35) + '" stroke-width="14"/>';
    out += '<path d="' + arc + '" fill="none" stroke="url(#bd' + id + ')" stroke-width="14"/>';
    out += '<path d="M' + (cx - 66) + ' ' + (ry + 36) + ' Q' + cx + ' ' + (ry + 82) + ' ' + (cx + 66) + ' ' + (ry + 36) + '" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2.5" stroke-linecap="round"/>';
    return out;
  }

  function studs(d, st, metal, id, t) {
    var r = 22 + t * 22, out = "";
    [105, 215].forEach(function (x, n) {
      out += '<ellipse cx="' + x + '" cy="' + (175 + r + 26) + '" rx="' + (r * 0.9) + '" ry="5" fill="#000" opacity=".14" filter="url(#bl' + id + ')"/>';
      out += setStone(d.cut, x, 160, r, st, id + (n ? "" : ""));
    });
    return out;
  }

  function pendant(d, st, metal, id, t) {
    var r = 22 + t * 22, cy = 190, out = "";
    var top = Math.min.apply(null, outline(d.cut, 160, cy, r).map(function (p) { return p[1]; })), bail = top - 18;
    // chain: links along a curve to the bail
    var p0 = [24, 6], p2 = [296, 6], p1 = [160, 2 * (bail - 8) - 6];
    for (var i = 0; i <= 64; i++) {
      var u = i / 64, x = (1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * p1[0] + u * u * p2[0];
      var y = (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * p1[1] + u * u * p2[1];
      var dx = 2 * (1 - u) * (p1[0] - p0[0]) + 2 * u * (p2[0] - p1[0]), dy = 2 * (1 - u) * (p1[1] - p0[1]) + 2 * u * (p2[1] - p1[1]);
      var a = Math.atan2(dy, dx) * 180 / Math.PI + (i % 2 ? 0 : 0);
      out += '<ellipse cx="' + f1(x) + '" cy="' + f1(y) + '" rx="3.4" ry="' + (i % 2 ? 1.2 : 2) + '" transform="rotate(' + f1(a) + ' ' + f1(x) + ' ' + f1(y) + ')" fill="none" stroke="url(#mr' + id + ')" stroke-width="1.5"/>';
    }
    out += '<ellipse cx="160" cy="' + (cy + r + 34) + '" rx="' + (r * 0.8) + '" ry="5" fill="#000" opacity=".12" filter="url(#bl' + id + ')"/>';
    out += '<rect x="153" y="' + (bail - 10) + '" width="14" height="22" rx="7" fill="none" stroke="url(#mh' + id + ')" stroke-width="4"/>';
    out += '<line x1="160" y1="' + (bail + 10) + '" x2="160" y2="' + (top + 4) + '" stroke="url(#mh' + id + ')" stroke-width="3"/>';
    out += setStone(d.cut, 160, cy, r, st, id);
    return out;
  }

  function bracelet(d, st, metal, id, t) {
    var out = "", n = 9, rb = 9 + t * 5;
    var p0 = [22, 112], p1 = [160, 300], p2 = [298, 112];
    out += '<path d="M' + p0[0] + ' ' + (p0[1] + 30) + ' Q160 330 ' + p2[0] + ' ' + (p2[1] + 30) + '" fill="none" stroke="#000" stroke-opacity=".1" stroke-width="16" filter="url(#bl' + id + ')"/>';
    var P = [];
    for (var i = 0; i < n; i++) {
      var u = (i + 0.5) / n;
      P.push([(1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * p1[0] + u * u * p2[0], (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * p1[1] + u * u * p2[1]]);
    }
    for (i = 0; i < n - 1; i++) out += '<line x1="' + f1(P[i][0]) + '" y1="' + f1(P[i][1]) + '" x2="' + f1(P[i + 1][0]) + '" y2="' + f1(P[i + 1][1]) + '" stroke="url(#mh' + id + ')" stroke-width="7" stroke-linecap="round"/>';
    P.forEach(function (p, k) {
      var big = k === (n - 1) / 2 ? 1.6 : 1, rr = rb * big;
      out += '<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="' + f1(rr * 1.18) + '" fill="url(#mr' + id + ')"/>';
      out += setStone(big > 1 ? d.cut : "round", p[0], p[1], rr, st, id);
    });
    return out;
  }

  window.renderDesign = function (svg, d) {
    var st = Object.assign({ key: d.stone }, window.STONES[d.stone]);
    var metal = window.METALS[d.metal];
    var id = "j" + (++uid);
    var t = (Number(d.size) - 0.5) / 2.5;
    var draw = { ring: ring, studs: studs, pendant: pendant, bracelet: bracelet }[d.piece] || ring;
    var title = svg.querySelector("title");
    svg.innerHTML = (title ? title.outerHTML : "") + defs(id, metal) +
      '<rect width="320" height="320" fill="url(#bg' + id + ')"/>' + draw(d, st, metal, id, t);
  };
})();
