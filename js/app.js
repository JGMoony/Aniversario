/**
 * ====================================================================
 * APLICACIÓN PRINCIPAL - INTERACTIVIDAD Y FLUJO
 * ====================================================================
 */

import { CONFIG } from './config.js';
import { sound } from './sound.js';
import { initParticles, particles } from './particles.js';

// Estado de la aplicación
const state = {
  currentTrackIndex: 0,
  isSongPlaying: false,
  unlockedDoors: new Set(),
  totalDoors: 4,
  currentEvasiveIndex: 0,
  isLetterOpened: false
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar fondo de partículas del túnel de Coraline
  initParticles('bg-canvas');

  // 2. Cargar textos e información desde CONFIG
  populateContentFromConfig();

  // 3. Registrar eventos de interacción
  setupWelcomeScreenEvents();
  setupDashboardEvents();
  setupPlaylistEvents();
  setupComplimentsEvents();
  setupPhotosEvents();
  setupLetterEvents();
  setupAudioToggle();

  // Permite cerrar modales con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      closeLightbox();
    }
  });
});

/* ====================================================================
   POBLAR CONTENIDO DESDE CONFIG.JS
   ==================================================================== */
function populateContentFromConfig() {
  // Pantalla de Bienvenida
  const welcomeBadge = document.getElementById('welcome-badge');
  const welcomeTitle = document.getElementById('welcome-title');
  const welcomeQuestion = document.getElementById('welcome-question');
  const btnYesText = document.getElementById('btn-yes-text');
  const btnNoText = document.getElementById('btn-no-text');

  if (welcomeBadge) welcomeBadge.textContent = CONFIG.welcomeScreen.badge;
  if (welcomeTitle) welcomeTitle.textContent = CONFIG.welcomeScreen.mainTitle;
  if (welcomeQuestion) welcomeQuestion.textContent = CONFIG.welcomeScreen.question;
  if (btnYesText) btnYesText.textContent = CONFIG.welcomeScreen.yesButtonText;
  if (btnNoText) btnNoText.textContent = CONFIG.welcomeScreen.noButtonText;

  // Dashboard
  const dashTitle = document.getElementById('dash-title');
  const dashSubtitle = document.getElementById('dash-subtitle');
  if (dashTitle) dashTitle.textContent = CONFIG.dashboard.title;
  if (dashSubtitle) dashSubtitle.textContent = CONFIG.dashboard.subtitle;

  // Títulos y descripciones de las 4 tarjetas
  const card1Title = document.getElementById('card1-title');
  const card1Desc = document.getElementById('card1-desc');
  if (card1Title) card1Title.textContent = CONFIG.playlistSection.cardTitle;
  if (card1Desc) card1Desc.textContent = CONFIG.playlistSection.cardDesc;

  const card2Title = document.getElementById('card2-title');
  const card2Desc = document.getElementById('card2-desc');
  if (card2Title) card2Title.textContent = CONFIG.complimentsSection.cardTitle;
  if (card2Desc) card2Desc.textContent = CONFIG.complimentsSection.cardDesc;

  const card3Title = document.getElementById('card3-title');
  const card3Desc = document.getElementById('card3-desc');
  if (card3Title) card3Title.textContent = CONFIG.photosSection.cardTitle;
  if (card3Desc) card3Desc.textContent = CONFIG.photosSection.cardDesc;

  const card4Title = document.getElementById('card4-title');
  const card4Desc = document.getElementById('card4-desc');
  if (card4Title) card4Title.textContent = CONFIG.letterSection.cardTitle;
  if (card4Desc) card4Desc.textContent = CONFIG.letterSection.cardDesc;

  // Modal 1: Playlist
  const playlistTitle = document.getElementById('modal-playlist-title');
  const playlistPersonalNote = document.getElementById('playlist-personal-note');
  const spotifyPersonalNote = document.getElementById('spotify-personal-note');
  if (playlistTitle) playlistTitle.textContent = CONFIG.playlistSection.modalTitle;
  if (playlistPersonalNote) playlistPersonalNote.textContent = CONFIG.playlistSection.personalNote;
  if (spotifyPersonalNote) spotifyPersonalNote.textContent = CONFIG.playlistSection.personalNote;

  renderTracklist();

  // Modal 2: Cumplidos
  const complimentsTitle = document.getElementById('modal-compliments-title');
  const complimentsInstruction = document.getElementById('compliments-instruction');
  if (complimentsTitle) complimentsTitle.textContent = CONFIG.complimentsSection.modalTitle;
  if (complimentsInstruction) complimentsInstruction.textContent = CONFIG.complimentsSection.instruction;

  spawnComplimentBubbles();

  // Modal 3: Fotos
  const photosTitle = document.getElementById('modal-photos-title');
  const photosInstruction = document.getElementById('photos-instruction');
  if (photosTitle) photosTitle.textContent = CONFIG.photosSection.modalTitle;
  if (photosInstruction) photosInstruction.textContent = CONFIG.photosSection.instruction;

  renderPolaroidWall();

  // Modal 4: Carta
  const letterDate = document.getElementById('letter-date');
  const letterSalutation = document.getElementById('letter-salutation');
  const letterBody = document.getElementById('letter-body');
  const letterClosing = document.getElementById('letter-closing');
  const letterSignature = document.getElementById('letter-signature');
  const letterPostscript = document.getElementById('letter-postscript');

  if (letterDate) letterDate.textContent = CONFIG.letterSection.date;
  if (letterSalutation) letterSalutation.textContent = CONFIG.letterSection.salutation;
  if (letterClosing) letterClosing.textContent = CONFIG.letterSection.closing;
  if (letterSignature) letterSignature.textContent = CONFIG.letterSection.signature;
  if (letterPostscript) letterPostscript.textContent = CONFIG.letterSection.postScript;

  if (letterBody) {
    letterBody.innerHTML = '';
    CONFIG.letterSection.paragraphs.forEach(paragraphText => {
      const p = document.createElement('p');
      p.textContent = paragraphText;
      letterBody.appendChild(p);
    });
  }
}

