// DATOS SIMULADOS POR GALPÓN
const datosGalpones = {
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

// CANVAS REFERENCIAS
let ctxProd = document.getElementById("produccionDiaria").getContext("2d");
let ctxPostura = document.getElementById("graficoPostura").getContext("2d");
let ctxProj = document.getElementById("proyeccion").getContext("2d");
let ctxTemp = document.getElementById("temperaturaGrafico").getContext("2d");
let ctxHum = document.getElementById("humedadGrafico").getContext("2d");
let ctxMort = document.getElementById("mortalidadGrafico").getContext("2d");
let ctxAlim = document.getElementById("alimentoGrafico").getContext("2d");

// GRÁFICOS (INICIALIZACIÓN)
let charts = {};

function crearGrafico(nombre, ctx, label, datos) {
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
                backgroundColor: "rgba(74,139,255,0.2)"
            }]
        }
    });
}

function actualizarDashboard(id) {
    let d = datosGalpones[id];

    crearGrafico("produccion", ctxProd, "Huevos", d.produccion);
    crearGrafico("postura", ctxPostura, "Postura", [d.postura]);
    crearGrafico("proyeccion", ctxProj, "Proyección", d.proyeccion);
    crearGrafico("temperatura", ctxTemp, "Temperatura °C", d.temperatura);
    crearGrafico("humedad", ctxHum, "Humedad %", d.humedad);
    crearGrafico("mortalidad", ctxMort, "Muertes", d.mortalidad);
    crearGrafico("alimento", ctxAlim, "kg comida", d.alimento);

    document.getElementById("posturaNumero").innerText = d.postura + "%";

    let rec = document.getElementById("listaRecomendaciones");
    rec.innerHTML = "";
    d.recomendaciones.forEach(r => {
        rec.innerHTML += `<li>⚠ ${r}</li>`;
    });
}

// CAMBIO DE GALPÓN
document.getElementById("selector-galpon").addEventListener("change", (e) => {
    actualizarDashboard(e.target.value);
});
//---------------------------------------------------------
//  DATOS CARGADOS LOCALMENTE (DEFAULT SI NO HAY SERVIDOR)
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
//  SEGURO PARA QUE EL SIDEBAR SIEMPRE QUEDE CLICKEABLE
//---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) sidebar.style.zIndex = "9999";
});


//---------------------------------------------------------
//  CANVAS Y CHARTS
//---------------------------------------------------------
let charts = {};

function crearGrafico(nombre, ctxId, label, datos) {
    const ctx = document.getElementById(ctxId).getContext("2d");

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


//---------------------------------------------------------
//  ACTUALIZACIÓN TOTAL DEL DASHBOARD
//---------------------------------------------------------
function actualizarDashboard(id) {
    const d = datosGalpones[id];

    // Gráficos
    crearGrafico("prod", "produccionDiaria", "Huevos por día", d.produccion);
    crearGrafico("post", "graficoPostura", "Postura (%)", [d.postura]);
    crearGrafico("proj", "proyeccion", "Proyección semanal", d.proyeccion);
    crearGrafico("temp", "temperaturaGrafico", "Temperatura °C", d.temperatura);
    crearGrafico("hum", "humedadGrafico", "Humedad %", d.humedad);
    crearGrafico("mort", "mortalidadGrafico", "Mortalidad", d.mortalidad);
    crearGrafico("alim", "alimentoGrafico", "Alimento (kg)", d.alimento);

    // Texto
    document.getElementById("posturaNumero").innerText = d.postura + "%";

    // Recomendaciones
    const rec = document.getElementById("listaRecomendaciones");
    rec.innerHTML = "";
    d.recomendaciones.forEach(r => {
        rec.innerHTML += `<li>⚠ ${r}</li>`;
    });
}


//---------------------------------------------------------
//  SELECTOR DE GALPÓN
//---------------------------------------------------------
document.getElementById("selector-galpon").addEventListener("change", e => {
    actualizarDashboard(e.target.value);
});


//---------------------------------------------------------
//  SIDEBAR: hacer clic en botones y cambiar secciones
//---------------------------------------------------------
document.querySelectorAll(".sidebar button").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.section;

        document.querySelectorAll(".section").forEach(sec => {
            sec.style.display = "none";
        });

        document.getElementById(target).style.display = "block";
    });
});


//---------------------------------------------------------
//  FUNCIÓN PARA CARGAR DATOS REALES DESDE INTERNET
//---------------------------------------------------------
async function cargarDatosDesdeWeb(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        // El JSON debe tener el MISMO FORMATO que datosGalpones
        datosGalpones = data;

        // Recargar panel actual
        actualizarDashboard(1);

        console.log("Datos reales cargados correctamente.");
    } catch (error) {
        console.error("Error al cargar datos desde web:", error);
    }
}


//---------------------------------------------------------
//  INICIALIZACIÓN
//---------------------------------------------------------
actualizarDashboard(1);

// CARGA INICIAL
actualizarDashboard(1);
