const sky = document.getElementById("sky");
const btn = document.getElementById("disparar");

btn.addEventListener("click", () => {
    const estrela = document.createElement('div');
    estrela.classList.add('estrela');

    // Posição inicial aleatória no topo da tela
    const starX = Math.random() * window.innerWidth;
    estrela.style.left = `${starX}px`
    estrela.style.top = '0px';

    sky.append(estrela);

    // Remove após animação
    estrela.addEventListener("animationend", () => {
        estrela.remove();
    });
});