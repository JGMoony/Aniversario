/**
 * ====================================================================
 * CONFIGURACIÓN PRINCIPAL - ANIVERSARIO ESTILO CORALINE
 * ====================================================================
 * Puedes editar cualquier texto, enlace, foto o canción en este archivo.
 * Los cambios se reflejarán automáticamente en la página.
 */

export const CONFIG = {
  // Datos principales de la pareja
  couple: {
    partnerName: "Mi Amor Bonito",
    yourName: "Tu Novio",
    anniversaryDate: "18 de Septiembre",
    yearsTogether: "Nuestro Amor Infinito",
    nickname: "Mi Amor Bonito"
  },

  // 1. PANTALLA DE BIENVENIDA / INTERCEPCIÓN
  welcomeScreen: {
    badge: "🗝️ Una puerta secreta hacia mi corazón",
    mainTitle: "FELIZ ANIVERSARIO MI AMOR",
    question: "¿Quieres abrir la puerta y descubrir tu sorpresa?",
    yesButtonText: "¡Sí, por favor!",
    noButtonText: "No gracias",
    
    // Frases traviesas que dice el botón "No gracias" cuando intenta escapar
    evasiveMessages: [
      "¡Oye! Esa puerta no se abre... ",
      "¡Por favor, te va a encantar! Di que sí ",
      "¡No te resistas a la magia! ",
      "¡Ups, casi me atrapas! ",
      "¡Sé que quieres verla, mi amor! ",
      "¡El botón de la izquierda tiene sushi y amor! ",
      "¡Te conozco, di que sí por favor!",
      "¡Ni el gato negro se atrevería a darme click!",
      "¡Ándale amor, presiona 'Sí, por favor'! "
    ]
  },

  // 2. DASHBOARD PRINCIPAL (LAS 4 PUERTAS SECRETAS)
  dashboard: {
    headerBadge: "El Otro Mundo Hecho Para Ti",
    title: "¡Sorpresa Mi Amor!",
    subtitle: "Cada puerta secreta guarda un pedacito de lo mucho que te amo. Haz clic en cada una para descubrirlas todas.",
    progressLabel: "Secretos revelados:"
  },

  // 3. PUERTA 1: "NUESTRA PLAYLIST"
  playlistSection: {
    cardTitle: "Nuestra Playlist",
    cardDesc: "Canciones que hacen latir mi corazón cada vez que te pienso.",
    modalTitle: "Nuestra BSO Romántica",
    personalNote: `Cada melodía de esta lista tiene tu nombre grabado. Cuando escucho estas canciones no puedo evitar sonreír, recordar tus abrazos, tus miradas y lo increíble que es tenerte en mi vida. Eres mi canción favorita en bucle eterno.`,
    
    // ================================================================
    // SPOTIFY DIRECTO:
    // Pega aquí cualquier enlace de Spotify (de una playlist, álbum o canción).
    // Ejemplos:
    // - Playlist: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
    // - Canción: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT"
    // - O el enlace de tu propia playlist romántica creada para ella.
    // La web lo integrará automáticamente en un reproductor directo sin redirigir.
    spotifyUrl: "https://open.spotify.com/playlist/5K0N8bx948B4qSlni6ynyr?si=a5ad6d200dc3445c",

    // Pestaña inicial al abrir la puerta: 'spotify' (recomendado) o 'turntable' (tocadiscos)
    defaultView: "spotify",
    
    songs: [
      {
        title: "Dreaming (Tema de Coraline)",
        artist: "Bruno Coulais",
        duration: "2:30",
        dedication: "Porque contigo entrar a cualquier mundo es mágico y perfecto."
      },
      {
        title: "Yellow",
        artist: "Coldplay",
        duration: "4:29",
        dedication: "Mira las estrellas, mira cómo brillan por ti y por todo lo que haces."
      },
      {
        title: "Golden Hour",
        artist: "JVKE",
        duration: "3:29",
        dedication: "Justo en el momento en que me miras, el tiempo se detiene por completo."
      },
      {
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        duration: "2:57",
        dedication: "Nunca dejaría que te vayas, porque nunca fui tan feliz hasta encontrarte."
      },
      {
        title: "Lover",
        artist: "Taylor Swift",
        duration: "3:41",
        dedication: "¿Puedo ir a donde tú vas? ¿Podemos estar siempre así de cerca, por siempre y para siempre?"
      }
    ]
  },

  // 4. PUERTA 2: "TODO ESTO ES PARA TI" (Burbujas mágicas de amor)
  complimentsSection: {
    cardTitle: "Todo esto es para ti",
    cardDesc: "Pequeñas chispas y razones mágicas por las que me encantas.",
    modalTitle: "Tú Eres Mi Todo 🔮",
    instruction: "Haz clic en cada esfera mágica para liberar un cumplido o pensamiento de amor:",
    compliments: [
      "Eres mi persona y lugar favorito en todo el universo",
      "Amo tu risa, tiene el poder de iluminar hasta mi día más nublado",
      "Me fascinan tus ojos: son dos botones de luz pura en mi vida",
      "Contigo aprendí que el amor real es suave, leal y divertido",
      "Me encanta la manera tan linda en que te apasionas por las cosas",
      "Haces que cada momento ordinario se convierta en una aventura mágica",
      "Eres mi refugio seguro y mi mayor orgullo",
      "Amo abrazarte y sentir que el mundo exterior se apaga por completo",
      "Gracias por existir y por haber escogido caminar a mi lado",
      "Eres la casualidad más bonita y el acierto más grande de mi destino",
      "Me encantas completita: tu mente, tu corazón y tu ternura infinita",
      "Nunca olvides lo increíble, talentosa y hermosa que eres hoy y siempre"
    ]
  },

  // 5. PUERTA 3: "MIS FOTOS FAVORITAS" (Galería Polaroid Vintage)
  photosSection: {
    cardTitle: "Mis fotos favoritas",
    cardDesc: "Nuestros instantes mágicos congelados en el tiempo.",
    modalTitle: "Nuestros Recuerdos Favoritos 📸",
    instruction: "Haz clic en cada fotografía para verla más de cerca y leer su dedicatoria:",
    
    // Fotografías. Puedes sustituir las rutas con tus fotos en assets/photos/mi_foto.jpg
    photos: [
      {
        id: 1,
        src: "assets/photos/1.jpeg",
        title: "Escape Room",
        date: "Una nueva aventura",
        caption: "El día que aprendí lo hábiles y torpes que podemos ser simultaneamente."
      },
      {
        id: 2,
        src: "assets/photos/2.jpeg",
        title: "Nuestra primer paseo",
        date: "Un día inolvidable",
        caption: "De esos momentos donde se nos olvidó el reloj y solo existíamos tú y yo."
      },
      {
        id: 3,
        src: "assets/photos/3.jpeg",
        title: "Pijamada",
        date: "Una casita",
        caption: "Riendonos y sufriendo por como se caía 'el techo' todo el tiempo."
      },
      {
        id: 4,
        src: "assets/photos/4.jpeg",
        title: "Milo J",
        date: "Solifican12",
        caption: "Solo con verte, quiero el mundo entero."
      }
    ]
  },

  // 6. PUERTA 4: "TE DEDICO ESTO" (Carta romántica sellada)
  letterSection: {
    cardTitle: "Te dedico esto",
    cardDesc: "Palabras sinceras nacidas desde lo más profundo de mi alma.",
    modalTitle: "Una Carta Para Mi Niña Preciosa 💌",
    salutation: "Mi niña hermosa y mi amor eterno,",
    date: "18 de Septiembre",
    paragraphs: [
      "Si existiera una puerta secreta que me llevara a cualquier rincón del universo, a cualquier tiempo o a cualquier realidad paralela, te prometo que en todas y cada una de ellas volvería a buscarte a ti.",
      "Desde el día en que entraste en mi vida, todo cobró un color distinto, más brillante, más intenso y mil veces más cálido. A tu lado no necesito de mundos ilusorios con botones en los ojos, porque nuestro mundo real, con tus risas sinceras, tus manías adorables y tus caricias sinceras, es el lugar más perfecto en el que jamás soñé vivir.",
      "Gracias por ser mi cómplice, por escucharme, por sostenerme cuando lo necesito y por regalarme esa paz tan inmensa que solo encuentro cuando estoy entre tus brazos. Eres mi presente más valioso y el futuro que más deseo seguir construyendo paso a pasito.",
      "Feliz aniversario, mi vida. Gracias por este tiempo juntas y por cada uno de los instantes mágicos que aún nos quedan por descubrir."
    ],
    closing: "Con todo mi amor y mi devoción para siempre,",
    signature: "Tu novia que te adora con todo el corazón 🗝️❤️",
    postScript: "P.D.: Tú eres y siempre serás mi otra mitad favorita en cualquier mundo."
  },

  // Configuración de Audio
  audio: {
    autoStartOnEnter: true,
    volume: 0.25,
    musicBoxMelodyName: "Coraline Lullaby (Caja de Música)"
  }
};
