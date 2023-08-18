// Appeler la fonction de génération de mot de passe au chargement initial
window.addEventListener("load", function () {
    genererMotDePasse();
});


// Accordéon des panneaux
function Accordéon(boutonId, panneauId) {
    var bouton = document.getElementById(boutonId)
    var panneau = document.getElementById(panneauId);

    if (panneau.classList.contains('active')) {
        bouton.classList.remove('active');
        panneau.classList.remove('active');
    } else {
        // Enlever ou ajouter la class active pour le style
        var boutons = document.querySelectorAll('.accordéon');
        boutons.forEach(pan => pan.classList.remove('active'));
        var panneaux = document.querySelectorAll('.panneau');
        panneaux.forEach(pan => pan.classList.remove('active'));
        
        bouton.classList.add('active');
        panneau.classList.add('active');
    }
}

// Réinitialiser le mot de passe
const reinitialiser = document.getElementById("réinitialiser");
reinitialiser.addEventListener("click", function () {
  genererMotDePasse();
});


// Générer le mot de passe
function genererMotDePasse() {
    const options = document.querySelectorAll('input[name="options"]:checked');
    if (options.length === 0) {
        // Si aucune options sélectionnées, alerter
        alert("Veuillez sélectionner au moins une option de mot de passe.");
        return;
    }

    let bouton1 = document.getElementById('bouton1').className
    let bouton2 = document.getElementById('bouton2').className
    let chemin;
    if (bouton1 == 'accordéon active' && bouton2 == 'accordéon') {
        chemin = 1;
    } else if (bouton1 == 'accordéon' && bouton2 == 'accordéon active') {
        chemin = 2;
    } else {
        chemin = 1;
    }

    var longueur;
    if (chemin == 1) {
        var radios = document.getElementsByName('x');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                longueur = radios[i].value;
            }
        }
    } else if (chemin == 2) {
        longueur = document.getElementById('nombreX').value
    }

    console.log('valeur de longueur = ' + longueur)

    
    const caracteresMinuscules = "abcdefghijklmnopqrstuvwxyz";
    const caracteresMajuscules = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const chiffres = "0123456789";
    const caracteresSpeciaux = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let caracteresPermis = "";

    // Construire une liste de caractères possibles pour chaque option sélectionnée
    options.forEach(option => {
        switch (option.id) {
            case "lower":
                caracteresPermis += caracteresMinuscules;
                break;
            case "upper":
                caracteresPermis += caracteresMajuscules;
                break;
            case "integers":
                caracteresPermis += chiffres;
                break;
            case "special_char":
                caracteresPermis += caracteresSpeciaux;
                break;
        }
    });

    let motDePasse = "";

    // Sélectionner au moins un caractère de chaque option sélectionnée
    options.forEach(option => {
        switch (option.id) {
            case "lower":
                motDePasse += caracteresMinuscules.charAt(Math.floor(Math.random() * caracteresMinuscules.length));
                break;
            case "upper":
                motDePasse += caracteresMajuscules.charAt(Math.floor(Math.random() * caracteresMajuscules.length));
                break;
            case "integers":
                motDePasse += chiffres.charAt(Math.floor(Math.random() * chiffres.length));
                break;
            case "special_char":
                motDePasse += caracteresSpeciaux.charAt(Math.floor(Math.random() * caracteresSpeciaux.length));
                break;
        }
    });

    // Compléter le reste des caractères nécessaires aléatoirement
    while (motDePasse.length < longueur) {
        const randomIndex = Math.floor(Math.random() * caracteresPermis.length);
        motDePasse += caracteresPermis.charAt(randomIndex);
    }

    // Mélanger le mot de passe pour plus de sécurité
    motDePasse = motDePasse.split('').sort(function () { return 0.5 - Math.random() }).join('');
    document.getElementById("mdp_généré").value = motDePasse;
}


// Copier le mot de passe
let copier = document.getElementById("copier");
let texte = document.getElementById("mdp_généré");

copier.addEventListener("click", function () {
    texte.select();
    navigator.clipboard.writeText(texte.value);
    console.log("Copié");

    document.getElementById('copier').innerHTML = 'Copié !';

    // Réinitialiser le bouton "Copier" après 5 secondes
    setTimeout(function () {
        document.getElementById('copier').innerHTML = 'Copier';
        reinitialiserMotDePasse()
    }, 5000);
});


// Ouvrir et pré-remplir le mail du formulaire de contact
document.getElementById("envoyer").onsubmit = function(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    var email = document.getElementById("email").value;
    var objet = document.getElementById("objet").value;
    var message = document.getElementById("message").value;
    const info = "- Mail envoyé depuis le site Générateur de mot de passe -"
    
    var mailtoUrl = "mailto:lowan.qrt@gmail.com" +
                    "?subject=" + encodeURIComponent(objet) +
                    "&body=" + encodeURIComponent(info + '\n\n' + message);

    window.location.href = mailtoUrl; // Rediriger vers l'URL "mailto"
};