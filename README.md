# 🗝️ Nuestra Puerta Secreta - Aniversario (Estilo Coraline)

Una experiencia web interactiva, romántica y envolvente inspirada en el universo visual de la película **Coraline y la puerta secreta**.

Diseñada para celebrar un aniversario inolvidable, combinando una atmósfera mágica de noche estrellada, el misterio de las puertas secretas, botones de costura, detalles góticos y cartas de amor.

---

## ✨ Características Principales

1. **Pantalla de Bienvenida / Intercepción**:
   - Título interactivo con resplandor mágico: *"FELIZ ANIVERSARIO MI AMOR"*.
   - Botón **"¡Sí, por favor! ✨"**: Inicia una lluvia de confeti de corazones, botones y destellos con sonido de campanas mágicas y abre el portal.
   - Botón **"No gracias 🚪" (Evasivo)**: Se mueve y esquiva el cursor o el dedo al intentar tocarlo, mostrando mensajes juguetones y tiernos.

2. **Dashboard de las 4 Puertas Secretas**:
   - Barra de progreso con llave dorada que cuenta los secretos descubiertos (`0 de 4 secretos revelados`).
   - Botón flotante para la **Caja de Música de Coraline** (melodía arpegiada suave mediante Web Audio API).
   - **Puerta I: Nuestra Playlist**: Tocadiscos con disco de vinilo giratorio y centro de botón, selector de canciones, dedicatoria especial y pergamino con una nota de amor.
   - **Puerta II: Todo esto es para ti**: Esferas mágicas flotantes que explotan al hacer click revelando pensamientos de amor y razones por las que te encanta tu pareja.
   - **Puerta III: Mis fotos favoritas**: Galería estilo Polaroid con cinta adhesiva y alfileres, ampliables con dedicatoria y fecha en un visor lightbox.
   - **Puerta IV: Te dedico esto**: Sobre antiguo con sello de lacre en forma de botón de Coraline que se abre para desplegar una carta en pergamino con bordes cosidos y caligrafía romántica.

---

## 🛠️ Cómo Personalizar Todo Fácilmente

Todos los textos, preguntas, canciones, frases y fotos se configuran en un solo archivo:
👉 `js/config.js`

### 1. Cambiar los nombres y fecha
En `js/config.js`:
```javascript
couple: {
  partnerName: "Nombre de tu novia",
  yourName: "Tu nombre",
  anniversaryDate: "18 de Septiembre",
  yearsTogether: "Nuestro Amor"
}
```

### 2. Cambiar o añadir tus propias fotos
1. Coloca tus fotos en la carpeta `assets/photos/` (por ejemplo `foto1.jpg`, `foto2.jpg`).
2. En `js/config.js`, actualiza la sección `photos`:
```javascript
photos: [
  {
    id: 1,
    src: "assets/photos/mi_foto1.jpg",
    title: "Nuestro primer viaje juntos",
    date: "14 de Febrero",
    caption: "La tarde en que descubrí que contigo todo es perfecto."
  },
  // ...
]
```

### 3. Cambiar canciones o frases de amor
Edita las listas `songs`, `compliments` y los párrafos de `letterSection` en `js/config.js`.

---

## 🚀 Cómo Ejecutar y Ver la Página

### Opción 1: Servidor Local con Python
Abre una terminal en esta carpeta y ejecuta:
```bash
python -m http.server 8080
```
Luego abre en tu navegador: [http://localhost:8080](http://localhost:8080)

### Opción 2: Subir a Internet (Gratis)
Puedes subir esta carpeta directamente a servicios gratuitos como **GitHub Pages**, **Vercel** o **Netlify** simplemente arrastrando la carpeta.
Al estar construida en HTML5, CSS3 y JavaScript vanilla, **no necesita compilación ni instalación de paquetes**.