/* ====================================================================
   PANTALLA DE BIENVENIDA Y BOTÓN EVASIVO
   ==================================================================== */
function setupWelcomeScreenEvents() {
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const evasiveMessage = document.getElementById('evasive-message');
  const arena = document.getElementById('decision-arena');

  if (!btnYes || !btnNo) return;

  // Botón "Sí, por favor": Avance triunfal
  btnYes.addEventListener('click', (e) => {
    sound.playCelebrationSparkle();

    // Detonar confeti de Coraline (botones, corazones y chispas)
    const rect = btnYes.getBoundingClientRect();
    particles.launchCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // Iniciar suavemente la música de fondo si está configurado
    if (CONFIG.audio.autoStartOnEnter) {
      setTimeout(() => {
        if (!sound.isMusicPlaying) {
          sound.startMusicBox();
          updateMusicUI(true);
        }
      }, 700);
    }

    // Transición suave entre pantallas
    setTimeout(() => {
      transitionToDashboard();
    }, 900);
  });

  // Función para mover evasivamente el botón "No gracias"
  const dodgeButton = (e) => {
    if (e) e.preventDefault();
    sound.playEvasive();

    const arenaRect = arena ? arena.getBoundingClientRect() : { width: 300, height: 100 };
    const btnRect = btnNo.getBoundingClientRect();

    // Rango de desplazamiento seguro
    const maxOffset = window.innerWidth < 640 ? 60 : 130;
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * 70;

    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Mostrar mensaje travieso
    const messages = CONFIG.welcomeScreen.evasiveMessages;
    evasiveMessage.textContent = messages[state.currentEvasiveIndex % messages.length];
    evasiveMessage.classList.add('visible');
    state.currentEvasiveIndex++;

    // Efecto de sacudida leve en el mensaje
    evasiveMessage.style.animation = 'none';
    setTimeout(() => {
      evasiveMessage.style.animation = 'keyFloat 0.3s ease';
    }, 10);
  };

  // Moverse al pasar el ratón (hover)
  btnNo.addEventListener('mouseenter', dodgeButton);

  // Moverse al tocar o hacer clic en pantallas táctiles
  btnNo.addEventListener('touchstart', dodgeButton, { passive: false });
  btnNo.addEventListener('click', dodgeButton);
}

function transitionToDashboard() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const dashScreen = document.getElementById('dashboard-screen');

  welcomeScreen.classList.remove('active');
  welcomeScreen.classList.add('hidden');

  dashScreen.classList.remove('hidden');
  dashScreen.classList.add('active');

  // Scroll suave al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ====================================================================
   DASHBOARD Y TARJETAS (LAS 4 PUERTAS SECRETAS)
   ==================================================================== */
