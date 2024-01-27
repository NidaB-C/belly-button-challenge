// Function to build a gauge chart
function buildGaugeChart(wfreq) {
    // Calculate the angle for the gauge needle
    const degrees = 180 - (wfreq / 9 * 180);
    const radius = 0.5;
    const radians = degrees * Math.PI / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
  
    // Path for the needle triangle
    const mainPath = 'M .5 .5 L ';
    const pathX = String(0.5 + x);
    const pathY = String(0.5 - y);
    const pathEnd = ' Z';
    const path = mainPath.concat(pathX, ' ', pathY, pathEnd);
  
    const data = [
      // Needle (triangle)
      {
        type: 'scatter',
        x: [0.5], // Point at the center
        y: [0.5], // Point at the center
        marker: {size: 14, color: '850000'},
        showlegend: false,
        name: 'frequency',
        text: wfreq,
        hoverinfo: 'text+name'
      },
      // Gauge (pie chart)
      {
        values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        textinfo: 'text',
        textposition: 'inside',
        marker: {
          colors: [
            'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
            'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
            'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
            'rgba(244, 241, 229, .5)', 'rgba(248, 243, 236, .5)',
            'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)'
          ]
        },
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
      }
    ];
  
    const layout = {
      shapes: [{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
      title: 'Belly Button Washing Frequency',
      height: 500,
      width: 500,
      xaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      },
      yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      }
    };
  
    Plotly.newPlot('gauge', data, layout);
  }

  