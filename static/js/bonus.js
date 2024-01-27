// Function to build a gauge chart
function buildGaugeChart(wfreq) {
    var data = [
        {
          type: "indicator",
          mode: "gauge+number",
          value: wfreq,
          title: { text: "Belly Button Washing Frequency<br>Scrubs per Week", font: { size: 24 } },
          gauge: {
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue", nticks: 10 },
            bar: { color: "darkred" }, // Needle color
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 1], color: "rgba(232, 226, 202, .5)" },
              { range: [1, 2], color: "rgba(210, 206, 145, .5)" },
              { range: [2, 3], color: "rgba(202, 209, 95, .5)" },
              { range: [3, 4], color: "rgba(170, 202, 42, .5)" },
              { range: [4, 5], color: "rgba(110, 154, 22, .5)" },
              { range: [5, 6], color: "rgba(14, 127, 0, .5)" },
              { range: [6, 7], color: "rgba(10, 120, 22, .5)" },
              { range: [7, 8], color: "rgba(0, 105, 11, .5)" },
              { range: [8, 9], color: "rgba(0, 90, 0, .5)" }
            ],
          }
        }
      ];
  
      var layout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        font: { color: "darkblue", family: "Arial" }
      };
  
      Plotly.newPlot('gauge', data, layout);
    }