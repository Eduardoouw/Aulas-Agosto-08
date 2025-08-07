// Elementos do DOM
const colorPicker = document.getElementById("colorPicker");
const colorDisplay = document.getElementById("colorDisplay");
const colorCode = document.getElementById("colorCode");
const tela = document.getElementById("tela");
const redRange = document.getElementById("redRange");
const greenRange = document.getElementById("greenRange");
const blueRange = document.getElementById("blueRange");
const alphaRange = document.getElementById("alphaRange");
const redValue = document.getElementById("redValue");
const greenValue = document.getElementById("greenValue");
const blueValue = document.getElementById("blueValue");
const alphaValue = document.getElementById("alphaValue");
// Valores iniciais
let red = 255;
let green = 255;
let blue = 255;
let alpha = 255;
// Atualiza a exibição de cor
function updateColor() {
    // Atualiza o código da cor
    const hexColor = rgbToHex(red, green, blue);
    const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha / 100})`;
    // Atualiza os elementos visuais
    colorDisplay.style.backgroundColor = rgbaColor;
    colorCode.textContent = hexColor.toUpperCase();
    tela.style.backgroundColor = rgbaColor;
    tela.style.opacity = alpha / 100;
    // Atualiza o valor do seletor
    colorPicker.value = hexColor;
}
function rgbToHex(r, g, b) {
    return "#" + (( 1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
// Converte Hex para RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}
// Atualiza os valores RGB quando o seletor de cor é alterado
colorPicker.addEventListener("input", (e) => {
const hex = e.target.value;
const rgb = hexToRgb(hex);
red = rgb.r;
green = rgb.g;
blue = rgb.b;
// Atualiza os sliders
redRange.value = red;
greenRange.value = green;
blueRange.value = blue;
// Atualiza os valores exibidos
redValue.textContent = red;
greenValue.textContent = green;
blueValue.textContent = blue;
updateColor();
});
// Atualiza os valores quando o sliders são movidos
function setupSlider(slider, valueElement, colorComponent) {
    slider.addEventListener("input", () => {
        const value = e.target.value;
        valueElement.textContent = value;
        // Atualiza o valor do componente de cor correspondente
        if (colorComponent === 'red') red = parseInt(value);
        else if (colorComponent === 'green') green = parseInt(value);
        else if (colorComponent === 'blue') blue = parseInt(value);
        else if (colorComponent === 'alpha') alpha = parseInt(value);
        // Atualiza o seletor de cor
        colorPicker.value = rgbaToHex(red, green, blue);
        updateColor();
    });
}
// Configurar os sliders
setupSlider(redRange, redValue, 'red');
setupSlider(greenRange, greenValue, 'green');
setupSlider(blueRange, blueValue, 'blue');
setupSlider(alphaRange, alphaValue, 'alpha');
// Copia o código da cor para a área de transferência
colorCode.addEventListener("click", () => {
    navigator.clipboard.writeText(colorCode.textContent)
    .then(() => {
        const originalText = colorCode.textContent;
        colorCode.textContent = 'Copiado!';
        setTimeout(() => {
            colorCode.textContent = originalText;
        }, 2000);
    })
    .catch(err => {
        console.error('Erro ao copiar: ', err);
    });
});
// Inicializa a cor
updateColor();
