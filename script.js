
/* =================================
   MEDO MOHAREB - MAIN JAVASCRIPT
================================= */

// 1. MOBILE MENU

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}


// 2. AUTOMATIC FOOTER YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 3. PORTFOLIO FILTERS

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        portfolioItems.forEach(item => {
            const category = item.dataset.category;

            if (
                selectedFilter === "all" ||
                selectedFilter === category
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});


// 4. DARK / LIGHT MODE WITH SAVING

const themeToggle = document.getElementById("themeToggle");

function updateThemeButton() {
    if (!themeToggle) return;

    const isLight = document.body.classList.contains("light-mode");

    themeToggle.textContent = isLight ? "🌙" : "☀️";
}

function loadSavedTheme() {
    try {
        const savedTheme = localStorage.getItem("medo-theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
        } else {
            document.body.classList.remove("light-mode");
        }
    } catch (error) {
        console.warn("Theme storage is unavailable.");
    }

    updateThemeButton();
}

loadSavedTheme();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        try {
            localStorage.setItem(
                "medo-theme",
                isLight ? "light" : "dark"
            );
        } catch (error) {
            console.warn("Could not save theme.");
        }

        updateThemeButton();
    });
}


// 5. SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(
    ".section, .skill-card, .project-card, .portfolio-item, .contact-card"
);

if ("IntersectionObserver" in window) {

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver((entries, observerInstance) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observerInstance.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {
    revealElements.forEach(element => {
        element.classList.add("show");
    });
}


// 6. BACK TO TOP BUTTON

const backToTop = document.createElement("button");

backToTop.id = "backToTop";
backToTop.innerHTML = "↑";
backToTop.setAttribute("aria-label", "Back to top");

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// 7. CONSOLE MESSAGE

console.log("MEDO MOHAREB Portfolio Loaded Successfully!");
