/**
 * ═══════════════════════════════════════════════════════════════
 *  BIRTHDAY SURPRISE — Main JavaScript
 *  Handles navigation, animations, interactions & page logic
 * ═══════════════════════════════════════════════════════════════
 */

(function () {
  "use strict";

  /* ── Apply theme colors from config ─────────────────────────── */
  function applyThemeColors() {
    if (typeof birthdayConfig === "undefined" || !birthdayConfig.colors) return;
    const root = document.documentElement;
    const c = birthdayConfig.colors;
    if (c.primary) root.style.setProperty("--color-primary", c.primary);
    if (c.secondary) root.style.setProperty("--color-secondary", c.secondary);
    if (c.accent) root.style.setProperty("--color-accent", c.accent);
    if (c.dark) root.style.setProperty("--color-dark", c.dark);
    if (c.light) root.style.setProperty("--color-light", c.light);
  }

  /* ── Navbar Setup ───────────────────────────────────────────── */
  function initNavbar() {
    const brand = document.querySelector(".navbar-brand");
    if (brand && typeof birthdayConfig !== "undefined") {
      brand.textContent = birthdayConfig.logoText || "✨ B";
    }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });

    const toggler = document.querySelector(".navbar-toggler");
    const collapse = document.querySelector(".navbar-collapse");
    if (toggler && collapse) {
      collapse.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          const bsCollapse = bootstrap.Collapse.getInstance(collapse);
          if (bsCollapse && collapse.classList.contains("show")) {
            bsCollapse.hide();
          }
        });
      });
    }
  }

  /* ── Floating Particles ───────────────────────────────────────── */
  function createParticles(container, count, type) {
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const icons = type === "heart" ? ["♥", "💛", "💜"] : ["✦", "★", "✧"];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = type === "heart" ? "floating-heart" : "floating-star";
      el.textContent = icons[i % icons.length];
      el.style.left = Math.random() * 100 + "%";
      el.style.top = Math.random() * 100 + "%";
      el.style.animationDelay = Math.random() * 5 + "s";
      el.style.animationDuration = 4 + Math.random() * 4 + "s";
      el.setAttribute("aria-hidden", "true");
      container.appendChild(el);
    }
  }

  function initParticles() {
    document.querySelectorAll("[data-particles]").forEach((container) => {
      const type = container.dataset.particles || "star";
      const count = parseInt(container.dataset.particleCount, 10) || 15;
      createParticles(container, count, type);
    });
  }

  /* ── Page Transition ──────────────────────────────────────────── */
  function navigateWithTransition(url) {
    const overlay = document.getElementById("page-transition");
    if (!overlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.href = url;
      return;
    }
    overlay.classList.add("active");
    burstHearts();
    setTimeout(() => {
      window.location.href = url;
    }, 600);
  }

  function burstHearts() {
    const container = document.body;
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement("span");
      heart.textContent = "✨";
      heart.style.cssText = `
        position: fixed;
        left: ${50 + (Math.random() - 0.5) * 40}%;
        top: 50%;
        font-size: ${1 + Math.random()}rem;
        pointer-events: none;
        z-index: 10001;
        animation: burstOut 0.8s ease forwards;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
  }

  /* Add burst keyframes dynamically */
  if (!document.getElementById("burst-keyframes")) {
    const style = document.createElement("style");
    style.id = "burst-keyframes";
    style.textContent = `
      @keyframes burstOut {
        0% { opacity: 1; transform: translate(0, 0) scale(1); }
        100% { opacity: 0; transform: translate(${(Math.random() - 0.5) * 200}px, ${-100 - Math.random() * 100}px) scale(0.5); }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Welcome Page ───────────────────────────────────────────── */
  function initWelcome() {
    const btn = document.getElementById("open-surprise-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      navigateWithTransition("memories.html");
    });
  }

  /* ── Memories Page ────────────────────────────────────────────── */
  function initMemories() {
    const grid = document.getElementById("memories-grid");
    const modalEl = document.getElementById("memoryModal");
    if (!grid || !modalEl || typeof birthdayConfig === "undefined") return;

    const modal = new bootstrap.Modal(modalEl);
    grid.innerHTML = "";

    birthdayConfig.memories.forEach((memory, index) => {
      const col = document.createElement("div");
      col.className = "col-sm-6 col-lg-4 col-xl-3 fade-in-up";
      col.style.animationDelay = index * 0.1 + "s";

      col.innerHTML = `
        <div class="card memory-card" tabindex="0" role="button"
             aria-label="View memory" data-memory-id="${memory.id}">
          <div class="card-img-wrapper">
            <img src="${memory.image}" class="card-img-top" alt="Memory image" loading="lazy">
          </div>
          <div class="card-body">
            ${memory.date ? `<span class="card-date">${memory.date}</span>` : ""}
            <p class="card-text">${memory.shortDesc}</p>
          </div>
        </div>
      `;

      const card = col.querySelector(".memory-card");
      const openModal = () => {
        document.getElementById("modal-memory-img").src = memory.image;
        document.getElementById("modal-memory-img").alt = "Memory image";
        const modalDate = document.getElementById("modal-memory-date");
        if (modalDate) {
          if (memory.date) {
            modalDate.textContent = memory.date;
            modalDate.hidden = false;
          } else {
            modalDate.textContent = "";
            modalDate.hidden = true;
          }
        }
        document.getElementById("modal-memory-desc").textContent = memory.fullDesc;
        modal.show();
      };

      card.addEventListener("click", openModal);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal();
        }
      });

      grid.appendChild(col);
    });
  }

  /* ── Messages Page (Scroll Reveal) ────────────────────────────── */
  function initMessages() {
    const container = document.getElementById("messages-container");
    const gratitude = document.getElementById("gratitude-banner");
    if (!container || typeof birthdayConfig === "undefined") return;

    birthdayConfig.friendshipMessages.forEach((msg, i) => {
      const card = document.createElement("div");
      card.className = "message-card";
      card.innerHTML = `<p>${msg}</p>`;
      card.dataset.revealIndex = i;
      container.appendChild(card);
    });

    if (gratitude) {
      gratitude.querySelector("p").textContent = birthdayConfig.gratitudeMessage;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    container.querySelectorAll(".message-card").forEach((card, i) => {
      card.style.transitionDelay = i * 0.15 + "s";
      observer.observe(card);
    });

    if (gratitude) observer.observe(gratitude);
  }

  /* ── Confetti Engine ──────────────────────────────────────────── */
  let confettiActive = false;

  function launchConfetti(duration) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let canvas = document.getElementById("confetti-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "confetti-canvas";
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff6b9d", "#c084fc", "#fbbf24", "#f472b6", "#a78bfa", "#34d399"];
    const pieces = [];

    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 2 + Math.random() * 4,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 8,
      });
    }

    confettiActive = true;
    const startTime = Date.now();

    function draw() {
      if (!confettiActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.angle * 0.05) * 2;
        p.angle += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      if (Date.now() - startTime < duration) {
        requestAnimationFrame(draw);
      } else {
        confettiActive = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    draw();
  }

  /* ── Balloons ─────────────────────────────────────────────────── */
  function launchBalloons() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let container = document.querySelector(".balloon-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "balloon-container";
      container.setAttribute("aria-hidden", "true");
      document.body.appendChild(container);
    }

    const colors = ["#ff6b9d", "#c084fc", "#fbbf24", "#34d399", "#60a5fa"];
    for (let i = 0; i < 12; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.left = Math.random() * 90 + 5 + "%";
      balloon.style.background = colors[i % colors.length];
      balloon.style.animationDelay = Math.random() * 1.5 + "s";
      balloon.style.animationDuration = 3 + Math.random() * 2 + "s";
      container.appendChild(balloon);
      setTimeout(() => balloon.remove(), 6000);
    }
  }

  /* ── Birthday Page ────────────────────────────────────────────── */
  let birthdayAudio = null;

  function initBirthday() {
    const nameEl = document.getElementById("birthday-name");
    if (nameEl && typeof birthdayConfig !== "undefined") {
      nameEl.textContent = birthdayConfig.name;
    }

    initCountdown();
    initBirthdayMusic();

    const wishBtn = document.getElementById("make-wish-btn");
    if (wishBtn) {
      wishBtn.addEventListener("click", () => {
        document.querySelectorAll(".candle-flame").forEach((flame) => {
          flame.classList.add("blown-out");
        });
        launchConfetti(4000);
        launchBalloons();
        addSparkles(document.querySelector(".cake-container"));
        wishBtn.disabled = true;
        wishBtn.innerHTML = '<span>Wish Made! ✨</span>';
      });
    }
  }

  function addSparkles(container) {
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < 15; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = Math.random() * 100 + "%";
      sparkle.style.animationDelay = Math.random() * 1.5 + "s";
      container.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 3000);
    }
  }

  function initCountdown() {
    const grid = document.getElementById("countdown-grid");
    const celebration = document.getElementById("countdown-celebration");
    if (!grid || typeof birthdayConfig === "undefined" || !birthdayConfig.birthday) return;

    const target = new Date(birthdayConfig.birthday + "T00:00:00");

    function update() {
      const now = new Date();
      const diff = target - now;

        if (diff <= 0) {
          // When the countdown reaches or passes the target, show zeros
          document.getElementById("countdown-days").textContent = "00";
          document.getElementById("countdown-hours").textContent = "00";
          document.getElementById("countdown-minutes").textContent = "00";
          document.getElementById("countdown-seconds").textContent = "00";
          if (celebration) {
            celebration.classList.remove("hidden");
            celebration.textContent = "It's Birthday Time! 🎉";
          }
          return;
        }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      document.getElementById("countdown-days").textContent = String(days).padStart(2, "0");
      document.getElementById("countdown-hours").textContent = String(hours).padStart(2, "0");
      document.getElementById("countdown-minutes").textContent = String(minutes).padStart(2, "0");
      document.getElementById("countdown-seconds").textContent = String(seconds).padStart(2, "0");
    }

    update();
    setInterval(update, 1000);
  }

  function initBirthdayMusic() {
    const playBtn = document.getElementById("play-music-btn");
    const pauseBtn = document.getElementById("pause-music-btn");
    if (!playBtn || typeof birthdayConfig === "undefined") return;

    birthdayAudio = new Audio(birthdayConfig.musicPath);
    birthdayAudio.loop = true;
    birthdayAudio.preload = "none";

    playBtn.addEventListener("click", () => {
      birthdayAudio.play().catch(() => {
        alert("Could not play music. Make sure you've added your MP3 file at: " + birthdayConfig.musicPath);
      });
      playBtn.classList.add("hidden");
      pauseBtn.classList.remove("hidden");
    });

    pauseBtn.addEventListener("click", () => {
      birthdayAudio.pause();
      pauseBtn.classList.add("hidden");
      playBtn.classList.remove("hidden");
    });
  }

  /* ── Meeting Page ─────────────────────────────────────────────── */
  function initMeeting() {
    const form = document.getElementById("meeting-form");
    const confirmation = document.getElementById("confirmation-card");
    const jokeSection = document.getElementById("joke-section");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const date = document.getElementById("meeting-date").value;
      const time = document.getElementById("meeting-time").value;
      if (!date) {
        showFormError("Please select a date.");
        return;
      }
      if (!time) {
        showFormError("Please select a time.");
        return;
      }

      const selectedDate = new Date(date + "T" + time);
      const now = new Date();
      now.setSeconds(0, 0);

      if (selectedDate < now) {
        showFormError("That date and time is in the past! Pick a future date. 😅");
        return;
      }

      clearFormError();

      const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const formattedTime = new Date("2000-01-01T" + time).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });

      document.getElementById("confirm-date").textContent = formattedDate;
      document.getElementById("confirm-time").textContent = formattedTime;

      form.classList.add("hidden");
      confirmation.classList.add("visible");

      try {
        localStorage.setItem(
          "birthdayMeeting",
          JSON.stringify({ date, time, formattedDate, formattedTime })
        );
      } catch (_) {
        /* localStorage optional */
      }

      setTimeout(() => {
        if (jokeSection) {
          jokeSection.classList.add("visible");
        }
      }, 2500);
    });

    const revealBtn = document.getElementById("reveal-joke-btn");
    if (revealBtn) {
      revealBtn.addEventListener("click", () => {
        const jokeCard = document.getElementById("joke-card");
        if (jokeCard) jokeCard.classList.add("revealed");
        revealBtn.classList.add("hidden");
        document.getElementById("last-thing-btn").classList.remove("hidden");
        launchConfetti(2000);
      });
    }

    const lastThingBtn = document.getElementById("last-thing-btn");
    if (lastThingBtn) {
      lastThingBtn.addEventListener("click", () => {
        navigateWithTransition("surprise.html");
      });
    }

    if (typeof birthdayConfig !== "undefined") {
      const jokeEl = document.getElementById("joke-text");
      if (jokeEl) jokeEl.textContent = birthdayConfig.meetingJoke;
    }

    const dateInput = document.getElementById("meeting-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.setAttribute("min", today);
    }

    // Skip button: show polished popup with countdown and close
    const skipBtn = document.getElementById("skip-meeting-btn");
    let skipPopup = document.getElementById("skip-popup");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        // refresh reference in case DOM changed
        skipPopup = document.getElementById("skip-popup");
        if (!skipPopup) {
          const p = document.createElement("div");
          p.id = "skip-popup";
          p.textContent = "labad date nakh ne";
          document.body.appendChild(p);
          setTimeout(() => p.remove(), 5000);
          return;
        }

        if (skipPopup.classList.contains("show")) return; // already showing

        skipPopup.classList.add("show");
        skipPopup.setAttribute("aria-hidden", "false");

        const countEl = document.getElementById("skip-count");
        const closeBtn = document.getElementById("skip-close");
        let remaining = 5;
        if (countEl) countEl.textContent = remaining;

        const interval = setInterval(() => {
          remaining -= 1;
          if (countEl) countEl.textContent = remaining;
          if (remaining <= 0) {
            clearInterval(interval);
            skipPopup.classList.remove("show");
            skipPopup.setAttribute("aria-hidden", "true");
          }
        }, 1000);

        const closeFn = () => {
          clearInterval(interval);
          skipPopup.classList.remove("show");
          skipPopup.setAttribute("aria-hidden", "true");
        };

        if (closeBtn) {
          closeBtn.onclick = closeFn;
        }
      });
    }
  }

  function showFormError(msg) {
    let errorEl = document.getElementById("form-error");
    if (!errorEl) {
      errorEl = document.createElement("div");
      errorEl.id = "form-error";
      errorEl.className = "alert alert-danger mt-3";
      errorEl.setAttribute("role", "alert");
      document.getElementById("meeting-form").appendChild(errorEl);
    }
    errorEl.textContent = msg;
    errorEl.classList.remove("hidden");
  }

  function clearFormError() {
    const errorEl = document.getElementById("form-error");
    if (errorEl) errorEl.classList.add("hidden");
  }

  /* ── Surprise / Final Page ────────────────────────────────────── */
  function initSurprise() {
    const nameEl = document.getElementById("final-name");
    const messageEl = document.getElementById("final-message");
    const replayBtn = document.getElementById("replay-btn");

    if (typeof birthdayConfig !== "undefined") {
      if (nameEl) nameEl.textContent = birthdayConfig.name;
      if (messageEl) messageEl.textContent = birthdayConfig.finalMessage;
    }

    setTimeout(() => launchConfetti(5000), 800);

    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        try {
          localStorage.removeItem("birthdayMeeting");
        } catch (_) {}
        navigateWithTransition("index.html");
      });
    }

    initBirthdayMusic();
  }

  /* ── Smooth scroll for anchor links ───────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  /* ── Page Router ──────────────────────────────────────────────── */
  function initPage() {
    applyThemeColors();
    initNavbar();
    initParticles();
    initSmoothScroll();

    const page = document.body.dataset.page;
    switch (page) {
      case "welcome":
        initWelcome();
        break;
      case "memories":
        initMemories();
        break;
      case "messages":
        initMessages();
        break;
      case "birthday":
        initBirthday();
        break;
      case "meeting":
        initMeeting();
        break;
      case "surprise":
        initSurprise();
        break;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
})();
