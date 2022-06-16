/**
 * Les données doivent être saisies correctement :
(1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
(2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
(3) L'adresse électronique est valide.
(4) Pour le nombre de concours, une valeur numérique est saisie.
(5) Un bouton radio est sélectionné.
(6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.
Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.
 */

// Récupération du formulaire
const form = document.getElementById('formReservation');

// Récupération des éléments du DOM du formulaire par leurs id
//prénom
const firstName = document.getElementById('first');
//Nom
const lastName = document.getElementById('last');
//Email
const email = document.getElementById('email');
//Date de naissance
const birthdayDate = document.getElementById('birthdate');
// Nombre de tournois participé
const quantityContest = document.getElementById('quantity');
//Choix de la ville 1: New-York
const location1 = document.getElementById('location1');
//Choix de la ville 2: San Francisco
const location2 = document.getElementById('location2');
//Choix de la ville 3: Seattle
const location3 = document.getElementById('location3');
//Choix de la ville 4: Chicago
const location4 = document.getElementById('location4');
//Choix de la ville 5: Boston
const location5 = document.getElementById('location5');
//Choix de la ville 6: Portland
const location6 = document.getElementById('location6');
// Checkbox CGU
const checkboxCGU = document.getElementById('checkbox1');
// Checkbox events
const checkboxEvents = document.getElementById('checbox2');


// Validation du formulaire

const validate = (e) => {
    e.preventDefault();
    console.log('submit form');
}

isValid = false; 

// regex: 
// regex for first and last
const regexName = /[^ ][a-zA-Z '\-éèêëçäàûüçà]*[^ ]$/ ;
// regex for email
const regexEmail = /[a-z0-9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//regex for date of birth
const regexBirthDate = /\b(\d{2,4})(\d{1,2})(\d{1,2})\b/;

// Vérification du prénom
firstName.addEventListener('change', checkFirstName);


function checkFirstName(e) {
    const valueFirst = e.target.value;
    const divFirst = document.getElementById('dataFirst');
    console.log('prénom saisie : ', valueFirst);
    if (valueFirst.length > 1 && regexName.test(valueFirst)) {
        return isValid =true;
    } else {
        divFirst.setAttribute('data-error-visible', 'true');
        return isValid=false;
    }

}
// vérification du nom
lastName.addEventListener('change', checkLastName);
function checkLastName (e) {
    const valueLast = e.target.value;
    const divLast = document.getElementById('dataLast');
    console.log('nom saisi : ', valueLast);
    if (valueLast.length > 1 && regexName.test(valueLast)) {
        return isValid =true;
    } else {
        divLast.setAttribute('data-error-visible', 'true');
        return isValid=false;
    }
}

// vérification de l'email
email.addEventListener('change', checkEmail);
/**
 * Cette fonction permet de vérifier l'adresse mail
 * @param {Event} e 
 * @returns 
 */
function checkEmail(e) {
    const valueEmail = e.target.value;
    const divEmail = document.getElementById('dataEmail');
    console.log('email saisi : ', valueEmail);
    // si la valeur saisie est vide
    if (!valueEmail && regexEmail.test(valueEmail)) {
        return isValid = true;
    } else {
        divEmail.setAttribute('data-error-visible', 'true');
        return isValid=false;
    }
}

// vérification de la date de naissance 
birthdayDate.addEventListener('change', checkBirthDate);

/**
 * Cette fonction permet de vérifier la date de naissance
 * @param {Event} e event
 */
function checkBirthDate (e) {
    const valueBirthDate = e.target.value;
    console.log('date entrée : ', valueBirthDate)
    const divBirthDate = document.getElementById('dataBirth');
    if( regexBirthDate.test(valueBirthDate) && valueBirthDate > NetworkInformation() ) {
        return isValid = true;
    } else {
        divBirthDate.setAttribute('data-error-visible', 'true');
        return isValid=false;
    }

}

// vérification du nombre de tournoi
quantityContest.addEventListener('change', checkNumberOfContest);
function checkNumberOfContest(e) {
    const valueQuantity = e.target.value;
    const divContest = document.getElementById('dataContest')
    if(valueQuantity >= 0 && valueQuantity <= 99) {
        return isValid = true;
    } else {
        divContest.setAttribute('data-error-visible', 'true');
        return isValid=false;
    }
}

// vérification du choix de la ville : obligation d'un bouton radio selectionné

const divLocations = document.getElementById('dataLocations');
divLocations.addEventListener('change', checkRadiosLocations);

function checkRadiosLocations(e) {
    const radios = document.querySelectorAll('input[name="location"]');
   for (let radio of radios) {
    if(radio.checked) {
        console.log('ville selectionnée', radio.value);
        return isValidRadio=true;
   }
}
if (isValidRadio == false) {
    divLocations.setAttribute('data-error-visible', 'true');
}
}

//const radios = document.querySelector('input[radio]:checked');