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
const divLocations = document.getElementById('dataLocations');
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
// objet centralisant les erreurs affichés dans data-error
const errorsMsg = {
    'first': 'Veuillez entrer 2 caractères ou plus pour le champ du prénom',
    'last': 'Veuillez entrer 2 caractères ou plus pour le champ du nom',
    'email':'Veuillez saisir un email valide',
    'birthdate':'Vous devez entrer une date de naissance',
    'quantity':'Veuillez saisir un nombre entre 0 et 99',
    'location':'Vous devez choisir une option',
    'checkbox': 'Vous devez vérifier que vous acceptez les termes et conditions',

}


isValid = false; 

// regex: 
// regex for first and last
const regexName = /[^ ][a-zA-Z '\-éèêëçäàûüçà]*[^ ]$/ ;
// regex for email
const regexEmail = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
//regex for date of birth
//const regexBirthDate = /\b(\d{4})[-/.](\d{2})[-/.](\d{2})\b/;
const regexBirthDate =/\b(\d{4})[-/.](\d{2})[-/.](\d{2})\b/;
// /\s+(?:19\d{2}|20[01][0-9]|2022)[-/.](?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])\b/
//regex pour les nombres entiers
const regexNumbers = /^\d{1,2}$/;

// Ecouteurs d'évènements
firstName.addEventListener('change', checkFirstName);
lastName.addEventListener('change', checkLastName);
email.addEventListener('change', checkEmail);
birthdayDate.addEventListener('change', checkBirthDate);
quantityContest.addEventListener('change', checkNumberOfContest);

divLocations.addEventListener('change', checkRadiosLocations);
checkboxCGU.addEventListener('change', checkCGU);



/**
 * Cette fonction permet de vérifier le prénom
 * @param {Event} e 
 * @returns 
 */
function checkFirstName(e) {
    const valueFirst = e.target.value;
    const divFirst = document.getElementById('dataFirst');
    console.log('prénom saisie : ', valueFirst);
    if (valueFirst.length > 1 && regexName.test(valueFirst)) {
        divFirst.setAttribute('data-error-visible', 'false');
        return true;
    } else {
        divFirst.setAttribute('data-error-visible', 'true');
        divFirst.setAttribute('data-error', errorsMsg.first);
        return false;
    }

}

/**
 * Cette fonction permet de vérifier le nom
 * @param {Event} e 
 * @returns 
 */
function checkLastName (e) {
    const valueLast = e.target.value;
    const divLast = document.getElementById('dataLast');
    console.log('nom saisi : ', valueLast);
    if (valueLast.length > 1 && regexName.test(valueLast)) {
        divLast.setAttribute('data-error-visible', 'false');
        return true;
    } else {
        divLast.setAttribute('data-error-visible', 'true');
        divLast.setAttribute('data-error', errorsMsg.last);
        return false;
    }
}


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
    if (valueEmail!=='' && regexEmail.test(valueEmail)) {
        divEmail.setAttribute('data-error-visible', 'false');
        return true;
    } else {
        divEmail.setAttribute('data-error-visible', 'true');
        divEmail.setAttribute('data-error', errorsMsg.email);
        return false;
    }
}

/**
 * Cette fonction permet de vérifier la date de naissance
 * @param {Event} e event
 */
function checkBirthDate (e) {
    const valueBirthDate = e.target.value;
    console.log('date entrée : ', valueBirthDate)
    const divBirthDate = document.getElementById('dataBirth');
    
    if( regexBirthDate.test(valueBirthDate) ) {
        divBirthDate.setAttribute('data-error-visible', 'false');
        return  true;
    } else {
        divBirthDate.setAttribute('data-error-visible', 'true');
        divBirthDate.setAttribute('data-error', errorsMsg.birthdate);
        return false;
    }

}

/**
 * Cette fonction permet de vérifier le nombre de tournoi
 * @param {Event} e event
 */

function checkNumberOfContest(e) {
    const valueQuantity = e.target.value;
    const divContest = document.getElementById('dataContest')
    
    if( !isNaN(valueQuantity) && regexNumbers.test(valueQuantity)) {
        divContest.setAttribute('data-error-visible', 'false');
        return true;
    } else {
        divContest.setAttribute('data-error-visible', 'true');
        divContest.setAttribute('data-error', errorsMsg.quantity);

        return false;
    }
}

/**
 * Cette fonction permet de vérifier si une ville est bien choisie
 */
function checkRadiosLocations(e) {
    const radios = document.querySelectorAll('.checkbox-input[name="location"]');
    console.log('radios', radios);
    
   for (let radio of radios) {
        if(radio.checked) {
            console.log('ville selectionnée', radio.value);
            divLocations.setAttribute('data-error-visible', 'false');
            return true;
        } else {
        divLocations.setAttribute('data-error-visible', 'true');
        divLocations.setAttribute('data-error', errorsMsg.location);
        return false;
        }
    }
}

/**
 * Cette fonction permet de vérifier si la checkbox CGU est cochée
 */

function checkCGU(e) {
    const valueChecked = e.target.value;
    const divCGU = document.getElementById('dataCGU');
    if (checkboxCGU.checked) {
        console.log('checked CGU');
        divCGU.setAttribute('data-error-visible', 'false');
        return true;
        
    } else {
        divCGU.setAttribute('data-error-visible', 'true');
        divCGU.setAttribute('data-error', errorsMsg.checkbox);
        console.log('pas checked CGU');
        return false;

    }
}
/**
 * Cette fonction permet de supprimer les messages d'erreurs
 */
function removeErrorsMsg() {
    let alertMessages = document.getElementsByClassName("formData");
    for (let alert of alertMessages) {
        alert.setAttribute('data-error-visible', 'false');
    }
}
/**
 * Cette fonction permet de vider les champs du formulaire
 */
function clearValuesForm() {
    let inputsElt = document.getElementsByTagName('input');
    console.log('input elements ', inputsElt)
    for (let input of inputsElt) {
        input.value = "";
    }
}
/**
 * Cette fonction permet de valider le formulaire
 */
function validate (e) {
    e.preventDefault();
    if (checkFirstName()&& checkLastName() && checkEmail() && checkBirthDate() && checkNumberOfContest() && checkRadiosLocations() && checkCGU()) {
        console.log('submit form');
        alert('Votre inscription est validée.')
    } else {
        alert('Merci de saisir des informations correctes')
    }
        
}