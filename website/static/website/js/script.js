// =======================================
// Mehndi By Dhami
// Complete Professional JavaScript
// =======================================

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    // =======================================
    // Common Elements
    // =======================================

    const body = document.body;

    const darkModeBtn =
        document.getElementById("darkModeBtn");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const closeDrawerBtn =
        document.getElementById("closeDrawerBtn");

    const drawerOverlay =
        document.getElementById("drawerOverlay");

    const mobileDrawer =
        document.getElementById("mobileDrawer");


    // =======================================
    // Dark Mode
    // =======================================

    function updateDarkModeIcon(isDarkMode) {

        if (!darkModeBtn) {
            return;
        }

        const icon =
            darkModeBtn.querySelector("i");

        if (!icon) {
            return;
        }

        if (isDarkMode) {

            icon.className =
                "fa-solid fa-sun";

            darkModeBtn.setAttribute(
                "aria-label",
                "Enable light mode"
            );

            darkModeBtn.setAttribute(
                "title",
                "Enable light mode"
            );

        } else {

            icon.className =
                "fa-solid fa-moon";

            darkModeBtn.setAttribute(
                "aria-label",
                "Enable dark mode"
            );

            darkModeBtn.setAttribute(
                "title",
                "Enable dark mode"
            );

        }

    }


    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        body.classList.add("dark-mode");

        updateDarkModeIcon(true);

    } else {

        body.classList.remove("dark-mode");

        updateDarkModeIcon(false);

    }


    if (darkModeBtn) {

        darkModeBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const isDarkMode =
                    body.classList.toggle(
                        "dark-mode"
                    );

                localStorage.setItem(
                    "theme",
                    isDarkMode
                        ? "dark"
                        : "light"
                );

                updateDarkModeIcon(
                    isDarkMode
                );

            }
        );

    }


    // =======================================
    // Mobile Drawer Menu
    // =======================================

    function openMobileDrawer() {

        body.classList.add(
            "drawer-open"
        );

        if (mobileMenuBtn) {

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        if (mobileDrawer) {

            mobileDrawer.setAttribute(
                "aria-hidden",
                "false"
            );

        }

    }


    function closeMobileDrawer() {

        body.classList.remove(
            "drawer-open"
        );

        if (mobileMenuBtn) {

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        if (mobileDrawer) {

            mobileDrawer.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }


    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openMobileDrawer();

            }
        );

    }


    if (closeDrawerBtn) {

        closeDrawerBtn.addEventListener(
            "click",
            function () {

                closeMobileDrawer();

            }
        );

    }


    if (drawerOverlay) {

        drawerOverlay.addEventListener(
            "click",
            function () {

                closeMobileDrawer();

            }
        );

    }


    const drawerLinks =
        document.querySelectorAll(
            ".drawer-nav a, " +
            ".drawer-book-btn"
        );


    drawerLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileDrawer();

                }
            );

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMobileDrawer();

            }

        }
    );


    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 1050) {

                closeMobileDrawer();

            }

        }
    );


    // =======================================
    // Active Navbar Link
    // =======================================

    const allNavigationLinks =
        document.querySelectorAll(
            ".nav-links a, " +
            ".drawer-nav a, " +
            ".mobile-bottom-bar a"
        );


    allNavigationLinks.forEach(
        function (link) {

            try {

                const linkUrl =
                    new URL(
                        link.href,
                        window.location.origin
                    );

                const currentUrl =
                    new URL(
                        window.location.href
                    );


                if (
                    linkUrl.pathname ===
                    currentUrl.pathname
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            } catch (error) {

                console.warn(
                    "Navigation URL could not be read.",
                    error
                );

            }

        }
    );


    // =======================================
    // Smooth Scroll
    // =======================================

    const smoothScrollLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    smoothScrollLinks.forEach(
        function (anchor) {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


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


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );


    // =======================================
    // Counter Animation
    // =======================================

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    function startCounter(counter) {

        if (
            counter.dataset.started ===
            "true"
        ) {

            return;

        }


        const target =
            Number(
                counter.getAttribute(
                    "data-target"
                )
            );


        if (Number.isNaN(target)) {

            return;

        }


        counter.dataset.started =
            "true";


        let currentValue = 0;

        const counterSpeed = 120;

        const increment =
            Math.max(
                target / counterSpeed,
                1
            );


        function updateCounter() {

            currentValue =
                Math.min(
                    currentValue + increment,
                    target
                );


            counter.textContent =
                Math.ceil(currentValue);


            if (currentValue < target) {

                window.requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target + "+";

            }

        }


        updateCounter();

    }


    if (
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                startCounter(
                                    entry.target
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.3
                }
            );


        counters.forEach(
            function (counter) {

                counterObserver.observe(
                    counter
                );

            }
        );

    } else {

        counters.forEach(
            function (counter) {

                startCounter(counter);

            }
        );

    }


    // =======================================
    // Reveal Animation
    // =======================================

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".gallery-card, " +
            ".review-card, " +
            ".why-card"
        );


    revealElements.forEach(
        function (item) {

            item.style.opacity = "0";

            item.style.transform =
                "translateY(30px)";

            item.style.transition =
                "opacity 0.7s ease, " +
                "transform 0.7s ease";

        }
    );


    function revealElementsOnScroll() {

        const windowHeight =
            window.innerHeight;


        revealElements.forEach(
            function (item) {

                const elementTop =
                    item.getBoundingClientRect()
                        .top;


                if (
                    elementTop <
                    windowHeight - 70
                ) {

                    item.style.opacity = "1";

                    item.style.transform =
                        "translateY(0)";

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        revealElementsOnScroll,
        {
            passive: true
        }
    );


    revealElementsOnScroll();


    // =======================================
    // Scroll To Top Button
    // =======================================

    let topBtn =
        document.getElementById(
            "topBtn"
        );


    if (!topBtn) {

        topBtn =
            document.createElement(
                "button"
            );

        topBtn.type = "button";

        topBtn.id = "topBtn";

        topBtn.innerHTML =
            '<i class="fa-solid fa-arrow-up"></i>';

        topBtn.setAttribute(
            "aria-label",
            "Scroll to top"
        );

        topBtn.setAttribute(
            "title",
            "Scroll to top"
        );

        document.body.appendChild(
            topBtn
        );

    }


    topBtn.style.cssText = `
        position: fixed;
        right: 22px;
        bottom: 98px;
        width: 48px;
        height: 48px;
        display: none;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 50%;
        background: #b76e79;
        color: #ffffff;
        font-size: 18px;
        cursor: pointer;
        z-index: 850;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
        touch-action: manipulation;
    `;


    function updateTopButton() {

        if (window.scrollY > 400) {

            topBtn.style.display =
                "flex";

        } else {

            topBtn.style.display =
                "none";

        }

    }


    window.addEventListener(
        "scroll",
        updateTopButton,
        {
            passive: true
        }
    );


    updateTopButton();


    topBtn.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    // =======================================
    // Gallery Popup
    // =======================================

    const galleryImages =
        document.querySelectorAll(
            ".gallery-card img"
        );


    galleryImages.forEach(
        function (image) {

            image.addEventListener(
                "click",
                function () {

                    const popup =
                        document.createElement(
                            "div"
                        );


                    popup.className =
                        "gallery-popup";


                    popup.innerHTML = `
                        <button
                            type="button"
                            class="gallery-popup-close"
                            aria-label="Close image"
                        >
                            <i class="fa-solid fa-xmark"></i>
                        </button>

                        <img
                            src="${image.src}"
                            alt="${image.alt || "Mehndi design"}"
                        >
                    `;


                    document.body.appendChild(
                        popup
                    );


                    const previousOverflow =
                        document.body.style
                            .overflow;


                    document.body.style
                        .overflow = "hidden";


                    const closePopupButton =
                        popup.querySelector(
                            ".gallery-popup-close"
                        );


                    function closeGalleryPopup() {

                        popup.remove();

                        document.body.style
                            .overflow =
                            previousOverflow;

                        document.removeEventListener(
                            "keydown",
                            closePopupWithEscape
                        );

                    }


                    function closePopupWithEscape(
                        event
                    ) {

                        if (
                            event.key ===
                            "Escape"
                        ) {

                            closeGalleryPopup();

                        }

                    }


                    popup.addEventListener(
                        "click",
                        function (event) {

                            if (
                                event.target ===
                                popup
                            ) {

                                closeGalleryPopup();

                            }

                        }
                    );


                    if (closePopupButton) {

                        closePopupButton.addEventListener(
                            "click",
                            closeGalleryPopup
                        );

                    }


                    document.addEventListener(
                        "keydown",
                        closePopupWithEscape
                    );

                }
            );

        }
    );


    // =======================================
    // Booking Form
    // =======================================

    const bookingForm =
        document.querySelector(
            'form[data-form-type="booking"], ' +
            ".booking-form form, " +
            "form#bookingForm"
        );


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function () {

                const submitButton =
                    bookingForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.innerHTML =
                        '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

                }

            }
        );

    }


    // =======================================
    // Contact Form
    // =======================================

    const contactForm =
        document.querySelector(
            "form.contact-form, " +
            "#contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function () {

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.innerHTML =
                        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                }

            }
        );

    }


    // =======================================
    // Review Form
    // =======================================

    const reviewForm =
        document.querySelector(
            ".review-form"
        );


    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            function () {

                const submitButton =
                    reviewForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.innerHTML =
                        '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Review...';

                }

            }
        );

    }


    // =======================================
    // External Link Security
    // =======================================

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(
        function (link) {

            const currentRel =
                link.getAttribute("rel") || "";


            if (
                !currentRel.includes(
                    "noopener"
                )
            ) {

                link.setAttribute(
                    "rel",
                    (
                        currentRel +
                        " noopener noreferrer"
                    ).trim()
                );

            }

        }
    );


    // =======================================
    // Website Loaded
    // =======================================

    console.log(
        "Mehndi By Dhami loaded successfully."
    );

});