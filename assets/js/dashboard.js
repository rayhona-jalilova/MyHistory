/* =========================================================
   MY HISTORY — DASHBOARD JAVASCRIPT
   Version: 1.0
========================================================= */

"use strict";


/* =========================================================
   1. DOM ELEMENTS
========================================================= */

const sidebar =
    document.getElementById("dashboardSidebar");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const dashboardOverlay =
    document.getElementById("dashboardOverlay");

const notificationButton =
    document.getElementById("notificationButton");

const notificationPanel =
    document.getElementById("notificationPanel");

const closeNotificationPanel =
    document.getElementById("closeNotificationPanel");

const userMenuButton =
    document.getElementById("userMenuButton");

const userDropdown =
    document.getElementById("userDropdown");

const dashboardSearch =
    document.getElementById("dashboardSearch");

const storiesGrid =
    document.getElementById("storiesGrid");


/* =========================================================
   2. HELPER FUNCTIONS
========================================================= */


/*
    Close mobile sidebar
*/

function closeSidebar() {

    if (!sidebar) return;

    sidebar.classList.remove("open");

    if (dashboardOverlay) {

        dashboardOverlay.classList.remove("show");

    }

}


/*
    Open mobile sidebar
*/

function openSidebar() {

    if (!sidebar) return;

    sidebar.classList.add("open");

    if (dashboardOverlay) {

        dashboardOverlay.classList.add("show");

    }

}


/*
    Close notification
*/

function closeNotifications() {

    if (!notificationPanel) return;

    notificationPanel.classList.remove("show");

}


/*
    Open notification
*/

function openNotifications() {

    if (!notificationPanel) return;

    notificationPanel.classList.add("show");

}


/*
    Close user menu
*/

function closeUserMenu() {

    if (!userDropdown) return;

    userDropdown.classList.remove("show");

}


/*
    Open user menu
*/

function openUserMenu() {

    if (!userDropdown) return;

    userDropdown.classList.add("show");

}


/*
    Close all floating menus
*/

function closeAllMenus() {

    closeNotifications();

    closeUserMenu();

}


/* =========================================================
   3. MOBILE SIDEBAR
========================================================= */

if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                sidebar.classList.contains("open");


            closeAllMenus();


            if (isOpen) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );

}


/* =========================================================
   4. OVERLAY CLICK
========================================================= */

if (dashboardOverlay) {

    dashboardOverlay.addEventListener(
        "click",
        function () {

            closeSidebar();

            closeAllMenus();

        }
    );

}


/* =========================================================
   5. NOTIFICATION PANEL
========================================================= */

if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const isOpen =
                notificationPanel.classList.contains("show");


            closeUserMenu();


            if (isOpen) {

                closeNotifications();

            } else {

                openNotifications();

            }

        }
    );

}


if (closeNotificationPanel) {

    closeNotificationPanel.addEventListener(
        "click",
        function () {

            closeNotifications();

        }
    );

}


/* =========================================================
   6. USER PROFILE DROPDOWN
========================================================= */

if (userMenuButton) {

    userMenuButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const isOpen =
                userDropdown.classList.contains("show");


            closeNotifications();


            if (isOpen) {

                closeUserMenu();

            } else {

                openUserMenu();

            }

        }
    );

}


/* =========================================================
   7. CLOSE MENUS WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {


        /*
            Notification panel
        */

        if (
            notificationPanel &&
            !notificationPanel.contains(event.target) &&
            notificationButton &&
            !notificationButton.contains(event.target)
        ) {

            closeNotifications();

        }


        /*
            User dropdown
        */

        if (
            userDropdown &&
            !userDropdown.contains(event.target) &&
            userMenuButton &&
            !userMenuButton.contains(event.target)
        ) {

            closeUserMenu();

        }

    }
);


/* =========================================================
   8. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeSidebar();

            closeAllMenus();

        }

    }
);


/* =========================================================
   9. CTRL + K SEARCH
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
            Windows / Linux:
            Ctrl + K

            Mac:
            Command + K
        */

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();


            if (dashboardSearch) {

                dashboardSearch.focus();

                dashboardSearch.select();

            }

        }

    }
);


/* =========================================================
   10. STORY SEARCH
========================================================= */

