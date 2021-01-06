const container = document.querySelector(".allchars");
const querystring = document.location.search;
const params = new URLSearchParams(querystring);
const accountName = params.get("accountName");
const charID = params.get("id");
const heading = document.querySelector("h1");
const url = "https://api.pathofexile.com/ladders/Hardcore Heist?accountName=" + accountName;

function clickedToFront(id, arr) {                    // If the player has more characters on the ladder
    for (let i = 0; i < arr.length; i++) {          // this moves the character you clicked on index.html 
        if (arr[i].character.id === id) {            // to the top on his "profile" in details.html
            let toFront = arr.splice(i, 1);
            arr.unshift(toFront[0]);
            break;
        }
    }
}

function headingDetail(arr) {
    if (arr.length === 1) {
        return `The only character of ${accountName} in Heist HC League`;
    } else {
        return `The ${arr.length} characters of ${accountName} in Heist HC League`
    }
}

async function ladderCall() {
    try {
        const response = await fetch(url);
        const result = await response.json();
        const characters = result.entries;
        clickedToFront(charID, characters);
        console.log(characters);
        heading.innerHTML = headingDetail(characters);
        container.innerHTML = ``;
        document.title = `${accountName}'s characters in Heist HC`;

        for (let i = 0; i < characters.length; i++) {
            let charHealth;
            if (characters[i].dead) {
                charHealth = "dead";
            } else {
                charHealth = "alive";
            };

            let myDiv = "details";
            if (i === 0) {
                myDiv = "featured";
            }
            if (i === 1) {
                container.innerHTML += `<hr>`;
            }

            container.innerHTML += `
                                    <div class="${myDiv}">
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