const express = require('express');
const path = require('path');
const https = require('https');
const querystring = require("querystring")

const { wqCountry,wqCountryInfo } = require("./wikidata/wikiQuery");
const { wikiCall,formatCountries,formatCountryDetail } = require("./wikidata/wikiUtil");

MariaDBConnector = require('./db/mariadb-util');

const app = express();
const root = path.resolve(__dirname, '..');

app.use(function (req, res, next) { console.log(req.url); next(); });

app.use(express.static(root + '/client'));

app.get('/api/entitiesStatic', (req, res) =>
  res.send({
    entities:
      ['Q2887',
        'Q33986'
      ]
  })
);

app.get('/api/country/:id', (req, res) => {

  console.log( "Parametro URL:"+req.params.id);
  const queryParams = new URLSearchParams(
      [['query', wqCountryInfo( req.params.id ) ],
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
      const json = JSON.parse(result);
      const arr = json.results.bindings;
      const results = formatCountryDetail(arr);
      res.send( { data: results } )
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  })
});

app.get('/api/countries', (req, res) => {

  const queryParams = new URLSearchParams(
      [['query', wqCountry() ],
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
      const json = JSON.parse(result);
      const arr = json.results.bindings;
      const results = formatCountries(arr);

      res.send( { data: results } )
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  })
});

app.get('/api/databaseCountries', async (req, res) => {

  console.log('Api - databaseCountries');
  let results = await MariaDBConnector.countriesListDb();
  console.log('Result: ' + results)
  res.send( { data: results } )
});

app.post('/api/insertCountry', async (req, res) => {

  console.log('Api - selectedCountries');
  let result = await MariaDBConnector.insCountry( "" );
  console.log(result)
  //res.send( result );
  //res.send( { data: result } );

});

module.exports = app;
