/* =========================================
   MASTER LOADING
========================================= */

document.body.classList.add("loading");

const loader = document.getElementById("master-loader");

const MIN_LOADING_TIME = 1300;

const loadingStart = Date.now();

window.addEventListener("load", () => {

    const elapsed = Date.now() - loadingStart;

    const remainingTime = Math.max(
        MIN_LOADING_TIME - elapsed,
        0
    );

    setTimeout(() => {

        loader.classList.add("hide");

        document.body.classList.remove("loading");

        // Bắt đầu skill animation sau khi loading kết thúc
        animateSkills();

    }, remainingTime);

});


/* =========================================
   AOS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 80
    });

});


/* =========================================
   TYPING EFFECT
========================================= */

const typingElement = document.getElementById("typing-text");

const typingWords = [
    "Lương Duy Thuận",
    "IT Student",
    "Web Developer",
    "JavaScript Developer"
];

let wordIndex = 0;
let charIndex = 0;

let isDeleting = false;

function typeEffect() {

    const currentWord = typingWords[wordIndex];

    if (!isDeleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1800);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length) {
                wordIndex = 0;
            }
        }
    }

    const speed = isDeleting ? 55 : 90;

    setTimeout(typeEffect, speed);
}

typeEffect();


/* =========================================
   HAMBURGER MENU
========================================= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {

    const isOpen =
        hamburger.classList.toggle("active");

    navMenu.classList.toggle("active");

    hamburger.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Đóng menu khi click link */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

        hamburger.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================
   SKILL PROGRESS
========================================= */

const skillProgressBars =
    document.querySelectorAll(".skill-progress");


function animateSkills() {

    skillProgressBars.forEach((bar, index) => {

        const progress = bar.dataset.progress;

        // Bắt đầu chắc chắn từ 0%
        bar.style.width = "0%";

        // Chạy lần lượt từng thanh
        setTimeout(() => {

            bar.style.width = progress + "%";

        }, 300 + index * 250);

    });

}


/* =========================================
   SKILL OBSERVER
   Nếu user chưa load xong skill section,
   animation sẽ chạy khi section xuất hiện.
========================================= */

const skillSection =
    document.getElementById("skills");

let skillsAnimated = false;

const skillObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting &&
                    !skillsAnimated
                ) {

                    skillsAnimated = true;

                    animateSkills();

                    skillObserver.unobserve(
                        skillSection
                    );
                }

            });

        },
        {
            threshold: 0.25
        }
    );


if (skillSection) {
    skillObserver.observe(skillSection);
}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");

function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            navLinks.forEach((link) => {

                link.classList.remove("active");

                const href =
                    link.getAttribute("href");

                if (href === `#${sectionId}`) {
                    link.classList.add("active");
                }

            });

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
    document.querySelector(".header");

function updateHeader() {

    if (window.scrollY > 40) {

        header.style.background =
            "rgba(4, 17, 23, 0.94)";

        header.style.boxShadow =
            "0 10px 30px rgba(0, 0, 0, 0.18)";

    } else {

        header.style.background =
            "rgba(6, 21, 28, 0.78)";

        header.style.boxShadow =
            "none";

    }

}

window.addEventListener(
    "scroll",
    updateHeader
);


/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((anchor) => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header.offsetHeight;

            const targetPosition =
                target.offsetTop -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }
    );

});


/* =========================================
   PERFORMANCE:
   Không chạy animation khi tab ẩn
========================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            document.body.classList.add(
                "tab-hidden"
            );

        } else {

            document.body.classList.remove(
                "tab-hidden"
            );

        }

    }
);


/* =========================================
   YEAR FOOTER
========================================= */

const footerText =
    document.querySelector(".footer p");

if (footerText) {

    const currentYear =
        new Date().getFullYear();

    footerText.textContent =
        `© ${currentYear} Lương Duy Thuận. All Rights Reserved.`;

}


/* =========================================
   INITIALIZE
========================================= */

updateActiveNav();
updateHeader();
