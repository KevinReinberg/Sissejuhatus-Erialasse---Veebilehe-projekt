document.addEventListener("DOMContentLoaded", function () {
    
    // Nupu ja sündmuse kuulaja seadistamine
    const arvutaNupp = document.getElementById("arvutaNupp");

    arvutaNupp.addEventListener("click", function () {
        // 1. Loeme kasutaja sisestatud koordinaadid ja teisendame reaalseteks numbriteks
        const x1 = parseFloat(document.getElementById("x1").value) || 0;
        const y1 = parseFloat(document.getElementById("y1").value) || 0;
        const z1 = parseFloat(document.getElementById("z1").value) || 0;

        const x2 = parseFloat(document.getElementById("x2").value) || 0;
        const y2 = parseFloat(document.getElementById("y2").value) || 0;
        const z2 = parseFloat(document.getElementById("z2").value) || 0;

        // 2. Arvutame 3D vahemaa Tavamaailmas (Eukleidiline kaugus: sqrt((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2))
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const deltaZ = z2 - z1;
        
        const overworldKaugus = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

        // 3. Arvutame vastavad Nether koordinaadid (X ja Z jagatud 8-ga, Y jääb samaks)
        const netherX1 = Math.round(x1 / 8);
        const netherZ1 = Math.round(z1 / 8);
        const netherX2 = Math.round(x2 / 8);
        const netherZ2 = Math.round(z2 / 8);

        // 4. Arvutame vahemaa Netheris
        const deltaNetherX = netherX2 - netherX1;
        const deltaNetherZ = netherZ2 - netherZ1;
        const netherKaugus = Math.sqrt(deltaNetherX * deltaNetherX + deltaY * deltaY + deltaNetherZ * deltaNetherZ);

        // 5. Arvutame kokkuhoitud plokkide arvu
        const saastetudPlokid = Math.round(overworldKaugus - netherKaugus);

        // 6. Uuendame lehe sisu (DOM-i muutmised)
        document.getElementById("overworldKaugus").innerHTML = "<strong>" + overworldKaugus.toFixed(1) + "</strong> plokki";
        document.getElementById("netherKaugus").innerHTML = "<strong>" + netherKaugus.toFixed(1) + "</strong> plokki";
        
        document.getElementById("netherA").innerText = "Punkti A Nether portaal: X: " + netherX1 + ", Y: " + y1 + ", Z: " + netherZ1;
        document.getElementById("netherB").innerText = "Punkti B Nether portaal: X: " + netherX2 + ", Y: " + y2 + ", Z: " + netherZ2;
        
        document.getElementById("kokkuhoidTekst").innerText = "Netheri tunnel säästab sulle umbes " + saastetudPlokid + " ploki pikkuse teekonna!";
    });
});