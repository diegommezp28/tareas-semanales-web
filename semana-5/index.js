const URL = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

function getRequest(url) {
    let promise = new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response)
            }
            else {
                reject(req.statusText)
            }
        }
        req.send();
    })
    return promise;
}

getRequest(URL).then(response => {

    response = JSON.parse(response);
    tableSquirrel(response);
    tableCorrelation(response);
})


function tableSquirrel(response) {

    let nodoEventos = document.getElementById("body-events");
    let contador = 0;

    for (const dato of response) {
        contador += 1;
        let row = document.createElement("TR");
        let indexRow = document.createElement("th");
        indexRow.setAttribute("scope", "col");
        indexRow.appendChild(document.createTextNode(contador));
        let eventos = document.createElement("td");
        let squirrel = document.createElement("td");
        let datosEvento = ""
        for (const event of dato.events) {
            datosEvento += event + " , ";
        }
        eventos.appendChild(document.createTextNode(datosEvento));
        squirrel.appendChild(document.createTextNode(dato.squirrel));
        if (dato.squirrel) {
            row.setAttribute("class", "bg-pink");
        }
        row.appendChild(indexRow);
        row.appendChild(eventos);
        row.appendChild(squirrel);
        nodoEventos.appendChild(row);
    }


}

function tableCorrelation(response) {
    let nodoCorrelation = document.getElementById("body-correlation");
    let contador = 0;

    let totalPositivos = 0;
    let totalNegativos = 0;

    let correlaciones = {};

    //Calcular el total de TP y FP para cada evento.    
    for (const dato of response) {
        totalPositivos += dato.squirrel;
        totalNegativos += !dato.squirrel;
        for (const event of dato.events) {
            let datoPrevio = correlaciones[event] ? correlaciones[event] : {};
            if (dato.squirrel) {//True positive 
                datoPrevio.TP = datoPrevio.TP ? datoPrevio.TP + 1 : 1;
            }
            else {//False Positive
                datoPrevio.FP = datoPrevio.FP ? datoPrevio.FP + 1 : 1;
            }
            correlaciones[event] = datoPrevio;
        }
    }

    let correlacionesArray = []

    //Pasar de objetos a arreglo
    for (const event of Object.keys(correlaciones)) {
        let valorCorrelacionEvento = calcularCorrelacion(correlaciones[event], totalPositivos, totalNegativos);
        correlacionesArray.push([event, valorCorrelacionEvento]);
    }

    //Ordenar arreglo por la correlación
    correlacionesArray.sort((a,b)=>{
        return  b[1] - a[1];
    })

    //Crear las filas en la tabla con el arreglo ordenado
    for (const item of correlacionesArray) {
        contador += 1;
        let event = item[0];
        let valorCorrelacionEvento = item[1];


        let row = document.createElement("TR");

        let indexRow = document.createElement("th");
        indexRow.setAttribute("scope", "col");
        indexRow.appendChild(document.createTextNode(contador));

        let evento = document.createElement("td");
        let correlacionElement = document.createElement("td");
        evento.appendChild(document.createTextNode(event));
        correlacionElement.appendChild(document.createTextNode(valorCorrelacionEvento));

        row.appendChild(indexRow);
        row.appendChild(evento);
        row.appendChild(correlacionElement);

        nodoCorrelation.appendChild(row);

    }


}

function calcularCorrelacion(event, totalPositivos, totalNegativos) {
    const TP = event.TP ? event.TP : 0;
    const FP = event.FP ? event.FP : 0;
    const TN = totalNegativos - FP;
    const FN = totalPositivos - TP;

    const numerador = TP * TN - FP * FN;
    const denominador = Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
    return numerador / denominador;
}