if (dashboardSearch && storiesGrid) {

    dashboardSearch.addEventListener(
        "input",
        function () {

            const searchValue =
                dashboardSearch.value
                    .toLowerCase()
                    .trim();


            const storyCards =
                storiesGrid.querySelectorAll(
                    ".story-card"
                );


            let visibleStories = 0;


            storyCards.forEach(
                function (card) {

                    const title =
                        (
                            card.dataset.title ||
                            card
                                .querySelector("h3")
                                ?.textContent ||
                            ""
                        )
                        .toLowerCase();


                    const description =
                        (
                            card
                                .querySelector("p")
                                ?.textContent ||
                            ""
                        )
                        .toLowerCase();


                    const matches =
                        title.includes(searchValue) ||
                        description.includes(searchValue);


                    if (matches) {

                        card.style.display = "";

                        visibleStories++;

                    } else {

                        card.style.display = "none";

                    }

                }
            );


            /*
                Search result message
            */

            let resultMessage =
                document.getElementById(
                    "storySearchMessage"
                );


            if (!resultMessage) {

                resultMessage =
                    document.createElement("div");

                resultMessage.id =
                    "storySearchMessage";

                resultMessage.style.gridColumn =
                    "1 / -1";

                resultMessage.style.padding =
                    "30px";

                resultMessage.style.textAlign =
                    "center";

                resultMessage.style.color =
                    "#9a95a7";

                resultMessage.style.fontSize =
                    "12px";

                storiesGrid.appendChild(
                    resultMessage
                );

            }


            if (
                searchValue &&
                visibleStories === 0
            ) {

                resultMessage.textContent =
                    "No stories found.";

                resultMessage.style.display =
                    "block";

            } else {

                resultMessage.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   11. SIDEBAR NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(
        ".dashboard-nav-link"
    );


navigationLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {


                const section =
                    link.dataset.section;


                /*
                    If link has a section,
                    show demo message
                */

                if (section) {

                    event.preventDefault();


                    handleSectionNavigation(
                        section
                    );

                }


                /*
                    Active menu
                */

                navigationLinks.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );


                /*
                    Close sidebar on mobile
                */

                if (
                    window.innerWidth <= 900
                ) {

                    closeSidebar();

                }

            }
        );

    }
);


/* =========================================================
   12. SECTION NAVIGATION
========================================================= */

function handleSectionNavigation(
    section
) {


    const sectionNames = {

        stories:
            "My Stories",

        characters:
            "Characters",

        ai:
            "AI Assistant",

        templates:
            "Templates",

        settings:
            "Settings"

    };


    const sectionTitle =
        sectionNames[section] ||
        "Section";


    showToast(
        `${sectionTitle} section is coming soon.`
    );

}


/* =========================================================
   13. VIEW ALL BUTTON
========================================================= */

const viewAllLinks =
    document.querySelectorAll(
        "[data-section]"
    );


viewAllLinks.forEach(
    function (element) {

        if (
            element.classList.contains(
                "dashboard-nav-link"
            )
        ) {

            return;

        }


        element.addEventListener(
            "click",
            function (event) {

                const section =
                    element.dataset.section;


                if (!section) return;


                event.preventDefault();


                handleSectionNavigation(
                    section
                );

            }
        );

    }
);


/* =========================================================
   14. AI QUICK ACTIONS
========================================================= */

const aiQuickActions =
    document.querySelectorAll(
        ".ai-quick-action"
    );


aiQuickActions.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const prompt =
                    button.dataset.prompt ||
                    "Create a new story";


                showToast(
                    `AI Assistant: ${prompt}`
                );

            }
        );

    }
);


/* =========================================================
   15. STORY MENU
========================================================= */

const storyMenuButtons =
    document.querySelectorAll(
        ".story-menu-button"
    );


storyMenuButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const storyCard =
                    button.closest(
                        ".story-card"
                    );


                const storyTitle =
                    storyCard
                        ?.querySelector("h3")
                        ?.textContent ||
                    "Story";


                showToast(
                    `${storyTitle} options are coming soon.`
                );

            }
        );

    }
);


/* =========================================================
   16. TOAST NOTIFICATION
========================================================= */

function showToast(
    message
) {


    /*
        Remove existing toast
    */

    const oldToast =
        document.querySelector(
            ".dashboard-toast"
        );


    if (oldToast) {

        oldToast.remove();

    }


    /*
        Create toast
    */

    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "dashboard-toast";


    toast.innerHTML = `

        <i class="fa-solid fa-circle-info"></i>

        <span>${message}</span>

    `;


    /*
        Toast styles
    */

    Object.assign(
        toast.style,
        {

            position: "fixed",

            bottom: "25px",

            right: "25px",

            zIndex: "3000",

            display: "flex",

            alignItems: "center",

            gap: "10px",

            padding: "13px 17px",

            borderRadius: "12px",

            color: "#ffffff",

            background:
                "linear-gradient(135deg, #7c3aed, #ec4899)",

            boxShadow:
                "0 12px 30px rgba(124, 58, 237, 0.25)",

            fontSize: "11px",

            fontWeight: "500",

            opacity: "0",

            transform:
                "translateY(15px)",

            transition:
                "all 0.3s ease"

        }

    );


    document.body.appendChild(
        toast
    );


    /*
        Show toast
    */

    requestAnimationFrame(
        function () {

            toast.style.opacity =
                "1";

            toast.style.transform =
                "translateY(0)";

        }
    );


    /*
        Hide toast
    */

    setTimeout(
        function () {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translateY(15px)";


            setTimeout(
                function () {

                    toast.remove();

                },
                300
            );

        },
        3000
    );

}


/* =========================================================
   17. WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        /*
            If screen becomes desktop,
            remove mobile sidebar state
        */

        if (
            window.innerWidth > 900
        ) {

            closeSidebar();

        }

    }
);


/* =========================================================
   18. WELCOME MESSAGE
========================================================= */

console.log(
    "MY HISTORY Dashboard loaded successfully."
);


/* =========================================================
   END OF DASHBOARD JAVASCRIPT
========================================================= */