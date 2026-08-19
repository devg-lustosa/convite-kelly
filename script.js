function nextStep(step) {
    // Remove a classe 'active' de todos os cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
    });
    // Adiciona a classe 'active' ao card atual
    document.getElementById(`step${step}`).classList.add('active');
}

const noBtn = document.getElementById('no-btn');
const yesBtn = document.querySelector('.yes-btn');
let yesScale = 1;

// Função para fazer o botão "Não" fugir (apenas no computador)
function moveNoButton(e) {
    // Se for celular (tela pequena), não foge, deixa ela clicar para ver o erro!
    if (window.innerWidth <= 600) {
        return;
    }

    if (e) e.preventDefault();

    // Remove o botão de dentro do card e coloca no body para que o CSS "transform" não interfira nas posições
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }

    // Muda a posição para fixed para poder mover pela tela toda
    noBtn.style.position = 'fixed';
    
    // Limite seguro para não sair da tela (pega o tamanho exato do botão para não vazar)
    const safeMargin = 20;
    const btnWidth = noBtn.offsetWidth || 100;
    const btnHeight = noBtn.offsetHeight || 50;
    
    const maxX = window.innerWidth - btnWidth - safeMargin;
    const maxY = window.innerHeight - btnHeight - safeMargin;
    
    // Gera posições aleatórias dentro do limite
    const randomX = Math.max(safeMargin, Math.floor(Math.random() * maxX));
    const randomY = Math.max(safeMargin, Math.floor(Math.random() * maxY));
    
    // Aplica as posições com uma transição suave adicionada via JS
    noBtn.style.transition = 'left 0.2s ease, top 0.2s ease';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // MECÂNICA DIVERTIDA: O botão "Sim" cresce cada vez que ela tenta apertar o "Não"
    if (yesScale < 2.5) {
        yesScale += 0.15;
        yesBtn.style.transform = `scale(${yesScale})`;
        yesBtn.style.transition = 'transform 0.2s ease';
    }
}

// Hover faz fugir no computador
noBtn.addEventListener('mouseover', moveNoButton);

// Clique mostra o popup de erro (no celular ela consegue clicar)
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('error-popup').classList.add('active');
});

function closePopup() {
    document.getElementById('error-popup').classList.remove('active');
}

function sayYes() {
    // Esconde o botão não caso ele esteja solto pelo body
    noBtn.style.display = 'none';
    nextStep(5);
    fireConfetti();
}

function fireConfetti() {
    var duration = 3000; // 3 segundos de confete
    var end = Date.now() + duration;

    (function frame() {
        // Lança confetes dos dois lados da tela
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4b6e', '#ff9a9e', '#ffffff', '#ffd700']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4b6e', '#ff9a9e', '#ffffff', '#ffd700']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
