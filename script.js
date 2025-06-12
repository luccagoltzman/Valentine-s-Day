// Elementos do player de música
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = new Audio('assets/music/Air Supply - Making Love Out Of Nothing At All.mp3'); 
const musicPlayer = document.querySelector('.music-player');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const songImg = document.querySelector('.song-img');
let isPlaying = false;

// Lista de músicas (você deve substituir com suas músicas)
const songs = [
    {
        title: "Making Love Out Of Nothing At All",
        artist: "Air Supply",
        path: "assets/music/Air Supply - Making Love Out Of Nothing At All.mp3" 
    }
];

let currentSongIndex = 0;

// Funções do player de música
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        musicPlayer.classList.remove('playing');
        songImg.style.animationPlayState = 'paused';
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicPlayer.classList.add('playing');
        songImg.style.animationPlayState = 'running';
    }
    isPlaying = !isPlaying;
}

function loadSong(song) {
    audio.src = song.path;
    document.querySelector('.song-title').textContent = song.title;
    document.querySelector('.song-artist').textContent = song.artist;
}

// Formatação do tempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Atualizar progresso
function updateProgress() {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
    }
}

// Definir progresso ao clicar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Eventos do player
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) {
        audio.play();
        musicPlayer.classList.add('playing');
    }
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) {
        audio.play();
        musicPlayer.classList.add('playing');
    }
});

// Atualizar a barra de progresso e tempo
audio.addEventListener('timeupdate', updateProgress);

// Carregar metadados da música
audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
    currentTimeEl.textContent = '0:00';
});

// Carregar primeira música
loadSong(songs[currentSongIndex]);

// Funcionalidade do botão "Não"
const noBtn = document.querySelector('.no-btn');
const yesBtn = document.querySelector('.yes-btn');
const container = document.querySelector('.container');

// Função para mover o botão
function moveButton() {
    // Obter as dimensões e posição do container e dos botões
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();
    const yesBtnRect = yesBtn.getBoundingClientRect();
    
    // Definir uma área limitada para o movimento (próxima ao botão "sim")
    const areaWidth = Math.min(300, containerRect.width - buttonRect.width); // Máximo de 300px de largura
    const areaHeight = Math.min(200, containerRect.height - buttonRect.height); // Máximo de 200px de altura
    
    // Calcular o centro da área de movimento (baseado na posição do botão "sim")
    const centerX = yesBtnRect.right + areaWidth / 2;
    const centerY = yesBtnRect.top;
    
    // Gerar uma posição aleatória dentro da área limitada
    const randomAngle = Math.random() * Math.PI * 2; // Ângulo aleatório
    const randomRadius = Math.random() * 1000; // Raio aleatório (máximo 1000px)
    
    // Calcular nova posição usando coordenadas polares
    let newX = centerX + Math.cos(randomAngle) * randomRadius;
    let newY = centerY + Math.sin(randomAngle) * randomRadius;
    
    // Garantir que o botão permaneça dentro dos limites do container
    newX = Math.max(0, Math.min(newX, containerRect.width - buttonRect.width));
    newY = Math.max(yesBtnRect.top - 100, Math.min(newY, yesBtnRect.top + 100));
    
    // Aplicar a nova posição com animação suave
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.transition = 'all 0.3s ease';
    
    // Adicionar corações
    createFloatingHearts(2);
}

// Eventos para o botão "não"
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

// Evento para o botão "sim"
yesBtn.addEventListener('click', () => {
    // Criar uma explosão de corações
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFloatingHearts(1);
        }, i * 100);
    }

    // Animar a transição
    container.style.transform = 'scale(0.8)';
    container.style.opacity = '0';
    container.style.transition = 'all 0.5s ease';

    // Após a animação de saída, mostrar a nova tela
    setTimeout(() => {
        container.innerHTML = `
            <div class="acceptance-screen">
                <h1>Eu te amo!</h1>
                <div class="acceptance-content">
                    <p class="love-message">
                        Você me faz a pessoa mais feliz do mundo!<br>
                        Cada momento ao seu lado é especial e único.<br>
                        Nosso amor é a prova de que almas gêmeas existem.
                    </p>
                    
                    <p class="forever-message">
                        Para sempre nós dois!
                    </p>
                </div>
            </div>
        `;

        // Animar a entrada da nova tela
        container.style.transform = 'scale(1)';
        container.style.opacity = '1';
    }, 500);

    // Tocar o som de sucesso
    const audio = document.querySelector('audio');
    if (audio) {
        audio.play();
    }
});

// Função para criar corações flutuantes
function createFloatingHearts(quantity) {
    for (let i = 0; i < quantity; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = ['❤️', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
        
        // Posição inicial aleatória
        const startX = Math.random() * window.innerWidth;
        heart.style.left = `${startX}px`;
        heart.style.top = '100%';
        
        // Adicionar variação no tamanho e rotação
        const scale = 0.5 + Math.random() * 1;
        const rotation = Math.random() * 360;
        heart.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        
        document.body.appendChild(heart);
        
        // Remover o coração após a animação
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}

// Quando a música termina
audio.addEventListener('ended', () => {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    songImg.style.animationPlayState = 'paused';
    audio.currentTime = 0;
}); 