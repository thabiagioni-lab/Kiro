// ======================
// KIRO v1.0
// ======================

const META = 20000;
const DISTANCIA_TOTAL = 18700;

let saldo = 0;

// Elementos da tela
const saldoTexto = document.getElementById("saldo");
const distanciaTexto = document.getElementById("distancia");
const restanteTexto = document.getElementById("restante");
const porcentagemTexto = document.getElementById("porcentagem");
const barra = document.getElementById("barra");

// Atualiza toda a interface
function atualizarTela() {

    saldoTexto.textContent =
        saldo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    const porcentagem = (saldo / META) * 100;

    barra.style.width = porcentagem + "%";

    porcentagemTexto.textContent =
        porcentagem.toFixed(1) + "%";

    const percorrido =
        (saldo / META) * DISTANCIA_TOTAL;

    distanciaTexto.textContent =
        percorrido.toFixed(0) + " km";

    restanteTexto.textContent =
        (DISTANCIA_TOTAL - percorrido).toFixed(0) + " km";

}

atualizarTela();

// ======================
// BOTÃO DE DEPÓSITO
// ======================

const botaoDepositar = document.getElementById("depositar");

botaoDepositar.addEventListener("click", () => {

    const valorTexto = prompt("Quanto deseja guardar?");

    if (valorTexto === null) return;

    const valor = Number(valorTexto.replace(",", "."));

    if (isNaN(valor) || valor <= 0) {
        alert("Digite um valor válido.");
        return;
    }

    saldo += valor;

    atualizarTela();

});
// ==============================
// MODAL
// ==============================

const modal = document.getElementById("modal");

const botaoDepositar =
    document.getElementById("depositar");

const cancelar =
    document.getElementById("cancelar");

botaoDepositar.addEventListener("click", ()=>{

    modal.classList.remove("hidden");

});

cancelar.addEventListener("click", ()=>{

    modal.classList.add("hidden");

});
// ==============================
// SALVAR DEPÓSITO
// ==============================

const campoValor = document.getElementById("valor");
const salvar = document.getElementById("salvar");

salvar.addEventListener("click", () => {

    const valor = Number(campoValor.value);

    if (isNaN(valor) || valor <= 0) {
        alert("Digite um valor válido.");
        return;
    }

    saldo += valor;

    atualizarTela();

    campoValor.value = "";

    modal.classList.add("hidden");

    comemorar();

});
// ==============================
// ANIMAÇÃO
// ==============================

function comemorar(){

    for(let i = 0; i < 8; i++){

        setTimeout(() => {

            criarPetala();

        }, i * 120);

    }

}function criarPetala(){

    const petala = document.createElement("div");

    petala.className = "petala";

    petala.textContent = "🌸";

    petala.style.left = Math.random() * window.innerWidth + "px";

    petala.style.animationDuration = (5 + Math.random() * 3) + "s";

    petala.style.fontSize = (18 + Math.random() * 10) + "px";

    document.body.appendChild(petala);

    setTimeout(() => {

        petala.remove();

    }, 8000);

}
