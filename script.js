 

const monate = [
    { name: "Januar", tage: 31 },
    { name: "Februar", tage: 28 },
    { name: "März", tage: 31 },
    { name: "April", tage: 30 },
    { name: "Mai", tage: 31 },
    { name: "Juni", tage: 30 },
    { name: "Juli", tage: 31 },
    { name: "August", tage: 31 },
    { name: "September", tage: 30 },
    { name: "Oktober", tage: 31 },
    { name: "November", tage: 30 },
    { name: "Dezember", tage: 31 }
];



function ladeRohdaten() {
    const daten = {};
    monate.forEach(m => daten[m.name] = {});

    const rohpunkte = document.querySelectorAll('#rohdatenListe p');
    rohpunkte.forEach(p => {
        const text = p.textContent.trim();
        const match = text.match(/^(\d+)\.\s*([A-Za-zÄÖÜäöüß]+)\s*:\s*(.*)$/);
        if (match) {
            const tag = match[1];
            let monat = match[2];
            monat = monat.charAt(0).toUpperCase() + monat.slice(1).toLowerCase();
            const heiliger = match[3];

            if (daten[monat]) {
                if (!daten[monat][tag]) daten[monat][tag] = [];
                daten[monat][tag].push(heiliger);
            }
        }
    });
    return daten;
}

function renderApp() {
    const heiligenDaten = ladeRohdaten();
    const gridContainer = document.getElementById('calendarGrid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    monate.forEach((m, index) => {
        const monthDetails = document.createElement('details');
        monthDetails.className = 'month-accordion';
        if (index === 0) monthDetails.open = false;

        const monthSummary = document.createElement('summary');
        monthSummary.textContent = `${m.name} (${m.tage} Tage)`;
        monthDetails.appendChild(monthSummary);

        const daysContainer = document.createElement('div');
        daysContainer.className = 'days-container';

        const monatsTageDaten = heiligenDaten[m.name] || {};

        for (let tag = 1; tag <= m.tage; tag++) {
            const dayDetails = document.createElement('details');
            dayDetails.className = 'day-accordion';

            const daySummary = document.createElement('summary');
            daySummary.textContent = `${tag}. ${m.name}`;
            dayDetails.appendChild(daySummary);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'day-content';

            const eintraege = monatsTageDaten[tag];
            if (eintraege && eintraege.length > 0) {
                eintraege.forEach(e => {
                    const div = document.createElement('div');
                    div.className = 'saint-item';
                    div.textContent = e;
                    contentDiv.appendChild(div);
                });
            } else {
                const empty = document.createElement('div');
                empty.className = 'empty-day';
                empty.textContent = 'Kein Eintrag';
                contentDiv.appendChild(empty);
            }

            dayDetails.appendChild(contentDiv);
            daysContainer.appendChild(dayDetails);
        }

        monthDetails.appendChild(daysContainer);
        gridContainer.appendChild(monthDetails);
    });
}

// Einstellungen öffnen/schließen
document.getElementById('settingsToggleBtn').addEventListener('click', () => {
    const box = document.getElementById('settingsBox');
    if (box) {
        box.style.display = (box.style.display === 'none' || box.style.display === '') ? 'block' : 'none';
    }
});



// Textfarbe
const textPicker = document.getElementById('textColorPicker');
if (textPicker) {
    textPicker.addEventListener('input', (e) => {
        document.querySelectorAll('p').forEach(el => el.style.color = e.target.value);
    });
}

// H2-Überschriften Farbe
const h2Picker = document.getElementById('h2ColorPicker');
if (h2Picker) {
    h2Picker.addEventListener('input', (e) => {
        document.querySelectorAll('h2').forEach(el => el.style.color = e.target.value);
    });
}

// Hintergrundfarbe
const bgPicker = document.getElementById('bgColorPicker');
if (bgPicker) {
    bgPicker.addEventListener('input', (e) => {
        document.body.style.backgroundColor = e.target.value;
    });
}

// Schriftgröße
const sizeSlider = document.getElementById('fontSizeSlider');
if (sizeSlider) {
    sizeSlider.addEventListener('input', (e) => {
        document.body.style.fontSize = e.target.value + '%';
        const valSpan = document.getElementById('fontSizeValue');
        if (valSpan) valSpan.innerText = e.target.value + '%';
    });
}

window.onload = renderApp;

