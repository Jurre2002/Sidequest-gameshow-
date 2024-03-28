
/*--------------------De Connectie-------------------------*/

//Array met verschillene foto's. Binnen die array zitten verschillende lijsten met drie foto's die bij elkaar horen.

const difImages = [
    ["/Images/KatjaSchuurman.webp", "/Images/LindaDeMol.webp", "/Images/PaulDeLeeuw.jpeg"],
    ["/Images/Pitbull.jpeg", "/Images/Florida.png", "/Images/50cent.jpeg"],
    ["/Images/Regen.webp", "/Images/Bont.jpeg", "/Images/Bad.jpeg"],
    ["/Images/ajax.webp", "/Images/Ariel.webp", "/Images/Robijn.webp"],
    ["/Images/Cruise.webp", "/Images/Dab2.jpeg", "/Images/Steen.jpeg"],
    ["/Images/Forklifter.jpeg", "/Images/Messi.jpeg", "/Images/Witherspoon.webp"],
    ["/Images/games.png", "/Images/Halo.jpg", "/Images/Mario.webp"],
    ["/Images/Hulk.jpeg", "/Images/Verstappen.jpeg", "/Images/Oscars.jpeg"],
    ["/Images/bankzitters.jpeg", "/Images/Knol.webp", "/Images/kapottv1.png"]
];

const hints = [
    "Zoek voor gedeeltes in de namen die je ziet",
    "Welk ras zie je bij de eerste afbeelding?",
    "Je kan een bepaald woord achter elke afbeelding zetten",
    "Je gebruikt het voor vieze dingen",
    "Vertaal de laatste afbeelding naar het engels",
    "Vertaal de eerste afbeelding naar het engels",
    "Vertaal de eerste afbeelding naar het engels en de laatste persoon is Mario Götze",
    "Wat doet de persoon in afbeelding twee?",
    "De mensen zitten op een bank. Hoe noem je die mensen dan?"
];

//Array met gebruikt images.
const usedImages = [];

//Deze functie zorgt ervoor, dat wanneer het team het antwoord fout heeft ze niet meteen weer kunnen antwoorden.
//Ze moeten 10 seconden wachten, voordat ze weer kunnen antwoorden.
function disableInputFields(teamId) {
    const inputField = document.getElementById(`text${teamId}`);
    inputField.disabled = true;

    setTimeout(function() {
        inputField.disabled = false;
    }, 10000); 
}

//Deze functie:RandomImage zorgt ervoor dat een random image wordt gekozen uit de array difImages. 
//Eerst wordt er gekeken of er al een image gekozen is. Als dat niet het geval is, wordt er een random image gekozen die nog niet is gebruikt.
function randomImage() {
    let rndImage;
    do {
        rndImage = Math.floor(Math.random() * difImages.length);
    } while (usedImages.includes(rndImage));

    const rndImageName = difImages[rndImage];
    usedImages.push(rndImage);
    
    document.getElementById("image").src = rndImageName[0];
    document.getElementById("secondimage").src = rndImageName[1];
    document.getElementById("thirdimage").src = rndImageName[2];

    document.getElementById("hint-popup").innerHTML = hints[rndImage];
}

//score die bovenin wordt weergegeven voor de spelers. Begint op nul.

let team1 = 0;
let team2 = 0;


//Deze functie: addpoint zorgt ervoor dat de punten worden toegevoegd. Als team 1 het antwoord goed heeft krijgen zij de punten als team 2 het antwoord fout heeft krijgen zij de punten. 
//De punten wordt gekoppeld aan het ID van het team.
function addPoint(teamId, points) {
    if (teamId === 1) {
        team1 += points;
        document.getElementById("team1").innerHTML = team1;
    } else if (teamId === 2) {
        team2 += points;
        document.getElementById("team2").innerHTML = team2;
    }
}

let questionCount = 0;

/*-------Tussenstand-------*/

