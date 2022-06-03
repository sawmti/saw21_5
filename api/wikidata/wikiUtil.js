const https = require("https");

const getValue = (obj) => {
    return obj === undefined ? '' : obj.value;
}

const replaceUrl = (obj) => {
    const url = 'http://www.wikidata.org/entity/';
    const value = getValue(obj);
    return value.replace(url, '');
}

const formatCountries = (arr) => {
    return arr.map((element) => ({
        id: replaceUrl(element.country),
        search_uri: getValue(element.country),
        icon_svg_uri: getValue(element.image),
        name: getValue(element.countryLabel),
    }))
}

const formatCountryDetail = (arr) => {

    console.log("formatCountryDetail");

    return arr.map((element) => ({
        id: replaceUrl(element.country),
        search_uri: getValue(element.country),
        icon_svg_uri: getValue(element.image),
        name: getValue(element.countryLabel),
        capital: getValue( element.capitalLabel ),
        countryPopulation: getValue( element.countryPopulation ),
        currency: getValue( element.currencyLabel ),
        humanDevelopmentIndex: getValue( element.humanDevelopmentIndexLabel ),
        lifeExpectancy: getValue( element.lifeExpectancyLabel ),
        languageL: getValue( element.languageLabel ),
    }))
}

const formatter = (arr,sw) => {

    // sw = 1; "countries"
    // sw = 2; "countryDetail"
    var arrMapped = null;
    switch( sw ) {
        case 1:
            arrMapped = formatCountries( arr );
            break;
        case 2:
            arrMapped = formatCountryDetail( arr );
            break;
        /*default:
         code block*/
    }

    return arrMapped;
}

const wikiCall = async ( query, formatRequired ) => {

    const wikiLst = await wikiCallPromise( query, formatRequired );
    return wikiLst;
}

const wikiCallPromise = ( query, formatRequired ) => {

        //let results = [];
    const promise = new Promise((resolve, reject) => {
        const queryParams = new URLSearchParams(
            [
                ['query', query],
                ['format', 'json']
            ]).toString();

        const options = {
            hostname: 'query.wikidata.org',
            port: 443,
            path: `/sparql?${queryParams}`,
            method: 'GET',
            headers: {
                'User-Agent': 'Example/1.0'
            }
        }
        https.get(options, httpres => {
            let data = [];
            console.log('Status Code:', httpres.statusCode);
            httpres.on('data', chunk => {
                data.push(chunk);
            });
            httpres.on('end', () => {
                console.log('Response ended:');
                const result = Buffer.concat(data).toString();
                const json = JSON.parse(result);
                const results = formatter(json.results.bindings,formatRequired);
                console.log("Resultados00: " + results );
                resolve( results )
            });
        }).on('error', err => {
            console.log('Error: ', err.message);
            reject(err);
        });
    });
    //return promise;
    //console.log( "Resultados0" + results );
    //return results;
}

module.exports = { wikiCall,formatCountries,formatCountryDetail }