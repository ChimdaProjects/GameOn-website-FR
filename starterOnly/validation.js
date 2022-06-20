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
const form = document.querySelector('form');

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
// Les input ayant l'attribut name = location (pour avoir accès à toutes les locations)
const locations = document.querySelectorAll('input[type="radio"]');
console.log('locations element', locations);
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

// Les expressions régulières (regex) permettant de faire les vérifications des champs du formulaire : 
// regex for first and last
const regexName = /[^ ][a-zA-Z '\-éèêëçäàûüçà]*[^ ]$/ ;
// regex for email
const regexEmail = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
//regex for date of birth
const regexBirthDate =/\b(\d{4})[-/.](\d{2})[-/.](\d{2})\b/;
//regex pour les nombres entiers
const regexNumbers = /^\d{1,2}$/;

const inputsForm = document.querySelectorAll('input');
/**
 * On ajoute un écouteur d'évènements sur tous les inputs du formulaire.
 */
inputsForm.forEach(e => {
    e.addEventListener('change', checkValuesForm)
});

// variables permettant de savoir si un champ du formulaire est rempli correctement.
checkFirst=false;
checkLast=false;
checkEmail = false;
checkBirthDate = false;
checkQuantity = false;
checkLocations = false;
checkCgu = false;

/**
 * Cette fonction permet de vérifier toutes les valeurs saisies ou choisies par l'utilisateur
 * @param {Event} e 
 * @returns 
 */
function checkValuesForm(e) {
    const valueField = e.target.value;
    switch(e.target.name) {
        case 'first':
            console.log('on est dans le prénom');  
            const msgFirst = document.getElementById('dataFirst');
            console.log('prénom saisie : ', valueField);
            if (valueField.length > 1 && regexName.test(valueField)) {
                msgFirst.setAttribute('data-error-visible', 'false');
                checkFirst=true;
            } else {
                msgFirst.setAttribute('data-error-visible', 'true');
                msgFirst.setAttribute('data-error', errorsMsg.first);
                checkFirst=false;
            };
            console.log('checkfirst :', checkFirst);
            return checkFirst;
        
        case 'last':
            const divLast = document.getElementById('dataLast');
            console.log('nom saisi : ', valueField);
            if (valueField.length > 1 && regexName.test(valueField)) {
                divLast.setAttribute('data-error-visible', 'false');
                checkLast = true;
            } else {
                divLast.setAttribute('data-error-visible', 'true');
                divLast.setAttribute('data-error', errorsMsg.last);
                checkLast = false;
            };
            console.log('checkfirst :', checkFirst);
            return checkLast;

        case 'email':
            const divEmail = document.getElementById('dataEmail');
            console.log('email saisi : ', valueField);
            // si la valeur saisie est vide
            if (valueField!=='' && regexEmail.test(valueField)) {
                divEmail.setAttribute('data-error-visible', 'false');
                checkEmail = true;
            } else {
                divEmail.setAttribute('data-error-visible', 'true');
                divEmail.setAttribute('data-error', errorsMsg.email);
                checkEmail = false;
            };
            console.log('checkEmail : ', checkEmail)
            return checkEmail;
    
        case 'birthdate':
            console.log('date entrée : ', valueField)
            const divBirthDate = document.getElementById('dataBirth');
            let birthdate = new Date(valueField);
            let birthdatepicked = birthdate.toLocaleDateString();
            console.log('birthdate', birthdate.toLocaleDateString())
            let today = new Date().toLocaleDateString();
            console.log('date du jour', today);
            if( regexBirthDate.test(valueField) && birthdatepicked <= today) {
                divBirthDate.setAttribute('data-error-visible', 'false');
                checkBirthDate = true;
            } else {
                divBirthDate.setAttribute('data-error-visible', 'true');
                divBirthDate.setAttribute('data-error', errorsMsg.birthdate);
                checkBirthDate = false;
            };
            console.log('check birthdate :' , checkBirthDate);
            return checkBirthDate;
     
        case 'quantity':
            const divContest = document.getElementById('dataContest')
            console.log('quantity', valueField);
            if( !isNaN(valueField) && regexNumbers.test(valueField)) {
                divContest.setAttribute('data-error-visible', 'false');
                checkQuantity= true;
            } else {
                divContest.setAttribute('data-error-visible', 'true');
                divContest.setAttribute('data-error', errorsMsg.quantity);

                checkQuantity= false;
            };
            console.log('check quantity : ', checkQuantity);
            return checkQuantity;

        case 'location':
                const divLocations = document.getElementById('dataLocations');
                for (let location of locations) {
                    if(location.checked) {
                        console.log('ville selectionnée', location.value);
                        console.log('location checked = ',location.checked)
                        divLocations.setAttribute('data-error-visible', 'false');
                        return checkLocations = true;
                    } else {
                        divLocations.setAttribute('data-error-visible', 'true');
                        divLocations.setAttribute('data-error', errorsMsg.location);
                        checkLocations = false;
                    } ;
                };
                console.log('check locations : ', checkLocations);
                return checkLocations;
        case 'cgu':
            const divCGU = document.getElementById('dataCGU');
            if (checkboxCGU.checked) {
                console.log('checked CGU');
                divCGU.setAttribute('data-error-visible', 'false');
                checkCgu = true;
                
            } else {
                divCGU.setAttribute('data-error-visible', 'true');
                divCGU.setAttribute('data-error', errorsMsg.checkbox);
                console.log('pas checked CGU');
                checkCgu = false;
            };
            console.log('check cgu ', checkCgu );
            return checkCgu;

        default:console.log('ca ne va pas du tout !')
    }
}

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

function openModalConfirmation () {
    modalMsg.style.display="block";
}

/**
 * Cette fonction permet la soumission du formulaire
 */
function validate (e) {
    console.log('on est ds validate')
    e.preventDefault();
    if (checkLast && 
        checkFirst && 
        checkEmail &&
        checkBirthDate &&
        checkQuantity &&
        checkLocations &&
        checkCgu ) {
        console.log('submit form');
        openModalConfirmation()
        clearValuesForm();
        form.submit();
    } else {
        alert('Merci de saisir des informations correctes');
    }
        
}
























// Ecouteurs d'évènements
/*firstName.addEventListener('change', checkFirstName);
lastName.addEventListener('change', checkLastName);
email.addEventListener('change', checkEmail);
birthdayDate.addEventListener('change', checkBirthDate);
quantityContest.addEventListener('change', checkNumberOfContest);
checkboxCGU.addEventListener('change', checkCGU);*/

/**
 * Cette fonction permet de vérifier le prénom
 * @param {Event} e 
 * @returns 
 */
/*function checkFirstName(e) {
   console.log(e.target.id)
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
/*function checkLastName (e) {
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
/*function checkEmail(e) {
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

// date du jour
// 

/*function checkBirthDate (e) {
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

/*function checkNumberOfContest(e) {
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
/*console.log('les villes', locations);

for (let location of locations) {
    location.addEventListener('change', checkRadiosLocations);    
    function checkRadiosLocations() {
        const divLocations = document.getElementById('dataLocations');
    
        if(location.checked) {
            console.log('ville selectionnée', location.value);
            divLocations.setAttribute('data-error-visible', 'false');
            return true;
        } else {
        divLocations.setAttribute('data-error-visible', 'true');
        divLocations.setAttribute('data-error', errorsMsg.location);
        return false;
        } ;
           
    }
   
}

checkRadiosLocations();

/**
 * Cette fonction permet de vérifier si la checkbox CGU est cochée
 */

/*
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