function setupDashboardEvents() {
  const doorCards = document.querySelectorAll('.secret-door-card');

  doorCards.forEach(card => {
    card.addEventListener('click', () => {
      const doorType = card.dataset.door;
      openModal(doorType);

      // Marcar puerta como desbloqueada
      if (!state.unlockedDoors.has(doorType)) {
        state.unlockedDoors.add(doorType);
        card.classList.add('revealed');
        updateProgress();
      }
    });
  });

  // Botones para cerrar modales
  const closeBtns = document.querySelectorAll('.modal-close, .modal-backdrop');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      closeAllModals();
    });
  });
}

function openModal(doorType) {
  sound.playDoorOpen();
  const modal = document.getElementById(`modal-${doorType}`);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  const modals = document.querySelectorAll('.coraline-modal');
  modals.forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

function updateProgress() {
  const count = state.unlockedDoors.size;
  const progressText = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-fill');

  if (progressText) {
    progressText.textContent = `${count} de ${state.totalDoors} secretos revelados`;
  }

  if (progressFill) {
    const percentage = (count / state.totalDoors) * 100;
    progressFill.style.width = `${percentage}%`;
  }

  // Si se abrieron todas las puertas, celebración especial
  if (count === state.totalDoors) {
    setTimeout(() => {
      sound.playCelebrationSparkle();
      particles.launchCelebration();
    }, 600);
  }
}

/* ====================================================================
   PUERTA 1: PLAYLIST (SPOTIFY INTEGRADO Y TOCADISCOS)
   ==================================================================== */

// Normaliza cualquier URL de Spotify (playlist, track, album) para el iframe oficial de Spotify
function formatSpotifyEmbedUrl(url) {
  if (!url) return '';
  let clean = url.trim();

  // Si ya es un enlace /embed/
  if (clean.includes('/embed/')) {
    if (!clean.includes('theme=0')) {
      clean += (clean.includes('?') ? '&' : '?') + 'utm_source=generator&theme=0';
    }
    return clean;
  }

  // Capturar tipo e ID (ej. playlist/ID, track/ID, album/ID, etc.)
  const match = clean.match(/open\.spotify\.com\/(?:intl-[a-zA-Z-]+\/)?(playlist|track|album|artist)\/([a-zA-Z0-9]+)/);
  if (match) {
    const type = match[1];
    const id = match[2];
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  }

  // Fallback simple
  if (clean.includes('open.spotify.com/')) {
    return clean.replace('open.spotify.com/', 'open.spotify.com/embed/') + '?utm_source=generator&theme=0';
  }

  return clean;
}

function setupPlaylistEvents() {
  const btnPlay = document.getElementById('btn-play-song');
  const btnPrev = document.getElementById('btn-prev-song');
  const btnNext = document.getElementById('btn-next-song');
  const vinylDisc = document.getElementById('vinyl-disc');
  const playIcon = document.getElementById('play-icon');

  const tabSpotify = document.getElementById('tab-spotify');
  const tabTurntable = document.getElementById('tab-turntable');
  const viewSpotify = document.getElementById('view-spotify');
  const viewTurntable = document.getElementById('view-turntable');
  const spotifyMount = document.getElementById('spotify-player-mount');

  // Montar el iframe de Spotify embebido
  if (spotifyMount && CONFIG.playlistSection.spotifyUrl) {
    const embedUrl = formatSpotifyEmbedUrl(CONFIG.playlistSection.spotifyUrl);
    spotifyMount.innerHTML = `
      <iframe
        src="${embedUrl}"
        width="100%"
        height="352"
        frameborder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Reproductor de Spotify para mi amor">
      </iframe>
    `;
  }

  // Vista inicial configurada
  const defaultView = CONFIG.playlistSection.defaultView || 'spotify';
  if (defaultView === 'turntable') {
    tabSpotify?.classList.remove('active');
    tabTurntable?.classList.add('active');
    viewSpotify?.classList.add('hidden');
    viewSpotify?.classList.remove('active');
    viewTurntable?.classList.remove('hidden');
    viewTurntable?.classList.add('active');
  }

  // Cambio de pestañas Spotify / Tocadiscos
  tabSpotify?.addEventListener('click', () => {
    sound.playClick();
    
    // Si la caja de música ambiental o el vinilo están sonando, pausarlos
    if (sound.isMusicPlaying) {
      sound.stopMusicBox();
      updateMusicUI(false);
    }
    if (state.isSongPlaying) {
      state.isSongPlaying = false;
      vinylDisc?.classList.remove('spinning');
      if (playIcon) playIcon.textContent = '▶';
    }

    tabSpotify.classList.add('active');
    tabTurntable.classList.remove('active');
    viewSpotify.classList.remove('hidden');
    viewSpotify.classList.add('active');
    viewTurntable.classList.add('hidden');
    viewTurntable.classList.remove('active');
  });

  tabTurntable?.addEventListener('click', () => {
    sound.playClick();
    tabTurntable.classList.add('active');
    tabSpotify.classList.remove('active');
    viewTurntable.classList.remove('hidden');
    viewTurntable.classList.add('active');
    viewSpotify.classList.add('hidden');
    viewSpotify.classList.remove('active');
  });

  // Controles del tocadiscos
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      sound.playClick();
      state.isSongPlaying = !state.isSongPlaying;

      if (state.isSongPlaying) {
        vinylDisc.classList.add('spinning');
        playIcon.textContent = '⏸';
        if (!sound.isMusicPlaying) {
          sound.startMusicBox();
          updateMusicUI(true);
        }
      } else {
        vinylDisc.classList.remove('spinning');
        playIcon.textContent = '▶';
        sound.stopMusicBox();
        updateMusicUI(false);
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      sound.playClick();
      const songs = CONFIG.playlistSection.songs;
      state.currentTrackIndex = (state.currentTrackIndex - 1 + songs.length) % songs.length;
      updateSongDisplay();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      sound.playClick();
      const songs = CONFIG.playlistSection.songs;
      state.currentTrackIndex = (state.currentTrackIndex + 1) % songs.length;
      updateSongDisplay();
    });
  }
}

