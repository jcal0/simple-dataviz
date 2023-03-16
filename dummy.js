
const csvData = document.getElementById('rawData').textContent;

    const lines = csvData.split('\n');
    const table = document.createElement('table');
    table.className = 'table';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headerCells = lines[0].split(',');
    for (const cell of headerCells) {
        const th = document.createElement('th');
        th.scope = 'col';
        th.textContent = cell;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const frequencies = [];
    const column2 = [];
    const column3 = [];

    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        const tr = document.createElement('tr');
        for (const cell of row) {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);

        frequencies.push(row[0]);
        column2.push(parseFloat(row[1]));
        column3.push(parseFloat(row[2]));
    }

    table.appendChild(tbody);
    document.getElementById('tabularDataContainer').appendChild(table);

    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: frequencies,
            datasets: [
                {
                    label: 'Column 2',
                    data: column2,
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false
                },
                {
                    label: 'Column 3',
                    data: column3,
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    min: 0.05,
                    max: 50,
                    type: 'logarithmic'
                }
            }
        }
    });



