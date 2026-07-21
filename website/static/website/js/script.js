// =======================================
// Mehndi By Dhami
// Professional JavaScript
// =======================================


// ================= Loader =================




// ================= Dark Mode =================

const themeBtn = document.getElementById("theme-btn");

if (themeBtn) {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        }

        else {

            localStorage.setItem("theme", "light");

            themeBtn.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    });

}


// ================= Active Navbar =================

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    if (link.href === window.location.href) {

        link.classList.add("active");

    }

});


// ================= Smooth Scroll =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


// ================= Counter Animation =================

const counters = document.querySelectorAll(".counter");

const speed = 200;

counters.forEach(counter => {

    const update = () => {

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {

            counter.innerText = Math.ceil(count + increment);

            setTimeout(update, 10);

        }

        else {

            counter.innerText = target;

        }

    };

    update();

});


// ================= Reveal Animation =================

const reveals = document.querySelectorAll(

    ".service-card,.gallery-card,.review-card,.why-card"

);

window.addEventListener("scroll", revealFunction);

function revealFunction() {

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        }

    });

}


// ================= Scroll To Top =================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.cssText = `
position:fixed;
bottom:100px;
right:25px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#b76e79;
color:white;
font-size:22px;
cursor:pointer;
display:none;
z-index:999;
`;

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    }

    else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};


// ================= Gallery Popup =================

const galleryImages = document.querySelectorAll(".gallery-card img");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        const popup = document.createElement("div");

        popup.style.cssText = `
position:fixed;
left:0;
top:0;
width:100%;
height:100%;
background:rgba(0,0,0,.8);
display:flex;
justify-content:center;
align-items:center;
z-index:9999;
`;

        popup.innerHTML = `

<img src="${img.src}"

style="
max-width:90%;
max-height:90%;
border-radius:15px;
">

`;

        popup.onclick = () => popup.remove();

        document.body.appendChild(popup);

    });

});


// ================= Booking Success =================

cconst bookingForm = document.querySelector("form");

if (bookingForm) {
    bookingForm.addEventListener("submit", () => {
        alert("✅ Booking Submitted Successfully.");
    });
}


// ================= Contact Success =================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", () => {

        alert("✅ Message Sent Successfully.");

    });

}

console.log("Mehndi By Dhami Loaded Successfully");


document.addEventListener("DOMContentLoaded", function () {

    const darkModeBtn = document.getElementById("darkModeBtn");
    const body = document.body;

    if (!darkModeBtn) {
        console.error("Dark mode button not found.");
        return;
    }

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        updateDarkModeIcon(true);
    }

    darkModeBtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isDarkMode = body.classList.toggle("dark-mode");

        localStorage.setItem(
            "theme",
            isDarkMode ? "dark" : "light"
        );

        updateDarkModeIcon(isDarkMode);
    });

    function updateDarkModeIcon(isDarkMode) {
        const icon = darkModeBtn.querySelector("i");

        if (!icon) {
            return;
        }

        if (isDarkMode) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    }

});