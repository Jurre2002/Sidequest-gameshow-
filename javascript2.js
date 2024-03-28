/*---------De Drie----------*/

//Array met woordensets. Met daaronder een array met de bijbehorende antwoorden.
const woordenSets = [
    {
        woorden: [
            ["Geel", "Houdt niet van Mario", "Stevig"],
            ["Nummer 10", "Barcelona", "Argentinië"],
            ["Fruit", "Merk", "iPhone"]
        ],
        juisteAntwoorden: ["wario", "messi", "apple"]
    },
    {
        woorden: [
            ["Eten", "Rapper", "5 Mile"],
            ["Vierkant", "Microsoft", "Survival"],
            ["Dier", "automerk", "Kat"]
        ],
        juisteAntwoorden: ["eminem", "minecraft", "jaguar"]
    },
    {
        woorden: [
            ["Zangeres", "Stay", "ASAP Rocky"], 
            ["Blussen", "Beroep", "Vuur"],
            ["Casino", "Full House", "Kaarten"]
        ],
        juisteAntwoorden: ["rihanna", "brandweer", "poker"]
    }
];


// De functie kiest een willekeurige set uit de woordensets en zorgt ervoor dat de woorden worden geplaatst op de pagina.
const plaatsWillekeurigeSetWoorden = () => {
    const randomSetIndex = Math.floor(Math.random() * woordenSets.length);
    plaatsWoorden(randomSetIndex);
    return randomSetIndex;
};

// De functie plaatst de woorden van een specifieke set op de pagina. Het accepteert een argument, woordenSetIndex, dat de index is van de set in de woordenSets array die moet worden geplaatst. 
// Het schudt eerst de woorden van de set, zodat ze in een willekeurige volgorde op de pagina verschijnen, en vervolgens plaatst het de woorden in de HTML-elementen op de pagina.
const plaatsWoorden = (woordenSetIndex) => {
    //Hier halen we de specifieke set woorden op uit de array woordenSets die overeenkomt met de meegegeven index woordenSetIndex. Deze set woorden bevat een array van arrays met de woorden die we willen weergeven.
    const woordenSet = woordenSets[woordenSetIndex];
    //We passen de shuffleArray-functie toe op de woorden van de geselecteerde set. Dit zorgt ervoor dat de woorden willekeurig worden geschud voordat ze op de pagina worden geplaatst. 
    //De flat methode wordt gebruikt om de geneste arrays van woorden uit te vouwen tot één platte array, omdat shuffleArray alleen werkt met één dimensionale arrays.
    const shuffledWoorden = shuffleArray(woordenSet.woorden.flat());
    //Hier selecteren we all p elementen met de class 'dedrie_vierkant'. Hierin plaatsen we de woorden in.
    const cellen = document.querySelectorAll('.dedrie_vierkant > div p');


    shuffledWoorden.forEach((woord, index) => {
        cellen[index].textContent = woord;
    });
};

// Hulpmethode om een array willekeurig te schudden. Het kijkt eerst hoeveel elementen er in de array zitten, en zet vervolgens de volgorde van de array willekeurig door.
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Plaats bij het laden van de pagina een willekeurige set woorden
let huidigeSetIndex = plaatsWillekeurigeSetWoorden();

// Functie om te controleren of alle antwoorden zijn weergegeven
const controleerAlleAntwoorden = () => {
    const antwoordElementen = document.querySelectorAll('.answersboard p');
    for (const antwoordElement of antwoordElementen) {
        if (antwoordElement.textContent === '') {
            // Als er een leeg antwoord is, zijn niet alle antwoorden weergegeven
            return false;
        }
    }
    // Zijn alle antwoorden goed, dan krijg je true terug.
    return true;
};

const updatePopup = (inhoud) => {
    const popupContent = document.getElementById('popup-content');
    popupContent.textContent = inhoud;
}

// Event listener voor het invoerveld om de antwoorden te controleren. Het wachtt op enter en zorgt ervoor dat de antwoorden worden gecontroleerd. 
// Wordt het juiste antwoord ingetypt dan wordt het getoond in de answersboard.
document.getElementById('Antwoord').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        //haalt witruimtes weg.
        const invoer = e.target.value.trim();
        const juisteAntwoorden = woordenSets[huidigeSetIndex].juisteAntwoorden;
        // Het maakt niet uit als je het antwoord met hoofdletter invoert, het wordt juist omgezet naar kleine letters.
        const index = juisteAntwoorden.findIndex(antwoord => antwoord.toLowerCase() === invoer.toLowerCase());
        // Het kijkt of het antwoord in de juisteAntwoorden zit, zoja, dan wordt het antwoord getoond in de answersboard.
        if (index !== -1) {
            document.getElementById(`answer${index + 1}`).textContent = juisteAntwoorden[index];

            if(controleerAlleAntwoorden()) {
                updatePopup('Alle antwoorden goed!');
                document.getElementById('popup1').style.display = 'block';
                setTimeout(function() {
                    window.location.reload();
                }, 3000);
            }
        }
        // Het zorgt ervoor dat de input leeg blijft als het antwoord is ingevult.
        e.target.value = '';
    }
});


