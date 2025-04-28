const BASE_URL = 'http://localhost:8080';

/*  Fetch and display customers */
function fetchCustomers(endpoint, isGrouped = false) {
    fetch(BASE_URL + endpoint)
        .then(response => response.json())
        .then(data => {
            const output = document.getElementById('output');
            output.innerHTML = '';

            if (isGrouped) {
                const pre = document.createElement('pre');
                pre.textContent = JSON.stringify(data, null, 2);
                output.appendChild(pre);
            } else if (Array.isArray(data)) {
                const table = createCustomerTable(data);
                output.appendChild(table);
            } else {
                output.textContent = 'Unexpected data format';
            }
        })
        .catch(error => console.error('Error fetching customers:', error));
}

/*  Create table dynamically */
function createCustomerTable(customers) {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Id</th><th>Name</th><th>Email</th><th>City</th>
            </tr>
        </thead>
        <tbody>
            ${customers.map(customer => `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.city}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    return table;
}

/* Save customer */
document.getElementById('customerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const customer = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        city: document.getElementById('city').value
    };

    fetch(BASE_URL + '/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    })
    .then(response => response.json())
    .then(savedCustomer => {
        alert('Customer saved successfully!');
        document.getElementById('customerForm').reset();
        fetchCustomers('/api/customers');
    })
    .catch(error => console.error('Error saving customer:', error));
});

/* Theme toggle */
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
