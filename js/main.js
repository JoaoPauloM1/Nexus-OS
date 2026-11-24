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
// Get notes input element
const notesInput = document.getElementById("notes-input");

// Load saved notes when the system starts
notesInput.value = localStorage.getItem("nexus-notes") || "";

// Save notes automatically when typing
notesInput.addEventListener("input", function() {

    localStorage.setItem("nexus-notes", notesInput.value);

});

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
// Get terminal input elements
const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");
// Store system start time
const systemStartTime = Date.now();
// Store executed commands
const commandHistory = [];

// Open terminal window
terminalIcon.addEventListener("click", function() {

    openWindow(terminalWindow);

    // Focus terminal input automatically
    terminalInput.focus();

});

// Close terminal window
closeTerminal.addEventListener("click", function() {

    closeWindow(terminalWindow);

});

// Enable terminal window dragging
makeDraggable(terminalWindow);

// TERMINAL COMMAND SYSTEM

// Add a new line to the terminal
function addTerminalLine(text) {

    const paragraph = document.createElement("p");

    paragraph.textContent = text;

    terminalOutput.appendChild(paragraph);

    // Scroll to the latest message
    terminalOutput.scrollTop = terminalOutput.scrollHeight;

}

// Add a clickable link to the terminal
function addTerminalLink(text, url) {

    const paragraph = document.createElement("p");
    const link = document.createElement("a");

    link.textContent = text;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.style.color = "#00D9FF";
    link.style.textDecoration = "underline";

    paragraph.appendChild(link);
    terminalOutput.appendChild(paragraph);

    // Scroll to the latest message
    terminalOutput.scrollTop = terminalOutput.scrollHeight;

}


// Execute terminal commands
function executeCommand(command, argument) {

    // Check which command was entered
    switch (command) {

        case "ajuda":

            addTerminalLine("Comandos disponíveis:");
            addTerminalLine("ajuda - Lista os comandos disponíveis");
            addTerminalLine("limpar - Limpa o Terminal");
            addTerminalLine("data - Exibe a data e o horário");
            addTerminalLine("sobre - Informações sobre o NEXUS OS");
            addTerminalLine("versão - Versão do sistema");
            addTerminalLine("quemsoueu - Usuário atual");
            addTerminalLine("host - Nome da máquina");
            addTerminalLine("status - Diagnóstico do sistema");
            addTerminalLine("tempo - Tempo de execução do sistema");
            addTerminalLine("eco - Exibe uma mensagem");
            addTerminalLine("calc - Calculadora");
            addTerminalLine("historico - Histórico de comandos");
            addTerminalLine("criador - Informações sobre o desenvolvedor");

            break;

        case "limpar":

            terminalOutput.innerHTML = "";

            break;

        case "data":

            addTerminalLine(new Date().toLocaleString("pt-BR"));

            break;

        case "sobre":

            addTerminalLine("NEXUS OS - Sistema operacional simulado");
            addTerminalLine("Versão: 1.0");
            addTerminalLine("Desenvolvido por João Paulo");

            break;


        case "versão":

            addTerminalLine("NEXUS OS version 1.0");

            break;


        case "quemsoueu":

            addTerminalLine("João Paulo");

            break;


        case "host":

            addTerminalLine("NEXUS-TERMINAL");

            break;


        case "status":

            addTerminalLine("Diagnóstico do sistema:");
            addTerminalLine("Interface: ONLINE");
            addTerminalLine("Terminal: ONLINE");
            addTerminalLine("Gerenciador de janelas: ONLINE");
            addTerminalLine("Áudio: ONLINE");
            addTerminalLine("Estado geral: OPERACIONAL");

            break;

        case "tempo": {

            // Calculate system running time
            const elapsedTime = Math.floor(
                (Date.now() - systemStartTime) / 1000
            );

            const hours = Math.floor(elapsedTime / 3600);
            const minutes = Math.floor((elapsedTime % 3600) / 60);
            const seconds = elapsedTime % 60;

            addTerminalLine(`Tempo de execução: ${hours}h ${minutes}min ${seconds}s`);

            break;
        }

        case "eco":

            if (!argument) {
                addTerminalLine("Uso: eco [mensagem]");
            } else {
                addTerminalLine(argument);
            }

            break;


        case "calc": {

            // Separate numbers and mathematical operator
            const parts = argument.trim().split(" ").filter(Boolean);

            // Check if the expression has three parts
            if (parts.length !== 3) {
                addTerminalLine("Expressão inválida. Exemplo: calc 10 + 5");
                break;
            }

            const firstNumber = Number(parts[0]);
            const operator = parts[1];
            const secondNumber = Number(parts[2]);

            // Validate numbers
            if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
                addTerminalLine("Erro: números inválidos.");
                break;
            }

            let result;

            // Perform calculation
            switch (operator) {

                case "+":
                    result = firstNumber + secondNumber;
                    break;

                case "-":
                    result = firstNumber - secondNumber;
                    break;

                case "*":
                    result = firstNumber * secondNumber;
                    break;

                case "/":

                    if (secondNumber === 0) {
                        addTerminalLine("Erro: divisão por zero.");
                        break;
                    }

                    result = firstNumber / secondNumber;
                    break;

                default:
                    addTerminalLine("Operador inválido.");
                    break;

            }

            // Display calculation result
            if (result !== undefined) {
                addTerminalLine(`Resultado: ${result}`);
            }

            break;
        }

        case "historico":

            if (commandHistory.length === 0) {
                addTerminalLine("Nenhum comando foi executado.");
                break;
            }

            addTerminalLine("Histórico de comandos:");

            commandHistory.forEach(function(item, index) {
                addTerminalLine(`${index + 1}. ${item}`);
            });

            break;


        case "criador":

            addTerminalLine("--------------------------------");
            addTerminalLine("DESENVOLVEDOR DO NEXUS OS");
            addTerminalLine("--------------------------------");
            addTerminalLine("Nome: João Paulo");
            addTerminalLine("Função: Criador e desenvolvedor");
            addTerminalLine("Projeto: NEXUS OS");

            addTerminalLine("Perfil do GitHub:");

            addTerminalLink(
                "github.com/JoaoPauloM1",
                "https://github.com/JoaoPauloM1"
            );

            addTerminalLine("--------------------------------");

            break;

        default:

            addTerminalLine(`Comando não encontrado: ${command}`);
            addTerminalLine('Digite "ajuda" para consultar os comandos.');

            break;

    }

}

