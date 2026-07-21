// =======================================
// Mehndi By Dhami
// Professional JavaScript
// =======================================

document.addEventListener("DOMContentLoaded", function () {

    // =======================================
    // Dark Mode
    // =======================================

    const darkModeBtn = document.getElementById("darkModeBtn");
    const body = document.body;

    function updateDarkModeIcon(isDarkMode) {

        if (!darkModeBtn) {
            return;
        }

        const icon = darkModeBtn.querySelector("i");

        if (!icon) {
            return;
        }

        if (isDarkMode) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            darkModeBtn.setAttribute(
                "aria-label",
                "Enable light mode"
            );

            darkModeBtn.setAttribute(
                "title",
                "Enable light mode"
            );

        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

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


    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        updateDarkModeIcon(true);
    } else {
        body.classList.remove("dark-mode");
        updateDarkModeIcon(false);
    }


    if (darkModeBtn) {

        darkModeBtn.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isDarkMode =
                body.classList.toggle("dark-mode");

            localStorage.setItem(
                "theme",
                isDarkMode ? "dark" : "light"
            );

            updateDarkModeIcon(isDarkMode);
        });

    } else {
        console.warn(
            "Dark mode button with ID darkModeBtn was not found."
        );
    }


    // =======================================
    // Active Navbar Link
    // =======================================

    const navLinks = document.querySelectorAll(
        ".nav-links a"
    );

    navLinks.forEach(function (link) {

        const linkUrl = new URL(link.href);
        const currentUrl = new URL(window.location.href);

        if (
            linkUrl.pathname === currentUrl.pathname
        ) {
            link.classList.add("active");
        }

    });


    // =======================================
    // Smooth Scroll
    // =======================================

    const smoothScrollLinks =
        document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(function (anchor) {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =======================================
    // Counter Animation
    // =======================================

    const counters =
        document.querySelectorAll(".counter");

    const counterSpeed = 200;

    counters.forEach(function (counter) {

        const target = Number(
            counter.getAttribute("data-target")
        );

        if (Number.isNaN(target)) {
            return;
        }

        let currentValue = Number(
            counter.textContent
                .replace("+", "")
                .trim()
        );

        if (Number.isNaN(currentValue)) {
            currentValue = 0;
        }

        function updateCounter() {

            const increment =
                Math.max(target / counterSpeed, 1);

            if (currentValue < target) {

                currentValue = Math.min(
                    currentValue + increment,
                    target
                );

                counter.textContent =
                    Math.ceil(currentValue);

                window.setTimeout(
                    updateCounter,
                    10
                );

            } else {

                counter.textContent = target;

            }
        }

        updateCounter();

    });


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

    function revealElementsOnScroll() {

        const windowHeight =
            window.innerHeight;

        revealElements.forEach(function (item) {

            const top =
                item.getBoundingClientRect().top;

            if (top < windowHeight - 80) {

                item.style.opacity = "1";
                item.style.transform =
                    "translateY(0)";

            }

        });

    }

    window.addEventListener(
        "scroll",
        revealElementsOnScroll,
        { passive: true }
    );

    revealElementsOnScroll();


    // =======================================
    // Scroll To Top Button
    // =======================================

    const existingTopButton =
        document.getElementById("topBtn");

    if (!existingTopButton) {

        const topBtn =
            document.createElement("button");

        topBtn.type = "button";
        topBtn.id = "topBtn";
        topBtn.innerHTML =
            '<i class="fa-solid fa-arrow-up"></i>';

        topBtn.setAttribute(
            "aria-label",
            "Scroll to top"
        );

        document.body.appendChild(topBtn);

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
            z-index: 998;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
            touch-action: manipulation;
        `;

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 400) {
                    topBtn.style.display = "flex";
                } else {
                    topBtn.style.display = "none";
                }

            },
            { passive: true }
        );

        topBtn.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    // =======================================
    // Gallery Popup
    // =======================================

    const galleryImages =
        document.querySelectorAll(
            ".gallery-card img"
        );

    galleryImages.forEach(function (image) {

        image.addEventListener(
            "click",
            function () {

                const popup =
                    document.createElement("div");

                popup.className =
                    "gallery-popup-overlay";

                popup.style.cssText = `
                    position: fixed;
                    inset: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    background: rgba(0, 0, 0, 0.88);
                    z-index: 99999;
                    cursor: zoom-out;
                `;

                const popupImage =
                    document.createElement("img");

                popupImage.src = image.src;
                popupImage.alt =
                    image.alt || "Gallery image";

                popupImage.style.cssText = `
                    display: block;
                    max-width: 95%;
                    max-height: 90vh;
                    object-fit: contain;
                    border-radius: 16px;
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
                `;

                popup.appendChild(popupImage);
                document.body.appendChild(popup);

                document.body.style.overflow =
                    "hidden";

                function closePopup() {
                    popup.remove();
                    document.body.style.overflow = "";
                }

                popup.addEventListener(
                    "click",
                    closePopup
                );

                document.addEventListener(
                    "keydown",
                    function closeWithEscape(event) {

                        if (event.key === "Escape") {
                            closePopup();

                            document.removeEventListener(
                                "keydown",
                                closeWithEscape
                            );
                        }

                    }
                );

            }
        );

    });


    // =======================================
    // Booking Form
    // =======================================

    const bookingForm =
        document.querySelector(
            'form[data-form-type="booking"], ' +
            '.booking-form form, ' +
            'form#bookingForm'
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
                    submitButton.disabled = true;
                    submitButton.textContent =
                        "Submitting...";
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
                    submitButton.disabled = true;
                    submitButton.textContent =
                        "Sending...";
                }

            }
        );

    }


    console.log(
        "Mehndi By Dhami loaded successfully."
    );

});