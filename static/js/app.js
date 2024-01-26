// Step 1: Read in `samples.json` using the D3 library
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data){
    // Console log to check data is loaded
    console.log("Data loaded successfully", data);  // Check the fetched data


    // Step 2: Populate the dropdown menu
    const selector = d3.select("#selDataset");
    data.names.forEach((sample) => {
        selector.append("option").text(sample).property("value", sample);
    });

    // Initialize the dashboard with the first sample
    const firstSample = data.names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
});

// Function to build the metadata panel
function buildMetadata(sample) {
    // Select the metadata panel
    const metadataPanel = d3.select("#sample-metadata");

    // Filter the metadata for the selected sample
    d3.json(url).then(data => {
        const metadata = data.metadata.filter(obj => obj.id == sample)[0];
        metadataPanel.html("");  // Clear any existing metadata

        // Add each key-value pair to the panel
        Object.entries(metadata).forEach(([key, value]) => {
            metadataPanel.append("h6").text(`${key}: ${value}`);
        });

        console.log("Metadata", metadata); // Console log to check the metadata
    });
}

// Function to build the bar and bubble charts
function buildCharts(sample) {
    // Filter the samples for the selected sample
    d3.json(url).then(data => {
        const samples = data.samples.filter(obj => obj.id == sample)[0];

        // Bar Chart
        const barData = [{
            x: samples.sample_values.slice(0, 10).reverse(),
            y: samples.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: samples.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];

        const barLayout = {
            title: 'Top 10 OTUs Found in the Individual',
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot('bar', barData, barLayout);
        console.log("Bar chart data", barData); // Console log to check the bar chart data

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
            margin: { t: 0 },
            hovermode: 'closest',
            xaxis: { title: 'OTU ID' }
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
        console.log("Bubble chart data", bubbleData); // Console log to check the bubble chart data
    });
}

// Function to handle the change event when a new sample is selected
function optionChanged(newSample) {
    // Update the charts and metadata with the new sample
    buildCharts(newSample);
    buildMetadata(newSample);
}
