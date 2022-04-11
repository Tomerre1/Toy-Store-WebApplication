import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export function ToyChartDoughnut({ data, toys }) {
    let toyPrices = toys.map(toy => toy.price).sort((a, b) => a - b);
    toyPrices = [...new Set(toyPrices)];
    const toyData = {
        labels: toyPrices,
        datasets: [
            {
                label: '# of Toys',
                data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 199, 64, 0.2)'


                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 199, 64, 1)'

                ],
                borderWidth: 3,
            },
        ],
    };



    return (
        <Doughnut data={toyData}
            width={350}
            height={350}
            options={{ maintainAspectRatio: false }} />
    )
}