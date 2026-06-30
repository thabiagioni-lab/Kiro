/*
=========================================
KIRO
Controle Financeiro
=========================================
*/

const META_FINANCEIRA = 20000;
const DISTANCIA_TOTAL = 18500;

const App = {
    saldo: 0,
    modo: "adicionar"
};

// ==============================
// ELEMENTOS
// ==============================

const saldo = document.getElementById("saldo");
const kmPercorridos = document.getElementById("kmPercorridos");
const kmRestantes = document.getElementById("kmRestantes");
const porcentagem = document.getElementById("porcentagem");
const progressFill = document.getElementById("progressFill");

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescricao = document.getElementById("modalDescricao");

const valorInput = document.getElementById("valorInput");

const btnAdicionar = document.getElementById("btnAdicionar");
const btnRetirar = document.getElementById("btnRetirar");
const btnSalvar = document.getElementById("salvar");
const btnCancelar = document.getElementById("cancelar");

const petalsContainer = document.getElementById("petals-container");

// ==============================
// UTILITÁRIOS
// ==============================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

function calcularPorcentagem() {

    return Math.min(
        (App.saldo / META_FINANCEIRA) * 100,
        100
    );

}

function calcularKmPercorridos() {

    return Math.round(
        DISTANCIA_TOTAL *
        calcularPorcentagem() / 100
    );

}

function calcularKmRestantes() {

    return Math.max(
        DISTANCIA_TOTAL -
        calcularKmPercorridos(),
        0
    );

}

// ==============================
// TELA
// ==============================

function atualizarTela() {

    saldo.textContent =
        formatarMoeda(App.saldo);

    kmPercorridos.textContent =
        calcularKmPercorridos() + " km";

    kmRestantes.textContent =
        calcularKmRestantes() + " km";

    const progresso =
        calcularPorcentagem();

    porcentagem.textContent =
        progresso.toFixed(1) + "%";

    progressFill.style.width =
        progresso + "%";

}

// ==============================
// MODAL
// ==============================

function abrirModal(modo) {

    App.modo = modo;

    valorInput.value = "";

    if (modo === "adicionar") {

        modalTitulo.textContent =
            "Adicionar dinheiro";

        modalDescricao.textContent =
            "Quanto deseja guardar hoje?";

    } else {

        modalTitulo.textContent =
            "Retirar dinheiro";

        modalDescricao.textContent =
            "Quanto deseja retirar?";

    }

    modal.classList.add("active");

    setTimeout(() => {

        valorInput.focus();

    }, 100);

}

function fecharModal() {

    modal.classList.remove("active");

    valorInput.value = "";

}// ==============================
// MOVIMENTAÇÕES
// ==============================

function adicionarDinheiro(valor) {

    App.saldo += valor;

    atualizarTela();

    criarPetalas();

}

function retirarDinheiro(valor) {

    App.saldo -= valor;

    if (App.saldo < 0) {
        App.saldo = 0;
    }

    atualizarTela();

}

// ==============================
// SALVAR
// ==============================

function salvarMovimentacao() {

    const valor = parseFloat(
        valorInput.value.replace(",", ".")
    );

    if (isNaN(valor) || valor <= 0) {
        valorInput.focus();
        return;
    }

    if (App.modo === "adicionar") {
        adicionarDinheiro(valor);
    } else {
        retirarDinheiro(valor);
    }

    fecharModal();

}

// ==============================
// PÉTALAS
// ==============================

function criarPetalas() {

    for (let i = 0; i < 20; i++) {

        const petala = document.createElement("div");

        petala.className = "petal";

        petala.style.left = `${Math.random() * 100}%`;

        petala.style.animationDuration =
            `${4 + Math.random() * 3}s`;

        petala.style.animationDelay =
            `${Math.random() * 0.5}s`;

        petala.style.transform =
            `scale(${0.7 + Math.random()})`;

        petalsContainer.appendChild(petala);

        petala.addEventListener("animationend", () => {
            petala.remove();
        });

    }

}

// ==============================
// EVENTOS
// ==============================

btnAdicionar.addEventListener("click", () => {
    abrirModal("adicionar");
});

btnRetirar.addEventListener("click", () => {
    abrirModal("retirar");
});

btnSalvar.addEventListener("click", salvarMovimentacao);

btnCancelar.addEventListener("click", fecharModal);

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        fecharModal();
    }

});

valorInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        salvarMovimentacao();
    }

    if (event.key === "Escape") {
        fecharModal();
    }

});

// ==============================
// INICIALIZAÇÃO
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    // Garante que o modal comece fechado
    modal.classList.remove("active");

    atualizarTela();

});
