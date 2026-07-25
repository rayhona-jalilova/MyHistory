/* =========================================================
   MY HISTORY — CREATE STORY PAGE
   File: assets/js/pages/create-story.js
   ========================================================= */


/* =========================
   STORY DATA
========================= */

const storyData = {

    title: "",

    idea: "",

    genre: "Fantasy",

    language: "O'zbek tili",

    style: "Anime"

};


/* =========================
   DOM ELEMENTS
========================= */

const storyTitle =
    document.getElementById("storyTitle");

const storyIdea =
    document.getElementById("storyIdea");

const ideaCount =
    document.getElementById("ideaCount");

const previewTitle =
    document.getElementById("previewTitle");

const previewGenre =
    document.getElementById("previewGenre");

const previewLanguage =
    document.getElementById("previewLanguage");

const previewStyle =
    document.getElementById("previewStyle");


/* =========================
   STORY TITLE
========================= */

if (storyTitle) {

    storyTitle.addEventListener(
        "input",
        function () {

            storyData.title =
                this.value.trim();

            updatePreview();

        }
    );

}


/* =========================
   STORY IDEA
========================= */

if (storyIdea) {

    storyIdea.addEventListener(
        "input",
        function () {

            let value =
                this.value;

            /* Maximum 1000 characters */

            if (value.length > 1000) {

                value =
                    value.substring(
                        0,
                        1000
                    );

                this.value =
                    value;

            }


            storyData.idea =
                value;


            /* Update character count */

            if (ideaCount) {

                ideaCount.textContent =
                    value.length;

            }

        }
    );

}


/* =========================
   GENRE SELECTION
========================= */

const genreOptions =
    document.querySelectorAll(
        ".genre-option"
    );


genreOptions.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                /* Remove active */

                genreOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add active */

                this.classList.add(
                    "active"
                );


                /* Save genre */

                storyData.genre =
                    this.dataset.genre;


                /* Update preview */

                updatePreview();

            }
        );

    }
);


/* =========================
   LANGUAGE SELECTION
========================= */

const languageOptions =
    document.querySelectorAll(
        ".language-option"
    );


languageOptions.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                /* Remove active */

                languageOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add active */

                this.classList.add(
                    "active"
                );


                /* Save language */

                storyData.language =
                    this.dataset.language;


                /* Update preview */

                updatePreview();

            }
        );

    }
);


/* =========================
   VISUAL STYLE SELECTION
========================= */

const visualStyleOptions =
    document.querySelectorAll(
        ".visual-style-option"
    );


visualStyleOptions.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                /* Remove active */

                visualStyleOptions.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add active */

                this.classList.add(
                    "active"
                );


                /* Save style */

                storyData.style =
                    this.dataset.style;


                /* Update preview */

                updatePreview();

            }
        );

    }
);


/* =========================
   UPDATE PREVIEW
========================= */

function updatePreview() {


    /* Story title */

    if (previewTitle) {

        if (
            storyData.title.length > 0
        ) {

            previewTitle.textContent =
                storyData.title;

        } else {

            previewTitle.textContent =
                "Sizning hikoyangiz";

        }

    }


    /* Genre */

    if (previewGenre) {

        previewGenre.textContent =
            storyData.genre;

    }


    /* Language */

    if (previewLanguage) {

        previewLanguage.textContent =
            storyData.language;

    }


    /* Visual style */

    if (previewStyle) {

        previewStyle.textContent =
            storyData.style;

    }

}


/* =========================
   GENERATE STORY
========================= */

function generateStory() {


    /* Get latest values */

    storyData.title =
        storyTitle
            ? storyTitle.value.trim()
            : "";


    storyData.idea =
        storyIdea
            ? storyIdea.value.trim()
            : "";


    /* Validation */

    if (
        storyData.title === ""
    ) {

        alert(
            "Iltimos, hikoya nomini kiriting."
        );

        if (storyTitle) {

            storyTitle.focus();

        }

        return;

    }


    if (
        storyData.idea === ""
    ) {

        alert(
            "Iltimos, hikoya g'oyasini yozing."
        );

        if (storyIdea) {

            storyIdea.focus();

        }

        return;

    }


    if (
        storyData.idea.length < 20
    ) {

        alert(
            "Hikoya g'oyasini biroz batafsilroq yozing."
        );

        if (storyIdea) {

            storyIdea.focus();

        }

        return;

    }


    /* =========================
       SAVE TO LOCAL STORAGE
    ========================== */

    localStorage.setItem(
        "myHistoryStory",
        JSON.stringify(
            storyData
        )
    );


    /* =========================
       LOADING EFFECT
    ========================== */

    const generateButton =
        document.querySelector(
            ".generate-story-btn"
        );


    if (generateButton) {


        generateButton.disabled =
            true;


        generateButton.innerHTML = `

            <span>
                ⏳
            </span>

            <span>
                Hikoya tayyorlanmoqda...
            </span>

        `;

    }


    /* =========================
       REDIRECT
    ========================== */

    setTimeout(
        function () {

            window.location.href =
                "story-result.html";

        },
        1200
    );

}


/* =========================
   BACK BUTTON
========================= */

function goBack() {

    window.history.back();

}


/* =========================
   INITIAL PREVIEW
========================= */

updatePreview();