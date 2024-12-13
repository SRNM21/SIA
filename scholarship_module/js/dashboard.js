import '/vendor/jq.js';

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const Utils = {
  numbers: function({ count, min, max }) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
  },
  transparentize: function(color, opacity) {
    const alpha = 1 - opacity;
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  },
};

function setDougnutChart(chartData) 
{  
    const ctx = $('#chart-doughnut');

    const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year']

    const data = {
        labels: yearLevels,
        datasets: [
            {
                label: 'Year Level',
                data: chartData,
                backgroundColor: [
                    '#011c15',
                    '#01382A',
                    '#01543F',
                    '#027054',
                    '#028C69',
                    '#01A97E',
                    '#01C593',
                ],
            },
        ],
    }
    
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Year Level Applicants'
                }
            },
        },
    };
    
    new Chart(ctx, config);
}

function setLineChart() 
{  
    const DATA_COUNT = 12;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 500 };

    const ctx = $('#chart-line');

    const months = [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December'
    ]
    const data = {
        labels: months,
        datasets: [
            {
                label: 'Applicants',
                data: Utils.numbers(NUMBER_CFG),
                borderColor: 'rgba(1, 84, 63, 0.8)',
                backgroundColor: [
                    '#01543F',
                ],
            },
            {
                label: 'Declined',
                data: Utils.numbers(NUMBER_CFG),
                borderColor: 'rgba(255, 0, 0, 0.5)',
                backgroundColor: [
                    'red',
                ],
            },
            {
                label: 'Approved',
                data: Utils.numbers(NUMBER_CFG),
                borderColor: 'rgba(0, 0, 255, 0.5)',
                backgroundColor: [
                    'blue',
                ],
            },
        ],
    }
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Applicants'
                }
            },
        },
    };
    
    new Chart(ctx, config);
}

$(function(e) {

    var yearFreq = [0, 0, 0, 0]

    $.getJSON('/data/scholarships.json', function (scholarships) 
    {  
        let noOfScholars = 0

        scholarships.forEach(scholarship => {
            if (scholarship.status === 'Available')
            {
                noOfScholars += scholarship.scholars.length

                scholarship.scholars.forEach(scholar => 
                {
                    switch (scholar.year_level) {
                        case '1st Year': yearFreq[0]++; break;
                        case '2nd Year': yearFreq[1]++; break;
                        case '3rd Year': yearFreq[2]++; break;
                        case '4th Year': yearFreq[3]++; break;
                    }
                })
            }
        })
        
        $('.dash-sponsors-no').html(scholarships.length) 
        $('.dash-scholars-no').html(noOfScholars) 

        setDougnutChart(yearFreq)
        setLineChart() 

        
        
    

    })

    $.getJSON('/data/applicants.json', function (applicants) 
    {
        $('.dash-applicants-no').html(applicants.length) 
    })

   
    

})

$('.go-to-scholarships').on('click', function() {
    parent.postMessage({
        header: 'switch',
        data: 'scholarships'
    }, '*')
})

$('.go-to-scholars').on('click', function() {
    parent.postMessage({
        header: 'switch',
        data: 'scholars'
    }, '*')
})

$('.go-to-applicants').on('click', function() {
    parent.postMessage({
        header: 'switch',
        data: 'applicants'
    }, '*')
})