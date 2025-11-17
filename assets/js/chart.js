$(document).ready(function() {
    // Данные для графика (за 30 дней)
    const statsData = [
        { day: 1, wins: 12, defeats: 8, accuracy: 60 },
        { day: 2, wins: 15, defeats: 12, accuracy: 55 },
        { day: 3, wins: 8, defeats: 15, accuracy: 35 },
        { day: 4, wins: 22, defeats: 10, accuracy: 69 },
        { day: 5, wins: 18, defeats: 14, accuracy: 56 },
        { day: 6, wins: 25, defeats: 8, accuracy: 76 },
        { day: 7, wins: 12, defeats: 18, accuracy: 40 },
        { day: 8, wins: 30, defeats: 5, accuracy: 86 },
        { day: 9, wins: 22, defeats: 12, accuracy: 65 },
        { day: 10, wins: 15, defeats: 20, accuracy: 43 },
        { day: 11, wins: 28, defeats: 9, accuracy: 76 },
        { day: 12, wins: 20, defeats: 15, accuracy: 57 },
        { day: 13, wins: 16, defeats: 19, accuracy: 46 },
        { day: 14, wins: 24, defeats: 11, accuracy: 69 },
        { day: 15, wins: 19, defeats: 16, accuracy: 54 },
        { day: 16, wins: 27, defeats: 8, accuracy: 77 },
        { day: 17, wins: 14, defeats: 21, accuracy: 40 },
        { day: 18, wins: 23, defeats: 12, accuracy: 66 },
        { day: 19, wins: 17, defeats: 18, accuracy: 49 },
        { day: 20, wins: 26, defeats: 9, accuracy: 74 },
        { day: 21, wins: 21, defeats: 14, accuracy: 60 },
        { day: 22, wins: 29, defeats: 6, accuracy: 83 },
        { day: 23, wins: 13, defeats: 22, accuracy: 37 },
        { day: 24, wins: 18, defeats: 17, accuracy: 51 },
        { day: 25, wins: 25, defeats: 10, accuracy: 71 },
        { day: 26, wins: 22, defeats: 13, accuracy: 63 },
        { day: 27, wins: 16, defeats: 19, accuracy: 46 },
        { day: 28, wins: 28, defeats: 7, accuracy: 80 },
        { day: 29, wins: 24, defeats: 11, accuracy: 69 },
        { day: 30, wins: 20, defeats: 15, accuracy: 57 }
    ];

    const chartData = {
        labels: statsData.map(item => item.day),
        datasets: [{
            label: 'Победы',
            data: statsData.map(item => item.wins),
            borderColor: '#FF7D00',
            backgroundColor: function(context) {
                const chart = context.chart;
                const {ctx, chartArea} = chart;
                if (!chartArea) {
                    return;
                }
                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0, 'rgba(213, 121, 33, 0.58)');
                gradient.addColorStop(1, 'rgba(213, 121, 33, 0.00)');
                return gradient;
            },
            borderWidth: 1,
            pointBackgroundColor: '#D57921',
            pointBorderColor: '#1B1B1B',
            pointBorderWidth: 1,
            pointHoverBackgroundColor: '#D57921',
            pointHoverBorderColor: '#1B1B1B',
            pointHoverBorderWidth: 2,
            pointRadius: 2.35,
            pointHoverRadius: 2.35,
            fill: true,
            tension: 0.25
        }]
    };

    const config = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 2,
                    right: 2,
                    top: 0,
                    bottom: 0
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false,
                    external: function(context) {
                        let tooltipEl = document.getElementById('chartjs-tooltip');

                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            document.body.appendChild(tooltipEl);
                        }

                        const tooltipModel = context.tooltip;
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = 0;
                            tooltipEl.style.transform = 'translate(-10px, -10px)';
                            return;
                        }

                        if (tooltipModel.body) {
                            const dayIndex = context.tooltip.dataPoints[0].dataIndex;
                            const data = statsData[dayIndex];
                            const dayNumber = data.day;

                            tooltipEl.innerHTML = `
                                <div style="font-weight: 700; margin-bottom: 5px;">${dayNumber} Ноября</div>
                                <div style="font-weight: 500;">Побед: ${data.wins}</div>
                                <div style="font-weight: 500;">Поражений: ${data.defeats}</div>
                                <div style="font-weight: 500;">Точность: ${data.accuracy}%</div>
                            `;
                        }

                        const position = context.chart.canvas.getBoundingClientRect();
                        const bodyRect = document.body.getBoundingClientRect();

                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.transform = 'translate(0px, 0px)';
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left - bodyRect.left + tooltipModel.caretX - 170 - 2 + 'px';
                        tooltipEl.style.top = position.top - bodyRect.top + tooltipModel.caretY - 60 - 12 + 'px';
                        tooltipEl.style.pointerEvents = 'none';
                        
                        tooltipEl.style.width = '170px';
                        tooltipEl.style.padding = '8px';
                        tooltipEl.style.borderRadius = '7px';
                        tooltipEl.style.border = '1px solid #3B2B1C';
                        tooltipEl.style.background = 'rgba(34, 34, 34, 0.75)';
                        tooltipEl.style.backdropFilter = 'blur(6.650000095367432px)';
                        tooltipEl.style.color = '#FFF';
                        tooltipEl.style.fontFamily = 'Montserrat';
                        tooltipEl.style.fontSize = '10px';
                        tooltipEl.style.lineHeight = 'normal';
                        tooltipEl.style.zIndex = '999999';
                        tooltipEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    offset: false,
                    type: 'category',
                    ticks: {
                        maxTicksLimit: 30,
                        autoSkip: false
                    },
                    bounds: 'data'
                },
                y: {
                    display: false,
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            elements: {
                point: {
                    hoverRadius: 3
                },
                line: {
                    capBezierPoints: false
                }
            },
            categoryPercentage: 1.0,
            barPercentage: 1.0
        }
    };

    const ctx = document.getElementById('statsChart').getContext('2d');
    const chart = new Chart(ctx, config);
});