// Otsime üles Minecrafti ploki ja külgmenüü elemendid
const menuToggle = document.getElementById("menüü_nupp");
const sidebar = document.getElementById("kylgriba");

// Kontrollime, et mõlemad elemendid on lehel olemas, enne sündmusekuuluri lisamist
if (menuToggle && sidebar) {
    // Kuulame klikki Minecrafti ploki peal
    menuToggle.addEventListener("click", function () {
        // Lisab või eemaldab "active" klassi iga kord, kui plokile vajutad
        sidebar.classList.toggle("active");
    });
}