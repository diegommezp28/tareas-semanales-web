const fs = require("fs");
const http = require('http');
const url = require('url');
const axios = require('axios');

const URL_PROVEEDORES = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const URL_CLIENTES = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

const atributos_proveedores = { id: "idproveedor", contacto: "nombrecontacto", compania: "nombrecompania" }
const atributos_clientes = { id: "idCliente", contacto: "NombreContacto", compania: "NombreCompania" }

let proveedores = []
let clientes = []


const readFile = (inputUrl, callback) => {
    fs.readFile(inputUrl, (err, data) => {
        callback(data)
    })
}

axios.get(URL_PROVEEDORES)
    .then((response) => {
        proveedores = response.data;
    })

axios.get(URL_CLIENTES)
    .then((response) => {
        clientes = response.data;
    })

http
    .createServer(attend_petition)
    .listen(8081)

function attend_petition(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    const info_to_display = req.url.includes("proveedores") ? {
        datos: proveedores,
        atributos: atributos_proveedores,
        titulo: "Proveedores"
    } :
        {
            datos: clientes,
            atributos: atributos_clientes,
            titulo: "Clientes"
        };

    readFile("index.html", (data) => {
        let fileContent = data.toString()
        fileContent = fileContent.replace("{{titulo}}", info_to_display.titulo)

        let rows = ""

        for (const dato of info_to_display.datos) {
            rows +=
                `
                <tr>
                    <th scope="row">${dato[info_to_display.atributos.id]}</th>
                    <td>${dato[info_to_display.atributos.compania]}</td>
                    <td>${dato[info_to_display.atributos.contacto]}</td>
                </tr>
                `
        }

        fileContent = fileContent.replace("{{insert-rows}}", rows);

        res.end(fileContent)
    })


}