// Otsime üles Minecrafti ploki ja külgmenüü elemendid
const menuToggle = document.getElementById('menüü_nupp');
const sidebar = document.getElementById('kylgriba');

if (menuToggle && sidebar) {
    // Kuulame klikki Minecrafti ploki peal
    menuToggle.addEventListener('click', function() {
        // Lisab või eemaldab 'active' klassi iga kord, kui plokile vajutad
        sidebar.classList.toggle('active');
    });
}


document.addEventListener('DOMContentLoaded', function() {

    // --- GITHUB COMMITECE FETCH-MINE ---
    const commitideKast = document.getElementById('github-commitid');
    
 if (commitideKast) {
        const apiURL = 'https://api.github.com/repos/KevinReinberg/Sissejuhatus-Erialasse---Veebilehe-projekt/commits?per_page=3';

        const githubToken = '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'; 

        const headers = {
            'Accept': 'application/vnd.github+json'
        };

        // Kui token on olemas, lisa see päisesse (annab kuni 5000 päringut tunnis)
        if (githubToken !== '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') {
            headers['Authorization'] = `Bearer ${githubToken}`;
        }

        fetch(apiURL, { headers: headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Võrguviga GitHubi andmete laadimisel (Staatuse kood: ${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                commitideKast.innerHTML = ''; // Tühjenda "laen..." tekst
                
                // Võtame 3 viimast commit'i
                data.slice(0, 3).forEach(commitObj => {
                    const sõnum = commitObj.commit.message;
                    const autor = commitObj.commit.author.name;
                    const commitUrl = commitObj.html_url;
                    
                    // Lühendame sõnumit, kui see on liiga pikk
                    const lühikeSõnum = sõnum.length > 45 ? sõnum.substring(0, 42) + '...' : sõnum;

                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = commitUrl;
                    a.target = '_blank';
                    a.textContent = `${lühikeSõnum} (${autor})`;
                    
                    li.appendChild(a);
                    commitideKast.appendChild(li);
                });
            })
            .catch(error => {
                console.error("Commit'ide laadimine ebaõnnestus:", error);
                commitideKast.innerHTML = '<li>Viimaste muudatuste laadimine ebaõnnestus.</li>';
            });
    }
});