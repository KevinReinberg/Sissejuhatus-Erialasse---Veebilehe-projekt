/* Ootab, kuni kogu HTML-dokument on täielikult laetud, enne kui skript käivitub */
document.addEventListener('DOMContentLoaded', function() {

    // ================================================================================
    // 1. OTSING AINULT PEALEHE ÕPETUSTE SEAS
    // ================================================================================

    /* Leiab otsingu sisendvälja ja kõik õpetuste nimekirja elemendid */
    const otsinguSisend = document.getElementById('otsingu-sisend');
    const tutorialiElemendid = document.querySelectorAll('.tutorial ul li');

    /* Kontrollib, kas otsinguväli ja õpetused on lehel olemas */
    if (otsinguSisend && tutorialiElemendid.length > 0) {

        /* Filtreerib ja järjestab õpetused nii, et otsingusõnaga algavad sõnad (nt "k" -> "kalkulaator") tulevad ettepoole */
        function filtreeriTutorialid() {
            const otsingusõna = otsinguSisend.value.trim().toLowerCase();
            const nimekiri = tutorialiElemendid[0].parentElement;

            /* Kui otsingukast on tühi, taastab kõikide õpetuste nähtavuse */
            if (otsingusõna === '') {
                tutorialiElemendid.forEach(li => {
                    li.style.display = '';
                });
                return;
            }

            /* Eelistab sõna algust lühikese päringu korral (nt "k" eelistab sõna algust "kalkulaator") */
            const algabSõnaRegex = new RegExp(`(^|\\s)${otsingusõna.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);

            const sobivad = [];
            tutorialiElemendid.forEach(li => {
                const pealkiri = li.textContent.trim().toLowerCase();
                const sisaldab = pealkiri.includes(otsingusõna);

                /* Peidab elemendi, kui otsingusõna ei leidu pealkirjas */
                if (!sisaldab) {
                    li.style.display = 'none';
                    return;
                }

                /* Näitab sobivat elementi */
                li.style.display = '';

                /* Skoor: 0 = pealkiri algab otsinguga, 1 = mõni sõna algab otsinguga, 2 = sisaldub sõna sees */
                let skoor = 2;
                if (pealkiri.startsWith(otsingusõna)) {
                    skoor = 0;
                } else if (algabSõnaRegex.test(pealkiri)) {
                    skoor = 1;
                }

                sobivad.push({ li, skoor, pealkiri });
            });

            /* Sorteerib sobivad elemendid skoori järgi, et eelistatud tulemus oleks esimene */
            sobivad
                .sort((a, b) => a.skoor - b.skoor || a.pealkiri.localeCompare(b.pealkiri, 'et'))
                .forEach(item => nimekiri.appendChild(item.li));
        }

        /* Käivitab filtreerimise iga kord, kui kasutaja otsinguväljale kirjutab või kustutab */
        otsinguSisend.addEventListener('input', filtreeriTutorialid);

        /* Kui kasutaja vajutab otsinguväljal Enter-klahvi, avab esimese nähtava/sobiva õpetuse */
        otsinguSisend.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();

                /* Kui otsingukast on tühi (või sisaldab vaid tühikuid), ära tee midagi */
                if (otsinguSisend.value.trim() === '') {
                    return;
                }

                /* Uuendab filtreerimist ja elemendi järjekorda enne suunamist */
                filtreeriTutorialid();

                /* Võtab elemendid uuendatud DOM-järjekorras, et esimene nähtav oleks tõesti esimene tulemus */
                const hetkeElemendid = Array.from(tutorialiElemendid[0].parentElement.querySelectorAll('li'));
                const esimeneNähtavLink = hetkeElemendid
                    .filter(li => li.style.display !== 'none')
                    .map(li => li.querySelector('a[href]'))
                    .find(link => link && link.getAttribute('href'));

                /* Suunab brauseri leitud õpetuse lehele */
                if (esimeneNähtavLink) {
                    window.location.href = esimeneNähtavLink.getAttribute('href');
                }
            }
        });
    }


    // ================================================================================
    // 2. GITHUB COMMIT'IDE TOOMINE (FETCH + LOCALSTORAGE VAHEMÄLU)
    // ================================================================================

    /* Leiab HTML-ist nimekirja, kuhu viimased commit'id kuvatakse */
    const commitideKast = document.getElementById('github-commitid');

    if (commitideKast) {
        /* GitHubi API aadress 3 viimase commit'i küsimiseks */
        const apiURL = 'https://api.github.com/repos/KevinReinberg/Sissejuhatus-Erialasse---Veebilehe-projekt/commits?per_page=3';

        /* Vahemälu võti ja kestus (10 minutit), et vältida 403 rate-limit viga */
        const cacheKey = 'github_commits_cache_v1';
        const cacheDurationMs = 10 * 60 * 1000;

        /* Loob commit'ide andmetest HTML-nupud ja lisab need lehele */
        function renderCommits(commits) {
            commitideKast.innerHTML = '';

            commits.slice(0, 3).forEach(commitObj => {
                const sõnum = commitObj.commit.message;
                const autor = commitObj.commit.author.name;
                const commitUrl = commitObj.html_url;

                /* Lühendab pika commit'i sõnumi, et see mahuks nupu sisse */
                const lühikeSõnum = sõnum.length > 20 ? sõnum.substring(0, 17) + '...' : sõnum;

                const li = document.createElement('li');
                li.className = 'nupp';

                const a = document.createElement('a');
                a.href = commitUrl;
                a.target = '_blank';
                a.textContent = `${lühikeSõnum} (${autor})`;

                li.appendChild(a);
                commitideKast.appendChild(li);
            });
        }

        /* Kuvab veateate, kui andmete laadimine ebaõnnestub */
        function showError() {
            commitideKast.innerHTML = '<li class="nupp laeb">Laadimine ebaonnestus</li>';
        }

        /* 1. Kontrollib, kas brauseri localStorage'is on juba kehtiv vahemälu */
        try {
            const cachedRaw = localStorage.getItem(cacheKey);
            if (cachedRaw) {
                const cached = JSON.parse(cachedRaw);
                if (Date.now() - cached.timestamp < cacheDurationMs && Array.isArray(cached.data)) {
                    renderCommits(cached.data);
                    return; // Väljub, et mitte teha liigset API-päringut
                }
            }
        } catch (e) {
            // Kui localStorage pole lubatud või andmed on vigased, jätkab võrgupäringuga
        }

        /* 2. Teeb päringu GitHubi API-sse, kui vahemälu puudub või on aegunud */
        fetch(apiURL, {
            headers: {
                'Accept': 'application/vnd.github+json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Võrguviga GitHubi andmete laadimisel (Staatuse kood: ${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                /* Salvestab saadud commit'id vahemällu järgmiseks 10 minutiks */
                try {
                    localStorage.setItem(cacheKey, JSON.stringify({
                        timestamp: Date.now(),
                        data: data
                    }));
                } catch (e) {
                    // Ignoreerib salvestusviga, kui brauseri mälu on täis või piiratud
                }
                renderCommits(data);
            })
            .catch(error => {
                console.error("Commit'ide laadimine ebaõnnestus:", error);
                showError();
            });
    }
});