// Listen for terminal input
terminalInput.addEventListener("keydown", function(event) {

    // Execute command when Enter is pressed
    if (event.key === "Enter") {

        const input = terminalInput.value.trim();

        // Ignore empty commands
        if (input === "") return;

        // Separate command from its arguments
        const [commandName, ...argumentParts] = input.split(/\s+/);

        const command = commandName.toLowerCase();
        const argument = argumentParts.join(" ");

        // Display entered command
        addTerminalLine(`nexus@system:~$ ${input}`);

        // Store command in history
        commandHistory.push(input);

        // Clear input field
        terminalInput.value = "";

        // Execute command
        executeCommand(command, argument);

    }

});

// WINDOW SYSTEM

// Window focus management
let highestZIndex = 1;

// Bring an application window to the front
function focusWindow(windowElement) {

    // Increase window priority
    highestZIndex++;

    windowElement.style.zIndex = highestZIndex;

    // Remove active state from all windows
    const allWindows = document.querySelectorAll(".app-window");

    allWindows.forEach(function(window) {

        window.classList.remove("active");

    });

    // Highlight the focused window
    windowElement.classList.add("active");

}


 // Open an application window
function openWindow(windowElement) {

    // Show window
    windowElement.classList.remove("hidden");

    // Remove closing animation if present
    windowElement.classList.remove("window-closing");

    // Start opening animation
    windowElement.classList.add("window-opening");

    // Bring window to the front
    focusWindow(windowElement);

    // Remove opening animation class after animation
    windowElement.addEventListener("animationend", function(event) {

        if (event.target === windowElement) {
            windowElement.classList.remove("window-opening");
        }

    }, { once: true });

}

// Close an application window
function closeWindow(windowElement) {

    // Remove opening animation
    windowElement.classList.remove("window-opening");

    // Start closing animation
    windowElement.classList.add("window-closing");

    // Hide window after animation finishes
    windowElement.addEventListener("animationend", function(event) {

        if (event.target === windowElement) {

            windowElement.classList.add("hidden");
            windowElement.classList.remove("window-closing");

        }

    }, { once: true });

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