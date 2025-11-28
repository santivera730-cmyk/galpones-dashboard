// -------------------------------------
// CONFIG PARA DATOS REALES DESDE INTERNET
// -------------------------------------

const URL_API = "https://tu-servidor.com/datos-galpon"; 
// Debe devolver un JSON así:
// { produccion: [...], postura: 82, recomendaciones: [...], ... }

// Si no tenés servidor todavía, usa los datos locales:
let usarDatosDePrueba = true;



// -------------------------------------
// DATOS PREDETERMINADOS (SIMULADOS)
// -------------------------------------
const datosLocales = {
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



// -------------------------------------
// GESTIÓN DE GRÁFICOS
// -------------------------------------

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



// -------------------------------------
// ACTUALIZAR DASHBOARD
// -------------------------------------
async function cargarDatosReales(id) {
    try {
        let resp = await fetch(`${URL_API}?galpon=${id}`);
        let data = await resp.json();
        usarDatosDePrueba = false;
        return data;
    } catch {
        console.warn("No se pudo conectar al servidor. Usando datos locales.");
        usarDatosDePrueba = true;
        return datosLocales[id];
    }
}


async function actualizarDashboard(id) {
    let d = usarDatosDePrueba ? datosLocales[id] : await cargarDatosReales(id);

    crearGrafico("produccion", produccionDiaria.getContext("2d"), "Huevos", d.produccion);
    crearGrafico("postura", graficoPostura.getContext("2d"), "Postura", [d.postura]);
    crearGrafico("proyeccion", proyeccion.getContext("2d"), "Proyección", d.proyeccion);
    crearGrafico("temperatura", temperaturaGrafico.getContext("2d"), "°C", d.temperatura);
    crearGrafico("humedad", humedadGrafico.getContext("2d"), "% Humedad", d.humedad);
    crearGrafico("mortalidad", mortalidadGrafico.getContext("2d"), "Muertes", d.mortalidad);
    crearGrafico("alimento", alimentoGrafico.getContext("2d"), "kg alimento", d.alimento);

    posturaNumero.innerText = d.postura + "%";

    listaRecomendaciones.innerHTML = "";
    d.recomendaciones.forEach(r => {
        listaRecomendaciones.innerHTML += `<li>⚠ ${r}</li>`;
    });
}



// -------------------------------------
// EVENTOS
// -------------------------------------
document.querySelectorAll(".btn-galpon").forEach(btn => {
    btn.addEventListener("click", () => {
        let id = btn.dataset.id;
        actualizarDashboard(id);
    });
});


// -------------------------------------
// INICIO
// -------------------------------------
actualizarDashboard(1);
