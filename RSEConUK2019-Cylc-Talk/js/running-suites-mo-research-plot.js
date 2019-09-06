// Data in 'data/running_workflows_data.js', imported via HTML before this runs

// Convert raw data from suite analysis into form required by Plotly API.
var FOMARTTED_RUNNING_SUITES_DATA = {
  x: [],
  y: [],
  mode: 'Scatter',
  line: {
    color: '#00C798',
    width: 2
  }
};
for (dataPoint of rawRunningWorkflowData.data) {
  FOMARTTED_RUNNING_SUITES_DATA.x.push(dataPoint[0]);
  FOMARTTED_RUNNING_SUITES_DATA.y.push(dataPoint[1]);
}

RUNNING_SUITES_PLOTTED = document.getElementById('running-suites-plotted');
Plotly.plot(
  RUNNING_SUITES_PLOTTED,
  [FOMARTTED_RUNNING_SUITES_DATA],
  {
    paper_bgcolor: 'rgba(0,0,0,0)',  // transparent background part. 1
    plot_bgcolor: 'rgba(0,0,0,0)',  // transparent background part. 2
    title: 'Number of research suites running (sampled)',
    xaxis: {
      title: 'Date (start of year marked)',
      showgrid: false,
      zeroline: false,
      rangeselector: {
        buttons: [
          {
            count: 1,
            label: '1m',
            step: 'month',
            stepmode: 'backward'
          },
          {
            count: 6,
            label: '6m',
            step: 'month',
            stepmode: 'backward'
          },
          {step: 'all'}
        ]
      },
      type: 'date'
    },
    yaxis: {
      showline: false
    },
    font: {
      family: 'Trebuchet MS',
      size: 24,
      color: 'black'
    },
  },
  {
    displayModeBar: false
  }
);
