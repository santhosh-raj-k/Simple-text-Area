
"use strict";

// Get HTML elements
const textarea = document.getElementById("message");
const counter = document.getElementById("counter");
const warning = document.getElementById("warning");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const copyMsg = document.getElementById("copyMsg");

const MAX = 200;
let messageTimer;

// 1. Update character counter
function updateCounter() {
    const typed = textarea.value.length;
    const remaining = MAX - typed;

    counter.textContent =
        `${typed}/${MAX} characters, ${remaining} remaining`;

    // Change counter color
    if (remaining <= 20) {
        counter.classList.remove("text-gray-700");
        counter.classList.add("text-red-600");
    } else {
        counter.classList.remove("text-red-600");
        counter.classList.add("text-gray-700");
    }

    // Show warning at character limit
    if (remaining === 0) {
        warning.classList.remove("hidden");
    } else {
        warning.classList.add("hidden");
    }
}

// 2. Hide copy message
function hideCopyMessage() {
    copyMsg.classList.add("hidden");
    clearTimeout(messageTimer);
}

// 3. Show temporary status message
function showMessage(message) {
    hideCopyMessage();

    copyMsg.textContent = message;
    copyMsg.classList.remove("hidden");

    messageTimer = setTimeout(function () {
        copyMsg.classList.add("hidden");
    }, 2000);
}

// 4. Update counter while typing
textarea.addEventListener("input", function () {
    updateCounter();
    hideCopyMessage();
});

// 5. Copy text
copyBtn.addEventListener("click", async function () {
    const text = textarea.value;

    if (text.trim() === "") {
        showMessage("Please type something first!");
        return;
    }

    try {
        // Modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback for unsupported clipboard API
            textarea.focus();
            textarea.select();

            const copied = document.execCommand("copy");

            if (!copied) {
                throw new Error("Copy failed");
            }

            textarea.setSelectionRange(text.length, text.length);
        }

        showMessage("Copied successfully!");

    } catch (error) {
        console.error("Clipboard error:", error);
        showMessage("Copy failed! Try using Live Server.");
    }
});

// 6. Clear text
clearBtn.addEventListener("click", function () {
    textarea.value = "";

    updateCounter();
    hideCopyMessage();

    textarea.focus();
});

// 7. Keyboard shortcut: Ctrl + Enter to copy
textarea.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        copyBtn.click();
    }
});

// 8. Keyboard shortcut: Escape to clear
textarea.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        textarea.value = "";
        updateCounter();
        hideCopyMessage();
    }
});

// 9. Initialize counter
updateCounter();
