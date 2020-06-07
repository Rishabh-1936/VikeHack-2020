$(document).ready(function () {
    // Get JSON data from url
    $.getJSON("https://api.covid19india.org/data.json", function (data) {

        var dates = [];
        var confirmed = [];
        var recovered = [];
        var deaths = [];
        var active = [];

        $.each(data.cases_time_series, function (id, obj) {
            dates.push(obj.date);
            confirmed.push(obj.totalconfirmed);
            recovered.push(obj.totalrecovered);
            deaths.push(obj.totaldeceased);
            let totalactive = obj.totalconfirmed - obj.totalrecovered - obj.totaldeceased;
            active.push(totalactive);
        });

        // Chart initialization
        var myChart = document.getElementById("covidDate").getContext("2d");
        var chart = new Chart(myChart, {
            type: "line",
            data: {
                labels: dates,
                datasets: [
                    {
                        label: "Confirmed Cases",
                        data: confirmed,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: '#4285f4',
                        minBarLength: 100,
                    },
                    {
                        label: "Active",
                        data: active,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: '#f4b400',
                        minBarLength: 100,
                    },
                    {
                        label: "Recovered",
                        data: recovered,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: '#0c9d58',
                        minBarLength: 100,
                    },
                    {
                        label: "Deceased",
                        data: deaths,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
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
                    text: "Date Wise Analysis",
                    fontSize: 18,
                    fontColor: "#111"
                }
            },
        });
    });
});