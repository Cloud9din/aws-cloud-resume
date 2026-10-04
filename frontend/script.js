// ======================================
// CURRENT YEAR
// ======================================

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ======================================
// MOBILE NAVIGATION
// ======================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

function closeMobileMenu() {
    if (!menuToggle || !navMenu) {
        return;
    }

    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );
}


if (menuToggle && navMenu) {

    // Open / close mobile menu
    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });


    // Close menu when navigation link is clicked
    const menuLinks =
        navMenu.querySelectorAll("a");

    menuLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    // Close menu when clicking outside
    document.addEventListener(
        "click",
        (event) => {

            const clickedMenu =
                navMenu.contains(event.target);

            const clickedButton =
                menuToggle.contains(event.target);

            if (
                !clickedMenu &&
                !clickedButton
            ) {
                closeMobileMenu();
            }
        }
    );


    // Close menu with Escape key
    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }
        }
    );


    // Reset mobile menu when moving to desktop
    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 700) {
                closeMobileMenu();
            }
        }
    );
}


// ======================================
// NAVBAR SCROLL EFFECT
// ======================================

const header =
    document.querySelector(".header");


function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 25) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );
    }
}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


// ======================================
// ACTIVE NAVIGATION LINK
// ======================================

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav a"
    );


function updateActiveLink() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 140;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection =
                section.getAttribute("id");
        }
    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (
            target ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }
    });
}


window.addEventListener(
    "scroll",
    updateActiveLink,
    { passive: true }
);

updateActiveLink();


// ======================================
// SMOOTH NAVIGATION
// ======================================

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                12;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    );

});


// ======================================
// AWS VISITOR COUNTER
// ======================================

const visitorCount =
    document.getElementById(
        "visitor-count"
    );

const VISITOR_API_URL =
    "https://tkbpx3qk8i.execute-api.eu-west-2.amazonaws.com/visitors";


async function loadVisitorCount() {

    if (!visitorCount) {
        return;
    }

    visitorCount.textContent = "—";

    try {

        const response =
            await fetch(
                VISITOR_API_URL,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );

        if (!response.ok) {

            throw new Error(
                `API returned ${response.status}`
            );
        }

        const data =
            await response.json();

        if (
            typeof data.count === "number"
        ) {

            visitorCount.textContent =
                data.count.toLocaleString();

        } else {

            throw new Error(
                "Visitor count missing from API response"
            );
        }

    } catch (error) {

        console.error(
            "Visitor counter error:",
            error
        );

        visitorCount.textContent = "—";
    }
}


loadVisitorCount();