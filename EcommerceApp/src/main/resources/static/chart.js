function drawAvgPriceChart() {
    fetch("/api/products/avg-price")
        .then(res => res.json())
        .then(data => {
            const ctx = document.getElementById('priceChart').getContext('2d');
            const labels = Object.keys(data);
            const values = Object.values(data);

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Average Price',
                        data: values,
                        backgroundColor: '#0d6efd'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: 'Average Price by Category'
                        }
                    }
                }
            });
        });
}