//Deze functie: checkGameEnd zorgt ervoor dat de game eindigd als er 5 vragen zijn gesteld. Als dat zo is, worden de scores opgeslagen in local storage. 
//Als laatst wordt de gebruiker naar de volgende pagina gestuurd, waar de scores worden getoond.
function checkGameEnd() {
    if (questionCount === 5) {
        const team1Score = team1;
        const team2Score = team2;

        localStorage.setItem("team1Score", team1Score);
        localStorage.setItem("team2Score", team2Score);

        window.location.href = "pagina2.html";
    }
}

//Deze functie haalt de scores uit de local storage en toond de scores op het scherm.
function showScores() {
    const team1Score = localStorage.getItem("team1Score");
    const team2Score = localStorage.getItem("team2Score");

    document.getElementById("team1ScoreDisplay").textContent = team1Score;
    document.getElementById("team2ScoreDisplay").textContent = team2Score;
}

//dit is een eventhandler. Wanneer de pagina, pagina 2 is, dan wordt pas de functie showScores aangeroepen.
window.onload = function() {
    if(window.location.pathname.includes("pagina2.html")) {
        showScores();
    }
}

/*------------------------*/

//Deze functie: iftrue zorgt kijkt of het antwoord dat ingevuld is door de gebruiker overeekomt met het antwoord.
function iftrue(teamId) {
    const ansImage = document.getElementById("image").src;
    let answer;

    if (ansImage.includes("KatjaSchuurman") || ansImage.includes("LindaDeMol") || ansImage.includes("PaulDeLeeuw")) {
        answer = ["dier", "dieren"];
    } else if (ansImage.includes("Pitbull") || ansImage.includes("Florida") || ansImage.includes("50cent")) {
        answer = ["rappers", "rapper", "artiest", "artiesten", "muzikant", "muzikanten"];
    } else if (ansImage.includes("Regen") || ansImage.includes("Bont") || ansImage.includes("Bad")) {
        answer = ["jas", "jassen"];
    } else if (ansImage.includes("ajax") || ansImage.includes("Ariel") || ansImage.includes("robijn")) {
        answer = ["wasmiddel", "afwasmiddel", "afwasmiddelen", "afwas", "schoonmaakmiddel", "schoonmaakmiddelen"];
    } else if (ansImage.includes("Cruise") || ansImage.includes("Dab") || ansImage.includes("Steen")) {
        answer = ["acteurs", "acteur"];
    } else if(ansImage.includes("Forklifter") || ansImage.includes("Messi") || ansImage.includes("Witherspoon")) {
        answer = ["bestek"];
    } else if(ansImage.includes("Halo") || ansImage.includes("Mario") || ansImage.includes("games")) {
        answer = ["videogames", "videogame", "spelletjes", "spelletje", "games"];
    } else if(ansImage.includes("Hulk") || ansImage.includes("Verstappen") || ansImage.includes("Oscars")) {
        answer = ["coureur", "coureurs", "formule 1", "f1", "f1drivers", "f1driver", "f1 coureurs", "formule 1 coureurs"];
    } else if(ansImage.includes("bankzitters") || ansImage.includes("Knol") || ansImage.includes("brokentv")) {
        answer = ["youtubers", "youtuber", "youtube, yt"];
    }


    //Deze line code kijkt bij welk team het antwoord correct is.
    const userInput = document.getElementById(`text${teamId}`).value;

    //Dit zorgt ervoor dat als het antwoord fout is het betreffende team niet meer kan antwoorden.
    if(!answer.includes(userInput)) {
        disableInputFields(teamId);
    }
    //Dit zorgt ervoor dat het input veld weer leeg is wanneer de gebruiker het antwoord correct heeft ingevuld en op de knop heeft derukt.
    document.getElementById(`text${teamId}`).value = "";

    document.getElementById("hint-popup").style.display = "none";

    //Dit zorgt ervoor dat het popup verschijnt wanneer de gebruiker het antwoord correct heeft ingevuld.
    //Is het antwoord juist, dan krijgen ze een een groen scherm te zien met "correct" en worden de punten toegevoegd.
    //Als laatst wordt er een een nieuwe foto ingeladen en kunnen de gebruikers de volgende overeenkomst raden.
    function showPopup(message, isTrue) {
        const popupElement = document.getElementById("popup");
        //De message is de tekst die in de popup komt.
        popupElement.textContent = message;

        //klopt het antwoord, wordt er een class aangemaakt, die de melding laat zien als het antwoord juist is of niet.
        if (isTrue) {
            popupElement.classList.add("popup-success");
        } else {
            popupElement.classList.add("popup-error");
        }

        //Dit zorgt ervoor dat de popup verschijnt.
        popupElement.style.display = "block";
    
        setTimeout(function() {
            //Dit zorgt ervoor dat de popup verdwijnt in 4 seconden, doormiddel van het verwijderen van de classes.
            popupElement.style.display = "none";
            popupElement.classList.remove("popup-error");
            popupElement.classList.remove("popup-success");
        }, 2000);
    }


    //Dit kijkt of het antwoord overeen komt met het antwoord dat is gekozen door de gebruiker.
    if (answer.includes(userInput)) {
        addPoint(teamId, 2);
        showPopup("Correct!", true);
        setTimeout(function() {
            randomImage();
            questionCount++;
            checkGameEnd();
        }, 2000);
    } else {
        showPopup("Fout!", false);
    }
}

