/* =========================================================
   PART 1
   MOBILE MENU • SMOOTH SCROLL • STICKY NAVBAR
   ACTIVE NAVIGATION • SCROLL INDICATOR
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ===================================== */

    const navbar = document.querySelector(".navbar");
    const nav = document.querySelector(".navbar nav");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelectorAll(".navbar nav a");

    const scrollIndicator = document.querySelector(".scroll-indicator");

    const sections = document.querySelectorAll("section[id]");

    /* =====================================
       MOBILE MENU
    ===================================== */

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("active");

            document.body.classList.toggle("no-scroll");

            menuToggle.classList.toggle("active");

        });

    }

    /* =====================================
       CLOSE MENU AFTER CLICK
    ===================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuToggle.classList.remove("active");

            document.body.classList.remove("no-scroll");

        });

    });

    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetID = this.getAttribute("href");

            if (!targetID.startsWith("#")) return;

            const target = document.querySelector(targetID);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

    /* =====================================
       STICKY NAVBAR
    ===================================== */

    function updateNavbar() {

        if (window.scrollY > 40) {

            navbar.classList.add("glass");

        } else {

            navbar.classList.remove("glass");

        }

    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {

        passive: true

    });

    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    function updateActiveLink() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 140;

            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink, {

        passive: true

    });

    /* =====================================
       SCROLL INDICATOR
    ===================================== */

    function updateScrollIndicator() {

        if (!scrollIndicator) return;

        if (window.scrollY > 40) {

            scrollIndicator.style.opacity = "0";
            scrollIndicator.style.pointerEvents = "none";
            scrollIndicator.style.transform = "translateY(20px)";

        } else {

            scrollIndicator.style.opacity = "1";
            scrollIndicator.style.pointerEvents = "auto";
            scrollIndicator.style.transform = "translateY(0)";

        }

    }

    updateScrollIndicator();

    window.addEventListener("scroll", updateScrollIndicator, {

        passive: true

    });

    /* =====================================
       SCROLL TO TOP
    ===================================== */

    const scrollTopBtn = document.createElement("button");

    scrollTopBtn.className = "scroll-top";

    scrollTopBtn.innerHTML = "↑";

    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    function updateScrollTopButton() {

        if (window.scrollY > 500) {

            scrollTopBtn.classList.add("show");

        } else {

            scrollTopBtn.classList.remove("show");

        }

    }

    updateScrollTopButton();

    window.addEventListener("scroll", updateScrollTopButton, {

        passive: true

    });

    /* =====================================
       FOOTER YEAR
    ===================================== */

    const yearElement = document.querySelector(".current-year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

});


/* =========================================================
   PART 2
   REVEAL ANIMATIONS • SKILL BARS • COUNTERS
   PARALLAX • PROGRESS BAR • INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       REVEAL ANIMATIONS
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".fade-up, .fade-left, .fade-right, .zoom-in, .reveal"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");
                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

    /* =====================================
       SKILL BAR ANIMATION
    ===================================== */

    const skillBars = document.querySelectorAll(".skill-progress");

    const skillObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const bar = entry.target;

            const finalWidth = bar.style.width;

            bar.style.width = "0";

            setTimeout(() => {

                bar.style.transition = "width 1.5s ease";
                bar.style.width = finalWidth;

            }, 150);

            skillObserver.unobserve(bar);

        });

    }, {
        threshold: 0.35
    });

    skillBars.forEach(bar => {

        skillObserver.observe(bar);

    });

    /* =====================================
       ACHIEVEMENT COUNTERS
    ===================================== */

    const counters = document.querySelectorAll(".achievement-number");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const original = counter.textContent.trim();

            const numericValue = parseInt(original.replace(/\D/g, ""));

            if (isNaN(numericValue)) return;

            const suffix = original.replace(/[0-9]/g, "");

            let current = 0;

            const increment = Math.max(1, Math.ceil(numericValue / 80));

            const timer = setInterval(() => {

                current += increment;

                if (current >= numericValue) {

                    current = numericValue;

                    clearInterval(timer);

                }

                counter.textContent = current + suffix;

            }, 20);

            counterObserver.unobserve(counter);

        });

    }, {
        threshold: 0.4
    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* =====================================
       HERO IMAGE PARALLAX
    ===================================== */

    const heroImage = document.querySelector(".hero-right img");

    function heroParallax() {

        if (!heroImage) return;

        const offset = window.scrollY * 0.08;

        heroImage.style.transform =
            `translateY(${offset}px)`;

    }

    window.addEventListener("scroll", heroParallax, {

        passive: true

    });

    /* =====================================
       SCROLL PROGRESS BAR
    ===================================== */

    const progressBar = document.createElement("div");

    progressBar.className = "scroll-progress";

    document.body.appendChild(progressBar);

    function updateProgressBar() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width = progress + "%";

    }

    updateProgressBar();

    window.addEventListener("scroll", updateProgressBar, {

        passive: true

    });

    /* =====================================
       NAVBAR BACKGROUND OPACITY
    ===================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbarOpacity() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.style.background =
                "rgba(255,255,255,.80)";

            navbar.style.backdropFilter =
                "blur(20px)";

        } else {

            navbar.style.background =
                "rgba(255,255,255,.25)";

            navbar.style.backdropFilter =
                "blur(12px)";

        }

    }

    updateNavbarOpacity();

    window.addEventListener("scroll", updateNavbarOpacity, {

        passive: true

    });

    /* =====================================
       IMAGE HOVER ENHANCEMENT
    ===================================== */

    const images = document.querySelectorAll(
        ".image-hover img"
    );

    images.forEach(image => {

        image.setAttribute(
            "loading",
            "lazy"
        );

    });

    /* =====================================
       INITIALIZATION
    ===================================== */
    /* =====================================
   HIRE ME BUTTON
===================================== */

const hireBtn = document.querySelector(".hire-btn");

if (hireBtn) {

    hireBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const defaultText = this.querySelector(".default-text");
        const originalText = defaultText.textContent;

        this.style.pointerEvents = "none";
        this.classList.add("loading");

        defaultText.textContent = "⏳ Preparing compelling evidence...";

        setTimeout(() => {

            const link = document.createElement("a");

            link.href = "Open_This_To_Hire_Raj.pdf";
            link.download = "Open_This_To_Hire_Raj.pdf";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            defaultText.textContent = "✅ Evidence Delivered.";

            setTimeout(() => {

                defaultText.textContent = originalText;

                this.style.pointerEvents = "auto";
                this.classList.remove("loading");

            }, 1200);

        }, 800);

    });

}
    heroParallax();
    updateProgressBar();
    updateNavbarOpacity();

});

