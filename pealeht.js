/* Ootab, kuni kogu HTML dokument on täielikult laetud, enne kui skript tööle hakkab */
document.addEventListener('DOMContentLoaded', function() {

    // --- GITHUB COMMIT'IDE TOOMINE (FETCH) ---
    
    /* Otsib HTML-ist üles elemendi, mille ID on 'github-commitid' ja salvestab selle muutujasse */
    const commitideKast = document.getElementById('github-commitid');
    
    /* Kontrollib, kas element on lehel olemas (et vältida vigu teistel lehtedel, kus seda pole) */
    if (commitideKast) {
        
        /* Määrab GitHubi API aadressi, kust küsitakse konkreetse repositooriumi 3 viimast commit'i */
        const apiURL = 'https://api.github.com/repos/KevinReinberg/Sissejuhatus-Erialasse---Veebilehe-projekt/commits?per_page=3';

        /* GitHubi isiklik ligipääsu PAT (Personal Access Token), mis hoiab ära päringute limiidi ületamise */
        const githubToken = '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'; 

        /* Loob HTTP päise objekti, öeldes GitHubile, et soovime andmeid JSON formaadis */
        const headers = {
            'Accept': 'application/vnd.github+json'
        };

        /* Kontrollib, kas token on olemas ja erineb vaikimisi väärtusest */
        if (githubToken !== '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') {
            
            /* Lisab päisesse 'Authorization' rea, mis annab õiguse teha kuni 5000 päringut tunnis */
            headers['Authorization'] = `Bearer ${githubToken}`;
        }

        /* Teeb fetch päringu GitHubi serverisse, saates kaasa vajalikud päised */
        fetch(apiURL, { headers: headers })
        
            /* Võtab vastu vastuse ja kontrollib, kas kõik korras */
            .then(response => {
                
                /* Kui server vastab veaga (nt 404 või 403), viskab veateate */
                if (!response.ok) {
                    throw new Error(`Võrguviga GitHubi andmete laadimisel (Staatuse kood: ${response.status})`);
                }
                
                /* Teisendab serveri vastuse JavaScripti objektideks (JSON formaati) */
                return response.json();
            })
            
            /* Kui andmed on edukalt käes, tehakse nendega järgnevat */
            .then(data => {
                
                /* Tühjendab kasti sisust (võtab ära ajutise teksti "Laen...") */
                commitideKast.innerHTML = ''; 
                
                /* Võtab saadud andmetest vaid esimesed 3 commit'i ja käib need ükshaaval läbi */
                data.slice(0, 3).forEach(commitObj => {
                    
                    /* Võtab commit'i objektist sõnumi (mida muudeti) */
                    const sõnum = commitObj.commit.message;
                    
                    /* Võtab commit'i tegija (autori) nime */
                    const autor = commitObj.commit.author.name;
                    
                    /* Võtab konkreetse commit'i veebiaadressi GitHubis */
                    const commitUrl = commitObj.html_url;
                    
                    /* Kui sõnum on pikem kui 45 tähemärki, lõikab selle lühemaks ja lisab punktiir, muidu jätab samaks */
                    const lühikeSõnum = sõnum.length > 45 ? sõnum.substring(0, 42) + '...' : sõnum;

                    /* Loob uue HTML listi elemendi (<li>) */
                    const li = document.createElement('li');
                    
                    /* Loob uue HTML lingi elemendi (<a>) */
                    const a = document.createElement('a');
                    
                    /* Määrab lingi sihtmärgiks GitHubi commit'i lehe */
                    a.href = commitUrl;
                    
                    /* Paneb lingi avanema uues vahelehes/aknas */
                    a.target = '_blank';
                    
                    /* Määrab lingi tekstiks lühikese sõnumi ja autori nime sulgudes */
                    a.textContent = `${lühikeSõnum} (${autor})`;
                    
                    /* Paigutab lingi (<a>) listi elemendi (<li>) sisse */
                    li.appendChild(a);
                    
                    /* Paigutab loodud listi elemendi GitHubi commit'ide kastikesse lehel */
                    commitideKast.appendChild(li);
                });
            })
            
            /* Püüab kinni kõik vead, kui andmete toomine ebaõnnestub */
            .catch(error => {
                
                /* Kirjutab vea konsooli silumiseks */
                console.error("Commit'ide laadimine ebaõnnestus:", error);
                
                /* Kuvab lehel kasutajale veateate */
                commitideKast.innerHTML = '<li>Viimaste muudatuste laadimine ebaõnnestus.</li>';
            });
    }
});