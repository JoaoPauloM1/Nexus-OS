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

// FILE MANAGER APPLICATION

// Get File Manager elements
const filesIcon = document.getElementById("files-icon");
const filesWindow = document.getElementById("files-window");
const closeFiles = document.getElementById("close-files");
// Get File Preview elements
const previewWindow = document.getElementById("file-preview-window");
const closePreview = document.getElementById("close-preview");
const previewTitle = document.getElementById("preview-title");
const previewText = document.getElementById("file-preview-text");
const previewImage = document.getElementById("file-preview-image");
const previewMessage = document.getElementById("file-preview-message");

// Open File Manager window
filesIcon.addEventListener("click", function() {
    openWindow(filesWindow);

    // Display the current directory
    renderFiles();
});

// Close File Manager window
closeFiles.addEventListener("click", function() {
    closeWindow(filesWindow);
});

// Enable dragging for File Manager window
makeDraggable(filesWindow);
// Close File Preview window
closePreview.addEventListener("click", function() {
    closeWindow(previewWindow);
});

// Enable dragging for File Preview window
makeDraggable(previewWindow);

// File Manager directory structure
const fileSystem = {
    home: [
        { name: "Documentos", type: "folder", target: "documents" },
        { name: "Imagens", type: "folder", target: "images" },
        { name: "Downloads", type: "folder", target: "downloads" }
    ],

    documents: [
        { name: "Manual.txt", type: "file" },
        { name: "Sobre-o-sistema.txt", type: "file" }
    ],

    images: [
        { name: "Wallpaper.png", type: "file" }
    ],

    downloads: [
        { name: "Atualizacao.zip", type: "file" }
    ]
};

// Store simulated file contents
const fileContents = {

    "Manual.txt": `========================================
            NEXUS OS
        MANUAL DO USUARIO
    ========================================

    BEM-VINDO AO NEXUS OS

    O NEXUS OS e um ambiente operacional
    futurista desenvolvido para proporcionar
    uma experiencia digital interativa.

    ----------------------------------------
    1. AREA DE TRABALHO
    ----------------------------------------

    A area de trabalho e o ponto central
    do sistema.

    Nela voce encontra os aplicativos
    disponiveis, o relogio e a barra de tarefas.

    ----------------------------------------
    2. GERENCIADOR DE ARQUIVOS
    ----------------------------------------

    Utilize o Gerenciador de Arquivos para
    navegar pelos diretorios do sistema.

    Diretorios disponiveis:

    - Documentos
    - Imagens
    - Downloads

    Clique em uma pasta para acessar seu
    conteudo.

    Utilize o botao Voltar para retornar
    ao diretorio anterior.

    Clique em um arquivo para abrir sua
    visualizacao.

    ----------------------------------------
    3. APLICATIVO NOTAS
    ----------------------------------------

    O aplicativo Notas permite escrever
    e armazenar anotacoes.

    As alteracoes sao salvas automaticamente
    no armazenamento local do navegador.

    Suas anotacoes permanecem disponiveis
    mesmo depois de fechar o aplicativo.

    ----------------------------------------
    4. TERMINAL
    ----------------------------------------

    O Terminal permite interagir com o
    sistema atraves de comandos.

    Digite "ajuda" para consultar a lista
    de comandos disponiveis.

    Alguns comandos:

    - data
    - sobre
    - versao
    - status
    - tempo
    - limpar
    - historico

    ----------------------------------------
    5. DICAS DE UTILIZACAO
    ----------------------------------------

    - Arraste as janelas pelo cabecalho.
    - Utilize o botao X para fechar aplicativos.
    - Clique novamente nos icones para abrir
      os aplicativos.
    - Explore os diretorios disponiveis.

    ----------------------------------------
    6. INFORMACOES IMPORTANTES
    ----------------------------------------

    O NEXUS OS e um ambiente simulado.

    Algumas operacoes, como a extracao de
    arquivos compactados e o acesso ao
    sistema de arquivos real do computador,
    ainda nao estao implementadas.

    ========================================
        FIM DO MANUAL
    ========================================`,

    "Sobre-o-sistema.txt": `========================================
              NEXUS OS
          SOBRE O SISTEMA
    ========================================

    IDENTIDADE DO SISTEMA

    Nome: NEXUS OS
    Versao: 1.0
    Categoria: Sistema operacional simulado
    Plataforma: Web

    ----------------------------------------
    NOSSA PROPOSTA
    ----------------------------------------

    O NEXUS OS e um projeto experimental
    que simula a experiencia de utilizacao
    de um sistema operacional diretamente
    no navegador.

    Seu desenvolvimento utiliza tecnologias
    fundamentais da web:

    - HTML
    - CSS
    - JavaScript

    ----------------------------------------
    RECURSOS IMPLEMENTADOS
    ----------------------------------------

    - Area de trabalho interativa
    - Gerenciador de arquivos
    - Navegacao entre diretorios
    - Visualizador de documentos
    - Visualizador de imagens
    - Aplicativo de notas
    - Terminal com comandos
    - Janelas flutuantes e movimentaveis
    - Relogio e barra de tarefas

    ----------------------------------------
    FILOSOFIA DO PROJETO
    ----------------------------------------

    O objetivo do NEXUS OS e explorar
    conceitos de interfaces, interatividade
    e simulacao de ambientes operacionais.

    O projeto esta em desenvolvimento e
    novas funcionalidades poderao ser
    incorporadas em versoes futuras.

    ----------------------------------------
    STATUS
    ----------------------------------------

    Sistema: ONLINE
    Versao atual: 1.0
    Estado: Em desenvolvimento

    ========================================
          FIM DAS INFORMACOES
    ========================================`

};

