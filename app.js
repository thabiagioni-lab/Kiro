/*
=====================================================

KIRO
Controle Financeiro da Viagem ao Japão

Versão: 1.0

=====================================================
*/

/*====================================================
CONFIGURAÇÕES
====================================================*/

const META_FINANCEIRA = 20000;
const DISTANCIA_TOTAL = 18500;

/*====================================================
ESTADO DA APLICAÇÃO
====================================================*/

const state = {

    saldo: 0

};

/*====================================================
ELEMENTOS DA TELA
====================================================*/

const saldoEl = document.getElementById("saldo");
const kmPercorridosEl = document.getElementById("kmPercorridos");
const kmRestantesEl = document.getElementById("kmRestantes");
const porcentagemEl = document.getElementById("porcentagem");
const progressFill = document.getElementById("progressFill");

const modal = document.getElementById("modal");

const valorInput = document.getElementById("valorInput");

const btnAdicionar = document.getElementById("btnAdicionar");
const btnRetirar = document.getElementById("btnRetirar");

const btnSalvar = document.getElementById("salvar");
const btnCancelar = document.getElementById("cancelar");

/*====================================================
FORMATAÇÃO
====================================================*/

function formatarMoeda(valor){

    return valor.toLocaleString("pt-BR",{

        style:"currency",

        currency:"BRL"

    });

}

/*====================================================
CÁLCULOS
====================================================*/

function calcularProgresso(){

    const porcentagem = Math.min(

        (state.saldo / META_FINANCEIRA) * 100,

        100

    );

    return porcentagem;

}

function calcularKmPercorridos(){

    return Math.round(

        (state.saldo / META_FINANCEIRA)

        *

        DISTANCIA_TOTAL

    );

}

function calcularKmRestantes(){

    const restante =

        DISTANCIA_TOTAL -

        calcularKmPercorridos();

    return Math.max(restante,0);

}

/*====================================================
ATUALIZA INTERFACE
====================================================*/

function atualizarInterface(){

    saldoEl.textContent =

        formatarMoeda(state.saldo);

    kmPercorridosEl.textContent =

        `${calcularKmPercorridos()} km`;

    kmRestantesEl.textContent =

        `${calcularKmRestantes()} km`;

    const progresso =

        calcularProgresso();

    porcentagemEl.textContent =

        `${progresso.toFixed(1)}%`;

    progressFill.style.width =

        `${progresso}%`;

}

/*====================================================
MODAL
====================================================*/

function abrirModal(){

    modal.classList.add("active");

    valorInput.value = "";

    setTimeout(()=>{

        valorInput.focus();

    },150);

}

function fecharModal(){

    modal.classList.remove("active");

}/*====================================================
MOVIMENTAÇÕES
====================================================*/

function adicionarDinheiro(valor){

    state.saldo += valor;

    atualizarInterface();

    criarPetalas();

}

function retirarDinheiro(valor){

    state.saldo -= valor;

    if(state.saldo < 0){

        state.saldo = 0;

    }

    atualizarInterface();

}

/*====================================================
SALVAR
====================================================*/

function salvarValor(){

    const valor = Number(valorInput.value);

    if(isNaN(valor) || valor <= 0){

        valorInput.focus();

        return;

    }

    adicionarDinheiro(valor);

    fecharModal();

}

/*====================================================
PÉTALAS
====================================================*/

function criarPetalas(){

    const container = document.getElementById("petals-container");

    for(let i = 0; i < 18; i++){

        const petala = document.createElement("div");

        petala.className = "petal";

        petala.style.left = Math.random() * 100 + "%";

        petala.style.animationDuration =

            (4 + Math.random() * 4) + "s";

        petala.style.animationDelay =

            (Math.random() * .8) + "s";

        petala.style.transform =

            `scale(${0.6 + Math.random()})`;

        container.appendChild(petala);

        petala.addEventListener("animationend",()=>{

            petala.remove();

        });

    }

}

/*====================================================
EVENTOS
====================================================*/

btnAdicionar.addEventListener("click",abrirModal);

btnCancelar.addEventListener("click",fecharModal);

btnSalvar.addEventListener("click",salvarValor);

btnRetirar.addEventListener("click",()=>{

    const valor = Number(valorInput.value);

    if(!valor || valor <= 0){

        abrirModal();

        return;

    }

    retirarDinheiro(valor);

});

modal.addEventListener("click",(event)=>{

    if(event.target === modal){

        fecharModal();

    }

});

valorInput.addEventListener("keydown",(event)=>{

    if(event.key === "Enter"){

        salvarValor();

    }

    if(event.key === "Escape"){

        fecharModal();

    }

});

/*====================================================
INICIALIZAÇÃO
====================================================*/

function iniciar(){

    atualizarInterface();

}

iniciar();
