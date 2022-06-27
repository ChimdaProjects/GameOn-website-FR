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
const locations = document.querySelectorAll('input[name="location"]');
console.log('locations element', locations);
// Checkbox CGU
const checkboxCGU = document.getElementById('checkbox1');
// Checkbox events
const checkboxEvents = document.getElementById('checbox2');

const divLocations = document.getElementById('dataLocations');

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

/**
 * On ajoute un écouteur d'évènements sur tous les inputs du formulaire.
 */

const inputsForm = [
    firstName, lastName, email, birthdayDate, quantityContest,checkboxCGU
]
for( let input of inputsForm) {
    input.addEventListener('change', checkValuesForm);
}

// variables permettant de savoir si un champ du formulaire est rempli correctement.
checkFirst=false;
checkLast=false;
checkEmail = false;
checkBirthDate = false;
checkQuantity = false;
checkLocations = false;
checkCgu = false;

const msgFirst = document.getElementById('dataFirst');
const divLast = document.getElementById('dataLast');
const divEmail = document.getElementById('dataEmail');
const divBirthDate = document.getElementById('dataBirth');
const divContest = document.getElementById('dataContest');
const divCGU = document.getElementById('dataCGU');

/**
 * Cette fonction permet de vérifier toutes les valeurs saisies ou choisies par l'utilisateur
 * @param {Event} e
 * @returns 
 */
function checkValuesForm(e) {
    const valueField = e.target.value;
    // en fonction de l'id
    switch(e.target.id) {
        case 'first': // prénom
            console.log('on est dans le prénom');  
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
            break;
        
        case 'last': // nom
            
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
            break;

        case 'email': // email
            
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
            console.log('checkEmail : ', checkEmail);
            break;
    
        case 'birthdate': // date de naissance

            console.log('date entrée : ', valueField)
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
            break;
     
        case 'quantity': //  nombre de tournois
            
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
            break;

        case 'checkbox1': // checkbox conditions générales d'utilisation
            
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
            break;

        default: console.log('ca ne va pas du tout !');
    }
}
/**
 * On vérifie si une location est cochée
 */

for (let location of locations) {
    // pour chaque location on lui associe un écouteur d'évènement
    location.addEventListener('change', checkRadiosLocations);    
    function checkRadiosLocations() {
        console.log('on est dans check radio')
        // on vérifie si une location est cochée
        if(location.checked) {
            console.log('ville selectionnée', location.value);
            // le message d'erreur ne s'affiche pas
            divLocations.setAttribute('data-error-visible', 'false');
            checkLocations = true;
        } else {
            // sinon le message d'erreur s'affiche
            divLocations.setAttribute('data-error-visible', 'true');
            divLocations.setAttribute('data-error', errorsMsg.location);
            checkLocations= false;
        } ;
    console.log('check location', checkLocations) ;       
    }
}
console.log('check location ', checkLocations);   

/**
 * Cette fonction permet de vérifier si la checkbox CGU est cochée et de nous retourner le résultat de la variable checkCgu.
 */
function checkCheckboxCgu() {
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
}
checkCheckboxCgu();
/**
 * Cette fonction permet d'enlever les messages d'erreur
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
    firstName.value="";
    lastName.value="";
    email.value="";
    birthdayDate.value="";
    quantityContest.value="";
    for (let location of locations) {
        location.checked = false;
    }
    checkboxCGU.checked =false;
}

/**
 * Cette fonction permet d'ouvrir la modale du message de confirmation
 */
function openModalConfirmation () {
    modalMsg.style.display="block";
}

/**
 * Cette fonction permet la soumission du formulaire
 */
function validate() {
    // on vérifie si les variables sont égales à true et remplies donc les conditions de validation alors on soumet le formulaire.
    if (checkLast && 
        checkFirst && 
        checkEmail &&
        checkBirthDate &&
        checkQuantity &&
        checkLocations &&
        checkCgu ) {
        console.log('submit form');
        // on appelle cette fonction pour fermer la modale à la soumission
        closeModalSubmit();
        // on appelle cette fonction pour effacer les messages d'erreurs lors de la soumission du formulaire
        removeErrorsMsg();
        // on appelle cette fonction pour effacer les valeurs du formulaire après soumission
        clearValuesForm();
        // on appelle cette fonction pour ouvrir la modale avec le message de confirmation
        openModalConfirmation();
        // on return false pour pouvoir faire apparaître la modale de confirmation
        return false;
    } else {
        // Ici, si les variables sont égales à false et ne repondent aux conditions de validation du formulaire
        if(!checkLast) { // vérification du prénom
            // on affiche le message d'erreur
            divLast.setAttribute('data-error-visible', 'true');
            // on attribue le message d'erreur qui est dans l'objet errorMsg correspondant
            divLast.setAttribute('data-error', errorsMsg.last);
        }
        if(!checkFirst) { // vérification du champ prénom
            msgFirst.setAttribute('data-error-visible', 'true');
            msgFirst.setAttribute('data-error', errorsMsg.first);
        }
        if(!checkEmail) { // vérification du  champ email
            divEmail.setAttribute('data-error-visible', 'true');
            divEmail.setAttribute('data-error', errorsMsg.email);
        }
        if(!checkBirthDate) { // vérification du champ date de naissance
            divBirthDate.setAttribute('data-error-visible', 'true');
            divBirthDate.setAttribute('data-error', errorsMsg.birthdate);

        }
        if(!checkQuantity) { // vérification du champ quantité
            divContest.setAttribute('data-error-visible', 'true');
            divContest.setAttribute('data-error', errorsMsg.quantity);

        }
        if(!checkLocations) { // vérification si une option a été cochée 
            divLocations.setAttribute('data-error-visible', 'true');
        divLocations.setAttribute('data-error', errorsMsg.location);
        }
        if(!checkCgu) { // vérification du champ conditions d'utilisation
            divCGU.setAttribute('data-error-visible', 'true');
            divCGU.setAttribute('data-error', errorsMsg.checkbox);
        }
        // on retourne false pour rester sur la page du formulaire
        return false;
    }
        
}





















