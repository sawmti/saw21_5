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
        //document.getElementById('buscar').style.display = '';
        var contentTable = "<table><tr><td>#</td><td>Bandera</td><td>Nombre de Pais</td><td>URL Wikidata</td><td>Acciones<td></tr>";
        var obj  = await fetch('/api/countries');
        var objtoshow = await obj.json();
        if( objtoshow != null && objtoshow.data.length > 0 ){

            console.log(objtoshow.data.length);
            for (const object of objtoshow.data ){
                contentTable += `<tr itemscope itemtype="https://schema.org/Country">
                    <td> ${object.id} </td>
                    <td itemprop="name"><img itemprop="url" style=" max-width:50px;" src=${object.icon_svg_uri}></td>
                    <td itemprop="containedInPlace"> ${object.name} </td>
                    <td itemprop="keywords"> ${object.search_uri} </td>
                    <td><i class="fas fa-glasses" href="#buscar" onclick="viewEntity('${object.id}')" style="	cursor: pointer !important;" title="Detalle"></i> &nbsp; &nbsp; &nbsp; 
                        <i class="fas fa-hdd" onclick="saveEntity('${object.id}')"style="	cursor: pointer !important;" title="Guardar"></i>
                    </td>
                </tr>`;
            }

            contentTable +="</table>"
/*            console.log( 'Code.js WikiContent');
            console.log( document.getElementById('wikidataTable')) ;
            console.log( document.getElementById('wikidataTableNoData')) ;

            document.getElementById('wikidataTable').style.display = '';
            document.getElementById('wikidataTableNoData').style.display = 'none';*/
            $('#wikidataTable').append(contentTable);

        }
        else{
  /*          document.getElementById('wikidataTable').style.display = 'none';
            document.getElementById('wikidataTableNoData').style.display = '';*/
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
                    <td><i class="fas fa-edit" href="#buscar" onclick="editEntity('${object._id}')" style="	cursor: pointer !important;" title="Editar"></i> &nbsp; &nbsp; &nbsp; 
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

    try{
        //document.getElementById('buscar').style.display = '';
        var contentTable = "<table><tr><td>#</td><td>Bandera</td><td>Nombre de Pais</td><td>URL Wikidata</td><td>Acciones<td></tr>";
        var obj  = await fetch('/api/countries');
        var objtoshow = await obj.json();
        if( objtoshow != null && objtoshow.data.length > 0 ){

            console.log(objtoshow.data.length);
            for (const object of objtoshow.data ){
                contentTable += `<tr itemscope itemtype="https://schema.org/Country">
                    <td> ${object.id} </td>
                    <td itemprop="name"><img itemprop="url" style=" max-width:50px;" src=${object.icon_svg_uri}></td>
                    <td itemprop="containedInPlace"> ${object.name} </td>
                    <td itemprop="keywords"> ${object.search_uri} </td>
                    <td><i class="fas fa-glasses" href="#buscar" onclick="viewWikidataCountryDetail('${object.id}')" style="	cursor: pointer !important;" title="Detalle"></i> &nbsp; &nbsp; &nbsp; 
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


async function _viewEntity( identity ){

    var obj  = await fetch('/api/country/'+identity );
    var objtoshow = await obj.json();
    console.log( objtoshow );
    await fillObjectEdit(objtoshow,"entitiesedit");
    //$('#ownentities').hide();
    document.getElementById('ownentities').style.display = 'none';
    document.getElementById('actualizar').style.display = '';
    document.getElementById('actualizar').classList.add("active");

}

async function fillObject(objtoshow, entity){
    const ulEntities = document.getElementById(entity);
    document.getElementById(entity).innerHTML = "";

    objtoshow.forEach(async object => {

        ulEntities.append(await getelement(object.capital,"capital"));
        //ulEntities.append(await getelementImg(object.thumbnail ? object.thumbnail.url : object.image));
        ulEntities.append(await getelement(object.countryPopulation,"countryPopulation"));
        ulEntities.append(await getelement(object.lifeExpectancy,"lifeExpectancy"));
        ulEntities.append(await getelement(object.name,"name"));

    });
}

async function getelement(show, id){
    const li = document.createElement("li");
    li.setAttribute("id", id);
    const text = document.createTextNode(show);
    li.appendChild(text);
    return  li
}

async function fillObjectEdit(objtoshow, entity){
    const ulEntities = document.getElementById(entity);
    document.getElementById(entity).innerHTML = "";
    console.log(objtoshow);
    for (const object of objtoshow.data ){
    //objtoshow.data.forEach(async object => {

        ulEntities.append(await getTextBoxelement(object.title,"title",false,"Título"));
        ulEntities.append(await getTextBoxelement((object.thumbnail ? object.thumbnail.url : object.image),"url",false,"Imagen"));
        //ulEntities.append(await getelementImg(object.thumbnail ? object.thumbnail.url : object.image));
        ulEntities.append(await getTextBoxelement(object.description,"description",false,"Descripción"));
        ulEntities.append(await getTextBoxelement(object.key,"key",false,"Key"));
        ulEntities.append(await getTextBoxelement(object.excerpt,"excerpt",false,"Extracto"));
        ulEntities.append(await getTextBoxelement(object._id,"id",true,""));

    };
}

async function getTextBoxelement(show, id, hide,lbltext){
    var txtBox = document.createElement("INPUT");
    txtBox.setAttribute("type", "text");
    txtBox.setAttribute("id", "txt"+id);
    txtBox.value = show;



    const li = document.createElement("li");
    li.setAttribute("id", id);

    if(hide){
        txtBox.style.display = 'none';
        li.style.display = 'none';
    }

    if(lbltext){
        var lbl = document.createElement("label");
        lbl.innerHTML = lbltext;
        li.appendChild(lbl);
    }

    li.appendChild(txtBox);
    return  li
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