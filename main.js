// ========================================
// PERSONA 5 STYLE - JavaScript
// ========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎭 AnimeLab - Persona 5 Style iniciado');

  // ========================================
  // NAVEGACIÓN MÓVIL
  // ========================================
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      const isExpanded = navList.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
      
      // Animación del botón
      if (isExpanded) {
        navToggle.textContent = '✕';
      } else {
        navToggle.textContent = '☰';
      }
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navList.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.textContent = '☰';
        }
      });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      }
    });
  }

  // ========================================
  // SMOOTH SCROLL PARA NAVEGACIÓN
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========================================
  // BOTÓN DE TEMA (CAMBIO DE COLORES)
  // ========================================
  const themeBtn = document.getElementById('themeBtn');
  let currentTheme = 'red'; // red, blue, yellow

  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      const root = document.documentElement;
      const bodyAfter = document.querySelector('body');
      
      if (currentTheme === 'red') {
        // Tema Azul (Persona 3)
        root.style.setProperty('--p5-red', '#0066cc');
        root.style.setProperty('--p5-yellow', '#00aaff');
        currentTheme = 'blue';
        themeBtn.textContent = '◆';
        showNotification('Tema Persona 3 activado');
      } else if (currentTheme === 'blue') {
        // Tema Amarillo (Persona 4)
        root.style.setProperty('--p5-red', '#ffd700');
        root.style.setProperty('--p5-yellow', '#ffaa00');
        currentTheme = 'yellow';
        themeBtn.textContent = '◈';
        showNotification('Tema Persona 4 activado');
      } else {
        // Tema Rojo (Persona 5)
        root.style.setProperty('--p5-red', '#ff0000');
        root.style.setProperty('--p5-yellow', '#ffd700');
        currentTheme = 'red';
        themeBtn.textContent = '★';
        showNotification('Tema Persona 5 activado');
      }
    });
  }

  // ========================================
  // SISTEMA DE NOTIFICACIONES
  // ========================================
  function showNotification(message) {
    // Eliminar notificación anterior si existe
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
      existingNotif.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--p5-red);
      color: white;
      padding: 15px 25px;
      border: 3px solid white;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      z-index: 10000;
      animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 2.5s;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Agregar animaciones CSS para notificaciones
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ========================================
  // BOTÓN "VER PISTA"
  // ========================================
  const showHintBtn = document.getElementById('showHint');
  const hints = [
    '💡 Explora cada sección para descubrir contenido oculto',
    '🎭 Los Phantom Thieves están listos para la acción',
    '⭐ Persona 5: El arte del robo de corazones',
    '🎮 ¿Preparado para cambiar el mundo?',
    '🃏 El Wild Card puede cambiar cualquier destino',
    '🎪 La verdad está oculta detrás de la máscara'
  ];

  if (showHintBtn) {
    showHintBtn.addEventListener('click', function() {
      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      showNotification(randomHint);
    });
  }

  // ========================================
  // PERFILES DE PERSONAJES
  // ========================================
  window.showProfile = function(characterName) {
    const profiles = {
      'Joker': {
        nombre: 'Joker (Ren Amamiya)',
        arcana: 'The Fool',
        persona: 'Arsène',
        habilidad: 'Wild Card - Puede usar múltiples Personas',
        descripcion: 'Líder de los Phantom Thieves. Un estudiante transferido falsamente acusado que despierta al poder de Persona para cambiar los corazones corruptos.'
      },
      'Yu Narukami': {
        nombre: 'Yu Narukami',
        arcana: 'The Fool',
        persona: 'Izanagi',
        habilidad: 'Wild Card - Maestro de múltiples Personas',
        descripcion: 'Protagonista de Persona 4. Investigador del misterio de Midnight Channel que usa el poder de Persona para descubrir la verdad.'
      },
      'Makoto Yuki': {
        nombre: 'Makoto Yuki',
        arcana: 'The Fool / Death',
        persona: 'Orpheus',
        habilidad: 'Wild Card - El Gran Sello',
        descripcion: 'Líder de SEES en Persona 3. Portador del poder definitivo que lucha contra las Sombras durante la Dark Hour.'
      },
      'Wonder': {
        nombre: 'Wonder',
        arcana: 'The Fool',
        persona: 'Jánošík',
        habilidad: 'Wild Card - Nueva generación',
        descripcion: 'Líder de los nuevos Phantom Thieves en Persona 5: The Phantom X. Continúa el legado de cambiar corazones corruptos.'
      }
    };

    const profile = profiles[characterName];
    if (profile) {
      const modal = document.createElement('div');
      modal.className = 'profile-modal';
      modal.innerHTML = `
        <div class="profile-content">
          <button class="profile-close" onclick="this.parentElement.parentElement.remove()">✕</button>
          <h2 style="color: var(--p5-red); text-transform: uppercase; margin-bottom: 20px; font-size: 2rem;">
            ${profile.nombre}
          </h2>
          <div style="margin: 15px 0;">
            <strong style="color: var(--p5-red);">Arcana:</strong> ${profile.arcana}
          </div>
          <div style="margin: 15px 0;">
            <strong style="color: var(--p5-red);">Persona Inicial:</strong> ${profile.persona}
          </div>
          <div style="margin: 15px 0;">
            <strong style="color: var(--p5-red);">Habilidad:</strong> ${profile.habilidad}
          </div>
          <div style="margin: 20px 0; line-height: 1.6;">
            ${profile.descripcion}
          </div>
          <button onclick="this.parentElement.parentElement.remove()" 
            style="background: var(--p5-red); color: white; border: 2px solid white; padding: 10px 30px; 
            font-weight: bold; text-transform: uppercase; cursor: pointer; margin-top: 20px;">
            Cerrar
          </button>
        </div>
      `;
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      `;
      modal.querySelector('.profile-content').style.cssText = `
        background: #1a1a1a;
        border: 3px solid var(--p5-red);
        padding: 40px;
        max-width: 600px;
        width: 90%;
        position: relative;
        animation: zoomIn 0.3s ease;
      `;
      modal.querySelector('.profile-close').style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--p5-red);
        color: white;
        border: none;
        width: 35px;
        height: 35px;
        font-size: 1.5rem;
        cursor: pointer;
        font-weight: bold;
      `;

      document.body.appendChild(modal);
      showNotification(`Perfil de ${characterName} cargado`);
    }
  };

  // ========================================
  // NOTICIAS
  // ========================================
  window.readNews = function(newsId) {
    const newsDetails = {
      1: {
        titulo: 'Nueva actualización disponible',
        fecha: '16 Nov 2025',
        contenido: 'Se ha lanzado una nueva actualización masiva que incluye:\n\n• Nuevos trajes para los Phantom Thieves\n• Misiones adicionales en el Metaverso\n• Mejoras en el sistema de combate\n• Nuevas Personas para fusionar\n• Contenido exclusivo para fans veteranos\n\n¡Descarga la actualización ahora y continúa tu aventura!'
      },
      2: {
        titulo: 'Anuncio especial próximamente',
        fecha: '6 Jun 2025',
        contenido: 'Atlus ha confirmado que habrá un anuncio importante sobre el futuro de la franquicia Persona.\n\nLos rumores sugieren:\n• Posible nuevo juego principal\n• Remasterización de títulos clásicos\n• Colaboraciones especiales\n• Expansión del universo Persona\n\n¡Mantente atento a nuestras redes sociales para más información!'
      },
      3: {
        titulo: 'Evento especial de aniversario',
        fecha: '10 Jul 2025',
        contenido: 'Celebra el aniversario de Persona con eventos exclusivos:\n\n• Máscaras especiales de edición limitada\n• Recompensas diarias durante todo el mes\n• Desafíos especiales en el Metaverso\n• Música exclusiva del compositor Shoji Meguro\n• Encuentros con Personas legendarias\n\n¡El evento comenzó y durará todo noviembre!'
      }
    };

    const news = newsDetails[newsId];
    if (news) {
      const modal = document.createElement('div');
      modal.className = 'news-modal';
      modal.innerHTML = `
        <div class="news-modal-content">
          <button class="modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>
          <div style="color: var(--p5-red); font-weight: bold; margin-bottom: 10px;">★ ${news.fecha}</div>
          <h2 style="color: var(--p5-red); text-transform: uppercase; margin-bottom: 20px; font-size: 2rem;">
            ${news.titulo}
          </h2>
          <div style="line-height: 1.8; white-space: pre-line;">
            ${news.contenido}
          </div>
          <button onclick="this.parentElement.parentElement.remove()" 
            style="background: var(--p5-red); color: white; border: 2px solid white; padding: 12px 35px; 
            font-weight: bold; text-transform: uppercase; cursor: pointer; margin-top: 30px;">
            Cerrar
          </button>
        </div>
      `;
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
        overflow-y: auto;
        padding: 20px;
      `;
      modal.querySelector('.news-modal-content').style.cssText = `
        background: #1a1a1a;
        border: 3px solid var(--p5-red);
        padding: 40px;
        max-width: 700px;
        width: 90%;
        position: relative;
        animation: zoomIn 0.3s ease;
      `;
      modal.querySelector('.modal-close').style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--p5-red);
        color: white;
        border: none;
        width: 35px;
        height: 35px;
        font-size: 1.5rem;
        cursor: pointer;
        font-weight: bold;
      `;

      document.body.appendChild(modal);
      showNotification('Noticia cargada');
    }
  };

  // ========================================
  // GALERÍA - LIGHTBOX
  // ========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  window.openLightbox = function(imageSrc) {
    if (lightbox && lightboxImg) {
      lightboxImg.src = imageSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeLightbox = function(event) {
    if (event.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  // Cerrar lightbox con tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // ========================================
  // FORMULARIO DE CONTACTO
  // ========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (name && email && message) {
        // Simular envío de formulario
        showNotification('¡Mensaje enviado con éxito! 🎭');
        
        // Crear modal de confirmación
        const confirmModal = document.createElement('div');
        confirmModal.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0, 0, 0, 0.95); display: flex; justify-content: center; 
            align-items: center; z-index: 10000; animation: fadeIn 0.3s ease;">
            <div style="background: #1a1a1a; border: 3px solid var(--p5-red); 
              padding: 40px; max-width: 500px; text-align: center; animation: zoomIn 0.3s ease;">
              <div style="font-size: 4rem; margin-bottom: 20px;">✓</div>
              <h2 style="color: var(--p5-red); margin-bottom: 20px; text-transform: uppercase;">
                ¡Mensaje Enviado!
              </h2>
              <p style="margin-bottom: 30px; line-height: 1.6;">
                Gracias por contactarnos, <strong>${name}</strong>.<br>
                Te responderemos pronto a <strong>${email}</strong>.
              </p>
              <button onclick="this.parentElement.parentElement.remove()" 
                style="background: var(--p5-red); color: white; border: 2px solid white; 
                padding: 12px 35px; font-weight: bold; text-transform: uppercase; cursor: pointer;">
                Aceptar
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(confirmModal);

        // Limpiar formulario
        contactForm.reset();
      }
    });
  }

  // ========================================
  // REPRODUCTOR DE MÚSICA
  // ========================================
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const musicIcon = document.getElementById('musicIcon');
  let isPlaying = false;

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', function() {
      if (isPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🔇';
        showNotification('Música pausada');
        isPlaying = false;
      } else {
        bgMusic.play().then(() => {
          musicIcon.textContent = '🔊';
          showNotification('Música reproduciendo');
          isPlaying = true;
        }).catch(error => {
          console.log('Error al reproducir música:', error);
          showNotification('No se pudo reproducir la música');
        });
      }
    });

    // Cambiar volumen con scroll (opcional)
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
      if (isPlaying) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && bgMusic.volume > 0.3) {
          bgMusic.volume = 0.3; // Bajar volumen al hacer scroll
        } else if (scrollTop < lastScrollTop && bgMusic.volume < 0.7) {
          bgMusic.volume = 0.7; // Subir volumen al subir
        }
        lastScrollTop = scrollTop;
      }
    });
  }

  // ========================================
  // EFECTOS DE PARALLAX EN SCROLL
  // ========================================
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ========================================
  // ANIMACIÓN DE ENTRADA PARA CARDS
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar todas las cards
  document.querySelectorAll('.card, .news-card, .thumb, .social-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
  });

  // Agregar animación fadeInUp
  const animStyle = document.createElement('style');
  animStyle.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(animStyle);

  // ========================================
  // EASTER EGG: KONAMI CODE
  // ========================================
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateKonamiMode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateKonamiMode() {
    showNotification('🎭 MODO PHANTOM THIEF ACTIVADO! 🎭');
    
    // Efecto especial
    document.body.style.animation = 'rainbow 2s ease infinite';
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(rainbowStyle);

    setTimeout(() => {
      document.body.style.animation = '';
      showNotification('Modo normal restaurado');
    }, 5000);
  }

  // ========================================
  // CONTADOR DE TIEMPO EN LA PÁGINA
  // ========================================
  let timeOnPage = 0;
  setInterval(() => {
    timeOnPage++;
    if (timeOnPage === 60) {
      showNotification('¡Has estado aquí 1 minuto! 🎮');
    } else if (timeOnPage === 300) {
      showNotification('¡5 minutos explorando! ¡Increíble! ⭐');
    }
  }, 1000);

  // ========================================
  // LOG FINAL
  // ========================================
  console.log('✅ Todas las funcionalidades están activas');
  console.log('🎮 ¡Disfruta de AnimeLab - Persona 5 Style!');
  
  // Mensaje de bienvenida
  setTimeout(() => {
    showNotification('¡Bienvenido a AnimeLab! 🎭');
  }, 500);
});