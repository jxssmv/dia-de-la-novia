// =========================================================================
// 1. CONFIGURACIÓN INICIAL E INYECCIÓN AUTOMÁTICA DE LA BARRA DE PROGRESO
// =========================================================================
let currentStep = 0;
const totalSteps = 20; // 20 pasos en total incluyendo la broma final
const miNumero = "522217636914"; 

// Creamos la barra de progreso directamente en el body para que NADA la oculte
const progressContainer = document.createElement('div');
progressContainer.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:6px; background-color:rgba(255,255,255,0.15); z-index:999999;';

const progressBar = document.createElement('div');
progressBar.id = 'barra-progreso';
progressBar.style.cssText = 'height:100%; width:0%; background-color:#ff4d79; box-shadow:0 0 10px #ff4d79; transition:width 0.5s ease-in-out;';

progressContainer.appendChild(progressBar);
document.body.prepend(progressContainer);

// Función para pintar el avance real de la barra
function actualizarProgreso() {
    const porcentaje = (currentStep / totalSteps) * 100;
    const barra = document.getElementById('barra-progreso');
    if (barra) {
        barra.style.width = porcentaje + '%';
    }
}

// =========================================================================
// 2. CONTROL DE FLUJO DE PANTALLAS (SISTEMA DE NAVEGACIÓN)
// =========================================================================
const startButton = document.getElementById("startButton");
const introSection = document.getElementById("paso-0") || document.querySelector("main");

function changeStep(nextStep) {
    let currentEl = document.getElementById(`paso-${currentStep}`);
    let nextEl = document.getElementById(`paso-${nextStep}`);
    
    // 1. Desvanecer pantalla actual
    if (currentEl) {
        currentEl.style.opacity = "0";
        setTimeout(() => { currentEl.style.display = "none"; }, 800);
    } else if (currentStep === 0 && introSection) {
        introSection.style.transition = "opacity 0.8s ease";
        introSection.style.opacity = "0";
        setTimeout(() => { introSection.style.display = "none"; }, 800);
    }
    
    // 2. Mostrar siguiente pantalla de forma suave
    setTimeout(() => {
        if (nextEl) {
            nextEl.style.display = "flex";
            setTimeout(() => { nextEl.style.opacity = "1"; }, 300);
            
            // Actualizamos el paso actual global
            currentStep = nextStep;
            actualizarProgreso();

            // CONTROL AUTOMÁTICO PARA LAS FOTOS:
            // Pasos impares (1, 3, 5, 7, 9, 11, 13, 15, 17, 19) cambian solas tras 5 segundos
            if (nextStep % 2 !== 0 && nextStep < 20) {
                setTimeout(() => {
                    if (currentStep === nextStep) { // Candado para evitar brincos dobles accidentales
                        changeStep(nextStep + 1);
                    }
                }, 6000); 
            }
        }
    }, 200);
}
// =========================================================================
// 3. CAPTURA DE EVENTOS Y EFECTOS DE CORAZONES
// =========================================================================

// Función garantizada para crear y animar los corazones en pantalla
function crearCorazonElemento(x, y) {
    const corazon = document.createElement("div");
    corazon.innerHTML = "❤️";
    corazon.style.position = "fixed";
    corazon.style.left = `${x}px`;
    corazon.style.top = `${y}px`;
    corazon.style.fontSize = `${Math.random() * 15 + 15}px`; // Tamaños variables
    corazon.style.pointerEvents = "none";
    corazon.style.zIndex = "999999";
    corazon.style.transition = "transform 1.2s ease-out, opacity 1.2s ease-out";
    corazon.style.transform = "translate(-50%, -50%) scale(1)";
    
    document.body.appendChild(corazon);

    // Animación física: suben y se dispersan hacia los lados aleatoriamente
    const destinoX = (Math.random() * 200 - 100);
    const destinoY = -(Math.random() * 150 + 100);

    requestAnimationFrame(() => {
        corazon.style.transform = `translate(calc(-50% + ${destinoX}px), calc(-50% + ${destinoY}px)) scale(0.2)`;
        corazon.style.opacity = "0";
    });

    // Limpieza del DOM
    setTimeout(() => {
        corazon.remove();
    }, 1200);
}

// Botón Inicial de "Comenzar" -> ¡EXPLOSIÓN MASIVA!
if (startButton) {
    startButton.addEventListener("click", (e) => {
        changeStep(1);
        
        const audio = document.getElementById('bg-music');
        if (audio) {
            audio.volume = 0.3; 
            audio.currentTime = 4.5;
            audio.play().catch(error => console.log("Interacción de audio requerida:", error));
        }

        // Ráfaga masiva de 35 corazones dispersos desde el botón
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const offsetX = e.clientX + (Math.random() * 120 - 60);
                const offsetY = e.clientY + (Math.random() * 120 - 60);
                crearCorazonElemento(offsetX, offsetY);
            }, i * 40);
        }
    });
}

// Evento global para los clics en los botones "Continuar" de los textos -> ¡TOQUE SUTIL!
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("next-button")) {
        changeStep(currentStep + 1);

        // 4 corazones rápidos de respuesta al clic
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                crearCorazonElemento(e.clientX, e.clientY);
            }, i * 80);
        }
    }
});
// =========================================================================
// LÓGICA DE LA PREGUNTA FINAL: CORAZONES + REDIRECCIÓN A WHATSAPP
// =========================================================================

const btnSiBroma = document.getElementById('btn-si-broma');
const btnNoBroma = document.getElementById('btn-no-broma');

if (btnSiBroma) {
    btnSiBroma.addEventListener('click', (e) => {
        // 1. Explosión masiva de corazones usando la función que ya tenemos
        if (typeof crearCorazonElemento === 'function') {
            for (let i = 0; i < 150; i++) {
                setTimeout(() => {
                    const offsetX = e.clientX + (Math.random() * 200 - 100);
                    const offsetY = e.clientY + (Math.random() * 200 - 100);
                    crearCorazonElemento(offsetX, offsetY);
                }, i * 30);
            }
        }

        // 2. Tu número de WhatsApp (código de país + número, sin espacios ni símbolos)
        const telefono = "522217636914"; 
        const mensaje = encodeURIComponent("¡Sí, obvio que soy tu novia! Te amo muchísimo ");
        const urlWhatsApp = `https://wa.me/${telefono}?text=${mensaje}`;

        // 3. Redirección con un pequeño delay para que disfrute el efecto visual
        setTimeout(() => {
            window.location.href = urlWhatsApp;
        }, 1500);
    });
}

// Broma extra por si quiere jugarle al vivo y darle al "No"
if (btnNoBroma) {
    const moverBotonNo = () => {
        const x = Math.random() * (window.innerWidth - btnNoBroma.offsetWidth - 50);
        const y = Math.random() * (window.innerHeight - btnNoBroma.offsetHeight - 50);
        
        btnNoBroma.style.position = 'fixed';
        btnNoBroma.style.left = `${x}px`;
        btnNoBroma.style.top = `${y}px`;
    };

    // Se mueve tanto al pasar el mouse como al intentar tocarlo en cel
    btnNoBroma.addEventListener('mouseenter', moverBotonNo);
    btnNoBroma.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Evita el clic accidental en móviles
        moverBotonNo();
    });
}