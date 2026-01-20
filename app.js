import { experienceTemplate } from './experienceTemplate.js';
import { formationTemplate } from './formationTemplate.js';

// On compile une seule fois au début
const templates = {
    experience: Handlebars.compile(experienceTemplate),
    formation: Handlebars.compile(formationTemplate)
};

// Fonction simple pour charger du JSON
async function fetchJson(file) {
    const response = await fetch(file);
    return await response.json();
}

async function renderTemplate(jsonfile, containerId, templateType) {
    const data = await fetchJson(jsonfile);
    const html = templates[templateType](data);
    document.getElementById(containerId).innerHTML = html;
}

function updateBubbles(activeElement) {
    document.querySelectorAll('.timeline-bubble').forEach(b => {
        b.classList.remove('active');
        b.classList.add('text-secondary');
    });

    const bubble = activeElement.querySelector('.timeline-bubble');
    if (bubble) {
        bubble.classList.add('active');
        bubble.classList.remove('text-secondary');
    }
}

// 1. Charger les formations tout de suite
renderTemplate('formations.json', "formation-container", 'formation');

// 2. Écouteur de clic "intelligent" (Délégation d'événement)
// On écoute les clics sur un parent commun ou sur chaque div d'expérience
document.querySelectorAll('[id^="MPD-div-exp-"]').forEach(element => {
    element.addEventListener('click', async () => {
        const jsonFile = element.dataset.json; // On récupère le nom du fichier sur l'étiquette HTML
        
        // On affiche le contenu
        await renderTemplate(jsonFile, "experience-container", 'experience');
        
        // On met à jour les bulles
        updateBubbles(element);
    });
});