const container = document.querySelector(".ladder");
const url = "https://api.pathofexile.com/leagues/Hardcore Heist?ladder=1&ladderOffset=13125";

async function ladderAPI() {
    try {
        const response = await fetch(url);
        const result = await response.json();
        const ladder = result.ladder.entries;
        console.log(ladder);
        container.innerHTML = ``;

        for (i = 0; i < ladder.length; i++) {
            const charName = `${ladder[i].character.name}`;
            const charLvl = `${ladder[i].character.level}`;
            const charCLass = `${ladder[i].character.class}`;
            const charID = `${ladder[i].character.id}`;     // querystring
            const charRank = `${ladder[i].rank}`;
            const accName = `${ladder[i].account.name}`;    // querystring

            let charHealth;
            if (ladder[i].dead) {
                charHealth = "dead";
            } else {
                charHealth = "alive";
            };

            let charStatus;                                  // red/green dot in front of charactername
            if (ladder[i].online) {
                charStatus = "online";
            } else {
                charStatus = "offline"
            }

            if (i === 9) {
                break;
            }

            container.innerHTML += `
                                    <a class="character" href="details.html?id=${charID}&accountName=${accName}">
                                    <h2><span class="${charStatus}">&#9679;</span>${charName}</h2>
                                    <p>Level <strong>${charLvl}</strong> ${charCLass}</p>
                                    <p>Ranked <strong>${charRank}</strong> on ${result.id} ladder</p>
                                    <p>Character is <span class="${charHealth}"><strong>${charHealth}</strong></span></p>
                                    <p>Account owner: ${accName}</p>
                                    </a>
                                   `
        }
    }
    catch (err) {
        console.log(err)
        document.body.style.backgroundColor = "red";
        container.innerHTML = `
                                <div class="error">
                                    <p class="oops">oops!</p>
                                    <p>${err}</p>
                                    <p class="small">Please reload the page and pray for a different outcome</p>
                                </div>`;
    }
}

ladderAPI();

