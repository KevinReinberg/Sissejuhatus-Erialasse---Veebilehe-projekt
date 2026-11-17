/* Ootab, kuni kogu HTML dokument on täielikult laetud, enne kui skript tööle hakkab */
document.addEventListener('DOMContentLoaded', function() {

    // --- GITHUB COMMIT'IDE TOOMINE (FETCH) ---
    
    /* Otsib HTML-ist üles elemendi, mille ID on 'github-commitid' ja salvestab selle muutujasse */
    const commitideKast = document.getElementById('github-commitid');
    
    /* Kontrollib, kas element on lehel olemas (et vältida vigu teistel lehtedel, kus seda pole) */
    if (commitideKast) {
        
        /* Määrab GitHubi API aadressi, kust küsitakse konkreetse repositooriumi 3 viimast commit'i */
        const apiURL = 'https://api.github.com/repos/KevinReinberg/Sissejuhatus-Erialasse---Veebilehe-projekt/commits?per_page=3';

        /* GitHubi isiklik ligipääsu PAT (Personal Access Token). 
           Kui sul tekib 403 viga, võid selle tühjaks jätta (const githubToken = '';), 
           kuna avalikud repod ei vaja alati tokenit. */
        const githubToken = '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'; 

        /* Loob HTTP päise objekti, öeldes GitHubile, et soovime andmeid JSON formaadis */
        const headers = {
            'Accept': 'application/vnd.github+json'
        };

        /* Kontrollib, kas token on olemas ja erineb vaikimisi väärtusest */
        if (githubToken && githubToken !== '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') {
            headers['Authorization'] = `Bearer ${githubToken}`;
        }

        /* Teeb fetch päringu GitHubi serverisse, saates kaasa vajalikud päised */
        fetch(apiURL, { headers: headers })
        
            /* Võtab vastu vastuse ja kontrollib, kas kõik korras */
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Võrguviga GitHubi andmete laadimisel (Staatuse kood: ${response.status})`);
                }
                return response.json();
            })
            
            /* Kui andmed on edukalt käes, tehakse nendega järgnevat */
            .then(data => {
                
                /* Tühjendab kasti ajutisest tekstist ("Laen...") */
                commitideKast.innerHTML = ''; 
                
                /* Võtab saadud andmetest vaid esimesed 3 commit'i ja käib need ükshaaval läbi */
                data.slice(0, 3).forEach(commitObj => {
                    const sõnum = commitObj.commit.message;
                    const autor = commitObj.commit.author.name;
                    const commitUrl = commitObj.html_url;
                    
                    /* Lõikab liiga pika sõnumi lühemaks, et see nupule ära mahuks */
                    const lühikeSõnum = sõnum.length > 25 ? sõnum.substring(0, 22) + '...' : sõnum;
                    /* Loob uue HTML listi elemendi (<li>) */
                    const li = document.createElement('li');
                    
                    /* TÄHTIS: Annab <li> elemendile klassi 'nupp', et see saaks nupu kuju ja stiili */
                    li.className = 'nupp'; 
                    
                    /* Loob uue HTML lingi elemendi (<a>) */
                    const a = document.createElement('a');
                    a.href = commitUrl;
                    a.target = '_blank';
                    a.textContent = `${lühikeSõnum} (${autor})`;
                    
                    /* Paigutab lingi listi elemendi sisse ja selle kastikesse lehel */
                    li.appendChild(a);
                    commitideKast.appendChild(li);
                });
            })
            
            /* Püüab kinni kõik vead, kui andmete toomine ebaõnnestub */
            .catch(error => {
                console.error("Commit'ide laadimine ebaõnnestus:", error);
                
                /* Kuvab veateate nii, et ka see kasutab 'nupp' klassi */
                commitideKast.innerHTML = '<li class="nupp laeb">Laadimine ebaonnestus</li>';
            });
    }
});