// Data in 'data/running_workflows_data.js', imported via HTML before this runs

// Convert raw data from workflow analysis into form required by Plotly API.
var FOMARTTED_RUNNING_WORKFLOWS_DATA = {
  x: [],
  y: [],
  mode: 'Scatter',
  line: {
    color: '#00C798',
    width: 2
  }
};
for (dataPoint of rawRunningWorkflowData.data) {
  FOMARTTED_RUNNING_WORKFLOWS_DATA.x.push(dataPoint[0]);
  FOMARTTED_RUNNING_WORKFLOWS_DATA.y.push(dataPoint[1]);
}

const RUNNING_WORKFLOWS_PLOTTED =
  document.getElementById('running-workflows-plotted');

Plotly.plot(
  RUNNING_WORKFLOWS_PLOTTED,
  [FOMARTTED_RUNNING_WORKFLOWS_DATA],
  {
    paper_bgcolor: 'rgba(0,0,0,0)',  // transparent background part 1
    plot_bgcolor: 'rgba(0,0,0,0)',  // transparent background part 2
    title: 'Number of research workflows running (sampled)',
    xaxis: {
      title: 'Date (start of year marked)',
      showgrid: false,
      zeroline: false,
      rangeselector: {
        buttons: [
          {
            count: 1,
            label: 'Last 1 month',
            step: 'month',
            stepmode: 'backward'
          },
          {
            count: 6,
            label: 'Last 6 months',
            step: 'month',
            stepmode: 'backward'
          },
          {
            step: 'all',
            label: 'All data'
          }
        ]
      },
      type: 'date'
    },
    yaxis: {
      showline: false
    },
    font: {
      family: 'Trebuchet MS',  // same font as the slides
      size: 24,
      color: 'black'
    },
  },
  {
    displayModeBar: false
  }
);
