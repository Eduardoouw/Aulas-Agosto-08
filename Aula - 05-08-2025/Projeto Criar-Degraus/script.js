const botoes = document.querySelector(".botoes");
const escada = document.getElementById("escada");
const contador = document.getElementById("contador");
let degraus = [];

function getRandomColor() {
    return `hsl(${Math.random() * 360}, 70%, 60%)`;
}
function adicionarDegrau() {
    const degrau = document.createElement('div');
    degrau.className = 'degrau';
    const x = degraus.length * 20;
    const y = -degraus.length * 20;
    degrau.style.transform = `translate(${x}px, ${y}px)`;
    degrau.style.background = getRandomColor();
    degrau.onclick = () => removerDegrau(degrau);
    escada.appendChild(degrau);
    degraus.push(degrau);
    atualizar();
}
function removerDegrau(degrau) {
    const i = degraus.indexOf(degrau);
    if (i > -1) {
        degraus.splice(i, 1);
        escada.removeChild(degrau);
        reorganizar();
        atualizar();
    }
}
function reorganizar() {
    degraus.forEach((d, i) => {
        d.style.transform = `translate(${i * 20}px, ${-i * 20}px)`;
    });
}
function atualizar() {
    contador.textContent = degraus.length;
    document.getElementById("removerUltimoDegrau").disabled =
    degraus.length === 0;
}
// Eventos
botoes.onclick = e => {
    if (e.target.id === 'adicionarDegrau') adicionarDegrau();
    if (e.target.id === 'removerUltimoDegrau' && degraus.length > 0) {
        escada.removeChild(degraus.pop());
        atualizar();
    }
};
atualizar();
