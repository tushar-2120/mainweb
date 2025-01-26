window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        // title: {
        //     text: "Production Details"
        // },
        // axisY: {
        //     title: "Reserves(MMbbl)"
        // },
        data: [{
            type: "column",
            // showInLegend: true,
            // legendMarkerColor: "grey",
            // legendText: "MMbbl = one million barrels",
            color: "darkblue",
            dataPoints: [
                { y: 2603, label: "January" },
                { y: 1500, label: "February" },
                { y: 2090, label: "March" },
                { y: 1709, label: "April" },
                { y: 2620, label: "May" },
                { y: 2110, label: "June" },
                { y: 1200, label: "July" },
                { y: 1530, label: "August" }
            ]
        }]
    });
    chart.render();

}