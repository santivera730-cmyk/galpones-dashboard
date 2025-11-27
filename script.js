const galpones = {
    1: { temp: 26, humedad: 55, mortandad: 2, consumo: 120 },
    2: { temp: 24, humedad: 60, mortandad: 1, consumo: 130 },
    3: { temp: 25, humedad: 52, mortandad: 3, consumo: 140 },
    4: { temp: 27, humedad: 58, mortandad: 0, consumo: 150 }
};

let chart = null;

function selectGalpon(num) {
    document.getElementById("titulo-galpon").innerText = `Galpón ${num}`;
    document.getElementById("temp").innerText = galpones[num].temp + " °C";
    document.getElementById("humedad").innerText = galpones[num].humedad + " %";
    document.getElementById("mortandad").innerText = galpones[num].mortandad + " aves";
    document.getElementById("consumo").innerText = galpones[num].consumo + " kg";

    updateChart(num);
}

function updateChart(num) {
    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Día 1", "Día 2", "Día 3", "Día 4", "Día 5"],
            datasets: [
                {
                    label: "Temperatura",
                    data: [
                        galpones[num].temp - 2,
                        galpones[num].temp,
                        galpones[num].temp + 1,
                        galpones[num].temp - 1,
                        galpones[num].temp
                    ],
                    borderColor: "red",
                    borderWidth: 2
                }
            ]
        }
    });
}

selectGalpon(1);
