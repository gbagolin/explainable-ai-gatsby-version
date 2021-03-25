const OPTIONS = {
  tooltips: {
    titleFontSize: 16,
    bodyFontSize: 14
  },
  legend: {
    display: false
  },
  scales: {

    xAxes: [{
      stacked: true,
      ticks: {
        fontSize: 16
      },
      scaleLabel: {
        display: true,
        labelString: "State",
        fontColor: "black",
        fontSize: 16
      }
    }
    ],
    yAxes: [{
      stacked: true,
      ticks: {
        max: 1,
        min: 0,
        stepSize: 0.1,
        fontSize: 16
      },
      scaleLabel: {
        display: true,
        labelString: "Belief",
        fontColor: "black",
        fontSize: 16
      }
    }]
  }
}

export default OPTIONS
