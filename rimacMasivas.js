const fs = require('fs');
const csv = require('csv-parser');
const fetch = require('node-fetch');

const listaSuscripciones = [];

// este script espera un archivo .csv con tres datos: 
// ruta - La ruta a donde se va a hacer la petición e.g: "https://abc.culqi.com/refunds"
// data - el cuerpo de la peticion eg.: "{'amount':1500, ...}"
// header - el header de Autorización para cada petición e.g.: "Bearer sk_live198719239"
fs.createReadStream('ANULACION-RIMAC-14-NOV.csv')
    .pipe(csv())
    .on('data', async data => {
        try {
            listaSuscripciones.push(data.sxs_rimac);
        }
        catch (err) {
            console.log('error on: ');
            console.log(err);
        }
    })
    .on('end', () => {
        console.log('finished converting to list');
    });

const url = 'https://pago.culqi.com/api/rimac/suscripciones';
const body = JSON.stringify(listaSuscripciones);
const header = {
    'Content-type': 'application/json',
    "Authorization": 'YOgYmtar+5Ke2yyjtp76SP0dom8UEIJnPqrSxq2t33A='
}

const request = {
    method: 'post',
    body: body,
    headers: header
}

const result = fetch(url, request);
result.then(x => {
    json = result.json()
    json.then(y => {
        console.log(result.status);
        console.log(json);
    });
})


