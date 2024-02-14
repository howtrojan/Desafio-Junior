function criarGraficoInadimplencia(data) {
  const labels = data.map(item => item.mes);
  const valores = data.map(item => item.valor);

  const ctx = document.getElementById('grafico-inadimplencia').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Inadimplência',
        data: valores,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function criarGraficoReceita(data) {
  const labels = data.map(item => item.mes);
  const valores = data.map(item => item.valor);

  const ctx = document.getElementById('grafico-receita').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Receita',
        data: valores,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Supondo que você já tenha os dados disponíveis para os gráficos
const dadosInadimplencia = [
  { mes: 'Janeiro', valor: 1000 },
  { mes: 'Fevereiro', valor: 1500 },
  { mes: 'Março', valor: 2000 },
  // Outros meses...
];

const dadosReceita = [
  { mes: 'Janeiro', valor: 5000 },
  { mes: 'Fevereiro', valor: 5500 },
  { mes: 'Março', valor: 6000 },
  // Outros meses...
];

window.addEventListener('load', () => {
  criarGraficoInadimplencia(dadosInadimplencia);
  criarGraficoReceita(dadosReceita);
});
