import { experienceTemplate } from './templates/experienceTemplate.js';
import { formationTemplate } from './templates/formationTemplate.js';
import { bubbleTimelineTemplate } from './templates/bubbleTimelineTemplate.js';

const templates = {
    experience: Handlebars.compile(experienceTemplate),
    formation: Handlebars.compile(formationTemplate),
    bubble: Handlebars.compile(bubbleTimelineTemplate)
};

async function fetchJson(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Loading error " + file, error);
        return null;
    }
}

async function renderTemplate(jsonfile, containerId, templateType) {
    const data = await fetchJson(jsonfile);
    if (!data) {
        return;
    }
    const html = templates[templateType](data);
    document.getElementById(containerId).innerHTML = html;
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

async function bindBubbleTimelineEvents(containerID, bubbleID) {
    document.querySelectorAll(`[id^="MPD-div-${bubbleID}"]`).forEach(element => {
        element.addEventListener('click', async () => {
            const data = element.dataset.json;
            if (!data) {
                return;
            }
            await renderTemplate(data, containerID, 'experience');
            updateBubbles(element);
        });
    });
}

async function renderBubbleTimelineExps() {
    const bubblesTimeline = await fetchJson("./datas/bubbleTimelineExps.json");
    await renderTemplate("./datas/bubbleTimelineExps.json", "bubbleTimelineExperience", "bubble");
    bindBubbleTimelineEvents("experience-container", "exp");
}

async function renderBubbleTimelineProject() {
    const bubblesTimeline = await fetchJson("./datas/bubbleTimelineProject.json");
    await renderTemplate("./datas/bubbleTimelineProject.json", "bubbleTimelineProject", "bubble");
    bindBubbleTimelineEvents("project-container", "project");
}

renderTemplate('./datas/formations.json', "formation-container", 'formation');
await renderBubbleTimelineExps();
await renderBubbleTimelineProject();
