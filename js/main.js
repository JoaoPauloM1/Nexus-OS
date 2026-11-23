
// Get HTML elements
const bootScreen = document.getElementById("boot-screen");
const loadingScreen = document.getElementById("loading-screen");
const desktop = document.getElementById("desktop");
const bootButton = document.getElementById("boot-button");

const loadingProgress = document.getElementById("loading-progress");
const loadingMessage = document.getElementById("loading-message");
const loadingPercentage = document.getElementById("loading-percentage");

// Initialize system
bootButton.addEventListener("click", function() {

    // Hide boot screen
    bootScreen.classList.add("hidden");

    // Show loading screen
    loadingScreen.classList.remove("hidden");

    // Start system loading animation
    startLoading();

});

// Start loading animation
function startLoading() {

    let progress = 0;

    const loadingInterval = setInterval(function() {

        // Increase loading progress
        progress++;

        // Update loading bar
        loadingProgress.style.width = progress + "%";

        // Update loading percentage
        loadingPercentage.textContent = progress + "%";

        // Update loading messages
        if (progress === 25) {
            loadingMessage.textContent = "Carregando módulos...";
        }

        if (progress === 50) {
            loadingMessage.textContent = "Configurando ambiente...";
        }

        if (progress === 75) {
            loadingMessage.textContent = "Iniciando interface...";
        }

        // Finish loading
        if (progress >= 100) {

            clearInterval(loadingInterval);

            loadingMessage.textContent = "Sistema iniciado com sucesso!";

            // Wait before showing desktop
            setTimeout(function() {

                // Hide loading screen with animation
                loadingScreen.classList.add("fade-out");

                // Show desktop
                desktop.classList.remove("hidden");

                // Remove loading screen after animation
                setTimeout(function() {
                    loadingScreen.classList.add("hidden");
                }, 1000);

                // Start desktop clock
                updateClock();

            }, 800);

        }

    }, 40);

}

// Update desktop clock
function updateClock() {

    const now = new Date();

    const clock = document.getElementById("clock");
    const date = document.getElementById("date");

    const time = now.toLocaleTimeString("pt-BR", {
        hour12: false
    });

    const currentDate = now.toLocaleDateString("pt-BR", {
        weekday: "short",
        month: "short",
        day: "numeric"
    });

    clock.textContent = time;
    date.textContent = currentDate;

}

// Update clock every second
setInterval(updateClock, 1000);


// NOTES APPLICATION

// Get notes application elements
const notesIcon = document.getElementById("notes-icon");
const notesWindow = document.getElementById("notes-window");
const closeNotes = document.getElementById("close-notes");

// Open notes window
notesIcon.addEventListener("click", function() {

    openWindow(notesWindow);

});

// Close notes window
closeNotes.addEventListener("click", function() {

    closeWindow(notesWindow);

});

// TERMINAL APPLICATION

// Get terminal application elements
const terminalIcon = document.getElementById("terminal-icon");
const terminalWindow = document.getElementById("terminal-window");
const closeTerminal = document.getElementById("close-terminal");

// Open terminal window
terminalIcon.addEventListener("click", function() {

    openWindow(terminalWindow);

});

// Close terminal window
closeTerminal.addEventListener("click", function() {

    closeWindow(terminalWindow);

});

// Enable terminal window dragging
makeDraggable(terminalWindow);


// WINDOW SYSTEM

// Window focus management
let highestZIndex = 1;

// Bring an application window to the front
function focusWindow(windowElement) {

    highestZIndex++;

    windowElement.style.zIndex = highestZIndex;

}

// Open an application window
function openWindow(windowElement) {

    windowElement.classList.remove("hidden");

    focusWindow(windowElement);

}

// Close an application window
function closeWindow(windowElement) {

    windowElement.classList.add("hidden");

}


// Make an application window draggable
function makeDraggable(windowElement) {

    const windowHeader = windowElement.querySelector(".window-header");

    let isDragging = false;

    let offsetX = 0;
    let offsetY = 0;

    let activePointerId = null;

    // Focus window when clicked
    windowElement.addEventListener("pointerdown", function() {

        focusWindow(windowElement);

    });

    // Start dragging
    windowHeader.addEventListener("pointerdown", function(event) {

        // Ignore clicks on buttons
        if (event.target.closest("button")) return;

        // Only use the left mouse button
        if (event.button !== 0) return;

        event.preventDefault();

        isDragging = true;
        activePointerId = event.pointerId;

        // Capture pointer events outside the header
        windowHeader.setPointerCapture(event.pointerId);

        const windowRect = windowElement.getBoundingClientRect();

        offsetX = event.clientX - windowRect.left;
        offsetY = event.clientY - windowRect.top;

    });

    // Move window
    windowHeader.addEventListener("pointermove", function(event) {

        if (!isDragging || event.pointerId !== activePointerId) return;

        windowElement.style.left = `${event.clientX - offsetX}px`;
        windowElement.style.top = `${event.clientY - offsetY}px`;

        windowElement.style.transform = "none";

    });

    // Stop dragging
    function stopDragging(event) {

        if (event.pointerId !== activePointerId) return;

        isDragging = false;
        activePointerId = null;

    }

    windowHeader.addEventListener("pointerup", stopDragging);

    windowHeader.addEventListener("pointercancel", stopDragging);

}

// Enable dragging for notes window
makeDraggable(notesWindow);