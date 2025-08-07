const reguaPx = document.getElementById("regua-px");
const reguaCm = document.getElementById("regua-cm");
const reguaIn = document.getElementById("regua-in");
const indicador = document.getElementById("indicador");
const marcador = document.getElementById("marcador");
const info = document.getElementById("info");
// --- Constantes de Conversão ---
const DPI = 96;
const PX_PER_CM = DPI /  2.54;
const PX_PER_IN = DPI;
// --- Funções para gerar reguas ---
function gerarRegua(elRegua, unidade) {
    elRegua.dataset.unit = unidade.toUpperCase();
    const larguraTotalPx = 1737;
    let step, conversor;

    if (unidade === 'px') {
        step = 10;
        conversor = 1;
    } else if (unidade === 'cm') {
        step = PX_PER_CM / 10; // Milimétro
        conversor = PX_PER_CM;
    } else if (unidade === 'in') {
        step = PX_PER_IN / 16; //  1/16 de polegadas
        conversor = PX_PER_IN;
    }
    for (let i = 0; i < larguraTotalPx; i += step) {
        const marca = document.createElement("div");
        marca.style.position = 'absolute';
        marca.style.left = `${i.toFixed(2)}px`;
        marca.style.width = '1px';
        marca.style.backgroundColor = '#8b8577';

        let altura = 0;
        let showNumber = false;

        if (unidade === 'px') {
            if (i % 100 < step) { altura = 25; showNumber = true; }
            else if (i % 50 < step) { altura = 15; }
            else { altura = 10; }
        } else if (unidade === 'cm') {
            if (i % PX_PER_CM < step) { altura = 25 ; showNumber = true; }
            else if (i % (PX_PER_CM / 2) < step) { altura = 18; }
            else { altura = 10; }
        } else if (unidade === 'in') {
            if (i % PX_PER_IN < step) { altura = 25; showNumber = true; }
            else if (i % (PX_PER_IN / 2) < step) { altura = 20 }
            else if (i % (PX_PER_IN / 4) < step) { altura = 15; }
            else { altura = 10; }
        }
        marca.style.height = `${altura}px`;

        if (showNumber) {
            const valor = Math.round(i / conversor);
            if (valor > 0) {
                const texto = document.createElement('span');
                texto.textContent = valor;
                texto.style.position = 'absolute';
                texto.style.color = '#5c584f';
                texto.style.fontSize = '12px';
                texto.style.top = '5px';
                texto.style.left = `${i + 3}px`;
                elRegua.appendChild(texto);
            }
        }
        elRegua.appendChild(marca);
    }
}
// --- Inicialixação ---
gerarRegua(reguaPx, 'px');
gerarRegua(reguaCm, 'cm');
gerarRegua(reguaIn, 'in');
// --- Eventos ---
document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    // Atualiza a posição do indicador e marcador
    indicador.style.left = x + "px";
    marcador.style.left = x + "px";
    // Calcula e exibe as 3 unidades
    const valorPx = x;
    const valorCm = (x / PX_PER_CM).toFixed(2);
    const valorIn = (x / PX_PER_IN).toFixed(2);
    info.textContent = `${valorPx} px\n${valorCm} cm\n${valorIn} in`; 
    // Evita que a info saia da tela no canto direito
    if (x > window.innerWidth - 100) {
        info.style.transform = "translateX(-110%)";
    } else {
        info.style.transform = "translateX(5px)";
    }
});
