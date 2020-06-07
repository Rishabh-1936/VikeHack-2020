$(document).ready(function () {
    // Get JSON data from url
    $.getJSON("https://api.covid19india.org/data.json", function (data) {
        var states = [];
        var confirmed = [];
        var recovered = [];
        var deaths = [];
        var active = [];

        var total_active;
        var total_confirmed;
        var total_recovered;
        var total_deaths;

        // Take the first element in statewise array and add the objects values into the above variables
        total_active = data.statewise[0].active;
        total_confirmed = data.statewise[0].confirmed;
        total_recovered = data.statewise[0].recovered;
        total_deaths = data.statewise[0].deaths;

        // The each loop select a single statewise array element
        // Take the data in that array and add it to variables
        $.each(data.statewise, function (id, obj) {
            states.push(obj.state);
            confirmed.push(obj.confirmed);
            recovered.push(obj.recovered);
            deaths.push(obj.deaths);
            active.push(obj.active);
        });

        // Remove the first element in the states, confirmed, recovered, and deaths as that is the total value
        states.shift();
        confirmed.shift();
        recovered.shift();
        deaths.shift();
        active.shift();

        // console.log(confirmed);
        $("#confirmed").append(total_confirmed);
        $("#active").append(total_active);
        $("#recovered").append(total_recovered);
        $("#deaths").append(total_deaths);
        // data: {
        //     labels: ['Confirmed', 'Active', 'Recovered', 'Death'],
        //         datasets: [
        //             {
        //                 label: "Confirmed",
        //                 data: total_confirmed,
        //                 backgroundColor: "#a8ccfd",
        //                 borderColor: '#4285f4',

        //             },
        //             {
        //                 label: "Active",
        //                 data: total_active,
        //                 backgroundColor: "#f6cc69",
        //                 borderColor: '#f4b400',
        //             },
        //             {
        //                 label: "Recovered",
        //                 data: total_recovered,
        //                 backgroundColor: "#94df92",
        //                 borderColor: '#0c9d58',

        //             },
        //             {
        //                 label: "Deceased",
        //                 data: total_deaths,
        //                 backgroundColor: "#fc7f7b",
        //                 borderColor: '#db4337',
        //             },

        //         ],
        //     }


        var options = {
            responsive: true,
            title: {
                display: true,
                position: "top",
                text: "Total",
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            }
        };
        var data1 = {
            labels: ['Confirmed', 'Active', 'Recovered', 'Death'],
            datasets: [
                {
                    data: [total_confirmed, total_active, total_recovered, total_deaths],
                    backgroundColor: [
                        "#a8ccfd",
                        "#f6cc69",
                        "#94df92",
                        "#fc7f7b"
                    ],
                    borderColor: [
                        "#4285f4",
                        "#f4b400",
                        "#0c9d58",
                        "#db4337"
                    ],
                    borderWidth: [1, 1, 1, 1]
                }
            ]
        };

        var myChart = document.getElementById("covidtotal").getContext("2d");
        var chart1 = new Chart(myChart, {
            type: "doughnut",
            data: data1,
            options: options
        });

        //Chart initialization
        var myChart = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(myChart, {
            type: "line",
            data: {
                labels: states,
                datasets: [
                    {
                        label: "Confirmed Cases",
                        data: confirmed,
                        backgroundColor: "#a8ccfd",
                        borderColor: '#4285f4',
                        minBarLength: 100,
                    },
                    {
                        label: "Active",
                        data: active,
                        backgroundColor: "#f6cc69",
                        borderColor: '#f4b400',
                        minBarLength: 100,
                    },
                    {
                        label: "Recovered",
                        data: recovered,
                        backgroundColor: "#94df92",
                        borderColor: '#0c9d58',
                        minBarLength: 100,
                    },
                    {
                        label: "Deceased",
                        data: deaths,
                        backgroundColor: "#fc7f7b",
                        borderColor: '#db4337',
                        minBarLength: 100,
                    },

                ],
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    position: "top",
                    text: "State Wise Analysis",
                    fontSize: 36,
                    fontColor: "#111"
                }
            },
        });
    });
});