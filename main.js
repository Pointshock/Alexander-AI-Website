// Import the Chart.js library
import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";

// Function to get the stock prediction data from the API
async function getData(url) {
    // Get the data from the API
    url = "https://restapialex.herokuapp.com/api";
    let response = await fetch(url);
    let data = await response.json();
    console.log("The API data is: ", data);
    console.log("The day 1 data is: ", data.day1.open);
    return data;
}

// Function to get the sentiment data from the API
async function getSentimentData(url) {
    // Get the data from the API
    url = "https://restapisenti.herokuapp.com/sentiment";
    let response = await fetch(url);
    let sData = await response.json();
    console.log("The sentiment data is: ", sData);

    // Assign the sentiment number to a more readable variable
    let sentiment = sData.sentiment;

    // Assign the sentiment value to the sentiment element
    if (sentiment == 0) {
        document.getElementById("sentiment").innerHTML = " neutral";
    } else if (sentiment > 0 && sentiment < 0.5) {
        document.getElementById("sentiment").innerHTML = " positive";
    } else if (sentiment > 0.5) {
        document.getElementById("sentiment").innerHTML = " very positive";
    } else if (sentiment < 0 && sentiment > -0.5) {
        document.getElementById("sentiment").innerHTML = " negative";
    } else if (sentiment < -0.5) {
        document.getElementById("sentiment").innerHTML = " very negative";
    }

    return sData;
}

// Function to create the chart
async function createChart(url) {
    // Get the data from the API
    url = "https://restapialex.herokuapp.com/api";
    let response = await fetch(url);
    let data = await response.json();
    console.log("The API data is: ", data);
    console.log("The day 1 data is: ", data.day1.open);

    // Assign the x-axis values to a variable in the array
    var xValues = ["day 1", "day 2", "day 3", "day 4", "day 5"];

    // Assign the stock prices to a variable in the array
    var yValues = [
        data.day1.open,
        data.day2.open,
        data.day3.open,
        data.day4.open,
        data.day5.open
    ];

    console.log("The yValues are: ", yValues);

    // Loop through the data values to find the highest and lowest values
    var maxY = yValues[0];
    var minY = yValues[0];
    for (var i = 1; i < yValues.length; i++) {
        if (yValues[i] > maxY) {
            maxY = yValues[i];
        }
        if (yValues[i] < minY) {
            minY = yValues[i];
        }
    }
    // Round the values to the nearest whole number
    maxY = Math.round(maxY);
    minY = Math.round(minY);

    // Round the values to the nearest even number
    if (maxY % 2 != 0) {
        maxY = maxY + 1;
    }
    if (minY % 2 != 0) {
        minY = minY - 1;
    }
    

    // Create a new chart with the data
    new Chart(document.getElementById("myChart"), {
        // Set the chart type to line
        type: "line",
        // Set the data for the chart
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: minY-4, max: maxY+4 } }],
            }
        }
    });
}

// Initialize the chart on page load
window.addEventListener('load', createChart);

// Initialize the sentiment data on page load
window.addEventListener('load', getSentimentData);