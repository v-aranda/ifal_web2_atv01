async function getAllData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Fun��o para construir a tabela com base nos dados obtidos
async function buildTable(url) {
    let tableData = await getAllData(url);

    // Verifica se h� dados para construir a tabela
    if (!Array.isArray(tableData) || tableData.length === 0) {
        return '<p>Nenhum dado encontrado.</p>';
    }

    // Cria o cabe�alho da tabela com as chaves do primeiro objeto
    let table = '<table border="1"><thead><tr>';
    Object.keys(tableData[0]).forEach(key => {
        table += `<th>${key}</th>`;
    });
    table += '</tr></thead><tbody>';

    // Popula as linhas da tabela com os valores dos objetos
    tableData.forEach(item => {
        table += '<tr>';
        Object.values(item).forEach(value => {
            table += `<td>${value}</td>`;
        });
        table += '</tr>';
    });

    table += '</tbody></table>';
    return table;
}

// Fun��o para carregar a tabela em um elemento HTML espec�fico
async function loadData(element, url) {
    document.querySelector('#' + element).innerHTML = await buildTable(url);
}

// Conte�do e URLs a serem carregados
const content = [
    [1, "https://jsonplaceholder.typicode.com/posts"],
    [2, "https://jsonplaceholder.typicode.com/todos"],
    [3, "https://jsonplaceholder.typicode.com/albums"],
    [4, "https://jsonplaceholder.typicode.com/comments"]
];

// Itera sobre o conte�do para carregar as tabelas nos elementos especificados
for (let i = 0; i < content.length; i++) {
    loadData('section' + content[i][0], content[i][1]);
}