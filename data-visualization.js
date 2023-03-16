function generateTable(csvData, container) {
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

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    const tr = document.createElement('tr');
    for (const cell of row) {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  container.appendChild(table);
}

function generateGraph(rawData, chartElement) {
  const lines = rawData.split('\n');
  const frequencies = [];
  const column2 = [];
  const column3 = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    frequencies.push(row[0]);
    column2.push(parseFloat(row[1]));
    column3.push(parseFloat(row[2]));
  }

  // Destroy the previous chart instance if it exists
  if (chartElement.chart) {
    chartElement.chart.destroy();
  }

  const ctx = chartElement.getContext('2d');
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

  // Store the chart instance on the canvas element
  chartElement.chart = chart;
}

document.querySelectorAll('.generateTable').forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const rawData = document.querySelectorAll('.rawData')[index].textContent;
    const tableContainer = document.querySelectorAll('.tabularDataContainer')[index];

    if (tableContainer.innerHTML === '') {
      generateTable(rawData, tableContainer);
    } else {
      tableContainer.innerHTML = '';
    }
  });
});

document.querySelectorAll('.generateGraph').forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const rawData = document.querySelectorAll('.rawData')[index].textContent;
    const chartCanvas = document.querySelectorAll('.chart')[index];

    if (chartCanvas.style.display === 'none') {
      chartCanvas.style.display = '';
      generateGraph(rawData, chartCanvas);
    } else {
      chartCanvas.style.display = 'none';
    }
  });
});

// const toggleTablesButton = document.getElementById('toggleTables');
// const toggleGraphsButton = document.getElementById('toggleGraphs');

// toggleTablesButton.addEventListener('click', () => {
//   Array.from(document.querySelectorAll('.tabularDataContainer')).forEach(container => {
//     const table = container.querySelector('table');
//     if (!table) {
//       const rawData = container.closest('tr').querySelector('.rawData').textContent;
//       generateTable(rawData, container);
//       container.style.display = 'block';
//     } else {
//       container.style.display = container.style.display === 'none' ? 'block' : 'none';
//     }
//   });
// });

// document.getElementById('toggleGraphs').addEventListener('click', (event) => {
//   event.preventDefault();
//   const generateGraphLinks = document.querySelectorAll('.generateGraph');
//   generateGraphLinks.forEach((link) => {
//     const row = link.closest('tr');
//     const chartElement = row.querySelector('.chart');
//     if (!chartElement.chart) {
//       link.click();
//     }
//     if (chartElement.style.display === 'none') {
//       chartElement.style.display = 'block';
//     } else {
//       chartElement.style.display = 'none';
//     }
//   });
// });