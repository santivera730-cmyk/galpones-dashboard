//---------------------------------------------------------
//  DATOS SIMULADOS (SE PUEDEN REEMPLAZAR CON JSON REAL)
//---------------------------------------------------------
let datosGalpones = {
    1: {
        produccion: [300, 340, 320, 360, 380, 420, 410],
        postura: 83,
        recomendaciones: ["Revisar proteína del alimento", "Mejorar ventilación"],
        proyeccion: [280, 300, 320, 340, 360],
        temperatura: [22, 24, 23, 25, 26, 27],
        humedad: [55, 58, 60, 65, 62],
        mortalidad: [1, 0, 2, 1, 0],
        alimento: [120, 122, 130, 128, 135]
    },
    2: {
        produccion: [280, 300, 310, 330, 340, 350, 360],
        postura: 79,
        recomendaciones: ["Revisar limpieza", "Ajustar densidad"],
        proyeccion: [260, 280, 300, 310, 330],
        temperatura: [23, 26, 27, 28, 29],
        humedad: [50, 52, 54, 58, 60],
        mortalidad: [2, 1, 1, 2, 1],
        alimento: [110, 115, 118, 120, 122]
    },
    3: {
        produccion: [310, 330, 340, 350, 370, 390, 410],
        postura: 88,
        recomendaciones: ["Controlar agua", "Verificar nidos"],
        proyeccion: [300, 320, 340, 360, 380],
        temperatura: [21, 22, 23, 24, 25],
        humedad: [60, 62, 64, 66, 68],
        mortalidad: [0, 1, 0, 1, 1],
        alimento: [130, 132, 134, 140, 145]
    },
    4: {
        produccion: [260, 280, 300, 320, 330, 340, 350],
        postura: 75,
        recomendaciones: ["Ajustar iluminación"],
        proyeccion: [240, 260, 280, 300, 320],
        temperatura: [25, 27, 28, 29, 30],
        humedad: [52, 55, 56, 58, 60],
        mortalidad: [3, 2, 1, 2, 3],
        alimento: [100, 105, 110, 115, 118]
    }
};


//---------------------------------------------------------
//  CHARTS
//---------------------------------------------------------
let charts = {};

function crearGrafico(nombre, id, label, datos) {
    const ctx = document.getElementById(id).getContext("2d");

    if (charts[nombre]) charts[nombre].destroy();

    charts[nombre] = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
            datasets: [{
                label: label,
                data: datos,
                borderWidth: 2,
                borderColor: "#4a8bff",
                backgroundColor: "rgba(74,139,255,0.25)"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function actualizarDashboard(id) {
    const d = datosGalpones[id];

    crearGrafico("prod", "produccionDiaria", "Huevos por día", d.produccion);
    crearGrafico("post", "graficoPostura", "Postura", [d.postura]);
    crearGrafico("proj", "proyeccion", "Proyección", d.proyeccion);
    crearGrafico("temp", "temperaturaGrafico", "Temperatura °C", d.temperatura);
    crearGrafico("hum", "humedadGrafico", "Humedad %", d.humedad);
    crearGrafico("mort", "mortalidadGrafico", "Mortalidad", d.mortalidad);
    crearGrafico("alim", "alimentoGrafico", "Alimento (kg)", d.alimento);

    document.getElementById("posturaNumero").innerText = d.postura + "%";

    let rec = document.getElementById("listaRecomendaciones");
    rec.innerHTML = "";
    d.recomendaciones.forEach(r => rec.innerHTML += `<li>⚠ ${r}</li>`);
}

// Cambiar galpón
document.getElementById("selector-galpon").addEventListener("change", e => {
    actualizarDashboard(e.target.value);
});

// Sidebar
document.querySelectorAll(".sidebar button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
        document.getElementById(btn.dataset.section).style.display = "block";
    });
});

// Inicializar
actualizarDashboard(1);
