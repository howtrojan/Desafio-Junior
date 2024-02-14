async function preencherTabelaComDados() {
    try {

        const response = await fetch('../dados/notas.json');
        const data = await response.json();
        const notas = data.notas;

        const tbody = document.querySelector('#myTable tbody');


        tbody.innerHTML = '';


        notas.forEach(nota => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${nota.nome_pagador || '-'}</td>
                <td>${nota.numero_identificacao_nota || '-'}</td>
                <td>${nota.data_emissao_nota || '-'}</td>
                <td>${nota.data_cobranca || '-'}</td>
                <td>${nota.data_pagamento || '-'}</td>
                <td>${nota.valor_nota || '-'}</td>
                <td>${nota.documento_nota_fiscal || '-'}</td>
                <td>${nota.documento_boleto_bancario || '-'}</td>
                <td>${nota.status_nota || '-'}</td>
            `;
            tbody.appendChild(row);
        });


        const headers = document.querySelectorAll('#myTable th.sortable');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const sortOrder = header.dataset.order || 'asc';
                const columnIndex = header.cellIndex;
                const rows = Array.from(tbody.querySelectorAll('tr'));


                headers.forEach(h => h.classList.remove('asc', 'desc'));

                headers.forEach(h => h.querySelector('.sort-icon').textContent = '');


                header.dataset.order = sortOrder === 'asc' ? 'desc' : 'asc';


                const sortIcon = header.querySelector('.sort-icon');
                sortIcon.textContent = sortOrder === 'asc' ? '▲' : '▼';


                const sortedRows = rows.sort((a, b) => {
                    const aValue = a.cells[columnIndex].textContent.trim();
                    const bValue = b.cells[columnIndex].textContent.trim();

                    if (sortOrder === 'asc') {
                        return aValue.localeCompare(bValue);
                    } else {
                        return bValue.localeCompare(aValue);
                    }
                });


                tbody.innerHTML = '';
                sortedRows.forEach(row => tbody.appendChild(row));
            });
        });

        calcularValorTotalNotasEmitidas();
        calcularValorTotalNotasSemCobranca();
        calcularValorTotalNotasVencidas();
        calcularValorTotalNotasAVencer();
        calcularValorTotalNotasPagas();
    } catch (error) {
        console.error('Ocorreu um erro ao obter os dados da API:', error);
    }
}


window.addEventListener('load', preencherTabelaComDados);
