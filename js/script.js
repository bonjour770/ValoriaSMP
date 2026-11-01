
const SERVER_IP = "valoriasmp.minecraft.how";

// Copier l'adresse Minecraft
document.querySelectorAll(".copy-ip").forEach(button => {
    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(SERVER_IP);
            const oldText = button.textContent;
            button.textContent = "IP copiée ✓";

            setTimeout(() => {
                button.textContent = oldText;
            }, 2000);
        } catch {
            window.prompt("Copie l'adresse :", SERVER_IP);
        }
    });
});

// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

// Statut du serveur
async function loadServerStatus() {
    const status = document.getElementById("server-status");
    const players = document.getElementById("player-count");

    if (!status || !players) return;

    try {
        const response = await fetch(
            `https://api.mcsrvstat.us/3/${SERVER_IP}`
        );

        if (!response.ok) throw new Error();

        const data = await response.json();

        if (data.online) {
            status.textContent = "En ligne ●";
            players.textContent =
                `Joueurs : ${data.players.online} / ${data.players.max}`;
        } else {
            status.textContent = "Hors ligne";
            players.textContent = "Serveur indisponible";
        }
    } catch {
        status.textContent = "Statut indisponible";
        players.textContent = "Consulte le Discord.";
    }
}

loadServerStatus();
