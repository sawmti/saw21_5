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

async function getCountryDetail( idCountry ) {
    const response = await fetch('/api/country/'+ idCountry );
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

    console.log( "fillCountries" );

    getCountries().then(data => {
        data.data.forEach( function(item, i) {
                var table = document.getElementById('member_table');
                var row = table.insertRow();
                var idCell = row.insertCell(0);
                var firstNameCell = row.insertCell(1);
                var lastNameCell = row.insertCell(2);
                var emailCell = row.insertCell(3);
                var dateOfBirthCell = row.insertCell(4);
                var designationCell = row.insertCell(5);
                var actionCell = row.insertCell(6);

                idCell.innerHTML = item.id; //tableIndex;
                firstNameCell.innerHTML = item.name;
                lastNameCell.innerHTML = item.last_name;
                emailCell.innerHTML = item.email;
                dateOfBirthCell.innerHTML = item.d_o_b;
                designationCell.innerHTML = '<a class="tag">'+item.designation+'</a>'
                var guid = item.id;

                actionCell.innerHTML = '<button class="btn btn-sm btn-default" onclick="showMemberData">View</button> ' +
                    '<button class="btn btn-sm btn-primary" onclick="showEditModal(' + guid + ')">Edit</button> ' +
                    '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')">Delete</button>';
            }
        )
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