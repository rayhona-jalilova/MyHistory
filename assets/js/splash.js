/* ==========================================
   MY HISTORY
   Splash Screen JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const googleBtn = document.querySelector(".btn-google");
    const guestBtn = document.querySelector(".btn-guest");
    const phone = document.querySelector(".phone");
    const logo = document.querySelector(".logo");

    // ==========================
    // Entrance Animation
    // ==========================

    phone.animate(
        [
            {
                opacity: 0,
                transform: "translateY(40px) scale(.95)"
            },
            {
                opacity: 1,
                transform: "translateY(0) scale(1)"
            }
        ],
        {
            duration: 900,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    // ==========================
    // Logo Glow Animation
    // ==========================

    let glow = false;

    setInterval(() => {

        glow = !glow;

        logo.style.filter = glow
            ? "drop-shadow(0 0 25px rgba(255,209,102,.9))"
            : "drop-shadow(0 0 10px rgba(255,209,102,.4))";

    }, 1800);

    // ==========================
    // Ripple Effect
    // ==========================

    function ripple(button, event) {

        const circle = document.createElement("span");

        const size = Math.max(button.clientWidth, button.clientHeight);

        circle.style.width = size + "px";
        circle.style.height = size + "px";

        circle.style.left =
            event.offsetX - size / 2 + "px";

        circle.style.top =
            event.offsetY - size / 2 + "px";

        circle.classList.add("ripple");

        button.appendChild(circle);

        setTimeout(() => {

            circle.remove();

        }, 600);

    }

    // ==========================
    // Google Button
    // ==========================

    googleBtn.addEventListener("click", (e) => {

        ripple(googleBtn, e);

        googleBtn.disabled = true;

        googleBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Loading...
        `;

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1200);

    });

    // ==========================
    // Guest Button
    // ==========================

    guestBtn.addEventListener("click", (e) => {

        ripple(guestBtn, e);

        guestBtn.disabled = true;

        guestBtn.innerHTML = "Opening...";

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 900);

    });

    // ==========================
    // Keyboard Shortcut
    // ==========================

    document.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            googleBtn.click();

        }

    });

});