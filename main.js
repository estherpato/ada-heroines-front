'use-strict';

const list = document.querySelector('.heroines-list');
const buttonCreate = document.querySelector('.create-button');
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application.json');

function setHTMLList(heroines) {
    heroines.map(heroine => {
        list.innerHTML = `
            <li class="item">
                <p class="hero-name">${heroine.name}</p>
                <div class="hero-superpower">
                    ${heroine.superpowers.map(s => {
            return `<p>${s}</p>`
        })}
                </div>
            </li>
        `
    })
}

function requestAdaHeroinesList() {
    const url = 'https://heroines-api.herokuapp.com/ada-heroines';
    fetch(url)
        .then(response => response.json())
        .then(heroines => {
            let heroinesList = [];
            heroines.map(heroine => heroinesList.push(heroine));
            setHTMLList(heroinesList);
        })
}

function createAdaHeroine() {
    const url = 'https://heroines-api.herokuapp.com/ada-heroin';
    const body = {
        "name": "Test",
        "superpowers": [
            "If this works I go to sleep"
        ]
    }
    const myRequest = new Request(url, {method: 'POST', body: body});
    fetch(myRequest)
        .then(response => response.json())
        .then(heroines => {

        })
}

function updateAdaHeroine(id, body) {
    const options = {
        method: 'PUT',
        headers: headers,
        body: heroine
    };

    const url = `https://heroines-api.herokuapp.com/ada-heroin/${id}`;

    fetch(url, options)
        .then(response => response.json())
        .then(heroine => console.log(heroine))
}

function deleteAdaHeroine(id) {
    const options = {
        method: 'DELETE',
        headers: headers,
    };

    const url = `https://heroines-api.herokuapp.com/ada-heroin/${id}`;

    fetch(url, options)
        .then(response => response.json())
        .then(heroines => console.log(heroines))
}

function requestRandomCatImage() {
    let image = '';
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => image = data[0].url);
    return image;
}

requestAdaHeroinesList();
buttonCreate.addEventListener('click', createAdaHeroine());