// Need lõigud on juba raamatusse mahtuvateks osadeks jagatud.
// Kui muudad teksti, muuda ka siin olevaid lõike.
const loigud = [
    "Kavatsus 1. Tee töö ära Raiu puud. Valmista töölaud ja kirka. Kaevanda kivi, sütt ja rauda. Sulata raud. Tee endale tööriistad, kilp ja turvis. Kogu toit ise. Jäta serverivestluses oma suure tuleviku tutvustus kirjutamata.",
    "Pane igale mängukorrale konkreetne ülesanne: täida ladu, lõpeta farm või ava pood. Tee see lõpuni. Ära küsi aplausi puu raiumise eest.",
    "2. Koosta täiuslik välimus Hangi teemantturvis. Nõiuta varustus. Paranda kulunud esemed. Paiguta inventar alati samas järjekorras: mõõk, kirka, kirves, toit. Pane üleliigne kraam kirstu. Võta kohtumisele kaasa parim komplekt.",
    "Nimeta mõõk alasil „Isiklik huvi”. Nimeta kirka „Kapital”. Kontrolli turvise iga osa. Vaata komplekt veel kord üle. Ära riku tervikut ühe juhusliku nahksaapaga.",
    "3. Pane oma nimi uksele Ehita valgest kvartsist kontor. Kasuta tumedat põrandat ja sümmeetrilisi aknaid. Aseta laud ruumi keskele ning enda iste laua otsa. Pane uksele silt „Patrick Bateman. Direktor”.",
    "Valmista paberist visiitkaart. Nimeta see alasil oma nimega. Hoia üks eksemplar kontoris esemeraamis. Kuluta ukse kujundusele täiesti ebamõistlik kogus kvartsi. Jäta hinnasilt alles.",
    "Ressursid 4. Muuda maa tootmiseks Raja põld, loomafarm ja suhkrurooistandus. Ehita rauafarm. Koonda toodang enda lattu. Eralda toit, ehitusmaterjalid ja müügikaup. Hoia isiklik varu ühiskassast lahus.",
    "Täida varukirst enne peosaali ehitamist. Märgista riiulid. Loe toodang üle. Jäta kõige väärtuslikum kraam enda järgmise projekti jaoks.",
    "5. Võta kaubandus enda juhtida Ava pood. Müü toitu, rauda ja nõiutud tööriistu. Pane igale kaubale kindel hind. Osta ülejääke hulgi ja müü väiksemate kogustena. Lisa kohaletoimetamisele eraldi tasu.",
    "Pane müügitulu eraldi kirstu. Investeeri osa tagasi tootmisse. Võta oma kasum välja. Ära jaga allahindlusi hea tuju pärast. Kirjuta poe kohale enda nimi suuremate tähtedega kui lahtiolekuaeg.",
    "6. Vaheta oma raud osaluse vastu Tee ettepanek rahastada silda, kindlust või ühist kaubajaama. Paku kindel kogus materjale. Küsi vastu osa tulust ja kohta projekti juhtimises. Kirjuta oma osalus kokkuleppesse. Piira panus eelnevalt määratud kogusega.",
    "Anna pidulikuks avamiseks kaheksa rauakangi. Täpselt kaheksa. Nimeta kingitus oma panuseks kogukonda. Hoia ülejäänud raud lao tagumises reas.",
    "Korraldus 7. Ehita ühendused oma keskuse ümber Raja oma poe juurde tee, sadam ja Nether-portaal. Paku liitudele ühenduste ehitamist sinu kaubajaamani. Pane ristmikele suunaviidad. Ava jaamas ladu ja varustuse müügilett. Lisa veoteenusele",
    "oma hinnakiri.",
    "Võta iga enda korraldatud veo eest tasu. Broneeri oma kaubale ruum enne ülejäänud tellimuste vastuvõtmist. Nimeta jaam enda järgi. Tellitud siltide eest maksa ühest kassast: enda omast.",
    "8. Kutsu nõukogu ise kokku Saada liitudele kohtumiskutse. Määra aeg ja paku kohaks enda kontor. Kirjuta valmis kolm ettepanekut: ühine kaubatee, varustuse tellimus ja projektijuhtimine. Pane enda projekt päevakorra esimeseks punktiks.",
    "Aseta lauale valmis lepingud. Võta koosoleku juhtimine enda peale. Loe ette hinnad, tähtajad ja ametikohad. Räägi rahulikult. Jäta oma kõhklused mustandisse.",
    "9. Jaga ametid, taotle juhtimist Koosta projekti tööjaotus. Paku ehitajale ehitusjuhi tiitlit, vedajale kaubandusjuhi tiitlit ja valvurile garnisoniülema tiitlit. Esita enda nimi direktoriks. Kirjuta oma rolli juurde eelarve koostamine, tellimuste",
    "korraldamine ja koosolekute juhtimine.",
    "Lisa ettepanekusse enda tasu. Esita kogu korraldus kinnitamiseks. Hoia ametikirjeldused täpsed ja tiitlid pidulikud. Vali enda kabinetile kõige kallim uks.",
    "Kontroll 10. Hoia oma vara enda käes Pane väärtuslikud esemed Enderi kirstu. Hoia varutööriistad eraldi. Ehita isiklikule laole varjatud sissepääs. Jäta selle koordinaadid avaldamata. Anna ühisesse projekti ainult kokkulepitud materjalid.",
    "Säilita enda käes koopiad lepingutest, kaartidest ja arvestusest. Ära jaga kogu varu ühe piduliku lubaduse peale. Hoia tagavaraplaan lühike ja enda teada.",
    "11. Pane jõud väljapanekule Harjuta duelle areenil. Varu nooli, toitu ja varuturvis. Ehita enda alale kindlustatud värav ja vaatetorn. Korralda turniir. Pane auhinnaks enda valitud ese ning kirjuta korraldajaks enda nimi.",
    "Saabu parimas turvises. Hoia kõne lühike. Paiguta trofeed kontorisse sirgesse ritta. Jäta kõige kallim ese täpselt oma tooli taha.",
    "12. Võta oma osa välja Kogu kokkulepitud tasud. Kontrolli projekti tulusid ja enda osalust. Kanna kasum oma varudesse. Lõpeta tulutud kõrvalprojektid. Tee järgmine ettepanek ise ja kirjuta sinna uuesti enda osa.",
    "Sulge lepinguraamat. Paranda turvis. Sea kontor korda. Istu laua otsa. Vaata korraks oma visiitkaarti. Jäta võidukõne pidamata.",
    "Põhireegel Sigma-reegel: tee esimene käik, kogu vara, võta juhtimine ja hoia nägu rahulik."
];

// Alustame esimesest lõigust. JavaScriptis on selle number 0.
let jargmine = 0;

// Leiame lehe lõpus oleva nupu.
const nupp = document.getElementById("kopeeri");

// See funktsioon käivitub iga kord, kui vajutad nuppu.
nupp.onclick = async function () {
    // Kopeerimise ajal ei saa kogemata teist korda vajutada.
    nupp.disabled = true;

    try {
        // Kopeerime ühe lõigu. Reavahetusi juurde ei lisata.
        await navigator.clipboard.writeText(loigud[jargmine]);

        // Järgmisel vajutusel kopeerime järgmise lõigu.
        jargmine = jargmine + 1;
        nupp.textContent = "Kopeeri järgmine";

        // Pärast viimast lõiku alustame uuesti algusest.
        if (jargmine === loigud.length) {
            jargmine = 0;
            nupp.textContent = "Kopeeri algusest";
        }
    } catch {
        // Ebaõnnestumisel jääme sama lõigu juurde.
        nupp.textContent = "Proovi uuesti";
    } finally {
        // Lubame nuppu uuesti vajutada.
        nupp.disabled = false;
    }
};
