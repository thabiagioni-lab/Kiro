/*
=========================================
KIRO
app.js
=========================================
*/

const META_FINANCEIRA = 20000;
const DISTANCIA_TOTAL = 18500;

const App = {
    saldo: 0,
    modo: "adicionar"
};

// =========================
// ELEMENTOS
// =========================

const saldoEl = document.getElementById("saldo");
const kmPercorridosEl = document.getElementById("kmPercorridos");
const kmRestantesEl = document.getElementById("kmRestantes");
const porcentagemEl = document.getElementById("porcentagem");
const progressFill = document.getElementById("progressFill");

const modal = document.getElementById("modal");
const input = document.getElementById("valorInput");

const btnAdicionar = document.getElementById("btnAdicionar");
const btnRetirar = document.getElementById("btnRetirar");

const btnSalvar = document.getElementById("salvar");
const btnCancelar = document.getElementById("cancelar");

const petalsContainer = document.getElementById("petals-container");

// =========================
// FORMATAR
// =========================

function moeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

// =========================
// CÁLCULOS
// =========================

function porcentagem() {

    return Math.min(
        (App.saldo / META_FINANCEIRA) * 100,
        100
    );

}

function kmPercorridos() {

    return Math.round(
        DISTANCIA_TOTAL * porcentagem() / 100
    );

}

function kmRestantes() {

    return Math.max(
        DISTANCIA_TOTAL - kmPercorridos(),
        0
    );

}

// =========================
// TELA
// =========================

function atualizarTela() {

    saldoEl.textContent = moeda(App.saldo);

    kmPercorridosEl.textContent =
        kmPercorridos() + " km";

    kmRestantesEl.textContent =
        kmRestantes() + " km";

    progressFill.style.width =
        porcentagem() + "%";

    porcentagemEl.textContent =
        porcentagem().toFixed(1) + "%";

}

// =========================
// MODAL
// =========================

function abrirModal(tipo) {

    App.modo = tipo;

    input.value = "";

    modal.classList.add("active");

    setTimeout(() => {

        input.focus();

    }, 100);

}

function fecharModal() {

    modal.classList.remove("active");

    input.value = "";

}// =========================
// MOVIMENTAÇÕES
// =========================

function adicionar(valor) {

    App.saldo += valor;

    atualizarTela();

    criarPetalas();

}

function retirar(valor) {

    App.saldo -= valor;

    if (App.saldo < 0) {
        App.saldo = 0;
    }

    atualizarTela();

}

// =========================
// SALVAR
// =========================

function salvar() {

    const valor = parseFloat(
        input.value.replace(",", ".")
    );

    if (isNaN(valor) || valor <= 0) {
        input.focus();
        return;
    }

    if (App.modo === "adicionar") {
        adicionar(valor);
    } else {
        retirar(valor);
    }

    fecharModal();

}

// =========================
// PÉTALAS
// =========================

function criarPetalas() {

    for (let i = 0; i < 20; i++) {

        const petala = document.createElement("div");

        petala.className = "petal";

        petala.style.left = Math.random() * 100 + "%";

        petala.style.animationDuration =
            (4 + Math.random() * 3) + "s";

        petala.style.animationDelay =
            (Math.random() * 0.5) + "s";

        petala.style.transform =
            `scale(${0.7 + Math.random()})`;

        petalsContainer.appendChild(petala);

        petala.addEventListener("animationend", () => {
            petala.remove();
        });

    }

}

// =========================
// EVENTOS
// =========================

btnAdicionar.addEventListener("click", () => {
    abrirModal("adicionar");
});

btnRetirar.addEventListener("click", () => {
    abrirModal("retirar");
});

btnSalvar.addEventListener("click", salvar);

btnCancelar.addEventListener("click", fecharModal);

modal.addEventListener("click", (e) => {

    if (e.target === modal) {
        fecharModal();
    }

});

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        salvar();
    }

    if (e.key === "Escape") {
        fecharModal();
    }

});

// =========================
// INICIALIZAÇÃO
// =========================

// Garante que o modal sempre inicia fechado
modal.classList.remove("active");

// Atualiza os valores iniciais
atualizarTela();
