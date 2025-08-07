document.addEventListener('DOMContentLoaded', () => {
    // --- Dados e elementos ---
    const produtos = [
    { nome: "Camiseta Branca", preco: 29.9, categoria: "camiseta" },
    { nome: "Camiseta Preta", preco: 34.9, categoria: "camiseta" },
    { nome: "Boné Azul", preco: 19.9, categoria: "acessorio" },
    { nome: "Pulseira", preco: 25.15, categoria: "acessorio" },
    { nome: "Camiseta Vermelha", preco: 39.9, categoria: "acessorio" },
    { nome: "Óculos de Sol", preco: 29.9, categoria: "acessorio" }
];
let carrinho = [];
const produtosEl = document.getElementById("produtos");
const itensCarrinhoEl = document.getElementById("itens-carrinho");
const totalEl = document.getElementById("total");
const filtroEl = document.getElementById("filtro");
const fecharCarinhoBtn = document.getElementById("fechar-carrinho");
const mensagemFinalEl = document.getElementById("mensagem-final");
// --- FUNÇÕES ---
// Revisar exibir!!
function exibirProdutos(filtrados = produtos) {
    produtosEl.innerHTML = '';
    filtrados.forEach(prod => {
        const div = document.createElement("div");
        div.className = "produto";
        div.innerHTML = `
        <h3>${prod.nome}</h3>
        <p>R$ ${prod.preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho('${prod.nome})', ${prod.preco})">Adicionar</button>
        `;
        produtosEl.appendChild(div);
    });
}
window.adicionarAoCarrinho = function(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}
function atualizarCarrinho() {
    itensCarrinhoEl.innerHTML = '';
    let total = 0;
    carrinho.forEach(iten => {
        total += iten.preco;
        const li = document.createElement("li");
        li.textContent = `${iten.nome} - R$ ${iten.preco.toFixed(2)}`;
        itensCarrinhoEl.appendChild(li);
    });
    totalEl.textContent = total.toFixed(2);
}
// --- EVENT LISTENER ---
filtroEl.addEventListener("change", () => {
    const categoria = filtroEl.value;
    const filtrados = categoria === "todas" ? produtos :
    produtos.filter(p = p.categoria === categoria);
    exibirProdutos(filtrados);
});
fecharCarinhoBtn.addEventListener("click", () => {
    carrinho = [];
    atualizarCarrinho();
    mensagemFinalEl.hidden = false;
    setTimeout(() => {
        mensagemFinalEl.hidden = true;
    }, 3000);
});
// --- INICIALIZAR ---
exibirProdutos();
});