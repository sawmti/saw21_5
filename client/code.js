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

async function getWikidataCountries() {

    try{
        var contentTable = "<table><tr><td>#</td><td>Bandera</td><td>Nombre de Pais</td><td>URL Wikidata</td><td>Acciones<td></tr>";
        var obj  = await fetch('/api/countries');
        var objtoshow = await obj.json();
        if( objtoshow != null && objtoshow.data.length > 0 ){

            for (const object of objtoshow.data ){
                contentTable += `<tr itemscope itemtype="https://schema.org/Country">
                    <td>${object.id}</td>
                    <input id="id${object.id}" value="${object.id}" type="hidden">
                    <td itemprop="name"><img itemprop="url" style=" max-width:50px;" src=${object.icon_svg_uri}></td>
                    <input id="icon_svg_uri${object.id}" value="${object.icon_svg_uri}" type="hidden">
                    <td itemprop="containedInPlace"> ${object.name} </td>
                    <input id="name${object.id}" value="${object.name}" type="hidden">
                    <td itemprop="keywords"> ${object.search_uri} </td>
                     <input id="search_uri${object.id}" value="${object.search_uri}" type="hidden">
                    <td><i class="fas fa-glasses" href="#three" onclick="viewWikidataCountryDetail('${object.id}')" style="	cursor: pointer !important;" title="Detalle"></i> &nbsp; &nbsp; &nbsp; 
                        <i class="fas fa-hdd" onclick="saveEntity('${object.id}')"style="	cursor: pointer !important;" title="Guardar"></i>
                    </td>
                </tr>`;
            }

            contentTable +="</table>"
            document.getElementById('wikidataTable').style.display = '';
            document.getElementById('wikidataTableNoData').style.display = 'none';
            $('#wikidataTable').append(contentTable);

        }
        else{
            document.getElementById('wikidataTable').style.display = 'none';
            document.getElementById('wikidataTableNoData').style.display = '';
        }

    }catch(error){
        console.log("Ha ocurrido un error: " +  error);
    }
}

async function getDatabaseCountries() {
    try{
        var contentTable = "<table><tr><td>#</td><td>Bandera</td><td>Nombre de Pais</td><td>URL Wikidata</td><td>Acciones<td></tr>";
        var obj  = await fetch('/api/databaseCountries');
        var objtoshow = await obj.json();
        if( objtoshow != null && objtoshow.data.length > 0 ){
            for (const object of objtoshow.data ){
                contentTable += `<tr itemscope itemtype="https://schema.org/Country">
                    <td> ${object.id} </td>
                    <td itemprop="name"><img itemprop="url" style=" max-width:50px;" src=${object.flagUrl}></td>
                    <td itemprop="containedInPlace"> ${object.name} </td>
                    <td itemprop="keywords"> ${object.wikidataUrl} </td>
                    <td><i class="fas fa-edit" href="#buscar" onclick="viewWikidataCountryDetail('${object._id}')" style="	cursor: pointer !important;" title="Editar"></i> &nbsp; &nbsp; &nbsp; 
                        <i class="fas fa-trash" onclick="deleteEntity('${object.id}')"style="	cursor: pointer !important;" title="Eliminar"></i>
                    </td>
                </tr>`;
            }

            contentTable +="</table>"
            document.getElementById('databaseTable').style.display = '';
            document.getElementById('databaseTableNoData').style.display = 'none';
            $('#databaseTable').append(contentTable);

        }
        else{
            document.getElementById('databaseTable').style.display = 'none';
            document.getElementById('databaseTableNoData').style.display = '';
        }

    }catch(error){
        console.log("Ha ocurrido un error: " +  error);
    }
}

async function viewWikidataCountryDetail( countryId ){

    console.log('viewWikidataCountryDetail');
    //document.getElementById("wikidataCountryDetailTable").innerHTML = "";

    try{
        var contentTable = `<header class="major"><h2>Detalle Pais - Wikidata</h2></header>`;
        var obj  = await fetch('/api/country/'+countryId );
        var objtoshow = await obj.json();
        console.log(objtoshow.data);
        if( objtoshow != null && objtoshow.data.length > 0 ){
            for (const object of objtoshow.data ){
                console.log(object.capital);
                contentTable += `<div>
                                    <h2>${object.name}</h2>
                                    <img itemprop="url" style=" max-width:120px;" src=${object.icon_svg_uri}><br/><br/>
                                 </div>
                                 <div class="row gtr-150">
                                    <div class="col-4 col-12-medium">
                                        <h3>Capital<br/>${object.capital}</h3>
                                        <h3>Poblacion<br/>${object.countryPopulation}</h3>
                                    </div>
                                    <div class="col-4 col-12-medium">
                                        <h3>Indice Desarrollo Humano<br/>${object.humanDevelopmentIndex}</h3>
                                        <h3>Expectativa de Vida<br/>${object.lifeExpectancy}</h3>
                                    </div>
                                     <div class="col-4 col-12-medium">
                                        <h3>Moneda<br/>${object.currency}</h3>
                                        <h3>URL<br/>${object.search_uri}</h3>
                                    </div>`;
            }

            document.getElementById('wikidataCountryDetailTable').style.display = '';
            document.getElementById('wikidataCountryDetailNoData').style.display = 'none';
            $('#wikidataCountryDetailTable').append(contentTable);

        }
        else{
            document.getElementById('wikidataCountryDetailTable').style.display = 'none';
            document.getElementById('wikidataCountryDetailNoData').style.display = '';
        }

    }catch(error){
        console.log("Ha ocurrido un error: " +  error);
    }

}

async function saveEntity( obj ){

    console.log('saveEntity');
    console.log( obj.data );
    console.log( obj.name );

    var data = {
        title: isEditing ? document.getElementById("txttitle").value : document.getElementById("title").innerHTML,
        image: isEditing ? document.getElementById("txturl").value :  document.getElementById("image").src,
        description: isEditing ? document.getElementById("txtdescription").value  : document.getElementById("description").innerHTML,
        key:  isEditing ? document.getElementById("txtkey").value  : document.getElementById("key").innerHTML,
        excerpt : isEditing ? document.getElementById("txtexcerpt").value  : document.getElementById("excerpt").innerHTML
    }
    if(isEditing)
        data.id = document.getElementById("txtid").value;

    const response = await fetch("/api/entities/", {
        method: (isEditing ? "PUT" : "POST"),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    const body = await response.json();
    alert(body.response);
    $('.close').trigger('click');
    console.log("Respuesta:", body)
}