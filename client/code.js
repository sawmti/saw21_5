async function getEntities() {
    const response = await fetch('/api/entities/1');
    const data = await response.json();
    return data
}

async function getCountries() {
    const response = await fetch('/api/countries');
    const data = await response.json();
    return data
}

async function getCountryDetail() {
    const response = await fetch('/api/country/Q298');
    const data = await response.json();
    return data
}

function fillEntities() {
    getEntities().then(data => {
        console.log(data.entities);
        const ulEntities = document.getElementById("entities");
        data.entities.forEach(entity => {
          const liEntity = document.createElement("li");
          const text = document.createTextNode(entity);
          liEntity.appendChild(text);
          ulEntities.appendChild(liEntity);
        })
    })
}

function fillCountries() {
    getCountries().then(data => {
        console.log(data.entities);
        const ulEntities = document.getElementById("entities");
        data.entities.forEach(entity => {
            const liEntity = document.createElement("li");
            const text = document.createTextNode(entity);
            liEntity.appendChild(text);
            ulEntities.appendChild(liEntity);
        })
    })
}

function fillCountryDetail() {
    getCountryDetail().then(data => {
        console.log(data.entities);
        const ulEntities = document.getElementById("entities");
        data.entities.forEach(entity => {
            const liEntity = document.createElement("li");
            const text = document.createTextNode(entity);
            liEntity.appendChild(text);
            ulEntities.appendChild(liEntity);
        })
    })
}