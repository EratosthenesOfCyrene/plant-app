



/*let plants = [
    {
        "id": "pflanze001",
        "name": "Monstera Deliciosa",
        "botanischer_name": "Monstera deliciosa",
        "zuletzt_gegossen_am": "2025-04-28",
        "bild": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...",
        "gekauft_am": "2023-05-15",
        "notizen": "Steht im Wohnzimmer, keine direkte Sonne.",
        "class": "baum"
    },
    {
        "id": "pflanze002",
        "name": "Ficus Elastica",
        "botanischer_name": "Ficus elastica",
        "zuletzt_gegossen_am": "2025-04-20",
        "bild": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...",
        "gekauft_am": "2024-11-02",
        "notizen": "Steht im Schlafzimmer, mag Halbschatten.",
        "class": "baum"
    },
    {
        "id": "pflanze003",
        "name": "Mexikanischer Cardon Kaktus",
        "botanischer_name": "Pachycereus Pinglei",
        "zuletzt_gegossen_am": "2025-03-19",
        "bild": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...",
        "gekauft_am": "2022-01-22",
        "notizen": "Steht uf dem Dachboden, mag volle Sonne.",
        "class": "kaktus"
    },
    {
        "id": "pflanze004",
        "name": "Saguaro Kaktus",
        "botanischer_name": "Saguaro Gigantea",
        "zuletzt_gegossen_am": "2025-04-30",
        "bild": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...",
        "gekauft_am": "2019-06-22",
        "notizen": "Steht uf dem Dachboden, mag volle Sonne.",
        "class": "kaktus"
    },
    
];
*/


function showPlants() {
    plants = JSON.parse(localStorage.getItem('plants')) || [];  //-- lädt die gespeicherten Pflanzen aus dem Speicher
    document.getElementById('plantDiv').innerHTML = ``;
    let plantDiv = document.getElementById('plantDiv');

    for (let i = 0; i < plants.length; i++) {
        const plant = plants[i];
        let plantElement = document.createElement('div');
        plantElement.classList.add('plant'); //-- für CSS-Styling
        let plantClass = plant.class;

        plantElement.innerHTML =  /*html*/ `
         <h2>${plant.name}</h2>
        <p><strong>Botanischer Name:</strong> ${plant.botanischer_name}</p>
        <p><strong>Zuletzt gegossen:</strong> ${plant.zuletzt_gegossen_am}</p>
        <p><strong>Gekauft am:</strong> ${plant.gekauft_am}</p>
        <p><strong>Notizen:</strong> ${plant.notizen}</p>
        <img src="${plant.bild}" alt="${plant.name}" />
        <a onclick="showPLant(plant)" href="?id=${plant.id}">Zur Detailansicht</a>  
        `;
        plantDiv.appendChild(plantElement);
        addClass(plantClass, plantElement);
    }
}

const params = new URLSearchParams(window.location.search);
const plantId = params.get('id');
plants = JSON.parse(localStorage.getItem('plants')) || [];  //-- lädt die gespeicherten Pflanzen aus dem Speicher

// Prüfen, ob eine ID in der URL steckt
if (plantId) {
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
        showPlant(plant);
    } else {
        document.getElementById('plantDiv').innerHTML = '<p>Pflanze nicht gefunden.</p>';
    }
} else {
    showPlants(); // wenn keine ID: alle anzeigen
}

function showPlant(plant) {
    plantClass = plant.class;
    let plantDiv = document.getElementById('plantDiv');
    //plantDiv.innerHTML = ''; // leeren

    let plantElement = document.createElement('div');
    plantElement.classList.add('plant');

    plantElement.innerHTML = /*html*/ `
        <h2>${plant.name}</h2>
        <p><strong>Botanischer Name:</strong> ${plant.botanischer_name}</p>
        <p><strong>Zuletzt gegossen:</strong> ${plant.zuletzt_gegossen_am}</p>
        <p><strong>Gekauft am:</strong> ${plant.gekauft_am}</p>
        <p><strong>Notizen:</strong> ${plant.notizen}</p>
        <img src="${plant.bild}" alt="${plant.name}" />
    `;

    plantDiv.appendChild(plantElement);
    addClass(plantClass, plantElement);
}

function addClass(plantClass, plantElement) {
    if (plantClass === 'kaktus') {
        plantElement.classList.add('cactus');
    } if (plantClass === 'baum') {
        plantElement.classList.add('tree');
    }
}

function saveNewPlant() {
    let newPlant = {
        id: `pflanze${plants.length + 1}`.padStart(3, '0'),
        name: document.getElementById('name').value,
        botanischer_name: document.getElementById('botanischerName').value,
        zuletzt_gegossen_am: document.getElementById('gegossenAm').value,
        //bild: reader.result || '', // Base64 oder leer
        gekauft_am: document.getElementById('gekauftAm').value,
        notizen: document.getElementById('notizen').value,
        class: document.getElementById('gruppe').value
    };
    plants.push(newPlant);
    localStorage.setItem('plants', JSON.stringify(plants));

    showPlants(); // Anzeige aktualisieren
    hideShowContent('plantForm', 'add'); // Formular schließen
    document.getElementById('plantForm').reset(); // Formular zurücksetzen
}

function searchPlant() {
    let search = document.getElementById('searchInput').value;
    search = search.toLowerCase();
    let plantDiv = document.getElementById('plantDiv');

    for (let i = 0; i < plants.length; i++) {
        const plant = plants[i];
        let plantName = plant.name;
        let botanicalName = plant.botanischer_name;
        let plantNote = plant.notizen;
        showSearchedPlants(search, plant, plantDiv, plantName, botanicalName, plantNote);
    }
}

function showSearchedPlants(search, plant, plantDiv, plantName, botanicalName, plantNote) {
    if (plantName.toLowerCase().includes(search) || botanicalName.toLowerCase().includes(search) || plantNote.toLowerCase().includes(search)) {
        let plantElement = document.createElement('div');
        plantElement.classList.add('plant'); // für CSS-Styling

        plantElement.innerHTML =  /*html*/ `
         <h2>${plant.name}</h2>
        <p><strong>Botanischer Name:</strong> ${plant.botanischer_name}</p>
        <p><strong>Zuletzt gegossen:</strong> ${plant.zuletzt_gegossen_am}</p>
        <p><strong>Gekauft am:</strong> ${plant.gekauft_am}</p>
        <p><strong>Notizen:</strong> ${plant.notizen}</p>
        <img src="${plant.bild}" alt="${plant.name}" />
        `;
        plantDiv.appendChild(plantElement);
    }
}

function showForm() {
    document.getElementById('plantForm').classList.remove('d-none');
}

function hideShowContent(param1, param2) {
    document.getElementById(param1).classList[param2]('d-none');
}

function hidePlants() {
    document.getElementById('plantDiv').innerHTML = '';
}

