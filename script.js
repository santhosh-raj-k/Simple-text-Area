 const textarea = document.getElementById("message");
    const counter = document.getElementById("counter");
    const warning = document.getElementById("warning");
    const copyBtn = document.getElementById("copyBtn");
    const clearBtn = document.getElementById("clearBtn");
    const copyMsg = document.getElementById("copyMsg");
    const MAX = 200;

    // Counter update function
    function updateCounter() {
      const typed = textarea.value.length;
      const remaining = MAX - typed;
      counter.textContent = typed + "/" + MAX + " characters, " + remaining + " remaining";
      if (remaining === 0) {
        warning.classList.remove("hidden");
      } else {
        warning.classList.add("hidden");
      }
    }

    // Type pannum pothu counter update aagum
    textarea.addEventListener("input", updateCounter);

    // Copy button: textarea la irukura text ah clipboard ku copy pannum
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(textarea.value);
      copyMsg.classList.remove("hidden");
      setTimeout(function () {
        copyMsg.classList.add("hidden");
      }, 1500);
    });

    // Clear button: textarea ah kaali pannum
    clearBtn.addEventListener("click", function () {
      textarea.value = "";
      updateCounter();
      copyMsg.classList.add("hidden");
      textarea.focus();
    });