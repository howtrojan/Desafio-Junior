function criarGraficoInadimplencia(data) {
  const labels = data.map((item) => item.mes);
  const valores = data.map((item) => item.valor);

  const ctx = document.getElementById("grafico-inadimplencia").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Inadimplência",
          data: valores,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function criarGraficoReceita(data) {
  const labels = data.map((item) => item.mes);
  const valores = data.map((item) => item.valor);

  const ctx = document.getElementById("grafico-receita").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Receita",
          data: valores,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

window.addEventListener("load", () => {
  fetch("../dados/notas.json")
    .then((response) => response.json())
    .then((notas) => {
      const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];

      const dadosInadimplencia = meses.map((mes) => ({ mes: mes, valor: 0 }));
      const dadosReceita = meses.map((mes) => ({ mes: mes, valor: 0 }));

      notas.notas.forEach((nota) => {
        const data_pagamento = nota.data_pagamento;
        const mes_cobranca = new Date(nota.data_cobranca).getMonth();

        if (
          !data_pagamento ||
          new Date(data_pagamento) > new Date(nota.data_cobranca)
        ) {
          if (nota.status_nota === "Pagamento em atraso") {
            dadosInadimplencia[mes_cobranca].valor += nota.valor_nota;
          } else if (nota.status_nota === "Pagamento realizado") {
            dadosReceita[mes_cobranca].valor += nota.valor_nota;
          }
        }
      });

      console.log("Dados de Inadimplência:", dadosInadimplencia);
      console.log("Dados de Receita:", dadosReceita);

      criarGraficoInadimplencia(dadosInadimplencia);
      criarGraficoReceita(dadosReceita);
    })
    .catch((error) => console.error("Erro ao carregar notas:", error));
});
