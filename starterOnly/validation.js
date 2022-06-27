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
const divLocations = document.getElementById('dataLocations');
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

// variables permettant de savoir si un champ du formulaire est rempli correctement.
checkFirst=false;
checkLast=false;
checkEmail = false;
checkBirthDate = false;
checkQuantity = false;
checkLocations = false;
checkCgu = false;

// Elements du DOM correspondant aux div où les messages d'erreurs vont être affichées.
const msgFirst = document.getElementById('dataFirst');
const msgLast = document.getElementById('dataLast');
const msgEmail = document.getElementById('dataEmail');
const msgBirthDate = document.getElementById('dataBirth');
const msgContest = document.getElementById('dataContest');
const msgCGU = document.getElementById('dataCGU');

/**
 * On ajoute un écouteur d'évènements sur tous les inputs du formulaire.
 */
 const inputsForm = [
    firstName, lastName, email, birthdayDate, quantityContest,checkboxCGU
]
// pour chaque input du tableau inputsForm, on lui ajoute un écouteur d'évènement 'change' qui apellera la fonction checkValuesForm.
for (let input of inputsForm) {
    input.addEventListener('change', checkValuesForm);
}

/**
 * Cette fonction permet de vérifier toutes les valeurs saisies  ou choisies par l'utilisateur si elles sont valides.
 * @param {Event} e
 * @returns 
 */
function checkValuesForm(e) {
    // la valeur du champ
    const valueField = e.target.value;
    // en fonction de l'id
    switch(e.target.id) {
        // dans le cas du prénom
        case 'first': 
            if (valueField.length > 1 && regexName.test(valueField)) {
                msgFirst.setAttribute('data-error-visible', 'false');
                checkFirst=true;
            } else {
                msgFirst.setAttribute('data-error-visible', 'true');
                msgFirst.setAttribute('data-error', errorsMsg.first);
                checkFirst=false;
            };
            break;
        // dans le cas du nom
        case 'last': 
            if (valueField.length > 1 && regexName.test(valueField)) {
                msgLast.setAttribute('data-error-visible', 'false');
                checkLast = true;
            } else {
                msgLast.setAttribute('data-error-visible', 'true');
                msgLast.setAttribute('data-error', errorsMsg.last);
                checkLast = false;
            };
            break;
        // dans le cas de l'email
        case 'email':
            // si la valeur saisie est vide
            if (valueField!=='' && regexEmail.test(valueField)) {
                msgEmail.setAttribute('data-error-visible', 'false');
                checkEmail = true;
            } else {
                msgEmail.setAttribute('data-error-visible', 'true');
                msgEmail.setAttribute('data-error', errorsMsg.email);
                checkEmail = false;
            };
            break;
        // dans le cas de la date de naissance
        case 'birthdate': // date de naissance
            let birthdate = new Date(valueField);
            let birthdatepicked = birthdate.toLocaleDateString();
            let today = new Date().toLocaleDateString();
            if( regexBirthDate.test(valueField) && birthdatepicked <= today) {
                msgBirthDate.setAttribute('data-error-visible', 'false');
                checkBirthDate = true;
            } else {
                msgBirthDate.setAttribute('data-error-visible', 'true');
                msgBirthDate.setAttribute('data-error', errorsMsg.birthdate);
                checkBirthDate = false;
            };
            break;
        // dans le cas du nombre de tournois
        case 'quantity': 
            if( !isNaN(valueField) && regexNumbers.test(valueField)) {
                msgContest.setAttribute('data-error-visible', 'false');
                checkQuantity= true;
            } else {
                msgContest.setAttribute('data-error-visible', 'true');
                msgContest.setAttribute('data-error', errorsMsg.quantity);

                checkQuantity= false;
            };
            break;
        // dans le cas de la checkbox CGU
        case 'checkbox1': 
            if (checkboxCGU.checked) {
                msgCGU.setAttribute('data-error-visible', 'false');
                checkCgu = true;
            } else {
                msgCGU.setAttribute('data-error-visible', 'true');
                msgCGU.setAttribute('data-error', errorsMsg.checkbox);
                checkCgu = false;
            };
            break;
        // par défaut on applique le console.log
        default: console.log('ca ne va pas du tout !');
    }
}
/**
 * On vérifie si une location est cochée
 */
function checkLocationsOptions() {
    for (let location of locations) {
        // pour chaque location on lui associe un écouteur d'évènement
        location.addEventListener('change', checkRadiosLocations);    
        function checkRadiosLocations() {
            // on vérifie si une location est cochée
            if(location.checked) {
                // le message d'erreur ne s'affiche pas
                divLocations.setAttribute('data-error-visible', 'false');
                checkLocations = true;
            } else {
                // sinon le message d'erreur s'affiche
                divLocations.setAttribute('data-error-visible', 'true');
                divLocations.setAttribute('data-error', errorsMsg.location);
                checkLocations= false;
            } ;     
        }
    }
}


/**
 * Cette fonction permet de vérifier si la checkbox CGU est cochée et de nous retourner le résultat de la variable checkCgu.
 */
function checkCheckboxCgu() {
    if (checkboxCGU.checked) {
        msgCGU.setAttribute('data-error-visible', 'false');
        checkCgu = true;
        
    } else {
        msgCGU.setAttribute('data-error-visible', 'true');
        msgCGU.setAttribute('data-error', errorsMsg.checkbox);
        checkCgu = false;
    };
}

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
    // on appelle la fonction qui permet de vérifier si une location est bien cochée.
    checkLocationsOptions();
    // on appelle la fonction qui permet de vérifier si la checkbox CGU est cochée.
    checkCheckboxCgu();
    // on vérifie si les variables sont égales à true et remplies donc les conditions de validation
    // si c'est le cas, alors on soumet le formulaire.
    if (checkLast && 
        checkFirst && 
        checkEmail &&
        checkBirthDate &&
        checkQuantity &&
        checkLocations &&
        checkCgu ) {
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
        // Ici, si les variables sont égales à false et ne repondent pas aux conditions de validation du formulaire
        if(!checkLast) { // vérification du prénom
            // on affiche le message d'erreur
            msgLast.setAttribute('data-error-visible', 'true');
            // on attribue le message d'erreur qui est dans l'objet errorMsg correspondant
            msgLast.setAttribute('data-error', errorsMsg.last);
        }
        if(!checkFirst) { // vérification du champ prénom
            msgFirst.setAttribute('data-error-visible', 'true');
            msgFirst.setAttribute('data-error', errorsMsg.first);
        }
        if(!checkEmail) { // vérification du  champ email
            msgEmail.setAttribute('data-error-visible', 'true');
            msgEmail.setAttribute('data-error', errorsMsg.email);
        }
        if(!checkBirthDate) { // vérification du champ date de naissance
            msgBirthDate.setAttribute('data-error-visible', 'true');
            msgBirthDate.setAttribute('data-error', errorsMsg.birthdate);

        }
        if(!checkQuantity) { // vérification du champ quantité
            msgContest.setAttribute('data-error-visible', 'true');
            msgContest.setAttribute('data-error', errorsMsg.quantity);

        }
        if(!checkLocations) { // vérification si une option a été cochée 
            divLocations.setAttribute('data-error-visible', 'true');
            divLocations.setAttribute('data-error', errorsMsg.location);
        }
        if(!checkCgu) { // vérification du champ conditions d'utilisation
            msgCGU.setAttribute('data-error-visible', 'true');
            msgCGU.setAttribute('data-error', errorsMsg.checkbox);
        }
        // on retourne false pour rester sur la page du formulaire
        return false;
    }
        
}





















