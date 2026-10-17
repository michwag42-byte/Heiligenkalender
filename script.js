 

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
                empty.textContent = 'noch kein Eintrag';
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

    let currentDate = new Date();

    // Vollständige Heiligen-Datenbank (Format: "MM-DD")
    const saintsDB = {
        // Januar
        "01-01": "Hochfest der Gottes Mutter Maria",
        "01-02": "Basilius der Große und Gregor von Nazianz",
        "01-06": "Erscheinung des Herrn (Heilige drei Könige)",
        "01-07": "Valentin, Bischof von Rätien",
        "01-08": "Severin, Mönch in Norikum",
        "01-13": "Hilarius, Bischof von Poitiers",
        "01-17": "Antonius, Mönchsvater in Ägypten",
        "01-20": "Sebastian; Fabian, Papst",
        "01-21": "Agnes",
        "01-22": "Vinzenz, Diakon und Märtyrer in Spanien",
        "01-24": "Franz von Sales",
        "01-28": "Thomas von Aquin",
        "01-31": "Johannes Bosco",
        
        // Februar
        "02-02": "Darstellung des Herrn (Hochfest)",
        "02-03": "Blasius",
        "02-04": "Rabanus Maurus, Bischof von Mainz",
        "02-05": "Agatha, Märtyrerin in Catania",
        "02-06": "Paul Miki und Gefährten",
        "02-08": "Hieronymus Ämiliani",
        "02-10": "Scholastika, Jungfrau",
        "02-11": "Gedenktag unsere Lieben Frau von Lourdes",
        "02-14": "Cyrill",
        "02-17": "Sieben Gründer des Servitenordens",
        "02-21": "Petrus Damiani",
        "02-22": "Kathedra Petri",
        "02-23": "Polykarp",
        "02-24": "Matthias, Apostel",
        "02-25": "Walburga, Äbtissin von Heidenheim in Franken",
        
        // März
        "03-04": "Kasimir, Königsohn",
        "03-06": "Fridolin von Säckingen, Mönch und Glaubensbote",
        "03-07": "Perpetua und Felizitas, Märtyrerinnen in Karthago",
        "03-08": "Johannes von Gott, Ordensgründer",
        "03-09": "Franziska, Witwe und Ordensgründerin in Rom",
        "03-14": "Mathilde",
        "03-15": "Klemens",
        "03-17": "Gertrud, Äbtissin von Nivelles",
        "03-18": "Cyrill, Bischof von Jerusalem",
        "03-19": "Josef, Bräutigam der Gottesmutter Maria",
        "03-21": "Benedikt von Nursia",
        "03-23": "Turibio von Mogrovejo",
        "03-25": "Verkündigung des Herrn",
        "03-26": "Liudger, Bischof von Münster",
        
        // April
        "04-02": "Franz von Paola",
        "04-04": "Isidor, Bischof von Sevilla",
        "04-05": "Vinzenz Ferrer, Ordensgründer",
        "04-07": "Johannes Baptist de la Salle, Priester",
        "04-11": "Stanislaus, Bischof von Krakau",
        "04-13": "Martin I., Papst, Märtyrer",
        "04-19": "Leo I., Papst",
        "04-21": "Bruder Konrad",
        "04-23": "Adalbert, Bischof von Prag",
        "04-24": "Fidelis von Sigmaringen, Ordenspriester",
        "04-25": "Markus, Evangelist",
        "04-27": "Petrus von Kanisius, Ordenspriester",
        "04-28": "Peter Chanel, Priester und Märtyrer in Ozeanien",
        "04-29": "Katharina von Siena",
        "04-30": "Pius V., Papst",
        
        // Mai
        "05-01": "Josef der Arbeiter",
        "05-02": "Athanasius, Bischof von Alexandrien",
        "05-03": "Philippus und Jakobus, Apostel",
        "05-04": "Florian und Lorch",
        "05-05": "Godehard, Bischof von Hildesheim",
        "05-12": "Nereus und Achilleus, Märtyrer",
        "05-16": "Johannes Nepomuk, Priester",
        "05-18": "Johannes I., Papst",
        "05-20": "Bernhardin von Siena, Ordenspriester",
        "05-21": "Herrman Josef, Ordenspriester",
        "05-22": "Rita von Cascia",
        "05-25": "Gregor VII., Papst",
        "05-26": "Philipp Neri, Priester",
        "05-27": "Augustinus, Bischof von Canterbury",
        
        // Juni
        "06-01": "Justin, Philosoph",
        "06-02": "Marcellinus und Petrus, Märtyrer in Rom",
        "06-03": "Karl Lwanga, Märtyrer in Uganda",
        "06-05": "Bonifatius, Bischof",
        "06-06": "Norbert von Xanten",
        "06-09": "Ephräm der Syrer, Diakon",
        "06-11": "Barnabas, Apostel",
        "06-13": "Antonius von Padua",
        "06-15": "Vitus, Märtyrer in Sizilien",
        "06-16": "Benno, Bischof von Meißen",
        "06-19": "Romuald, Abt",
        "06-21": "Aloisius Gonzaga, Ordensmann",
        "06-22": "Paulinus, Bischof von Nola",
        "06-24": "Geburt Johannes des Täufers",
        "06-27": "Hemma von Gurk",
        "06-28": "Irenäus, Bischof von Lyon und Märtyrer",
        "06-29": "Petrus und Paulus, Apostel",
        "06-30": "Otto, Bischof von Bamberg und Glaubensbote",
        
        // Juli
        "07-02": "Mariä Heimsuchung",
        "07-03": "Thomas, Apostel",
        "07-04": "Ulrich, Bischof von Augsburg",
        "07-06": "Maria Goretti, Jungfrau, Märtyrerin",
        "07-07": "Willibald, Bischof von Eichstätt",
        "07-08": "Kilian, Bischof von Würzburg",
        "07-10": "Knud, König von Dänemark",
        "07-11": "Benedikt von Nursia, Schutzpatron Europas",
        "07-13": "Heinrich II. und Kunigunde, Kaiserpaar",
        "07-15": "Bonaventura",
        "07-20": "Margareta, Jungfrau",
        "07-21": "Laurentius von Brindisi, Priester und Kirchenlehrer",
        "07-22": "Maria Magdalena",
        "07-23": "Brigitta von Schweden, Ordensgründerin",
        "07-24": "Christophorus, Märtyrer in Kleinasien",
        "07-25": "Jakobus, Apostel",
        "07-26": "Joachim und Anna, Eltern der Gottesmutter Maria",
        "07-29": "Marta von Betanien",
        "07-31": "Ignatius von Loyola",
        
        // August
        "08-01": "Alfons Maria von Liguori, Ordensgründer",
        "08-04": "Pfarrer von Ars",
        "08-06": "Verklärung des Herrn",
        "08-07": "Xystus II., Papst",
        "08-08": "Dominikus, Priester und Ordensgründer",
        "08-10": "Laurentius, Diakon",
        "08-11": "Klara von Assisi, Jungfrau und Ordensgründerin",
        "08-14": "Maximilian Maria Kolbe, Ordenspriester",
        "08-15": "Mariä Aufnahme in den Himmel",
        "08-16": "Stephan, König von Ungarn",
        "08-19": "Johannes Eudes, Priester und Ordensgründer",
        "08-21": "Pius X., Papst",
        "08-22": "Maria Königin",
        "08-24": "Bartholomäus",
        "08-27": "Monika, Mutter des Hl. Augustinus",
        "08-28": "Augustinus",
        
        // September
        "09-03": "Gregor der Große, Papst und Kirchenlehrer",
        "09-05": "Mutter Teresa",
        "09-08": "Mariä Geburt",
        "09-13": "Johannes Chrysostomus",
        "09-14": "Kreuzerhöhung",
        "09-16": "Kornelius, Papst",
        "09-17": "Hildegard von Bingen",
        "09-18": "Lambert, Bischof von Maastricht",
        "09-19": "Januarius, Bischof von Neapel, Märtyrer",
        "09-20": "Andreas Kim Taegon, Priester",
        "09-21": "Matthäus, Apostel, Evangelist",
        "09-23": "Pater Pio",
        "09-24": "Rupert von Salzburg",
        "09-27": "Vinzenz von Paul, Priester",
        "09-28": "Lioba, Äbtissin von Tauberbischofsheim",
        "09-29": "Michael, Gabriel und Rafael (Erzengel)",
        "09-30": "Hieronymus, Priester",
        
        // Oktober
        "10-01": "Theresia von Kinde Jesu, Ordensfrau",
        "10-04": "Franz von Assisi",
        "10-05": "Anna Schäffer und Faustina Kowalska",
        "10-06": "Bruno, Mönch, Einsiedler, Ordensgründer",
        "10-07": "Unsere liebe Frau vom Rosenkranz",
        "10-09": "Dionysius, Bischof von Paris und Johannes Leonardi, Priester",
        "10-12": "Carlo Acutis",
        "10-14": "Kallistus I., Papst",
        "10-15": "Theresia von Jesus, Ordensfrau",
        "10-16": "Hedwig von Andechs, Herzogin von Schlesien",
        "10-17": "Ignatius, Bischof von Antiochien",
        "10-18": "Lukas, Evangelist",
        "10-21": "Ursula und Gefährtinnen, Märtyrerin in Köln",
        "10-22": "Johannes Paul II., Papst",
        "10-23": "Johannes von Capestrano, Ordenspriester",
        "10-24": "Antonius Maria Claret, Bischof von Santiago in Kuba",
        "10-28": "Simon und Judas, Apostel",
        "10-31": "Wolfgang, Bischof von Regensburg",
        
        // November
        "11-01": "Allerheiligen",
        "11-02": "Allerseelen",
        "11-03": "Hubert, Bischof von Lüttich",
        "11-04": "Karl Borromäus, Bischof von Mailand",
        "11-06": "Leonhard, Einsiedler von Limoges",
        "11-09": "Weihetag der Lateranbasilika",
        "11-10": "Leo der Große, Papst",
        "11-11": "Martin, Bischof von Tours",
        "11-12": "Josaphat, Bischof von Polozk in Weißrussland",
        "11-15": "Albert der Große, Ordensmann, Bischof von Regensburg",
        "11-16": "Margareta, Königin von Schottland",
        "11-17": "Gertrud von Helfta, Ordensfrau",
        "11-18": "Weihetag der Basilika St. Peter und Paul in Rom",
        "11-19": "Elisabeth, Landgräfin von Thüringen",
        "11-21": "Unsere Liebe Frau in Jerusalem",
        "11-22": "Cäcilia, Jungfrau, Märtyrerin in Rom",
        "11-23": "Kolumban, Abt von Luxeuil und Bobbio",
        "11-25": "Katharina von Alexandrien",
        "11-26": "Konrad von Konstanz, Bischof",
        "11-30": "Andreas, Apostel",
        
        // Dezember
        "12-02": "Luzius, Bischof von Chur",
        "12-03": "Franz Xaver, Ordenspriester",
        "12-04": "Barbara, Märtyrerin in Nikomedien",
        "12-06": "Nikolaus, Bischof von Myra",
        "12-07": "Ambrosius, Bischof von Mailand",
        "12-11": "Damasus I., Papst",
        "12-13": "Lucia, Jungfrau, Märtyrerin in Syrakus",
        "12-14": "Johannes vom Kreuz, Ordenspriester",
        "12-23": "Johannes von Krakau, Priester",
        "12-25": "Weihnachten (Hochfest)",
        "12-26": "Stephanus",
        "12-27": "Johannes, Apostel und Evangelist",
        "12-29": "Thomas Becket, Bischof von Canterbury",
        "12-31": "Silvester I., Papst"
    };

    function updateSaintDisplay() {
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const key = `${month}-${day}`;

        const options = { day: 'numeric', month: 'long' };
        const dateString = currentDate.toLocaleDateString('de-DE', options);

        const saintName = saintsDB[key] || "Kein Eintrag für diesen Tag";

        document.getElementById('saintDateText').textContent = dateString;
        document.getElementById('saintNameText').textContent = saintName;
    }

    function changeDay(days) {
        currentDate.setDate(currentDate.getDate() + days);
        updateSaintDisplay();
    }

    // Beim Laden initialisieren
    updateSaintDisplay();

window.onload = renderApp;

