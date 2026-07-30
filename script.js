let currentStep = 0;
const totalSteps = 19; // <--- Cambia este número al total de pasos que agregues en el HTML
const startButton = document.getElementById("startButton");
const introSection = document.querySelector("main");
// Función universal para cambiar de pantalla de forma suave
function changeStep(nextStep) {
    let currentEl = document.getElementById(`paso-${currentStep}`);
    let nextEl = document.getElementById(`paso-${nextStep}`);
    // Si hay una sección activa, la desvanece
    if (currentEl) {
        currentEl.style.opacity = "0";
        setTimeout(() => { currentEl.style.display = "none"; }, 1000);
    } else if (currentStep === 0) {
        // Desvanece la intro del principio si es el inicio
        introSection.style.transition = "opacity 1s ease";
        introSection.style.opacity = "0";
        setTimeout(() => { introSection.style.display = "none"; }, 1000);
    }
    // Muestra la siguiente sección
    setTimeout(() => {
        if (nextEl) {
            nextEl.style.display = "flex";
            setTimeout(() => { nextEl.style.opacity = "1"; }, 50);
            
            currentStep = nextStep;

            // CONTROL DE FLUJO AUTOMÁTICO:
            // Si el paso actual es una FOTO (pasos impares: 1, 3, 5...), avanza sola tras 4 segundos
            if (nextStep % 2 !== 0) {
                setTimeout(() => {
                    if (currentStep === nextStep) { // Evita saltos dobles accidentales
                        changeStep(nextStep + 1);
                    }
                }, 5000); // <-- Tiempo que dura cada foto en pantalla
            }
        }
    }, 1000);
}
// Botón Inicial de "Comenzar"
startButton.addEventListener("click", () => {
    changeStep(1);
    // Dentro de la función que se ejecuta al darle clic a "Comenzar"
const audio = document.getElementById('bg-music');
audio.volume = 0.3; // Ajusta el volumen aquí (0.4 es el 40%, suave para que lea tranquila)
audio.play().catch(error => console.log("El navegador bloqueó el audio al inicio:", error));
});
// Asigna el evento a todos los botones "Continuar" de los textos
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("next-button")) {
        changeStep(currentStep + 1);
    }
});