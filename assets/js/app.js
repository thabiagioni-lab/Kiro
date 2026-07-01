// ==========================================
// KIRO v1.1
// ==========================================

// ---------- CONFIGURAÇÕES ----------

const META = 20000;
const DISTANCIA_TOTAL = 18700;

// ---------- DADOS ----------

let saldo =
    Number(localStorage.getItem("kiroSaldo")) || 0;

// ---------- ELEMENTOS ----------

const saldoEl = document.getElementById("saldo");
const kmPercorridosEl = document.getElementById("kmPercorridos");
const kmRestantesEl = document.getElementById("kmRestantes");
const percentualEl = document.getElementById("percentual");
const progressFill = document.getElementById("progressFill");

// ---------- MODAL DEPÓSITO ----------

const modal = document.getElementById("modal");

const btnAdicionar =
    document.getElementById("btnAdicionar");

const btnCancelar =
    document.getElementById("btnCancelar");

const btnSalvar =
    document.getElementById("btnSalvar");

const valorInput =
    document.getElementById("valorInput");

// ---------- MODAL RETIRADA ----------

const modalRetirada =
    document.getElementById("modalRetirada");

const btnRetirar =
    document.getElementById("btnRetirar");

const btnCancelarRetirada =
    document.getElementById("btnCancelarRetirada");

const btnSalvarRetirada =
    document.getElementById("btnSalvarRetirada");

const valorRetirada =
    document.getElementById("valorRetirada");

// ---------- TOAST ----------

const toast =
    document.getElementById("toast");

const toastTitulo =
    document.getElementById("toastTitulo");

const toastValor =
    document.getElementById("toastValor");

const toastTexto =
    document.getElementById("toastTexto");

// ==========================================
// ATUALIZA TELA
// ==========================================

function atualizarTela(){

    saldoEl.textContent =
        saldo.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

    const porcentagem =
        Math.min((saldo/META)*100,100);

    progressFill.style.width =
        porcentagem + "%";

    percentualEl.textContent =
        porcentagem.toFixed(1) + "%";

    const km =
        (saldo/META)*DISTANCIA_TOTAL;

    kmPercorridosEl.textContent =
        Math.round(km) + " km";

    kmRestantesEl.textContent =
        Math.max(
            0,
            Math.round(DISTANCIA_TOTAL-km)
        ) + " km";

    localStorage.setItem(
        "kiroSaldo",
        saldo
    );

}
// ==========================================
// MODAL DEPÓSITO
// ==========================================

btnAdicionar.addEventListener("click", () => {

    valorInput.value = "";

    modal.classList.remove("hidden");

    valorInput.focus();

});

btnCancelar.addEventListener("click", () => {

    modal.classList.add("hidden");

});

// ==========================================
// SALVAR DEPÓSITO
// ==========================================

btnSalvar.addEventListener("click", () => {

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

    valorInput.value = "";

    comemorar();

    mostrarToast(
        "🌸 Depósito realizado",
        valor
    );

});

// ==========================================
// MODAL RETIRADA
// ==========================================

btnRetirar.addEventListener("click", () => {

    valorRetirada.value = "";

    modalRetirada.classList.remove("hidden");

    valorRetirada.focus();

});

btnCancelarRetirada.addEventListener("click", () => {

    modalRetirada.classList.add("hidden");

});

// ==========================================
// SALVAR RETIRADA
// ==========================================

btnSalvarRetirada.addEventListener("click", () => {

    const valor = parseFloat(
        valorRetirada.value.replace(",", ".")
    );

    if (isNaN(valor) || valor <= 0) {

        alert("Digite um valor válido.");

        return;

    }

    saldo -= valor;

    if (saldo < 0){

        saldo = 0;

    }

    adicionarHistorico("➖", valor);

    atualizarTela();

    modalRetirada.classList.add("hidden");

    valorRetirada.value = "";

    mostrarToast(
        "➖ Retirada registrada",
        valor
    );

});
// ==========================================
// PÉTALAS
// ==========================================

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

// ==========================================
// TOAST
// ==========================================

function mostrarToast(titulo, valor){

    if(!toast) return;

    const km =
        (valor / META) * DISTANCIA_TOTAL;

    toastTitulo.textContent = titulo;

    toastValor.textContent =
        valor.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

    toastTexto.textContent =
        "Você avançou " +
        Math.round(km) +
        " km rumo a Izumo.";

    toast.classList.remove("hidden");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {

        toast.classList.add("hidden");

    },3000);

}
// ==========================================
// INICIAR APLICAÇÃO
// ==========================================

atualizarTela();

if (typeof atualizarHistorico === "function") {

    atualizarHistorico();

}
