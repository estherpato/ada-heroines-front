'use-strict';

const list = document.querySelector('.heroines-list');
const buttonGet = document.querySelector('.get-button');
const buttonPost = document.querySelector('.create-button');

function setHTMLList(heroines) {
    heroines.map(heroine => {
        list.innerHTML += `
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
        .catch(err => console.error(err))
}



// jQuery example
// $('.create-button').click(function() {
//     $.post(postUrl, body, function(data, status) {
//         console.log(`${data} and status is ${status}`)
//     })
// })

// AJAX example
// let req = new XMLHttpRequest();
// req.open('POST', url);
// req.send(body);
// req.onreadystatechange = (e) => {
//     console.log(req.responseText);
// }

function createAdaHeroine() {
    const postUrl = 'https://heroines-api.herokuapp.com/ada-heorines';
    const body = {
        "name": "Test",
        "superpowers": [
            "If this works I go to sleep"
        ]
    }
    const options = {
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body),
        method: 'POST'
    };

    console.log('options', options)

    fetch(postUrl, options)
        .then(data => data.json())
        .then(res => console.log(res))
        .catch(error => console.error(error))
}


buttonGet.addEventListener('click', requestAdaHeroinesList);
buttonPost.addEventListener('click', createAdaHeroine);