function renderTracklist() {
  const tracklist = document.getElementById('tracklist');
  if (!tracklist) return;

  tracklist.innerHTML = '';
  const songs = CONFIG.playlistSection.songs;

  songs.forEach((song, idx) => {
    const li = document.createElement('li');
    li.className = `track-item ${idx === state.currentTrackIndex ? 'active' : ''}`;
    li.innerHTML = `
      <div>
        <div class="track-item-title">${song.title}</div>
        <div class="track-item-artist">${song.artist}</div>
      </div>
      <span class="track-item-duration">${song.duration}</span>
    `;

    li.addEventListener('click', () => {
      sound.playClick();
      state.currentTrackIndex = idx;
      updateSongDisplay();

      // Si no estaba girando, empezar
      if (!state.isSongPlaying) {
        const btnPlay = document.getElementById('btn-play-song');
        if (btnPlay) btnPlay.click();
      }
    });

    tracklist.appendChild(li);
  });

  updateSongDisplay();
}

function updateSongDisplay() {
  const songs = CONFIG.playlistSection.songs;
  const current = songs[state.currentTrackIndex];
  if (!current) return;

  const currentTitle = document.getElementById('current-song-title');
  const currentArtist = document.getElementById('current-song-artist');
  const currentDedication = document.getElementById('current-song-dedication');

  if (currentTitle) currentTitle.textContent = current.title;
  if (currentArtist) currentArtist.textContent = current.artist;
  if (currentDedication) currentDedication.textContent = `"${current.dedication}"`;

  // Actualizar clase activa en la lista
  const items = document.querySelectorAll('.track-item');
  items.forEach((item, idx) => {
    item.classList.toggle('active', idx === state.currentTrackIndex);
  });
}

/* ====================================================================
   PUERTA 2: TODO ESTO ES PARA TI (BURBUJAS MÁGICAS)
   ==================================================================== */
function setupComplimentsEvents() {
  const btnSpawn = document.getElementById('btn-spawn-bubbles');
  if (btnSpawn) {
    btnSpawn.addEventListener('click', () => {
      sound.playPop();
      spawnComplimentBubbles();
    });
  }
}

