// Step 1: Read in `samples.json` using the D3 library and initialize the dashboard
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let allData;

function init() {
    d3.json(url).then(function(data) {
        console.log("Data loaded successfully", data);
        allData = data;

        const selector = d3.select("#selDataset");
        allData.names.forEach((sample) => {
            selector.append("option").text(sample).property("value", sample);
        });

        const firstSample = allData.names[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

// Function to build the metadata panel
function buildMetadata(sample) {
    const metadataPanel = d3.select("#sample-metadata");
    const metadata = allData.metadata.find(obj => obj.id.toString() === sample);
    metadataPanel.html("");

    Object.entries(metadata).forEach(([key, value]) => {
        metadataPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
}

// Function to build the bar and bubble charts
function buildCharts(sample) {
    const samples = allData.samples.find(obj => obj.id === sample);
    console.log(samples);

    // Bar Chart
    const barData = [{
        x: samples.sample_values.slice(0, 10).reverse(),
        y: samples.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
        text: samples.otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: 'h',
        marker: { color: 'saddlebrown' }
    }];

    const barLayout = {
        title: 'Top 10 OTUs Found in the Individual',
        margin: { t: 30, l: 150 },
        width: window.innerWidth * 0.4
    };

    // Bubble Chart
    const bubbleData = [{
        x: samples.otu_ids,
        y: samples.sample_values,
        text: samples.otu_labels,
        mode: 'markers',
        marker: {
            size: samples.sample_values,
            color: samples.otu_ids,
            colorscale: 'Earth'
        }
    }];

    const bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        margin: { t: 50, l: 50, r: 50, b: 50 },
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' },
        width: window.innerWidth * 0.5,
    };

    if (window.barChartExists) {
        Plotly.restyle('bar', 'x', [barData[0].x]);
        Plotly.restyle('bar', 'y', [barData[0].y]);
        Plotly.restyle('bubble', 'x', [bubbleData[0].x]);
        Plotly.restyle('bubble', 'y', [bubbleData[0].y]);
        Plotly.restyle('bubble', 'marker.size', [bubbleData[0].marker.size]);
        Plotly.restyle('bubble', 'marker.color', [bubbleData[0].marker.color]);
    } else {
        Plotly.newPlot('bar', barData, barLayout);
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
        window.barChartExists = true; // Set the flag to true after first render
    }
}

// Function to handle the change event when a new sample is selected
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Call the initialization function to load the dashboard
init();
