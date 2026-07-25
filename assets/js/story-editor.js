/* =========================================================
   MY HISTORY — STORY EDITOR
   File: assets/js/pages/story-editor.js
   ========================================================= */


/* =========================
   GO BACK
========================= */

function goBack() {
    window.history.back();
}


/* =========================
   SAVE EDITED STORY
========================= */

function saveEditedStory() {

    const story = {

        title:
            document.getElementById("storyTitle").value,

        genre:
            document.getElementById("storyGenre").value,

        language:
            document.getElementById("storyLanguage").value,

        description:
            document.getElementById("storyDescription").value,

        content:
            document.getElementById("storyContent").value,

        chapters:
            getChapters()

    };


    /*
       Story ma'lumotlarini LocalStorage'ga saqlaymiz
    */

    localStorage.setItem(
        "myHistoryEditedStory",
        JSON.stringify(story)
    );


    showEditorNotification(
        "Hikoya muvaffaqiyatli saqlandi ❤️"
    );

}


/* =========================
   GET CHAPTERS
========================= */

function getChapters() {

    const chapters = [];

    const chapterItems =
        document.querySelectorAll(
            ".chapter-editor-item"
        );


    chapterItems.forEach(
        (chapter, index) => {

            const title =
                chapter.querySelector(
                    "input"
                ).value;


            const text =
                chapter.querySelector(
                    "textarea"
                ).value;


            chapters.push({

                number:
                    index + 1,

                title:
                    title,

                text:
                    text

            });

        }
    );


    return chapters;

}


/* =========================
   ADD CHAPTER
========================= */

function addChapter() {

    const chapterList =
        document.getElementById(
            "chapterList"
        );


    const chapterCount =
        chapterList.querySelectorAll(
            ".chapter-editor-item"
        ).length + 1;


    const chapter =
        document.createElement(
            "div"
        );


    chapter.className =
        "chapter-editor-item";


    chapter.innerHTML = `

        <div class="chapter-number">
            ${String(chapterCount).padStart(2, "0")}
        </div>


        <div class="chapter-editor-content">

            <input
                type="text"
                placeholder="Chapter nomi"
            >


            <textarea
                rows="4"
                placeholder="Chapter matnini yozing..."
            ></textarea>

        </div>


        <button
            class="delete-chapter-btn"
            onclick="deleteChapter(this)"
        >
            ×
        </button>

    `;


    chapterList.appendChild(
        chapter
    );


    updateChapterNumbers();


    showEditorNotification(
        "Yangi chapter qo‘shildi 📖"
    );

}


/* =========================
   DELETE CHAPTER
========================= */

function deleteChapter(button) {

    const chapter =
        button.closest(
            ".chapter-editor-item"
        );


    if (!chapter) {
        return;
    }


    chapter.remove();


    updateChapterNumbers();


    showEditorNotification(
        "Chapter o‘chirildi"
    );

}


/* =========================
   UPDATE CHAPTER NUMBERS
========================= */

function updateChapterNumbers() {

    const chapters =
        document.querySelectorAll(
            ".chapter-editor-item"
        );


    chapters.forEach(
        (chapter, index) => {

            const number =
                chapter.querySelector(
                    ".chapter-number"
                );


            number.textContent =
                String(index + 1)
                .padStart(2, "0");

        }
    );

}


/* =========================
   ADD CHARACTER
========================= */

function addCharacter() {

    const characterList =
        document.getElementById(
            "characterList"
        );


    const character =
        document.createElement(
            "div"
        );


    character.className =
        "character-editor-item";


    character.innerHTML = `

        <div class="character-avatar">
            🧑
        </div>


        <div>

            <strong>
                Yangi qahramon
            </strong>

            <span>
                Yangi personaj
            </span>

        </div>

    `;


    characterList.appendChild(
        character
    );


    showEditorNotification(
        "Yangi qahramon qo‘shildi 👤"
    );

}


/* =========================
   AI ASSISTANT
========================= */

function sendAIMessage() {

    const input =
        document.getElementById(
            "aiInput"
        );


    const message =
        input.value.trim();


    /*
       Bo‘sh xabar yuborilmaydi
    */

    if (!message) {
        return;
    }


    addUserMessage(
        message
    );


    input.value = "";


    /*
       AI javobini biroz kechiktiramiz
       Bu hozircha demo rejim
    */

    setTimeout(
        () => {

            generateDemoAIResponse(
                message
            );

        },
        700
    );

}


/* =========================
   ENTER KEY
========================= */

function handleAIKey(event) {

    if (
        event.key ===
        "Enter"
    ) {

        event.preventDefault();

        sendAIMessage();

    }

}


