const express = require('express');
const path = require('path');
const https = require('https');
const querystring = require("querystring")

const app = express();
const root = path.resolve(__dirname, '..');

// Log invocations
app.use(function (req, res, next) { console.log(req.url); next(); });

// Directly serve static content from /client
app.use(express.static(root + '/client'));

// Simple REST API that returns some entities
app.get('/api/entitiesStatic', (req, res) =>
  res.send({
    entities:
      ['Q2887',
        'Q33986'
      ]
  })
);

app.get( '/api/',  );

app.get('/api/entities/:id', (req, res) => {
  console.log(`Searching ${req.params.id}`);
  /*
  const queryParams = new URLSearchParams(
    [['query', `select * where { wd:Q${req.params.id} rdfs:label $label . FILTER (lang($label) = 'es')}`],
    ['format', 'json']
    ]).toString();
  */
  const wikidataQuery =
      `SELECT ?country ?countryLabel ?image
        WHERE 
        {
          ?country wdt:P31 wd:Q6256.
          ?country wdt:P41 ?image.
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }`;

  const queryParams = new URLSearchParams(
      [['query', wikidataQuery ],
      ['format', 'json']
      ]).toString();

  const options = {
    hostname: 'query.wikidata.org',
    port: 443,
    path: `/sparql?${queryParams}`,
    method: 'GET',
    headers: { 'User-Agent': 'Example/1.0' }
  }
  https.get(options, httpres => {
    let data = [];
    console.log('Status Code:', httpres.statusCode);
    httpres.on('data', chunk => {
      data.push(chunk);
    });
    httpres.on('end', () => {

      const result = Buffer.concat(data).toString();
      //console.log(`Result obtained:\n${result}\n---`);
      const json = JSON.parse(result);
      const arr = json.results.bindings;

      /** @TODO
       * Modificar la salida para aplicar un formato especifico a cada consulta.
       * @type {*|string}
       */
      const results = formatCountriesJson(arr);
      console.log(results.bindings);

      res.send( { data: results } )

      /*
      const label = bindings.length > 0 ? bindings[0].label.value : 'Not found';
      res.send({
        entity: `${req.params.id}`,
        label: `${label}`
      })
      */
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  })
});

const getValue = (obj) => {
  return obj === undefined ? '' : obj.value;
}

const replaceUrl = (obj) => {
  const url = 'http://www.wikidata.org/entity/';
  const value = getValue(obj);
  return value.replace(url, '');
}

const formatCountriesJson = (arr) => {
  return arr.map((element) => ({
    id: replaceUrl(element.country),
    search_uri: getValue(element.country),
    icon_svg_uri: getValue(element.image),
    name: getValue(element.countryLabel),
  }))
}

module.exports = app;
