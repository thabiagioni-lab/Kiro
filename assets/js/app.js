alert("APP NOVO");
// ===============================
// KIRO v1.0
// ===============================

const META = 20000;
const DISTANCIA_TOTAL = 18700;

// ---------- Dados ----------

let saldo = Number(localStorage.getItem("kiroSaldo")) || 0;

// ---------- Elementos ----------

const saldoEl = document.getElementById("saldo");
const kmPercorridosEl = document.getElementById("kmPercorridos");
const kmRestantesEl = document.getElementById("kmRestantes");
const percentualEl = document.getElementById("percentual");
const progressFill = document.getElementById("progressFill");

const modal = document.getElementById("modal");

const btnAdicionar = document.getElementById("btnAdicionar");
const btnRetirar = document.getElementById("btnRetirar");
const btnCancelar = document.getElementById("btnCancelar");
const btnSalvar = document.getElementById("btnSalvar");

const valorInput = document.getElementById("valorInput");
const modalRetirada = document.getElementById("modalRetirada");

const btnCancelarRetirada = document.getElementById("btnCancelarRetirada");

const btnSalvarRetirada = document.getElementById("btnSalvarRetirada");

const valorRetirada = document.getElementById("valorRetirada");
// ---------- Atualiza tela ----------

function atualizarTela() {

    saldoEl.textContent = saldo.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    const percentual = Math.min((saldo / META) * 100, 100);

    progressFill.style.width = percentual + "%";

    percentualEl.textContent = percentual.toFixed(1) + "%";

    const km = (saldo / META) * DISTANCIA_TOTAL;

    kmPercorridosEl.textContent = Math.round(km) + " km";

    kmRestantesEl.textContent =
        Math.max(0, Math.round(DISTANCIA_TOTAL - km)) + " km";

    localStorage.setItem("kiroSaldo", saldo);

}

// ---------- Modal ----------

btnAdicionar.addEventListener("click", () => {

    valorInput.value = "";

    modal.classList.remove("hidden");

    valorInput.focus();

});

btnCancelar.addEventListener("click", () => {

    modal.classList.add("hidden");

});
btnCancelarRetirada.addEventListener("click", () => {

    modalRetirada.classList.add("hidden");

});
// ---------- Salvar ----------

btnSalvar.addEventListener("click", () => {
    console.log("Cliquei em Salvar!");

    const valor = parseFloat(
        valorInput.value.replace(",", ".")
    );

    if (isNaN(valor) || valor <= 0) {

        alert("Digite um valor válido.");

        return;

    }

    saldo += valor;

adicionarHistorico("🌸 +", valor);

atualizarTela();

modal.classList.add("hidden");

comemorar();

});

// ---------- Retirar ----------

btnRetirar.addEventListener("click", () => {

    valorRetirada.value = "";

    modalRetirada.classList.remove("hidden");

    valorRetirada.focus();

});

// ---------- Pétalas ----------

function criarPetala() {

    const petala = document.createElement("div");

    petala.className = "petala";

    petala.textContent = "🌸";

    petala.style.left =
        Math.random() * window.innerWidth + "px";

    petala.style.fontSize =
        (16 + Math.random() * 10) + "px";

    petala.style.animationDuration =
        (5 + Math.random() * 3) + "s";

    document.body.appendChild(petala);

    setTimeout(() => {

        petala.remove();

    }, 8000);

}

function comemorar() {

    for (let i = 0; i < 8; i++) {

        setTimeout(() => {

            criarPetala();

        }, i * 120);

    }

}

// ---------- Iniciar ----------

atualizarTela();
