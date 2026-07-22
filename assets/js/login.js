/* ==========================================
   MY HISTORY
   LOGIN PAGE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    const email = document.getElementById("email");

    const password = document.getElementById("password");

    const togglePassword = document.getElementById("togglePassword");

    const loginButton = document.querySelector(".login-btn");

    const googleButton = document.querySelector(".google-btn");

    /* ==========================
       SHOW / HIDE PASSWORD
    ========================== */

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.classList.remove("fa-eye");

            togglePassword.classList.add("fa-eye-slash");

        } else {

            password.type = "password";

            togglePassword.classList.remove("fa-eye-slash");

            togglePassword.classList.add("fa-eye");

        }

    });

    /* ==========================
       EMAIL VALIDATION
    ========================== */

    function validEmail(mail) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

    }

    /* ==========================
       LOGIN
    ========================== */

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        if (!validEmail(email.value)) {

            alert("Please enter a valid email address.");

            email.focus();

            return;

        }

        if (password.value.length < 6) {

            alert("Password must be at least 6 characters.");

            password.focus();

            return;

        }

        loginButton.disabled = true;

        loginButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Signing in...
        `;

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1500);

    });

    /* ==========================
       GOOGLE BUTTON
    ========================== */

    googleButton.addEventListener("click", () => {

        googleButton.disabled = true;

        googleButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Connecting...
        `;

        setTimeout(() => {

            alert("Google Login will be connected in the backend version.");

            googleButton.disabled = false;

            googleButton.innerHTML = `
                <i class="fa-brands fa-google"></i>
                Continue with Google
            `;

        }, 1500);

    });

    /* ==========================
       ENTER KEY EFFECT
    ========================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            loginButton.click();

        }

    });

});