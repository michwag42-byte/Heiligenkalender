 

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
// Dein kompletter Heiligenkalender für das Jahr
const saintsDatabase = [
    // Januar
    { name: "Hochfest der Gottes Mutter Maria", date: "01-01" },
    { name: "Basilius der Große und Gregor von Nazianz", date: "01-02" },
    { name: "Erscheinung des Herrn (Heilige drei Könige)", date: "01-06" },
    { name: "Valentin, Bischof von Rätien", date: "01-07" },
    { name: "Severin, Mönch in Norikum", date: "01-08" },
    { name: "Hilarius, Bischof von Poitiers", date: "01-13" },
    { name: "Antonius, Mönchsvater in Ägypten", date: "01-17" },
    { name: "Sebastian; Fabian, Papst", date: "01-20" },
    { name: "Agnes", date: "01-21" },
    { name: "Vinzenz, Diakon und Märtyrer in Spanien", date: "01-22" },
    { name: "Franz von Sales", date: "01-24" },
    { name: "Thomas von Aquin", date: "01-28" },
    { name: "Johannes Bosco", date: "01-31" },

    // Februar
    { name: "Darstellung des Herrn (Hochfest)", date: "02-02" },
    { name: "Blasius", date: "02-03" },
    { name: "Rabanus Maurus, Bischof von Mainz", date: "02-04" },
    { name: "Agatha, Märtyrerin in Catania", date: "02-05" },
    { name: "Paul Miki und Gefährten", date: "02-06" },
    { name: "Hieronymus Ämiliani", date: "02-08" },
    { name: "Scholastika, Jungfrau", date: "02-10" },
    { name: "Gedenktag unsere Lieben Frau von Lourdes", date: "02-11" },
    { name: "Cyrill", date: "02-14" },
    { name: "Sieben Gründer des Servitenordens", date: "02-17" },
    { name: "Petrus Damiani", date: "02-21" },
    { name: "Kathedra Petri", date: "02-22" },
    { name: "Polykarp", date: "02-23" },
    { name: "Matthias, Apostel", date: "02-24" },
    { name: "Walburga, Äbtissin von Heidenheim in Franken", date: "02-25" },

    // März
    { name: "Kasimir, Königsohn", date: "03-04" },
    { name: "Fridolin von Säckingen, Mönch und Glaubensbote", date: "03-06" },
    { name: "Perpetua und Felizitas, Märtyrerinnen in Karthago", date: "03-07" },
    { name: "Johannes von Gott, Ordensgründer", date: "03-08" },
    { name: "Franziska, Witwe und Ordensgründerin in Rom", date: "03-09" },
    { name: "Mathilde", date: "03-14" },
    { name: "Klemens", date: "03-15" },
    { name: "Gertrud, Äbtissin von Nivelles", date: "03-17" },
    { name: "Cyrill, Bischof von Jerusalem", date: "03-18" },
    { name: "Josef, Bräutigam der Gottesmutter Maria", date: "03-19" },
    { name: "Benedikt von Nursia", date: "03-21" },
    { name: "Turibio von Mogrovejo", date: "03-23" },
    { name: "Verkündigung des Herrn", date: "03-25" },
    { name: "Liudger, Bischof von Münster", date: "03-26" },

    // April
    { name: "Franz von Paola", date: "04-02" },
    { name: "Isidor, Bischof von Sevilla", date: "04-04" },
    { name: "Vinzenz Ferrer, Ordensgründer", date: "04-05" },
    { name: "Johannes Baptist de la Salle, Priester", date: "04-07" },
    { name: "Stanislaus, Bischof von Krakau", date: "04-11" },
    { name: "Martin I., Papst, Märtyrer", date: "04-13" },
    { name: "Leo I., Papst", date: "04-19" },
    { name: "Bruder Konrad", date: "04-21" },
    { name: "Adalbert, Bischof von Prag", date: "04-23" },
    { name: "Fidelis von Sigmaringen, Ordenspriester", date: "04-24" },
    { name: "Markus, Evangelist", date: "04-25" },
    { name: "Petrus von Kanisius, Ordenspriester", date: "04-27" },
    { name: "Peter Chanel, Priester und Märtyrer in Ozeanien", date: "04-28" },
    { name: "Katharina von Siena", date: "04-29" },
    { name: "Pius V., Papst", date: "04-30" },

    // Mai
    { name: "Josef der Arbeiter", date: "05-01" },
    { name: "Athanasius, Bischof von Alexandrien", date: "05-02" },
    { name: "Philippus und Jakobus, Apostel", date: "05-03" },
    { name: "Florian", date: "05-04" },
    { name: "Godehard, Bischof von Hildesheim", date: "05-05" },
    { name: "Nereus und Achilleus, Märtyrer", date: "05-12" },
    { name: "Johannes Nepomuk, Priester", date: "05-16" },
    { name: "Johannes I., Papst", date: "05-18" },
    { name: "Bernhardin von Siena, Ordenspriester", date: "05-20" },
    { name: "Hermann Josef, Ordenspriester", date: "05-21" },
    { name: "Rita von Cascia", date: "05-22" },
    { name: "Gregor VII., Papst", date: "05-25" },
    { name: "Philipp Neri, Priester", date: "05-26" },
    { name: "Augustinus, Bischof von Canterbury", date: "05-27" },

    // Juni
    { name: "Justin, Philosoph", date: "06-01" },
    { name: "Marcellinus und Petrus, Märtyrer in Rom", date: "06-02" },
    { name: "Karl Lwanga und Gefährten, Märtyrer in Uganda", date: "06-03" },
    { name: "Bonifatius, Bischof", date: "06-05" },
    { name: "Norbert von Xanten", date: "06-06" },
    { name: "Ephräm der Syrer, Diakon", date: "06-09" },
    { name: "Barnabas, Apostel", date: "06-11" },
    { name: "Antonius von Padua", date: "06-13" },
    { name: "Vitus, Märtyrer in Sizilien", date: "06-15" },
    { name: "Benno, Bischof von Meißen", date: "06-16" },
    { name: "Romuald, Abt", date: "06-19" },
    { name: "Aloisius Gonzaga, Ordensmann", date: "06-21" },
    { name: "Paulinus, Bischof von Nola", date: "06-22" },
    { name: "Geburt Johannes des Täufers", date: "06-24" },
    { name: "Hemma von Gurk", date: "06-27" },
    { name: "Irenäus, Bischof von Lyon und Märtyrer", date: "06-28" },
    { name: "Petrus und Paulus, Apostel", date: "06-29" },
    { name: "Otto, Bischof von Bamberg und Glaubensbote", date: "06-30" },

    // Juli
    { name: "Mariä Heimsuchung", date: "07-02" },
    { name: "Thomas, Apostel", date: "07-03" },
    { name: "Ulrich, Bischof von Augsburg", date: "07-04" },
    { name: "Maria Goretti, Jungfrau, Märtyrerin", date: "07-06" },
    { name: "Willibald, Bischof von Eichstätt", date: "07-07" },
    { name: "Kilian, Bischof von Würzburg", date: "07-08" },
    { name: "Knud, König von Dänemark", date: "07-10" },
    { name: "Benedikt von Nursia, Schutzpatron Europas", date: "07-11" },
    { name: "Heinrich II. und Kunigunde, Kaiserpaar", date: "07-13" },
    { name: "Bonaventura", date: "07-15" },
    { name: "Margareta, Jungfrau", date: "07-20" },
    { name: "Laurentius von Brindisi, Priester und Kirchenlehrer", date: "07-21" },
    { name: "Maria Magdalena", date: "07-22" },
    { name: "Brigitta von Schweden, Ordensgründerin", date: "07-23" },
    { name: "Christophorus, Märtyrer in Kleinasien", date: "07-24" },
    { name: "Jakobus, Apostel", date: "07-25" },
    { name: "Joachim und Anna, Eltern der Gottesmutter Maria", date: "07-26" },
    { name: "Marta von Betanien", date: "07-29" },
    { name: "Ignatius von Loyola", date: "07-31" },

    // August
    { name: "Alfons Maria von Liguori, Ordensgründer", date: "08-01" },
    { name: "Pfarrer von Ars", date: "08-04" },
    { name: "Verklärung des Herrn", date: "08-06" },
    { name: "Sixtus II., Papst, und Gefährten", date: "08-07" },
    { name: "Dominikus, Priester und Ordensgründer", date: "08-08" },
    { name: "Laurentius, Diakon", date: "08-10" },
    { name: "Klara von Assisi, Jungfrau und Ordensgründerin", date: "08-11" },
    { name: "Maximilian Maria Kolbe, Ordenspriester", date: "08-14" },
    { name: "Mariä Aufnahme in den Himmel", date: "08-15" },
    { name: "Stephan, König von Ungarn", date: "08-16" },
    { name: "Johannes Eudes, Priester und Ordensgründer", date: "08-19" },
    { name: "Pius X., Papst", date: "08-21" },
    { name: "Maria Königin", date: "08-22" },
    { name: "Bartholomäus, Apostel", date: "08-24" },
    { name: "Monika, Mutter des Hl. Augustinus", date: "08-27" },
    { name: "Augustinus, Bischof und Kirchenlehrer", date: "08-28" },

    // September
    { name: "Gregor der Große, Papst und Kirchenlehrer", date: "09-03" },
    { name: "Mutter Teresa", date: "09-05" },
    { name: "Mariä Geburt", date: "09-08" },
    { name: "Johannes Chrysostomus", date: "09-13" },
    { name: "Kreuzerhöhung", date: "09-14" },
    { name: "Kornelius, Papst, und Cyprian, Bischof", date: "09-16" },
    { name: "Hildegard von Bingen", date: "09-17" },
    { name: "Lambert, Bischof von Maastricht", date: "09-18" },
    { name: "Januarius, Bischof von Neapel, Märtyrer", date: "09-19" },
    { name: "Andreas Kim Taegon und Gefährten", date: "09-20" },
    { name: "Matthäus, Apostel und Evangelist", date: "09-21" },
    { name: "Pater Pio", date: "09-23" },
    { name: "Rupert von Salzburg", date: "09-24" },
    { name: "Vinzenz von Paul, Priester", date: "09-27" },
    { name: "Lioba, Äbtissin", date: "09-28" },
    { name: "Michael, Gabriel und Rafael (Erzengel)", date: "09-29" },
    { name: "Hieronymus, Priester und Kirchenlehrer", date: "09-30" },

    // Oktober
    { name: "Theresia vom Kinde Jesus, Ordensfrau", date: "10-01" },
    { name: "Franz von Assisi", date: "10-04" },
    { name: "Anna Schäffer und Faustina Kowalska", date: "10-05" },
    { name: "Bruno, Mönch, Einsiedler, Ordensgründer", date: "10-06" },
    { name: "Unsere Liebe Frau vom Rosenkranz", date: "10-07" },
    { name: "Dionysius und Johannes Leonardi", date: "10-09" },
    { name: "Carlo Acutis", date: "10-12" },
    { name: "Kallistus I., Papst", date: "10-14" },
    { name: "Theresia von Jesus, Ordensfrau", date: "10-15" },
    { name: "Hedwig von Andechs", date: "10-16" },
    { name: "Ignatius, Bischof von Antiochien", date: "10-17" },
    { name: "Lukas, Evangelist", date: "10-18" },
    { name: "Ursula und Gefährtinnen", date: "10-21" },
    { name: "Johannes Paul II., Papst", date: "10-22" },
    { name: "Johannes von Capestrano", date: "10-23" },
    { name: "Antonius Maria Claret", date: "10-24" },
    { name: "Simon und Judas, Apostel", date: "10-28" },
    { name: "Wolfgang, Bischof von Regensburg", date: "10-31" },

    // November
    { name: "Allerheiligen", date: "11-01" },
    { name: "Allerseelen", date: "11-02" },
    { name: "Hubert, Bischof von Lüttich", date: "11-03" },
    { name: "Karl Borromäus", date: "11-04" },
    { name: "Leonhard, Einsiedler", date: "11-06" },
    { name: "Weihetag der Lateranbasilika", date: "11-09" },
    { name: "Leo der Große, Papst", date: "11-10" },
    { name: "Martin, Bischof von Tours", date: "11-11" },
    { name: "Josaphat, Bischof", date: "11-12" },
    { name: "Albert der Große", date: "11-15" },
    { name: "Margareta von Schottland", date: "11-16" },
    { name: "Gertrud von Helfta", date: "11-17" },
    { name: "Weihetag der Basiliken St. Peter und Paul", date: "11-18" },
    { name: "Elisabeth, Landgräfin von Thüringen", date: "11-19" },
    { name: "Unsere Liebe Frau in Jerusalem", date: "11-21" },
    { name: "Cäcilia, Jungfrau, Märtyrerin", date: "11-22" },
    { name: "Kolumban, Abt", date: "11-23" },
    { name: "Katharina von Alexandrien", date: "11-25" },
    { name: "Konrad von Konstanz", date: "11-26" },
    { name: "Andreas, Apostel", date: "11-30" },

    // Dezember
    { name: "Luzius, Bischof von Chur", date: "12-02" },
    { name: "Franz Xaver, Ordenspriester", date: "12-03" },
    { name: "Barbara, Märtyrerin", date: "12-04" },
    { name: "Nikolaus, Bischof von Myra", date: "12-06" },
    { name: "Ambrosius, Bischof von Mailand", date: "12-07" },
    { name: "Damasus I., Papst", date: "12-11" },
    { name: "Lucia, Jungfrau, Märtyrerin", date: "12-13" },
    { name: "Johannes vom Kreuz", date: "12-14" },
    { name: "Johannes von Krakau, Priester", date: "12-23" },
    { name: "Weihnachten (Hochfest)", date: "12-25" },
    { name: "Stephanus, erster Märtyrer", date: "12-26" },
    { name: "Johannes, Apostel und Evangelist", date: "12-27" },
    { name: "Thomas Becket, Bischof", date: "12-29" },
    { name: "Silvester I., Papst", date: "12-31" }
];

