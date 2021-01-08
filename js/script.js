const container = document.querySelector(".ladder");
const url = "https://api.pathofexile.com/leagues/Hardcore Heist?ladder=1&ladderOffset=12980";

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
            const charRank = `${ladder[i].rank}`;
            const charID = `${ladder[i].character.id}`;     // querystring
            const accName = `${ladder[i].account.name}`;    // querystring

            let charHealth;
            if (ladder[i].dead) {
                charHealth = "dead";
            } else {
                charHealth = "alive";
            };

            let charStatus;                    // red or green dot in front of charactername to show online status
            if (ladder[i].online) {
                charStatus = "online";
            } else {
                charStatus = "offline"
            }

            if (i === 15) {
                break;
            }

            if (i === 0) {
                container.innerHTML = `
                                        <thead>
                                            <tr>
                                                <th>Rank</th>                                        
                                                <th>Account</th>                                        
                                                <th>Character</th>                                        
                                                <th>Level</th>                                        
                                                <th>Class</th>                                        
                                                <th>Status</th>                                        
                                            </tr>
                                        </thead>
                                        <tbody class="ladderentries"></tbody>
                                      `
            }

            const entries = document.querySelector(".ladderentries");
            let ladderStyle = ""

            if (i % 2 === 0) {
                ladderStyle = "bg-grey";
            }

            entries.innerHTML += `
                                        <tr class="${ladderStyle}">
                                            <td><strong>${charRank}</strong></td>
                                            <td>
                                                <a href="details.html?id=${charID}&accountName=${accName}">
                                                    <span class="${charStatus}">&#9679;</span>${accName.toUpperCase()}
                                                </a>
                                            </td>
                                            <td>${charName}</td>
                                            <td><strong>${charLvl}</strong></td>
                                            <td>${charCLass}</td>
                                            <td class="${charHealth}"><strong>${charHealth}</strong></td>                                            
                                        </tr>
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

