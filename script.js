document.addEventListener("DOMContentLoaded", function () {
    const settingsIcon = document.querySelector(".settings-icon");
    const settingsMenu = document.querySelector(".settings-menu");
    const searchForm = document.querySelector("form");
    const searchInput = document.querySelector("#search");
    const errorMessage = document.querySelector(".error-message");

    // Alternar visibilidade do menu de configurações
    settingsIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
    });

    // Fechar o menu de configurações ao clicar fora
    document.addEventListener("click", function (event) {
        if (!settingsMenu.contains(event.target) && event.target !== settingsIcon) {
            settingsMenu.style.display = "none";
        }
    });

    // Botão de fechar do menu de configurações
    const settingsCloseButton = document.querySelector("#settingsMenu .close-menu");
    if (settingsCloseButton) {
        settingsCloseButton.addEventListener("click", function () {
            settingsMenu.style.display = "none";
        });
    }

    // Verificar se o campo de pesquisa está vazio e redirecionar
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query === "") {
            if (errorMessage) {
                errorMessage.style.display = "block";
                errorMessage.textContent = "Por favor, insira um termo de pesquisa.";
            }
        } else {
            if (errorMessage) errorMessage.style.display = "none";
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    });

    // Pesquisa por voz usando Web Speech API
    const micButton = document.querySelector(".voice-search");
    if (micButton) {
        micButton.addEventListener("click", function () {
            if (!("webkitSpeechRecognition" in window)) {
                alert("Seu navegador não suporta reconhecimento de voz.");
                return;
            }

            const recognition = new webkitSpeechRecognition();
            recognition.lang = "pt-BR";
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.start();

            recognition.onresult = function (event) {
                const result = event.results[0][0].transcript;
                searchInput.value = result;
                searchForm.dispatchEvent(new Event("submit"));
            };

            recognition.onerror = function () {
                alert("Erro ao tentar reconhecer sua voz.");
            };
        });
    }

    // Redireciona para pesquisa por imagem no Google
    const imageButton = document.querySelector(".image-search");
    if (imageButton) {
        imageButton.addEventListener("click", function () {
            window.open("https://www.google.com/imghp", "_blank");
        });
    }

    // Exibição de explicações ao clicar nos itens do menu
    const menuLinks = document.querySelectorAll(".settings-menu a");
    const explanationBox = document.querySelector(".settings-menu .explanation");

    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const explanation = this.getAttribute("data-info");
            if (explanationBox) {
                explanationBox.textContent = explanation;
            }
        });
    });

    // Botões "Pesquisa Google" e "Estou com sorte"
    const searchButton = document.querySelector(".btn:not(.lucky-btn)");
    const luckyButton = document.querySelector(".lucky-btn");

    if (searchButton) {
        searchButton.addEventListener("click", function () {
            searchForm.dispatchEvent(new Event("submit"));
        });
    }

    if (luckyButton) {
        luckyButton.addEventListener("click", function () {
            const query = searchInput.value.trim();
            if (query === "") {
                if (errorMessage) {
                    errorMessage.style.display = "block";
                    errorMessage.textContent = "Por favor, insira um termo de pesquisa.";
                }
            } else {
                if (errorMessage) errorMessage.style.display = "none";
                window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=I`;
            }
        });
    }

    // --- Teclado virtual ---
    const keyboardToggle = document.querySelector(".keyboard-toggle");
    const virtualKeyboard = document.getElementById("virtualKeyboard");
    const keyboardClose = document.getElementById("keyboardClose");

    if (keyboardToggle && virtualKeyboard) {
        keyboardToggle.addEventListener("click", function () {
            virtualKeyboard.style.display =
                virtualKeyboard.style.display === "none" ? "block" : "none";
        });
    }

    if (keyboardClose) {
        keyboardClose.addEventListener("click", function () {
            virtualKeyboard.style.display = "none";
        });
    }

    const keyboardButtons = virtualKeyboard.querySelectorAll("button");
    keyboardButtons.forEach(button => {
        if (button.id !== "keyboardClose") {
            button.addEventListener("click", function () {
                searchInput.value += this.textContent;
                searchInput.focus();
            });
        }
    });

    // --- Menu de perfil ---
    const profilePic = document.querySelector(".profile-pic");
    const profileMenu = document.createElement("div");
    profileMenu.classList.add("settings-menu", "profile-menu");
    profileMenu.style.display = "none";
    profileMenu.setAttribute("aria-live", "polite");

    profileMenu.innerHTML = `
        <button class="close-menu" aria-label="Fechar perfil" title="Fechar o menu de perfil">&times;</button>
        <ul>
          <li><a href="#" title="Ver perfil do Google">Perfil</a></li>
          <li><a href="#" title="Acessar sua Conta do Google">Minha Conta</a></li>
          <li><a href="#" title="Ver seus dados">Dados</a></li>
          <li><a href="#" title="Ajustes de privacidade">Privacidade</a></li>
          <li><a href="#" title="Sair da sua conta">Sair</a></li>
        </ul>
    `;

    profilePic.parentElement.appendChild(profileMenu);

    profilePic.addEventListener("click", function (event) {
        event.stopPropagation();
        profileMenu.style.display = profileMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!profileMenu.contains(event.target) && event.target !== profilePic) {
            profileMenu.style.display = "none";
        }
    });

    profileMenu.querySelector(".close-menu").addEventListener("click", function () {
        profileMenu.style.display = "none";
    });
});
