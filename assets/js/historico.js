// ===============================
// HISTÓRICO
// ===============================

let historico = JSON.parse(localStorage.getItem("kiroHistorico")) || [];

function adicionarHistorico(tipo, valor){

    historico.unshift({

        tipo: tipo,

        valor: valor,

        data: new Date().toLocaleString("pt-BR")

    });

    localStorage.setItem(

        "kiroHistorico",

        JSON.stringify(historico)

    );

    atualizarHistorico();

}

function atualizarHistorico(){

    const lista = document.getElementById("historico");

    lista.innerHTML = "";

    if(historico.length === 0){

        lista.innerHTML = "<p>Nenhuma movimentação ainda.</p>";

        return;

    }

    historico.forEach(item => {

        const div = document.createElement("div");

        div.className = "movimento";

        const titulo =
    item.tipo === "🌸 +" ? "🌸 Depósito" : "➖ Retirada";

const valor =
    item.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

div.innerHTML = `

    <strong>${titulo}</strong>

    <div class="valor">${valor}</div>

    <small>📅 ${item.data}</small>

`;
        lista.appendChild(div);

    });

}

atualizarHistorico();
