


const wikidataQuery =
    `SELECT ?country ?countryLabel ?image
        WHERE 
        {
          ?country wdt:P31 wd:Q6256.
          ?country wdt:P41 ?image.
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }`;