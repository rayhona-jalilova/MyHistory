/* =========================================================
   MY HISTORY — DASHBOARD JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const menuToggle = document.getElementById("menuToggle");
    const sidebarClose = document.getElementById("sidebarClose");

    const createModal = document.getElementById("createModal");
    const modalClose = document.getElementById("modalClose");

    const quickCreate = document.getElementById("quickCreate");
    const createStoryButton =
        document.getElementById("createStoryButton");

    const aiStudioButton =
        document.getElementById("aiStudioButton");

    const themeToggle =
        document.getElementById("themeToggle");

    const globalSearch =
        document.getElementById("globalSearch");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const profileButton =
        document.getElementById("profileButton");



    /* =====================================================
       1. MOBILE SIDEBAR
    ===================================================== */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("open");

        sidebarOverlay?.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("open");

        sidebarOverlay?.classList.remove("show");

        document.body.style.overflow = "";

    }


    menuToggle?.addEventListener(
        "click",
        openSidebar
    );


    sidebarClose?.addEventListener(
        "click",
        closeSidebar
    );


    sidebarOverlay?.addEventListener(
        "click",
        closeSidebar
    );



    /* =====================================================
       2. CLOSE SIDEBAR AFTER NAVIGATION
    ===================================================== */

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 900
                ) {

                    closeSidebar();

                }

            }
        );

    });



    /* =====================================================
       3. CREATE STORY MODAL
    ===================================================== */

    function openCreateModal() {

        if (!createModal) return;

        createModal.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    function closeCreateModal() {

        if (!createModal) return;

        createModal.classList.remove("show");

        document.body.style.overflow = "";

    }


    quickCreate?.addEventListener(
        "click",
        openCreateModal
    );


    createStoryButton?.addEventListener(
        "click",
        openCreateModal
    );


    modalClose?.addEventListener(
        "click",
        closeCreateModal
    );



    /* =====================================================
       4. CLOSE MODAL BY CLICKING OUTSIDE
    ===================================================== */

    createModal?.addEventListener(
        "click",
        event => {

            if (
                event.target === createModal
            ) {

                closeCreateModal();

            }

        }
    );



    /* =====================================================
       5. ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeCreateModal();

                closeSidebar();

            }

        }
    );



    /* =====================================================
       6. CREATE OPTIONS
    ===================================================== */

    const creationCards =
        document.querySelectorAll(
            ".creation-card"
        );


    creationCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const action =
                    card.dataset.action;


                if (
                    action === "story"
                ) {

                    console.log(
                        "New Story selected"
                    );

                    openCreateModal();

                }


                if (
                    action === "ai"
                ) {

                    console.log(
                        "AI Story selected"
                    );

                    alert(
                        "AI Studio will be available soon."
                    );

                }


                if (
                    action === "photo"
                ) {

                    console.log(
                        "Import Memories selected"
                    );

                    alert(
                        "Memory import will be available soon."
                    );

                }

            }
        );

    });



    /* =====================================================
       7. AI STUDIO BUTTON
    ===================================================== */

    aiStudioButton?.addEventListener(
        "click",
        () => {

            alert(
                "AI Studio will be available soon."
            );

        }
    );



    /* =====================================================
       8. MODAL OPTIONS
    ===================================================== */

    const modalOptions =
        document.querySelectorAll(
            ".modal-option"
        );


    modalOptions.forEach(
        (option, index) => {

            option.addEventListener(
                "click",
                () => {

                    switch (index) {

                        case 0:

                            console.log(
                                "Create Story"
                            );

                            closeCreateModal();

                            alert(
                                "Story Creator will be available soon."
                            );

                            break;


                        case 1:

                            console.log(
                                "AI Story"
                            );

                            closeCreateModal();

                            alert(
                                "AI Story Creator will be available soon."
                            );

                            break;


                        case 2:

                            console.log(
                                "Import Memories"
                            );

                            closeCreateModal();

                            alert(
                                "Memory Import will be available soon."
                            );

                            break;

                    }

                }
            );

        }
    );



    /* =====================================================
       9. SEARCH — CTRL + K
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey ||
                 event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                globalSearch?.focus();

            }

        }
    );



    /* =====================================================
       10. SEARCH FUNCTION
    ===================================================== */

    globalSearch?.addEventListener(
        "input",
        event => {

            const searchValue =
                event.target.value
                .toLowerCase()
                .trim();


            const storyItems =
                document.querySelectorAll(
                    ".story-item"
                );


            storyItems.forEach(
                story => {

                    const title =
                        story
                        .querySelector(
                            ".story-details h3"
                        )
                        ?.textContent
                        .toLowerCase();


                    const tags =
                        story
                        .querySelector(
                            ".story-tags"
                        )
                        ?.textContent
                        .toLowerCase();


                    const matches =
                        title?.includes(
                            searchValue
                        ) ||
                        tags?.includes(
                            searchValue
                        );


                    if (
                        matches ||
                        searchValue === ""
                    ) {

                        story.style.display =
                            "flex";

                    } else {

                        story.style.display =
                            "none";

                    }

                }
            );

        }
    );



    /* =====================================================
       11. THEME TOGGLE
    ===================================================== */

    const savedTheme =
        localStorage.getItem(
            "myHistoryTheme"
        );


    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light-theme"
        );

        updateThemeIcon();

    }


    themeToggle?.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            localStorage.setItem(
                "myHistoryTheme",
                isLight
                    ? "light"
                    : "dark"
            );


            updateThemeIcon();

        }
    );


    function updateThemeIcon() {

        if (!themeToggle) return;


        const icon =
            themeToggle.querySelector(
                "i"
            );


        if (!icon) return;


        const isLight =
            document.body.classList.contains(
                "light-theme"
            );


        if (isLight) {

            icon.classList.remove(
                "fa-moon"
            );

            icon.classList.add(
                "fa-sun"
            );

        } else {

            icon.classList.remove(
                "fa-sun"
            );

            icon.classList.add(
                "fa-moon"
            );

        }

    }



    /* =====================================================
       12. NOTIFICATION BUTTON
    ===================================================== */

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    notificationButton?.addEventListener(
        "click",
        () => {

            notificationButton
                .classList.toggle(
                    "active"
                );


            console.log(
                "Notifications opened"
            );

        }
    );



    /* =====================================================
       13. PROFILE BUTTON
    ===================================================== */

    profileButton?.addEventListener(
        "click",
        () => {

            console.log(
                "Profile menu clicked"
            );

        }
    );



    /* =====================================================
       14. LOGOUT
    ===================================================== */

    logoutBtn?.addEventListener(
        "click",
        () => {

            const confirmLogout =
                confirm(
                    "Are you sure you want to log out?"
                );


            if (
                confirmLogout
            ) {

                localStorage.removeItem(
                    "myHistoryTheme"
                );


                window.location.href =
                    "index.html";

            }

        }
    );



    /* =====================================================
       15. STORY MORE BUTTONS
    ===================================================== */

    const moreButtons =
        document.querySelectorAll(
            ".more-button"
        );


    moreButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    console.log(
                        "Story options clicked"
                    );

                }
            );

        }
    );



    /* =====================================================
       16. CHARACTER ADD
    ===================================================== */

    const characterAdd =
        document.querySelector(
            ".character-add"
        );


    characterAdd?.addEventListener(
        "click",
        () => {

            alert(
                "Character Creator will be available soon."
            );

        }
    );



    /* =====================================================
       17. WINDOW RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeSidebar();

            }

        }
    );



    /* =====================================================
       18. INITIALIZATION
    ===================================================== */

    console.log(
        "%cMY HISTORY Dashboard Loaded Successfully!",
        "color:#8f7dff;font-size:16px;font-weight:bold;"
    );

});