document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // --- Lógica de Tema (Light/Dark Mode) ---
    const themeToggle = document.getElementById('theme-toggle');

    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    };

    // Carregar tema salvo ou usar padrão do sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // --- Lógica do Menu Mobile (Hamburger) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    let menuOverlay = document.querySelector('.menu-overlay'); // Tenta encontrar o overlay existente

    // Se o overlay não existe, cria ele
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.classList.add('menu-overlay');
        document.body.appendChild(menuOverlay);
    }

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('no-scroll'); // Impede o scroll do body

        // Alterna o ícone do hambúrguer
        if (mobileMenu.classList.contains('active')) {
            hamburgerMenu.innerHTML = '<i class="fas fa-times"></i>'; // Ícone de fechar
        } else {
            hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>'; // Ícone de hambúrguer
        }
    };

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMobileMenu);
    }

    // Fechar menu ao clicar em um link do menu mobile
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu(); // Fecha o menu
            }
        });
    });

    // Fechar menu ao clicar no overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMobileMenu);
    }

    // --- Geração Dinâmica de Habilidades (Skills) ---
    const skills = [
        { name: "Python", icon: "fab fa-python" },
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "HTML5", icon: "fab fa-html5" },
        { name: "CSS3", icon: "fab fa-css3-alt" },
        { name: "Git", icon: "fab fa-git-alt" },
        { name: "VSCODE", icon: "fas fa-code" },
        { name: "SQL", icon: "fas fa-database" },
        { name: "Docker", icon: "fab fa-docker" },
        { name: "Linux", icon: "fab fa-linux" }
    ];

    const skillsDisplay = document.getElementById('skills-display');
    if (skillsDisplay) {
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.classList.add('skill-item-epic');
            skillItem.innerHTML = `
                <i class="${skill.icon}"></i>
                <h3>${skill.name}</h3>
            `;
            skillsDisplay.appendChild(skillItem);
        });
    }

    // --- Lógica de Mensagem de Sucesso do Formulário de Contato ---
    const formMessageContainer = document.getElementById('form-message-container');
    if (formMessageContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');

        if (status === 'success') {
            formMessageContainer.innerHTML = `
                <div class="form-message success">
                    <i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Em breve entrarei em contato.
                </div>
            `;
            // Opcional: Remover o parâmetro da URL após exibir a mensagem
            history.replaceState({}, document.title, window.location.pathname);
        } else if (status === 'error') {
            formMessageContainer.innerHTML = `
                <div class="form-message error">
                    <i class="fas fa-exclamation-circle"></i> Ocorreu um erro ao enviar a mensagem. Tente novamente.
                </div>
            `;
            history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // --- Geração Dinâmica de Círculos de Fundo ---
    const backgroundCirclesContainer = document.querySelector('.background-circles');
    const numberOfCircles = 30; // Quantidade de círculos

    if (backgroundCirclesContainer) {
        for (let i = 0; i < numberOfCircles; i++) {
            const circle = document.createElement('div');

            // Tamanho aleatório
            const size = Math.random() * (200 - 80) + 80; // Entre 80px e 200px
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;

            // Posição inicial aleatória (usando vw/vh para cobrir toda a tela)
            const startX = Math.random() * 120 - 10; // -10vw a 110vw
            const startY = Math.random() * 120 - 10; // -10vh a 110vh
            circle.style.left = `${startX}vw`;
            circle.style.top = `${startY}vh`;

            // Duração e atraso da animação aleatórios
            const duration = Math.random() * (35 - 15) + 15; // Entre 15s e 35s
            const delay = Math.random() * -duration; // Atraso negativo para começar em diferentes fases da animação
            circle.style.animationDelay = `${delay}s`;
            circle.style.animationDuration = `${duration}s`;

            // Variáveis CSS para a animação floatAndFade
            // Movimento aleatório (maior range para mais movimento)
            const moveRange = 400; // Pixels de movimento
            const startTranslateX = (Math.random() - 0.5) * moveRange;
            const startTranslateY = (Math.random() - 0.5) * moveRange;
            const midTranslateX = (Math.random() - 0.5) * moveRange;
            const midTranslateY = (Math.random() - 0.5) * moveRange;
            const endTranslateX = (Math.random() - 0.5) * moveRange;
            const endTranslateY = (Math.random() - 0.5) * moveRange;

            // Escala aleatória
            const startScale = Math.random() * (0.9 - 0.5) + 0.5;
            const midScale = Math.random() * (1.4 - 1.0) + 1.0;
            const endScale = Math.random() * (0.9 - 0.5) + 0.5;

            // Opacidade aleatória (um pouco mais visíveis)
            const maxOpacity = Math.random() * (0.8 - 0.4) + 0.4; // Entre 0.4 e 0.8

            circle.style.setProperty('--start-x', `${startTranslateX}px`);
            circle.style.setProperty('--start-y', `${startY}px`);
            circle.style.setProperty('--start-scale', startScale);
            circle.style.setProperty('--mid-x', `${midTranslateX}px`);
            circle.style.setProperty('--mid-y', `${midTranslateY}px`);
            circle.style.setProperty('--mid-scale', midScale);
            circle.style.setProperty('--end-x', `${endTranslateX}px`);
            circle.style.setProperty('--end-y', `${endTranslateY}px`);
            circle.style.setProperty('--end-scale', endScale);
            circle.style.setProperty('--max-opacity', maxOpacity);


            backgroundCirclesContainer.appendChild(circle);
        }
    }
});