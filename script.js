const fs = require('fs');
const csv = require('csv-parser');
const fetch = require('node-fetch');

// este script espera un archivo .csv con tres datos: 
// ruta - La ruta a donde se va a hacer la petición e.g: "https://abc.culqi.com/refunds"
// data - el cuerpo de la peticion eg.: "{'amount':1500, ...}"
// header - el header de Autorización para cada petición e.g.: "Bearer sk_live198719239"
fs.createReadStream('refund.csv')
    .pipe(csv())
    .on('data', async data => {
        try {
            console.log(data);

            const url = data.ruta;
            const body = data.data;
            const header = { 
                'Content-type': 'application/json',
                "Authorization":  data.header
            }

            const request = {
                method: 'post',
                body: body,
                headers: header 
            }

            const result = await fetch(url, request);

            json = await result.json();
            console.log(result.status);
            console.log(json);
        }
        catch (err) {
            console.log('error on: ');
            console.log(err);
        }
    })
    .on('end', () => {
        console.log('finished reading csv');
    });
