function atualizarValorTotal(elementId, valor) {
  document.getElementById(elementId).textContent = `R$ ${valor.toFixed(2)}`;
}

function calcularValorTotalNotasEmitidas() {
  let valorTotal = 0;
  const valorColunaIndex = 5;
  const rows = document.querySelectorAll("#myTable tbody tr");
  rows.forEach((row) => {
    const statusNota = row.cells[8].textContent.trim();
    if (statusNota === "Emitida") {
      const valorNota = parseFloat(
        row.cells[valorColunaIndex].textContent
          .trim()
          .replace("R$", "")
          .replace(",", ".")
      );
      valorTotal += isNaN(valorNota) ? 0 : valorNota;
    }
  });
  atualizarValorTotal("valor-total-notas", valorTotal);
}

function calcularValorTotalNotasSemCobranca() {
  let valorTotalSemCobranca = 0;
  const valorColunaIndex = 5;
  const rows = document.querySelectorAll("#myTable tbody tr");
  rows.forEach((row) => {
    const statusNota = row.cells[8].textContent.trim();
    if (statusNota !== "Cobrança realizada") {
      const valorNota = parseFloat(
        row.cells[valorColunaIndex].textContent
          .trim()
          .replace("R$", "")
          .replace(",", ".")
      );
      valorTotalSemCobranca += isNaN(valorNota) ? 0 : valorNota;
    }
  });
  atualizarValorTotal("valor-total-notas-sem-cobranca", valorTotalSemCobranca);
}

function calcularValorTotalNotasVencidas() {
  let valorTotalVencidas = 0;
  const valorColunaIndex = 5;
  const rows = document.querySelectorAll("#myTable tbody tr");
  rows.forEach((row) => {
    const statusNota = row.cells[8].textContent.trim();

    if (statusNota === "Pagamento em atraso") {
      const valorNota = parseFloat(
        row.cells[valorColunaIndex].textContent
          .trim()
          .replace("R$", "")
          .replace(",", ".")
      );

      valorTotalVencidas += isNaN(valorNota) ? 0 : valorNota;
    }
  });
  atualizarValorTotal("valor-total-notas-vencidas", valorTotalVencidas);
}

function calcularValorTotalNotasAVencer() {
  let valorTotalAVencer = 0;
  const valorColunaIndex = 5;
  const rows = document.querySelectorAll("#myTable tbody tr");
  rows.forEach((row) => {
    const statusNota = row.cells[8].textContent.trim();
    if (statusNota === "A vencer") {
      const valorNota = parseFloat(
        row.cells[valorColunaIndex].textContent
          .trim()
          .replace("R$", "")
          .replace(",", ".")
      );
      valorTotalAVencer += isNaN(valorNota) ? 0 : valorNota;
    }
  });
  atualizarValorTotal("valor-total-notas-a-vencer", valorTotalAVencer);
}

function calcularValorTotalNotasPagas() {
  let valorTotalPagas = 0;
  const valorColunaIndex = 5;
  const rows = document.querySelectorAll("#myTable tbody tr");
  rows.forEach((row) => {
    const statusNota = row.cells[8].textContent.trim();
    if (statusNota === "Pagamento realizado") {
      const valorNota = parseFloat(
        row.cells[valorColunaIndex].textContent
          .trim()
          .replace("R$", "")
          .replace(",", ".")
      );
      valorTotalPagas += isNaN(valorNota) ? 0 : valorNota;
    }
  });
  atualizarValorTotal("valor-total-notas-pagas", valorTotalPagas);
}

function exibirCard(cardId) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.classList.remove("visible"));

  const cardToShow = document.getElementById(cardId);
  if (cardToShow) {
    cardToShow.classList.add("visible");
  }

  switch (cardId) {
    case "valor-total-notas":
      calcularValorTotalNotasEmitidas();
      break;
    case "valor-total-notas-sem-cobranca":
      calcularValorTotalNotasSemCobranca();
      break;
    case "valor-total-notas-vencidas":
      calcularValorTotalNotasVencidas();
      break;
    case "valor-total-notas-a-vencer":
      calcularValorTotalNotasAVencer();
      break;
    case "valor-total-notas-pagas":
      calcularValorTotalNotasPagas();
      break;
    case "grafico-inadimplencia":
      exibirGraficoInadimplencia();
      break;
    case "grafico-receita":
      exibirGraficoReceita();
      break;
    default:
      break;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".navigation ul li");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const cardId = item.getAttribute("data-card-id");

      exibirCard(cardId);
      fecharMenu();
    });
  });

  calcularValorTotalNotasEmitidas();
  calcularValorTotalNotasSemCobranca();
  calcularValorTotalNotasVencidas();
  calcularValorTotalNotasAVencer();
  calcularValorTotalNotasPagas();
});

function fecharMenu() {
    const menu = document.querySelector(".navigation");
    const topbar = document.querySelector(".topbar");
    const content = document.querySelector(".content");
    const cards = document.querySelectorAll(".card");
    const table = document.querySelector("#myTable");
  
    menu.classList.toggle("show-menu");
    topbar.classList.toggle("show-menu");
  
    content.classList.toggle("expanded");    
  
    cards.forEach((card) => {
      card.classList.toggle("expanded");      
    });
  
    table.style.marginTop = "20px"; // Ajusta a margem superior da tabela
  }
  
  
  
  
