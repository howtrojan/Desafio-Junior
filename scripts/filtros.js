function fillMonthOptions() {
  const months = [
    "Selecione...",
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
  const selectElements = document.querySelectorAll('select[id^="month"]');

  selectElements.forEach((select) => {
    months.forEach((month, index) => {
      const option = document.createElement("option");
      option.text = month;
      option.value = index === 0 ? "" : index;
      select.add(option);
    });
  });
}

function fillStatusOptions() {
  const statusOptions = [
    "",
    "Pagamento realizado",
    "Cobrança realizada",
    "Pagamento em atraso",
    "Emitida",
  ];
  const statusSelect = document.getElementById("status");

  statusOptions.forEach((status) => {
    const option = document.createElement("option");
    option.text = status;
    option.value = status.toLowerCase();
    statusSelect.add(option);
  });
}

fillMonthOptions();
fillStatusOptions();

function clearOtherFilters(currentFilterId) {
  const filterIds = ["monthIssued", "monthCharged", "monthPaid", "status"];

  filterIds.forEach((filterId) => {
    if (filterId !== currentFilterId) {
      document.getElementById(filterId).value = "";
    }
  });
}

function getMonthFromDate(dateString) {
  const parts = dateString.split("-");
  return parseInt(parts[1], 10) - 1;
}

function filterByIssuedMonth() {
  console.log("Filtrando por mês de emissão...");
  const monthIssued = parseInt(
    document.getElementById("monthIssued").value,
    10
  );
  console.log("Mês selecionado:", monthIssued);
  clearOtherFilters("monthIssued");

  const tableRows = document.querySelectorAll("#myTable tbody tr");

  tableRows.forEach((row) => {
    const issuedDate = row.querySelectorAll("td")[2].textContent;
    const issuedMonth = getMonthFromDate(issuedDate);
    console.log("Mês emitido:", issuedMonth);
    row.style.display =
      monthIssued === 0 || monthIssued === issuedMonth + 1
        ? "table-row"
        : "none";
  });
}

function filterByChargedMonth() {
  console.log("Filtrando por mês de cobrança...");
  const monthCharged = parseInt(
    document.getElementById("monthCharged").value,
    10
  );
  console.log("Mês selecionado:", monthCharged);
  clearOtherFilters("monthCharged");

  const tableRows = document.querySelectorAll("#myTable tbody tr");

  tableRows.forEach((row) => {
    const chargedDate = row.querySelectorAll("td")[3].textContent;
    const chargedMonth = getMonthFromDate(chargedDate);
    console.log("Mês cobrado:", chargedMonth);
    row.style.display =
      monthCharged === 0 || monthCharged === chargedMonth + 1
        ? "table-row"
        : "none";
  });
}

function filterByPaidMonth() {
  console.log("Filtrando por mês de pagamento...");
  const monthPaid = parseInt(document.getElementById("monthPaid").value, 10);
  console.log("Mês selecionado:", monthPaid);
  clearOtherFilters("monthPaid");

  const tableRows = document.querySelectorAll("#myTable tbody tr");

  tableRows.forEach((row) => {
    const paidDate = row.querySelectorAll("td")[4].textContent;
    const paidMonth = getMonthFromDate(paidDate);
    console.log("Mês pago:", paidMonth);
    row.style.display =
      monthPaid === 0 || monthPaid === paidMonth + 1 ? "table-row" : "none";
  });
}

function filterByNoteStatus() {
  console.log("Filtrando por status da nota...");
  const status = document.getElementById("status").value.toLowerCase();
  console.log("Status selecionado:", status);
  clearOtherFilters("status");

  const tableRows = document.querySelectorAll("#myTable tbody tr");

  tableRows.forEach((row) => {
    const noteStatus = row.querySelectorAll("td")[8].textContent.toLowerCase();
    row.style.display =
      status === "" || status === noteStatus ? "table-row" : "none";
  });
}

function clearAllFilters() {
  document.querySelectorAll('select[id^="month"]').forEach((select) => {
    select.value = "";
  });
  document.getElementById("status").value = "";
  filterByIssuedMonth();
  filterByChargedMonth();
  filterByPaidMonth();
  filterByNoteStatus();
}

document
  .getElementById("monthIssued")
  .addEventListener("change", filterByIssuedMonth);
document
  .getElementById("monthCharged")
  .addEventListener("change", filterByChargedMonth);
document
  .getElementById("monthPaid")
  .addEventListener("change", filterByPaidMonth);
document
  .getElementById("status")
  .addEventListener("change", filterByNoteStatus);
document
  .getElementById("clearFilters")
  .addEventListener("click", clearAllFilters);
