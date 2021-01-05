const container = document.querySelector(".allchars");
const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const accountName = params.get("accountName");
const charID = params.get("id");
const heading = document.querySelector("h1");
const url = "https://api.pathofexile.com/ladders/Hardcore Heist?accountName=" + accountName;

async function ladderCall() {
    try {
        const response = await fetch(url);
        const result = await response.json();
        const characters = result.entries;
        console.log(characters);
        heading.innerHTML = `The Heist HC characters of ${accountName}`
        container.innerHTML = ``;
        document.title = `${accountName}'s characters in Heist HC`;

        for (let i = 0; i < characters.length; i++) {
            let charHealth;
            if (characters[i].dead) {
                charHealth = "dead";
            } else {
                charHealth = "alive";
            };

            if (characters[i].character.id !== charID) {      // Shows the character selected from the homepage at the top
                continue;
            }

            container.innerHTML += `
                                    <div class="details">
                                        <h2>${characters[i].character.name}</h2>
                                        <p>Level <strong>${characters[i].character.level}</strong> ${characters[i].character.class}
                                        </p> 
                                        <p><strong>${characters[i].character.experience}</strong> total experience gained.</p>
                                        <p>Character is currently <span class="${charHealth}"><strong>${charHealth}</strong></span>
                                         at rank <strong>${characters[i].rank}</strong></p>
                                    </div> 
                                   `;
        }

        for (i = 0; i < characters.length; i++) {
            let charHealth;
            if (characters[i].dead) {
                charHealth = "dead";
            } else {
                charHealth = "alive";
            };
            if (characters[i].character.id === charID) {
                continue;
            }

            container.innerHTML += `
                                    <div class="details">
                                        <h2>${characters[i].character.name}</h2>
                                        <p>Level <strong>${characters[i].character.level}</strong> ${characters[i].character.class}
                                        </p> 
                                        <p><strong>${characters[i].character.experience}</strong> total experience gained.</p>
                                        <p>Character is currently <span class="${charHealth}"><strong>${charHealth}</strong></span>
                                        at rank <strong>${characters[i].rank}</strong></p>
                                    </div> 
                                    `;
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

ladderCall();