import { experienceTemplate } from './templates/experienceTemplate.js';
import { formationTemplate } from './templates/formationTemplate.js';
import { bubbleTimelineTemplate } from './templates/bubbleTimelineTemplate.js';

// On compile une seule fois au début
const templates = {
    experience: Handlebars.compile(experienceTemplate),
    formation: Handlebars.compile(formationTemplate),
    bubble: Handlebars.compile(bubbleTimelineTemplate)
};

async function fetchJson(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Loading error " + file, error);
        return null;
    }
}

async function renderTemplate(jsonfile, containerHTMLId, templateType) {
    const data = await fetchJson(jsonfile);
    if (!data) return;
    const html = templates[templateType](data);
    document.getElementById(containerHTMLId).innerHTML = html;
}

function updateBubbles(activeElement) {
    const currentActive = document.querySelector('.timeline-bubble.active')
    if (currentActive) {
        currentActive.classList.remove('active');
        currentActive.classList.add('text-secondary');
    }
        
    const newActive = activeElement.querySelector('.timeline-bubble');
    if (newActive) {
        newActive.classList.add('active');
        newActive.classList.remove('text-secondary');
    }
}

async function bindBubbleTimelineEvents() {
    document.querySelectorAll('[id^="MPD-div-exp-"]').forEach(element => {
        element.addEventListener('click', async () => {
            const jsonFile = element.dataset.json;
            if (jsonFile) {
                await renderTemplate(jsonFile, "experience-container", 'experience');
                updateBubbles(element);
            }
        });
    });
}

async function renderBubbleTimeline() {
    const container = document.getElementById("bubbleTimeline");
    const bubblesTimeline = await fetchJson("./datas/bubbleTimeline.json");

    if (!bubblesTimeline) return;
    document.getElementById("bubbleTimeline").innerHTML = "";
    const allBubblesHtml = bubblesTimeline.experiences
        .map(experience => templates["bubble"](experience))
        .join('');
    container.innerHTML = allBubblesHtml;
    bindBubbleTimelineEvents();
}

renderTemplate('./datas/formations.json', "formation-container", 'formation');
await renderBubbleTimeline();

