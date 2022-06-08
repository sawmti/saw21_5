const express = require('express');
const path = require('path');
const https = require('https');
const querystring = require("querystring")

const { wqCountry,wqCountryInfo } = require("./wikidata/wikiQuery");
const { wikiCall,formatCountries,formatCountryDetail } = require("./wikidata/wikiUtil");
//const { connection } = require("./db/mysql-util.txt");
MariaDBConnector = require('./db/mariadb-util');

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

app.get('/api/entities2/:id', (req, res) => {

  const resultado =  wikiCall( wqCountry(),1 ).then( wikiLst => {
    console.log( wikiLst.entities );
    /*const ulEntities = document.getElementById("entities");
    data.entities.forEach(entity => {
    const liEntity = document.createElement("li");
    const text = document.createTextNode(entity);
    liEntity.appendChild(text);
    ulEntities.appendChild(liEntity);*/
  })
  console.log( "resultado1:"+ resultado );
  res.send( { data: resultado } );
});

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
      console.log('Api Database Select');
      try {
        const responseDb = await MariaDBConnector.getDbCountries( );

        console.log( responseDb );
        res.send( { data: responseDb } );

      }
      catch (e){
        console.log(e);
          res.send(e);
      }

    /* console.log('Rows:'  + rows);
    const result = Buffer.concat(rows).toString();
    const json = JSON.parse(result);
    const arr = json.results.bindings;
    const results = formatCountries(arr);
    res.send( { data: results } )*/
});

module.exports = app;
