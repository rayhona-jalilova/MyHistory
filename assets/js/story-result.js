/* =========================================================
   MY HISTORY — STORY RESULT
   File: assets/js/pages/story-result.js
   ========================================================= */


/* =========================
   GO BACK
========================= */

function goBack() {

    window.history.back();

}


/* =========================
   GET STORY DATA
========================= */

function getStoryData() {

    /*
       Avval tahrirlangan story'ni tekshiramiz
    */

    const editedStory =
        localStorage.getItem(
            "myHistoryEditedStory"
        );


    if (editedStory) {

        try {

            return JSON.parse(
                editedStory
            );

        }

        catch (error) {

            console.error(
                "Edited story parse error:",
                error
            );

        }

    }


    /*
       Agar edited story bo'lmasa,
       demo story ishlatiladi
    */

    return {

        title:
            "Sirli Olamga Sayohat",

        genre:
            "Fantasy",

        language:
            "O'zbek tili",

        format:
            "Anime / Cartoon",

        episodes:
            12,

        status:
            "Tayyor",

        description:
            "Bir kuni oddiy qiz o'z hayotidagi eng katta sarguzashtga duch keladi.",

        content:
            "Bir kuni Laylo oddiy kunlardan birini o'tkazayotgan edi."

    };

}


/* =========================
   LOAD STORY
========================= */

function loadStory() {

    const story =
        getStoryData();


    /*
       STORY TITLE
    */

    const titleElement =
        document.querySelector(
            ".story-result-cover-title"
        );


    if (
        titleElement &&
        story.title
    ) {

        titleElement.textContent =
            story.title;

    }


    /*
       STORY DESCRIPTION
    */

    const descriptionElement =
        document.querySelector(
            ".story-result-cover-text"
        );


    if (
        descriptionElement &&
        story.description
    ) {

        descriptionElement.textContent =
            story.description;

    }


    /*
       INFO VALUES
    */

    const infoValues =
        document.querySelectorAll(
            ".story-result-info-value"
        );


    if (
        infoValues.length >= 6
    ) {

        infoValues[0].textContent =
            story.genre ||
            "Fantasy";


        infoValues[1].textContent =
            story.language ||
            "O'zbek tili";


        infoValues[2].textContent =
            "Anime / Cartoon";


        infoValues[3].textContent =
            story.episodes ||
            12;


        infoValues[4].textContent =
            "Bugun";


        infoValues[5].textContent =
            "● " +
            (
                story.status ||
                "Tayyor"
            );

    }


    /*
       STORY CONTENT
    */

    const storyContent =
        document.querySelector(
            ".story-result-story-content"
        );


    if (
        storyContent &&
        story.content
    ) {

        storyContent.textContent =
            story.content;

    }


    /*
       CHAPTERS
    */

    if (
        story.chapters &&
        story.chapters.length
    ) {

        renderChapters(
            story.chapters
        );

    }

}


/* =========================
   RENDER CHAPTERS
========================= */

function renderChapters(
    chapters
) {

    const chapterContainer =
        document.querySelector(
            ".story-result-chapters"
        );


    if (
        !chapterContainer
    ) {

        return;

    }


    /*
       Eski chapterlarni o'chiramiz
    */

    chapterContainer.innerHTML =
        "";


    chapters.forEach(
        (chapter, index) => {

            const chapterElement =
                document.createElement(
                    "article"
                );


            chapterElement.className =
                "story-result-chapter";


            chapterElement.innerHTML = `

                <div class="story-result-chapter-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>


                <h3 class="story-result-chapter-title">
                    ${escapeHTML(
                        chapter.title ||
                        "Yangi Chapter"
                    )}
                </h3>


                <p class="story-result-chapter-text">
                    ${escapeHTML(
                        chapter.text ||
                        "Chapter matni mavjud emas."
                    )}
                </p>

            `;


            chapterContainer.appendChild(
                chapterElement
            );

        }
    );

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================
   SAVE STORY
========================= */

function saveStory() {

    const story =
        getStoryData();


    localStorage.setItem(

        "myHistorySavedStory",

        JSON.stringify(
            story
        )

    );


    showNotification(
        "Hikoya muvaffaqiyatli saqlandi ❤️"
    );

}


/* =========================
   CONTINUE STORY
========================= */

function continueStory() {

    window.location.href =
        "story-editor.html";

}


/* =========================
   CREATE NEW STORY
========================= */

function createNewStory() {

    /*
       Eski story ma'lumotlarini
       o'chiramiz
    */

    localStorage.removeItem(
        "myHistoryEditedStory"
    );


    localStorage.removeItem(
        "myHistoryPreviewStory"
    );


    window.location.href =
        "create-story.html";

}


/* =========================
   NOTIFICATION
========================= */

function showNotification(
    message
) {

    const oldNotification =
        document.querySelector(
            ".story-notification"
        );


    if (
        oldNotification
    ) {

        oldNotification.remove();

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "story-notification";


    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(
        () => {

            notification.classList.add(
                "hide"
            );


            setTimeout(
                () => {

                    notification.remove();

                },
                400
            );

        },
        3000
    );

}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "MY HISTORY — Story Result Loaded"
        );


        loadStory();

    }
);