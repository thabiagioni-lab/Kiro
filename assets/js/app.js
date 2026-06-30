// =====================================
// KIRO v1.0
// =====================================

// META DA VIAGEM
const META = 20000;
const DISTANCIA_TOTAL = 18700;

// DADOS
let saldo = 0;

// ELEMENTOS
const saldoTexto = document.getElementById("saldo");
const distanciaTexto = document.getElementById("distancia");
const restanteTexto = document.getElementById("restante");
const porcentagemTexto = document.getElementById("porcentagem");
const barra = document.getElementById("barra");

const modal = document.getElementById("modal");

const botaoDepositar = document.getElementById("depositar");
const botaoCancelar = document.getElementById("cancelar");
const botaoSalvar = document.getElementById("salvar");

const campoValor = document.getElementById("valor");

// =====================================
// ATUALIZA A TELA
// =====================================

function atualizarTela(){

    saldoTexto.textContent =
        saldo.toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        });

    const porcentagem =
        (saldo / META) * 100;

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

// =====================================
// ABRIR MODAL
// =====================================

botaoDepositar.addEventListener("click",()=>{

    modal.classList.remove("hidden");

    campoValor.focus();

});

// =====================================
// FECHAR MODAL
// =====================================

botaoCancelar.addEventListener("click",()=>{

    modal.classList.add("hidden");

    campoValor.value="";

});

// =====================================
// SALVAR
// =====================================

botaoSalvar.addEventListener("click",()=>{

    const valor =
        Number(campoValor.value.replace(",","."));

    if(isNaN(valor) || valor<=0){

        alert("Digite um valor válido.");

        return;

    }

    saldo += valor;

    atualizarTela();

    modal.classList.add("hidden");

    campoValor.value="";

    comemorar();

});

// =====================================
// PÉTALAS
// =====================================

function criarPetala(){

    const petala =
        document.createElement("div");

    petala.className="petala";

    petala.textContent="🌸";

    petala.style.left =
        Math.random()*window.innerWidth+"px";

    petala.style.animationDuration =
        (5+Math.random()*3)+"s";

    petala.style.fontSize =
        (18+Math.random()*10)+"px";

    document.body.appendChild(petala);

    setTimeout(()=>{

        petala.remove();

    },8000);

}

function comemorar(){

    for(let i=0;i<8;i++){

        setTimeout(()=>{

            criarPetala();

        },i*120);

    }

}

// =====================================
// INICIAR
// =====================================

atualizarTela();
