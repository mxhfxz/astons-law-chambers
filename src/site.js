/*
 * Astons Law Chambers — site.js (Phase 0.5)
 * Loaded once per page, before </body>. Handles:
 *   1. Sticky emergency bar reveal on first paint
 *   2. WhatsApp wa.me links with per-page prefilled message
 *   3. Telephone link assurance
 *   4. Mega-menu open/close (pointer hover, touch press, keyboard Enter/Space)
 *   5. Hamburger drawer toggle + accordion practice-areas inside drawer
 *   6. Quick-exit safety feature — Esc-twice within 1000ms to google.com
 *   7. ARIA live-region announcements for emergency CTA clicks
 *
 * Strict rules per project memory:
 *   - No JS interception on tel: or wa.me links (announce + let through)
 *   - prefers-reduced-motion respected (decorative motion only)
 *   - No email funnels, popups, exit-intent, analytics auto-fire
 *   - No scroll listeners, no mutation observers (INP budget)
 */
(function () {
  "use strict";

  var QUICK_EXIT_WINDOW_MS = 1000;
  var MEGA_CLOSE_GRACE_MS  = 280;
  var WHATSAPP_NUMBER      = "447922247999";
  var PHONE_E164           = "+447922247999";
  var QUICK_EXIT_URL       = "https://www.google.com";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasHover       = window.matchMedia("(hover: hover)").matches;

  var FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  var WHATSAPP_MESSAGES = {
    "default":         "Hi Ghulam — I need urgent legal help",
    "homepage":        "Hi Ghulam — I need urgent legal help",
    "arrested":        "Hi Ghulam — I've been arrested and need urgent advice",
    "police-station":  "Hi Ghulam — I'm at the police station and need urgent advice",
    "crown-court":     "Hi Ghulam — I have a Crown Court hearing and need to instruct counsel",
    "magistrates":     "Hi Ghulam — I have a Magistrates' Court hearing and need advice",
    "appeal":          "Hi Ghulam — I'd like to discuss an appeal",
    "inquest":         "Hi Ghulam — I need representation at an inquest",
    "consultation":    "Hi Ghulam — I'd like to book a consultation",
    "fees":             "Hi Ghulam — I'd like to discuss fees for my matter",
    "drug":            "Hi Ghulam — I need advice on a drug-related matter",
    "sexual":          "Hi Ghulam — I need urgent advice on a sexual-offence matter",
    "violent":         "Hi Ghulam — I need urgent advice on a violent-offence matter",
    "fraud":           "Hi Ghulam — I need advice on a fraud or financial-crime matter",
    "driving":         "Hi Ghulam — I need advice on a driving-offence matter",
    "theft":           "Hi Ghulam — I need advice on a theft or robbery matter",
    "money-laundering": "Hi Ghulam — I need advice on a POCA / money-laundering matter",
    "youth":           "Hi Ghulam — I need advice on a youth-court matter"
  };

  /* ─────────────────────────────────────────────────────────────────
   * 1. Sticky bar reveal
   * ───────────────────────────────────────────────────────────────── */
  function revealStickyBar() {
    var bar = document.querySelector(".sticky-emergency-bar");
    if (!bar) return;
    if (prefersReduced) { bar.classList.add("is-visible"); return; }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bar.classList.add("is-visible"); });
    });
  }

  /* ─────────────────────────────────────────────────────────────────
   * 2. WhatsApp prefilled message routing
   * ───────────────────────────────────────────────────────────────── */
  function buildWhatsAppLinks() {
    var links = document.querySelectorAll("a[href*='wa.me'], a[data-whatsapp-context]");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var context = link.getAttribute("data-whatsapp-context") || "default";
      var message = WHATSAPP_MESSAGES[context] || WHATSAPP_MESSAGES["default"];
      var encoded = encodeURIComponent(message);
      link.setAttribute("href", "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encoded);
      link.setAttribute("rel", "noopener noreferrer");
      link.setAttribute("target", "_blank");
    }
  }

  /* ─────────────────────────────────────────────────────────────────
   * 3. Telephone link assurance
   * ───────────────────────────────────────────────────────────────── */
  function ensureTelLinks() {
    var links = document.querySelectorAll("[data-phone-link]");
    for (var i = 0; i < links.length; i++) {
      if (!links[i].getAttribute("href")) {
        links[i].setAttribute("href", "tel:" + PHONE_E164);
      }
    }
  }

  /* ─────────────────────────────────────────────────────────────────
   * 4. Mega-menu — desktop hover/keyboard, touch press
   * ───────────────────────────────────────────────────────────────── */
  function initMegaMenus() {
    var groups = document.querySelectorAll(".has-mega");
    for (var i = 0; i < groups.length; i++) {
      (function (group) {
        var trigger = group.querySelector(".has-mega__trigger");
        var panelId = trigger && trigger.getAttribute("aria-controls");
        var panel   = panelId && document.getElementById(panelId);
        if (!trigger || !panel) return;

        var closeTimer = null;

        function setOpen(isOpen) {
          trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
          if (isOpen) {
            panel.removeAttribute("hidden");
          } else {
            panel.setAttribute("hidden", "");
          }
        }

        function closeWithGrace() {
          window.clearTimeout(closeTimer);
          closeTimer = window.setTimeout(function () { setOpen(false); }, MEGA_CLOSE_GRACE_MS);
        }

        function cancelClose() { window.clearTimeout(closeTimer); }

        if (hasHover) {
          group.addEventListener("mouseenter", function () { cancelClose(); setOpen(true); });
          group.addEventListener("mouseleave", closeWithGrace);
          panel.addEventListener("mouseenter", cancelClose);
          panel.addEventListener("mouseleave", closeWithGrace);
        }

        trigger.addEventListener("click", function (e) {
          e.preventDefault();
          var isOpen = trigger.getAttribute("aria-expanded") === "true";
          setOpen(!isOpen);
        });

        trigger.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            var isOpen = trigger.getAttribute("aria-expanded") === "true";
            setOpen(!isOpen);
          }
        });

        document.addEventListener("click", function (e) {
          if (group.contains(e.target) || panel.contains(e.target)) return;
          if (trigger.getAttribute("aria-expanded") === "true") setOpen(false);
        });
      })(groups[i]);
    }
  }

  /* ─────────────────────────────────────────────────────────────────
   * 5. Hamburger drawer + drawer-internal accordion
   * ───────────────────────────────────────────────────────────────── */
  function initDrawer() {
    var btn    = document.querySelector("[data-drawer-toggle]");
    var drawer = document.querySelector("[data-drawer]");
    if (!btn || !drawer) return null;

    var previousFocus = null;

    function getFocusable() {
      var nodes = drawer.querySelectorAll(FOCUSABLE_SELECTOR);
      var list = [];
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (el.hasAttribute("hidden")) continue;
        var hiddenAncestor = el.closest("[hidden]");
        if (hiddenAncestor && hiddenAncestor !== drawer) continue;
        list.push(el);
      }
      return list;
    }

    function trapKey(e) {
      if (e.key !== "Tab") return;
      var focusable = getFocusable();
      if (focusable.length === 0) { e.preventDefault(); return; }
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      var active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !drawer.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !drawer.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function setOpen(isOpen) {
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      drawer.classList.toggle("is-open", isOpen);
      if (isOpen) drawer.removeAttribute("hidden");
      else drawer.setAttribute("hidden", "");
      document.documentElement.style.overflow = isOpen ? "hidden" : "";

      if (isOpen) {
        previousFocus = document.activeElement;
        document.addEventListener("keydown", trapKey);
        window.requestAnimationFrame(function () {
          var focusable = getFocusable();
          var target = focusable[0] || drawer;
          try { target.focus(); } catch (_) {}
        });
      } else {
        document.removeEventListener("keydown", trapKey);
        var validPrev = previousFocus
          && previousFocus !== document.body
          && previousFocus !== document.documentElement
          && document.contains(previousFocus);
        var restoreTarget = validPrev ? previousFocus : btn;
        previousFocus = null;
        window.requestAnimationFrame(function () {
          try { restoreTarget.focus(); } catch (_) {}
        });
      }
    }

    btn.addEventListener("click", function () {
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    var accordions = drawer.querySelectorAll("[data-drawer-accordion]");
    for (var i = 0; i < accordions.length; i++) {
      (function (toggle) {
        var listId = toggle.getAttribute("aria-controls");
        var list   = listId && document.getElementById(listId);
        if (!list) return;
        toggle.addEventListener("click", function () {
          var isOpen = toggle.getAttribute("aria-expanded") === "true";
          toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
          if (isOpen) list.setAttribute("hidden", "");
          else list.removeAttribute("hidden");
        });
      })(accordions[i]);
    }

    return { close: function () { setOpen(false); } };
  }

  /* ─────────────────────────────────────────────────────────────────
   * 6. Quick-exit — Esc-twice within 1000ms; button-click; ARIA label
   * ───────────────────────────────────────────────────────────────── */
  function initQuickExit(drawerApi) {
    function leave() {
      try { window.location.replace(QUICK_EXIT_URL); }
      catch (_) { window.location.href = QUICK_EXIT_URL; }
    }

    var btn = document.querySelector("[data-quick-exit]");
    if (btn) btn.addEventListener("click", function (e) { e.preventDefault(); leave(); });

    var lastEscAt = 0;
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" && e.key !== "Esc") return;

      var openMega = document.querySelector(".has-mega__trigger[aria-expanded='true']");
      if (openMega) {
        openMega.setAttribute("aria-expanded", "false");
        var panelId = openMega.getAttribute("aria-controls");
        var panel = panelId && document.getElementById(panelId);
        if (panel) panel.setAttribute("hidden", "");
      }
      var openDrawer = document.querySelector("[data-drawer].is-open");
      if (openDrawer && drawerApi && typeof drawerApi.close === "function") {
        drawerApi.close();
      }

      var now = Date.now();
      if (now - lastEscAt < QUICK_EXIT_WINDOW_MS) { leave(); return; }
      lastEscAt = now;
    });
  }

  /* ─────────────────────────────────────────────────────────────────
   * 7. ARIA live-region announcements on emergency CTA clicks
   * Polite — does not interrupt active speech. The link still navigates
   * natively; the announcement is supplementary for assistive tech.
   * ───────────────────────────────────────────────────────────────── */
  function ensureLiveRegion() {
    var region = document.querySelector(".live-region[data-live]");
    if (region) return region;
    region = document.createElement("div");
    region.className = "live-region";
    region.setAttribute("data-live", "");
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");
    document.body.appendChild(region);
    return region;
  }

  function initCtaAnnouncements() {
    var region = ensureLiveRegion();
    function announce(msg) {
      region.textContent = "";
      window.setTimeout(function () { region.textContent = msg; }, 50);
    }
    var phones = document.querySelectorAll("[data-phone-link], a[href^='tel:']");
    for (var i = 0; i < phones.length; i++) {
      phones[i].addEventListener("click", function () { announce("Calling 07922 247 999"); });
    }
    var whats = document.querySelectorAll("a[data-whatsapp-context], a[href*='wa.me']");
    for (var j = 0; j < whats.length; j++) {
      whats[j].addEventListener("click", function () { announce("Opening WhatsApp"); });
    }
  }

  /* ─────────────────────────────────────────────────────────────────
   * Init — single entry point on DOMContentLoaded
   * ───────────────────────────────────────────────────────────────── */
  function init() {
    buildWhatsAppLinks();
    ensureTelLinks();
    initMegaMenus();
    var drawerApi = initDrawer();
    initQuickExit(drawerApi);
    initCtaAnnouncements();
    revealStickyBar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
