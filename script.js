function media() {
  limparCSS();
  document.getElementById("conteudo").innerHTML = "";

  let quantidade = parseInt(prompt("Quantos números você deseja digitar?"));
  if (isNaN(quantidade) || quantidade <= 0) {
    alert("Digite um número válido maior que zero.");
    return;
  }

  let soma = 0;
  for (let i = 1; i <= quantidade; i++) {
    let numero = parseFloat(prompt(`Digite o número ${i}:`));
    if (isNaN(numero)) numero = 0;
    soma += numero;
  }

  let resultado = soma / quantidade;
  document.getElementById("conteudo").innerHTML = `<p>A média dos ${quantidade} números é <strong>${resultado.toFixed(2)}</strong></p>`;
}

function mostrarFormulario() {
  carregarCSS("styleforms.css");

  document.getElementById("conteudo").innerHTML = `
    <form id="formulario">
      <label>Valor 1: <input type="text" id="valor1" required></label>
      <label>Valor 2: <input type="text" id="valor2" required></label>
      <label>Valor 3: <input type="text" id="valor3" required></label>
      <label>Valor 4: <input type="text" id="valor4" required></label>
      <label>Valor 5: <input type="text" id="valor5" required></label>
      <button type="submit">Salvar em TXT</button>
    </form>
  `;

  document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();

    const valores = [];
    for (let i = 1; i <= 5; i++) {
      let valor = document.getElementById(`valor${i}`).value.trim();
      if (!valor) return alert(`Valor ${i} está vazio`);
      valores.push(valor);
    }

    const conteudo = valores.map((v, i) => `Valor ${i+1}: ${v}`).join("\n");
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "valores.txt";
    link.click();
  });
}

let numeroSecreto, tentativas, listaSorteados = [], limite = 10;

function mostrarSecreto() {
  carregarCSS("stylesecreto.css");

  numeroSecreto = gerarNumero();
  tentativas = 1;

  document.getElementById("conteudo").innerHTML = `
    <div class="container">
      <div class="container__conteudo">
        <div class="container__informacoes">
          <div class="container__texto">
            <h1>Adivinhe o <span class="container__texto-azul">número secreto</span></h1>
            <p class="texto__paragrafo">Escolha um número entre 1 a 10</p>
          </div>
          <input type="number" min="1" max="10" class="container__input" id="chute">
          <div class="chute container__botoes">
            <button onclick="verificarChute()" class="container__botao">Chutar</button>
            <button onclick="mostrarSecreto()" class="container__botao">Novo jogo</button>
          </div>
          <p id="resultado"></p>
        </div>
        <img src="ia.png" class="container__imagem-pessoa" />
      </div>
    </div>
  `;
}

function verificarChute() {
  let chute = parseInt(document.getElementById("chute").value);
  const resultado = document.getElementById("resultado");

  if (chute === numeroSecreto) {
    resultado.innerHTML = `Acertou! Tentativas: ${tentativas}`;
  } else {
    resultado.innerHTML = `O número secreto é ${chute > numeroSecreto ? 'menor' : 'maior'}.`;
    tentativas++;
  }
}

function gerarNumero() {
  if (listaSorteados.length === limite) listaSorteados = [];
  let numero;
  do {
    numero = Math.floor(Math.random() * limite) + 1;
  } while (listaSorteados.includes(numero));
  listaSorteados.push(numero);
  return numero;
}

// Troca de CSS dinâmico
function carregarCSS(nome) {
  document.getElementById("estilo").setAttribute("href", nome);
}

function limparCSS() {
  document.getElementById("estilo").setAttribute("href", "");
}
