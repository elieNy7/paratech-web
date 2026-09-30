(function () {
  "use strict";
  var C = window.PARATECH_CONFIG;
  var I = window.PARATECH_I18N;
  var lang = "fr";

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function t(key) { return (I.dynamic[lang] || I.dynamic.fr)[key] || key; }
  function waLink(text) { return "https://wa.me/" + C.contact.whatsapp + "?text=" + encodeURIComponent(text); }

  /* ---------- Langue ---------- */
  // Deux façons de traduire : une clé (data-i18n → i18n.js) ou l'anglais écrit
  // directement à côté du français (data-en), utilisé par les pages produit.
  var originals = {};
  $$("[data-i18n], [data-en]").forEach(function (el, i) { el.dataset.i18nId = i; originals[i] = el.innerHTML; });
  function translated(el) {
    if (lang !== "en") return originals[el.dataset.i18nId];
    return el.dataset.en || I.en[el.dataset.i18n] || originals[el.dataset.i18nId];
  }
  var originalTitle = document.title;

  function setLang(next) {
    lang = next === "en" ? "en" : "fr";
    document.documentElement.lang = lang;
    $$("[data-i18n], [data-en]").forEach(function (el) { el.innerHTML = translated(el); });
    document.title = (lang === "en" && document.documentElement.dataset.titleEn) || originalTitle;
    fillDynamic();
    splitWords();
    try { localStorage.setItem("paratech-lang", lang); } catch (e) { /* stockage indisponible */ }
  }

  function initialLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q) return q;
    try { var saved = localStorage.getItem("paratech-lang"); if (saved) return saved; } catch (e) { /* ignore */ }
    return (navigator.language || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  }
  $$(".lang-switch").forEach(function (b) { b.addEventListener("click", function () { setLang(lang === "fr" ? "en" : "fr"); }); });

  /* ---------- Contenu issu de la config ---------- */
  function fillDynamic() {
    $$("[data-dl]").forEach(function (el) {
      var url = C.downloads[el.dataset.dl];
      if (!el.dataset.label) el.dataset.label = el.innerHTML;
      if (url) {
        el.href = url; el.target = "_blank"; el.rel = "noopener";
        el.classList.remove("disabled"); el.removeAttribute("aria-disabled");
      } else {
        el.removeAttribute("href"); el.classList.add("disabled"); el.setAttribute("aria-disabled", "true");
        el.textContent = t("soonDownload");
      }
    });
    $$("[data-notify]").forEach(function (el) {
      el.href = waLink(t("msgNotify")); el.target = "_blank"; el.rel = "noopener";
    });
    $$("[data-quote]").forEach(function (el) {
      el.href = waLink(t("msgQuote")); el.target = "_blank"; el.rel = "noopener";
    });
  }

  function fillStatic() {
    $$("[data-contact-text]").forEach(function (el) { el.textContent = C.contact[el.dataset.contactText]; });
    $$('[data-contact="whatsapp"]').forEach(function (a) { a.href = "https://wa.me/" + C.contact.whatsapp; });
    $$('[data-contact="email"]').forEach(function (a) { a.href = "mailto:" + C.contact.email; });
    $$("[data-legal]").forEach(function (el) { el.textContent = C.legal[el.dataset.legal]; });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    $$("[data-social]").forEach(function (box) {
      [["facebook", "f"], ["youtube", "▶"], ["linkedin", "in"]].forEach(function (s) {
        if (!C.contact[s[0]]) return;
        var a = document.createElement("a");
        a.href = C.contact[s[0]]; a.textContent = s[1]; a.target = "_blank"; a.rel = "noopener";
        a.setAttribute("aria-label", s[0]);
        box.appendChild(a);
      });
    });
  }

  /* ---------- Publicité (Google AdSense) ---------- */
  // Rien n'est chargé tant que l'identifiant éditeur est vide : pas de
  // cadre vide, pas de script tiers. ?ads=apercu montre les emplacements.
  function setupAds() {
    var A = C.ads || {}, slots = $$(".ad-slot");
    var preview = new URLSearchParams(location.search).get("ads") === "apercu";
    if (!A.client) {
      if (!preview) return;
      slots.forEach(function (s) {
        s.classList.add("on", "preview");
        s.innerHTML = '<span class="ad-label">' + t("adLabel") + '</span><ins>' + t("adPreview") + "</ins>";
      });
      return;
    }
    var script = document.createElement("script");
    script.async = true; script.crossOrigin = "anonymous";
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(A.client);
    document.head.appendChild(script);
    slots.forEach(function (s) {
      var id = (A.slots || {})[s.dataset.ad];
      if (!id) return; // sans bloc dédié, les annonces automatiques s'en chargent
      s.classList.add("on");
      s.innerHTML = '<span class="ad-label">' + t("adLabel") + '</span>' +
        '<ins class="adsbygoogle" data-ad-client="' + A.client + '" data-ad-slot="' + id +
        '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }

  /* ---------- Menu mobile ---------- */
  var toggle = $(".nav-toggle"), nav = $(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () { toggle.setAttribute("aria-expanded", nav.classList.toggle("open")); });
    $$(".nav a").forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }); });
  }

  /* ---------- Animations ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function splitWords() {
    $$(".split").forEach(function (el) {
      var i = 0, frag = document.createDocumentFragment();
      function wrap(node) {
        var w = document.createElement("span"), inner = document.createElement("span");
        w.className = "w"; inner.style.setProperty("--i", i++);
        inner.appendChild(node); w.appendChild(inner); return w;
      }
      Array.prototype.slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            frag.appendChild(/^\s+$/.test(part) ? document.createTextNode(" ") : wrap(document.createTextNode(part)));
          });
        } else { frag.appendChild(wrap(n.cloneNode(true))); }
      });
      el.innerHTML = ""; el.appendChild(frag);
    });
  }

  function setupReveal() {
    var groups = [
      [".section-head", ""], [".software-intro", "from-left"], [".accordion details", ""], [".flow-col .flow-node", ""],
      [".flow-hub", "zoom"], [".why-card", ""], [".why > div:first-child", "from-left"], [".process li", ""],
      [".service", ""], [".audience", ""], [".cta-band", "zoom"], [".contact-grid > *", ""], [".feat", ""],
      [".shot", ""], [".stat", ""], [".spec", ""], [".faq details", ""], [".usecase", ""], [".tabs", ""],
      [".split-row > div:first-child", "from-left"], [".split-media", "from-right"], [".roadmap li", ""]
    ];
    var items = [];
    groups.forEach(function (g) {
      $$(g[0]).forEach(function (el) {
        var index = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.classList.add("reveal");
        if (g[1]) el.classList.add(g[1]);
        el.style.setProperty("--d", Math.min(index, 5) * 80 + "ms");
        items.push(el);
      });
    });
    if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  function setupCounters() {
    if (reduceMotion) return;
    $$("[data-count]").forEach(function (el) {
      var target = +el.dataset.count, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1400, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      el.textContent = "0";
      setTimeout(function () { requestAnimationFrame(step); }, 500);
    });
  }

  function setupScroll() {
    var header = $(".site-header"), ticking = false;
    if (!header) return;
    function update() {
      var max = document.documentElement.scrollHeight - innerHeight;
      header.style.setProperty("--progress", max > 0 ? scrollY / max : 0);
      header.classList.toggle("scrolled", scrollY > 10);
      ticking = false;
    }
    addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  // Accordéon des logiciels : un seul ouvert à la fois
  function setupAccordion() {
    $$(".accordion").forEach(function (acc) {
      var items = $$("details", acc);
      items.forEach(function (d) {
        d.addEventListener("toggle", function () {
          if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
        });
      });
    });
  }

  // Galerie : un clic agrandit la capture (Échap ou clic pour fermer)
  function setupLightbox() {
    var shots = $$("[data-zoom]");
    if (!shots.length || typeof HTMLDialogElement === "undefined") return;
    var box = document.createElement("dialog");
    box.className = "lightbox";
    box.innerHTML = '<button class="lightbox-close" aria-label="Fermer">×</button><img alt=""><p></p>';
    document.body.appendChild(box);
    var img = $("img", box), caption = $("p", box);
    shots.forEach(function (shot) {
      shot.setAttribute("tabindex", "0");
      shot.setAttribute("role", "button");
      function open() {
        img.src = shot.currentSrc || shot.src; img.alt = shot.alt;
        var fig = shot.closest("figure"), cap = fig && $("figcaption b", fig);
        caption.textContent = cap ? cap.textContent : shot.alt;
        box.showModal();
      }
      shot.addEventListener("click", open);
      shot.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
    box.addEventListener("click", function () { box.close(); });
  }

  function setupTabs() {
    $$(".tabs").forEach(function (tabs) {
      var buttons = $$("[role=tab]", tabs), panels = $$("[role=tabpanel]", tabs);
      function show(index) {
        buttons.forEach(function (b, i) { b.setAttribute("aria-selected", i === index); b.tabIndex = i === index ? 0 : -1; });
        panels.forEach(function (p, i) {
          p.hidden = i !== index;
          if (i === index) { p.classList.remove("fade-in"); void p.offsetWidth; p.classList.add("fade-in"); }
        });
      }
      buttons.forEach(function (b, i) {
        b.addEventListener("click", function () { show(i); });
        b.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            var next = (i + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;
            buttons[next].focus(); show(next);
          }
        });
      });
      show(0);
    });
  }

  fillStatic();
  setLang(initialLang());
  setupAds();
  setupReveal();
  setupCounters();
  setupScroll();
  setupAccordion();
  setupLightbox();
  setupTabs();
})();