// Event listener toevoegen aan de hint knop
document.getElementById("hint").addEventListener("click", function() {
    // De hint-popup weergeven
    const hintPopup = document.getElementById("hint-popup");
    hintPopup.style.display = "block";

    // De hint-popup in het midden van het scherm plaatsen
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const hintPopupWidth = hintPopup.offsetWidth;
    const hintPopupHeight = hintPopup.offsetHeight;

    const leftPosition = (screenWidth - hintPopupWidth) / 2;
    const topPosition = (screenHeight - hintPopupHeight) / 2;

    hintPopup.style.left = leftPosition + "px";
    hintPopup.style.top = topPosition + "px";

    // Event listener toevoegen aan de hint-popup om deze te laten verdwijnen wanneer erop geklikt wordt
    hintPopup.addEventListener("click", function() {
        // De hint-popup verbergen wanneer erop geklikt wordt
        hintPopup.style.display = "none";
    });

    const currentIndex = usedImages[usedImages.length - 1];
    document.getElementById("hint-popup").textContent = hints[currentIndex];
    const hintContent = hints[currentIndex];
    document.getElementById("hint-popup").innerHTML = '<span class="hint-symbol"><i class="fa-solid fa-arrow-left"></i></span><h1 class="hint-title">Hint:</h1>' + hintContent;
});


function skipQuestion() {
    randomImage();
    questionCount++;
    checkGameEnd();
    document.getElementById("hint-popup").style.display = "none";
}

//Dit zorgt ervoor dat de functies hierboven werken. Als team 1 op de knop drukt "confirmbutton1", dan krijgen zij de animatie te zien als ze het goed/fout hebben en de punten krijgen.
document.getElementById("confirmbutton1").addEventListener("click", function() {
    iftrue(1);
});

//Hetzelfde geldt voor team 2. Ik kijk naar het id van het team en basis daarvan worden de punten toegevoegd.
document.getElementById("confirmbutton2").addEventListener("click", function() {
    iftrue(2);
});

//Weten beide spelers het niet? Dan kunnen ze deze vraag overslaan door op deze knop te drukken. Ze krijgen beide geen punten.
document.getElementById("geenIdee").addEventListener("click", skipQuestion);


//Dit zorgt ervoor dat er een random image wordt ingeladen als je op de website komt.
window.onload = randomImage;






