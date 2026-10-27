// Simple passcode screen for the private preview.
// Only a SHA-256 hash of the passcode is stored here, not the passcode itself.
// This keeps casual visitors out; it is not a substitute for server-side security.
(function () {
  var PASS_HASH = "5933fe0c22c40a50d04f7dff6222ed294ddec5ccc694baccf1db54fd2470937a";
  var root = document.documentElement;
  var gate = document.getElementById("gate");
  var app = document.getElementById("app");

  function unlock() {
    root.classList.add("unlocked");
    app.removeAttribute("inert");
    app.removeAttribute("aria-hidden");
    try { sessionStorage.setItem("bs-unlocked", "1"); } catch (e) {}
  }

  if (root.classList.contains("unlocked")) { unlock(); return; }
  app.setAttribute("inert", "");
  app.setAttribute("aria-hidden", "true");
  setTimeout(function () { document.getElementById("gateCode").focus(); }, 50);

  async function sha256(text) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  document.getElementById("gateForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    var code = document.getElementById("gateCode").value.trim().toLowerCase();
    var msg = document.getElementById("gateMsg");
    if (!code) { msg.textContent = "Please enter the passcode."; return; }
    if ((await sha256(code)) === PASS_HASH) {
      msg.textContent = "";
      unlock();
      window.scrollTo(0, 0);
    } else {
      msg.textContent = "That passcode isn't right. Please check it and try again.";
      document.getElementById("gateCode").select();
    }
  });
})();