// Get File Manager interface elements
const filesList = document.getElementById("files-list");
const currentFolder = document.getElementById("current-folder");
const backFolder = document.getElementById("back-folder");

// Store the current directory
let currentDirectory = "home";
// Store directory navigation history
const directoryHistory = [];

// Directory display names
const folderNames = {
    home: "Início",
    documents: "Documentos",
    images: "Imagens",
    downloads: "Downloads"
};

// Display files and folders in the current directory
function renderFiles() {

    // Clear the current file list
    filesList.innerHTML = "";

    // Update the current directory name
    currentFolder.textContent = folderNames[currentDirectory];

    // Get the contents of the current directory
    const items = fileSystem[currentDirectory];

    // Display each item
    items.forEach(function(item) {

        // Create a file or folder element
        const fileElement = document.createElement("div");

        // Set the element class
        fileElement.classList.add("file-item");


        // Choose an icon based on the item type and extension
        let icon;

        if (item.type === "folder") {

            icon = "📁";

        } else if (item.name.toLowerCase().endsWith(".png")) {

            icon = "🖼️";

        } else if (item.name.toLowerCase().endsWith(".zip")) {

            icon = "📦";

        } else {

            icon = "📄";

        }

        // Create the icon element
        const iconElement = document.createElement("span");
        iconElement.classList.add("file-icon");
        iconElement.textContent = icon;

        // Create the name element
        const nameElement = document.createElement("span");
        nameElement.classList.add("file-name");
        nameElement.textContent = item.name;

        // Add elements to the file item
        fileElement.appendChild(iconElement);
        fileElement.appendChild(nameElement);


        // Handle item click
        fileElement.addEventListener("click", function() {

            if (item.type === "folder") {

                // Navigate to the selected folder
                navigateToDirectory(item.target);

            } else {

                // Open the selected file
                openFile(item);

            }

        });

        // Add the item to the file list
        filesList.appendChild(fileElement);

    });

}

// Open a file in the File Preview window
function openFile(file) {

    // Reset the preview elements
    previewText.classList.add("hidden");
    previewImage.classList.add("hidden");
    previewMessage.classList.add("hidden");

    // Update the preview title
    previewTitle.textContent = file.name;

    // Check the file extension
    const extension = file.name.split(".").pop().toLowerCase();

    if (extension === "txt") {

        // Display text file content
        previewText.textContent = fileContents[file.name] || "Conteúdo indisponível.";
        previewText.classList.remove("hidden");

    } else if (extension === "png") {

        // Display the selected image
        previewImage.src = "assets/images/" + file.name;
        previewImage.alt = file.name;

        // Show the image element
        previewImage.classList.remove("hidden");

    } else if (extension === "zip") {

        // Display compressed archive information
        previewMessage.textContent =
            "ARQUIVO COMPACTADO\n\n" +
            "Nome: " + file.name + "\n" +
            "Formato: ZIP\n" +
            "Tipo: Arquivo compactado\n\n" +
            "Este arquivo representa um pacote de atualizacao " +
            "do NEXUS OS.\n\n" +
            "Status: Arquivo demonstrativo\n\n" +
            "A extracao e instalacao ainda nao estao disponiveis.";

        // Show archive information
        previewMessage.classList.remove("hidden");

    } else {

        // Display unsupported file message
        previewMessage.textContent = "Formato de arquivo não reconhecido.";
        previewMessage.classList.remove("hidden");

    }

    // Open the preview window
    openWindow(previewWindow);

}

// Navigate to another directory
function navigateToDirectory(directory) {

    // Save the current directory in history
    directoryHistory.push(currentDirectory);

    // Change the current directory
    currentDirectory = directory;

    // Update the displayed files
    renderFiles();

}

// Return to the previous directory
backFolder.addEventListener("click", function() {

    // Check if there is a previous directory
    if (directoryHistory.length > 0) {

        // Restore the previous directory
        currentDirectory = directoryHistory.pop();

        // Update the displayed files
        renderFiles();

    }

});

// Navigate using the sidebar
document.querySelectorAll(".folder-button").forEach(function(button) {

    button.addEventListener("click", function() {

        navigateToDirectory(button.dataset.folder);

    });

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