/* =========================
   ADD USER MESSAGE
========================= */

function addUserMessage(
    message
) {

    const chat =
        document.getElementById(
            "aiChat"
        );


    const messageElement =
        document.createElement(
            "div"
        );


    messageElement.className =
        "ai-message user-message";


    messageElement.textContent =
        message;


    chat.appendChild(
        messageElement
    );


    scrollAIChat();

}


/* =========================
   AI DEMO RESPONSE
========================= */

function generateDemoAIResponse(
    userMessage
) {

    const message =
        userMessage.toLowerCase();


    let response =
        "Bu juda yaxshi g‘oya! " +
        "Hikoyangizni yanada qiziqarli " +
        "qilish uchun ko‘proq tafsilotlar " +
        "qo‘shishingiz mumkin.";


    if (
        message.includes(
            "qahramon"
        )
    ) {

        response =
            "Qahramoningizga o‘ziga xos " +
            "xarakter, maqsad va sirli " +
            "o‘tmish berishni tavsiya qilaman. " +
            "Bu uni yanada qiziqarli qiladi.";

    }


    else if (
        message.includes(
            "chapter"
        )
        ||
        message.includes(
            "qism"
        )
    ) {

        response =
            "Yangi chapter uchun " +
            "kutilmagan burilish yoki " +
            "yangi muammo qo‘shishingiz mumkin.";

    }


    else if (
        message.includes(
            "syujet"
        )
        ||
        message.includes(
            "voqea"
        )
    ) {

        response =
            "Syujetni kuchaytirish uchun " +
            "qahramon oldiga aniq maqsad " +
            "va uni amalga oshirishga " +
            "to‘sqinlik qiluvchi muammo qo‘ying.";

    }


    else if (
        message.includes(
            "salom"
        )
    ) {

        response =
            "Salom! 👋 " +
            "Hikoyangizni yaratishda " +
            "sizga yordam berishga tayyorman.";

    }


    setTimeout(
        () => {

            addAIMessage(
                response
            );

        },
        300
    );

}


/* =========================
   ADD AI MESSAGE
========================= */

function addAIMessage(
    message
) {

    const chat =
        document.getElementById(
            "aiChat"
        );


    const messageElement =
        document.createElement(
            "div"
        );


    messageElement.className =
        "ai-message";


    messageElement.textContent =
        message;


    chat.appendChild(
        messageElement
    );


    scrollAIChat();

}


/* =========================
   SCROLL AI CHAT
========================= */

function scrollAIChat() {

    const chat =
        document.getElementById(
            "aiChat"
        );


    chat.scrollTop =
        chat.scrollHeight;

}


/* =========================
   PREVIEW STORY
========================= */

function previewStory() {

    const title =
        document.getElementById(
            "storyTitle"
        ).value;


    const description =
        document.getElementById(
            "storyDescription"
        ).value;


    /*
       Preview uchun vaqtincha
       ma'lumotlarni LocalStorage'ga saqlaymiz
    */

    localStorage.setItem(

        "myHistoryPreviewStory",

        JSON.stringify({

            title:
                title,

            description:
                description

        })

    );


    /*
       Story result sahifasiga o'tamiz
    */

    window.location.href =
        "story-result.html";

}


/* =========================
   NOTIFICATION
========================= */

function showEditorNotification(
    message
) {

    const oldNotification =
        document.querySelector(
            ".editor-notification"
        );


    if (oldNotification) {

        oldNotification.remove();

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "editor-notification";


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
        2500
    );

}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "MY HISTORY — Story Editor Loaded"
        );


        /*
           Avval saqlangan story mavjud bo‘lsa,
           uni avtomatik yuklaymiz.
        */

        loadSavedStory();

    }
);


/* =========================
   LOAD SAVED STORY
========================= */

function loadSavedStory() {

    const savedStory =
        localStorage.getItem(
            "myHistoryEditedStory"
        );


    if (!savedStory) {
        return;
    }


    try {

        const story =
            JSON.parse(
                savedStory
            );


        if (
            story.title
        ) {

            document.getElementById(
                "storyTitle"
            ).value =
                story.title;

        }


        if (
            story.genre
        ) {

            document.getElementById(
                "storyGenre"
            ).value =
                story.genre;

        }


        if (
            story.language
        ) {

            document.getElementById(
                "storyLanguage"
            ).value =
                story.language;

        }


        if (
            story.description
        ) {

            document.getElementById(
                "storyDescription"
            ).value =
                story.description;

        }


        if (
            story.content
        ) {

            document.getElementById(
                "storyContent"
            ).value =
                story.content;

        }


    }

    catch (error) {

        console.error(
            "Story yuklashda xatolik:",
            error
        );

    }

}