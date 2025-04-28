const BASE_URL = 'http://localhost:8080';

/* Fetch and display data */
function fetchData(endpoint, isSimpleList = false) {
    fetch(BASE_URL + endpoint)
        .then(response => response.json())
        .then(data => {
            const output = document.getElementById('output');
            output.innerHTML = '';

            if (isSimpleList) {
                const ul = document.createElement('ul');
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = typeof item === 'string' ? item : JSON.stringify(item);
                    ul.appendChild(li);
                });
                output.appendChild(ul);
            } else if (Array.isArray(data)) {
                const table = createTableFromArray(data);
                output.appendChild(table);
            } else if (typeof data === 'object') {
                const pre = document.createElement('pre');
                pre.textContent = JSON.stringify(data, null, 2);
                output.appendChild(pre);
            } else {
                output.textContent = data;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

/* Create table dynamically */
function createTableFromArray(data) {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Id</th><th>Name</th><th>Category</th><th>Price</th>
            </tr>
        </thead>
        <tbody>
            ${data.map(product => `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.price}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    return table;
}

/* Save product */
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const product = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value)
    };

    fetch(BASE_URL + '/api/products/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(savedProduct => {
        alert('Product saved successfully!');
        document.getElementById('productForm').reset();
        fetchData('/api/products'); // Refresh products list automatically
    })
    .catch(error => console.error('Error saving product:', error));
});

/* Draw Avg Price Chart */
function drawAvgPriceChart() {
    fetch(BASE_URL + '/api/products/avg-price')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('priceChart').getContext('2d');

            if (window.priceChart) {
                window.priceChart.destroy(); // Destroy old chart if exists
            }

            window.priceChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Average Price',
                        data: Object.values(data),
                        backgroundColor: 'rgba(54, 162, 235, 0.5)'
                    }]
                },
                options: {
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        })
        .catch(error => console.error('Error drawing chart:', error));
}

/* Theme toggle function */
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