function spawnComplimentBubbles() {
  const arena = document.getElementById('bubbles-arena');
  if (!arena) return;

  arena.innerHTML = '';
  const compliments = CONFIG.complimentsSection.compliments;

  compliments.forEach((text, i) => {
    const bubble = document.createElement('button');
    bubble.className = 'magic-bubble';
    bubble.style.animationDelay = `${(i * 0.15).toFixed(2)}s`;

    // Texto de la burbuja (abreviado o temático)
    const previewPhrases = [
      "Eres magia ✨", "Tu sonrisa ☀️", "Tus ojitos 🗝️", "Mi refugio 🏰",
      "Te amo 💖", "Aventura pura 🌌", "Mi lugar favorito 🧸", "Gracias por existir 💫",
      "Me encantas 🌸", "Destino bonito 🍀", "Mi orgullo 👑", "Amor suave 🤍"
    ];
    bubble.textContent = previewPhrases[i % previewPhrases.length];

    bubble.addEventListener('click', (e) => {
      sound.playPop();
      bubble.classList.add('popped');

      // Pequeño estallido de chispas en la posición de la burbuja
      const rect = bubble.getBoundingClientRect();
      particles.launchCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2);

      // Desplegar el cumplido completo en el panel destacado
      const spotlight = document.getElementById('spotlight-text');
      if (spotlight) {
        spotlight.style.opacity = '0';
        setTimeout(() => {
          spotlight.textContent = text;
          spotlight.style.opacity = '1';
        }, 150);
      }
    });

    arena.appendChild(bubble);
  });
}

/* ====================================================================
   PUERTA 3: MIS FOTOS FAVORITAS (POLAROIDS Y LIGHTBOX)
   ==================================================================== */
function setupPhotosEvents() {
  const closeBtn = document.getElementById('btn-close-lightbox');
  const lightbox = document.getElementById('photo-lightbox');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sound.playClick();
      closeLightbox();
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        sound.playClick();
        closeLightbox();
      }
    });
  }
}

function renderPolaroidWall() {
  const wall = document.getElementById('polaroids-wall');
  if (!wall) return;

  wall.innerHTML = '';
  const photos = CONFIG.photosSection.photos;

  photos.forEach((photo) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.innerHTML = `
      <div class="polaroid-tape"></div>
      <div class="polaroid-img-box">
        <img src="${photo.src}" alt="${photo.title}" loading="lazy">
      </div>
      <div class="polaroid-text">
        <h4 class="polaroid-title">${photo.title}</h4>
        <span class="polaroid-date">${photo.date}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      sound.playDoorOpen();
      openLightbox(photo);
    });

    wall.appendChild(card);
  });
}

function openLightbox(photo) {
  const lightbox = document.getElementById('photo-lightbox');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const date = document.getElementById('lightbox-date');
  const desc = document.getElementById('lightbox-desc');

  if (img) img.src = photo.src;
  if (title) title.textContent = photo.title;
  if (date) date.textContent = photo.date;
  if (desc) desc.textContent = photo.caption;

  if (lightbox) lightbox.classList.remove('hidden');
}

function closeLightbox() {
  const lightbox = document.getElementById('photo-lightbox');
  if (lightbox) lightbox.classList.add('hidden');
}

/* ====================================================================
   PUERTA 4: TE DEDICO ESTO (SOBRE Y CARTA ROMÁNTICA)
   ==================================================================== */
function setupLetterEvents() {
  const envelope = document.getElementById('envelope-sealed');
  const letter = document.getElementById('letter-unfolded');

  if (envelope) {
    envelope.addEventListener('click', () => {
      sound.playDoorOpen();
      sound.playCelebrationSparkle();

      envelope.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
      envelope.style.transform = 'scale(0.8)';
      envelope.style.opacity = '0';

      setTimeout(() => {
        envelope.style.display = 'none';
        if (letter) {
          letter.classList.remove('hidden');
        }
      }, 400);
    });
  }
}

/* ====================================================================
   CONTROL DE AUDIO AMBIENTAL
   ==================================================================== */
function setupAudioToggle() {
  const btnToggle = document.getElementById('btn-toggle-music');
  if (!btnToggle) return;

  btnToggle.addEventListener('click', () => {
    sound.playClick();
    const isPlaying = sound.toggleMusic();
    updateMusicUI(isPlaying);
  });
}

function updateMusicUI(isPlaying) {
  const btnToggle = document.getElementById('btn-toggle-music');
  const musicText = document.getElementById('music-text');

  if (btnToggle) {
    btnToggle.classList.toggle('playing', isPlaying);
  }

  if (musicText) {
    musicText.textContent = isPlaying ? 'Música: ON 🎶' : 'Música: OFF';
  }
}
