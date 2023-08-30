// RESPONSIVE
function Menu() {
    let html = document.documentElement;
    let navbarR = document.getElementById('nav_menuR');
    let valeur = window.getComputedStyle(navbarR).getPropertyValue('visibility');
    
    // Afficher le Menu s'il est caché
    if (valeur === 'hidden') {
        html.style.overflowY = 'hidden';
        navbarR.style.visibility = 'visible';
        console.log('Menu affiché');
    } 
}