// Elemente aus dem HTML holen
const input = document.getElementById('saintInput');
const list = document.getElementById('autocompleteList');
const toggle = document.getElementById('notificationToggle');
const saveBtn = document.getElementById('saveButton');

// 1. Autovervollständigung beim Tippen
input.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    list.innerHTML = '';
    
    if (!value) {
        list.style.display = 'none';
        return;
    }

    // Filtert die Heiligen-Liste nach dem eingegebenen Text
    const filtered = saintsDatabase.filter(s => s.name.toLowerCase().includes(value));
    
    if (filtered.length > 0) {
        list.style.display = 'block';
        filtered.forEach(saint => {
            const item = document.createElement('div');
            item.style.padding = '8px';
            item.style.cursor = 'pointer';
            item.style.borderBottom = '1px solid #eee';
            item.innerHTML = `${saint.name} <small style="color:gray;">(${saint.date})</small>`;
            
            // Wenn man auf einen Vorschlag klickt, wird er ins Eingabefeld übernommen
            item.addEventListener('click', function() {
                input.value = saint.name;
                list.style.display = 'none';
            });
            list.appendChild(item);
        });
    } else {
        list.style.display = 'none';
    }
});

// Schließt die Liste, wenn man außerhalb klickt
document.addEventListener('click', function(e) {
    if (e.target !== input) {
        list.style.display = 'none';
    }
});

// 2. Einstellungen speichern und Browser-Berechtigung anfragen
saveBtn.addEventListener('click', async function() {
    const selectedSaint = input.value;
    const notificationsActive = toggle.checked;

    // Prüfen, ob der eingegebene Heilige auch in der Liste existiert
    const found = saintsDatabase.find(s => s.name.toLowerCase() === selectedSaint.toLowerCase());
    if (!found && selectedSaint !== "") {
        alert("Bitte wähle einen Heiligen aus der Vorschlagsliste aus.");
        return;
    }

    // Wenn Benachrichtigungen aktiviert werden sollen, Erlaubnis im Browser anfragen
    if (notificationsActive && "Notification" in window) {
        let permission = await Notification.requestPermission();
        if (permission !== "granted") {
            alert("Du musst Benachrichtigungen im Browser erlauben, um Alerts zu erhalten.");
            toggle.checked = false;
            return;
        }
    }

    // Daten im Browser (oder per fetch an deinen Server) speichern
    console.log("Gespeichert:", { saint: selectedSaint, date: found ? found.date : '', notifications: notificationsActive });
    alert("Deine Einstellungen wurden erfolgreich gespeichert!");
});
window.onload = renderApp;

