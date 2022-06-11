const wqCountryInfo =  function ( idPais ) {

    const query = `SELECT DISTINCT ?country ?countryLabel ?capitalLabel ?countryPopulation ?currencyLabel ?humanDevelopmentIndexLabel ?lifeExpectancyLabel ?languageLabel ?image
            WHERE
            {
                ?country wdt:P31 wd:Q3624078 .
                ?country wdt:P17 wd:${idPais} .
                ?country wdt:P41 ?image .
                OPTIONAL { ?country wdt:P1082 ?countryPopulation } .
                OPTIONAL { ?country wdt:P38 ?currency } .
                OPTIONAL { ?country wdt:P1081 ?humanDevelopmentIndex } .
                OPTIONAL { ?country wdt:P2250 ?lifeExpectancy } .
                OPTIONAL { ?country wdt:P37 ?language } .
                FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240 }
                FILTER NOT EXISTS {?country wdt:P31 wd:Q28171280 }
                OPTIONAL { ?country wdt:P36 ?capital } .
                SERVICE wikibase:label { bd:serviceParam wikibase:language "es" }
            }
            ORDER BY ?countryLabel
            LIMIT 1`;

    return query;
};

const wqCountry =  function () {

    const query = `SELECT DISTINCT ?country ?countryLabel ?image
    {
            ?country wdt:P31 wd:Q6256 .
            ?country wdt:P41 ?image.
            FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240} .
            FILTER NOT EXISTS {?country wdt:P31 wd:Q28171280} .
            SERVICE wikibase:label { bd:serviceParam wikibase:language "es" }
    }
    ORDER BY (?countryLabel)`;

    //console.log(query);

    return query;
};

module.exports = { wqCountry,wqCountryInfo };