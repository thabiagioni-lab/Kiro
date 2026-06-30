// ===== CONFIGURAÇÕES =====

const META = 20000;
const DISTANCIA_IZUMO = 18700;

// ===== DADOS =====

let saldo = 0;

// ===== ELEMENTOS =====

const saldoElemento = document.getElementById("saldo");
const distanciaElemento = document.getElementById("distancia");
const progresso = document.querySelector(".progresso");
const porcentagem = document.getElementById("porcentagem");

const botaoAdicionar = document.querySelector(".verde");

// ===== FUNÇÃO =====

function atualizarTela(){

    saldoElemento.innerHTML =
        "R$ " + saldo.toLocaleString("pt-BR",{
            minimumFractionDigits:2
        });

    const km = saldo * (DISTANCIA_IZUMO / META);

    distanciaElemento.innerHTML =
        km.toFixed(1) + " km";

    const porcento = (saldo / META) * 100;

    progresso.style.width = porcento + "%";

    porcentagem.innerHTML =
        porcento.toFixed(1) + "%";

}

// ===== BOTÃO =====

botaoAdicionar.addEventListener("click", function(){

    let valor = prompt("Quanto deseja guardar?");

    if(valor === null) return;

    valor = Number(valor.replace(",", "."));

    if(isNaN(valor) || valor <= 0){

        alert("Digite um valor válido.");

        return;

    }

    saldo += valor;

    atualizarTela();

});

atualizarTela();
