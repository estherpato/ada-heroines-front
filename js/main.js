'use-strict';

const buttonCreateList = document.querySelector('#create-heroine-list');

function requestAdaHeroinesList() {
    const url = 'https://heroines-api.herokuapp.com/ada-heroine';
    fetch(url)
        .then(response => response.json())
        .then(heroines => {
            console.log('heroines', heroines)
        })
        .catch(err => console.error(err))
}

function createAdaHeroine() {
    const postUrl = 'https://heroines-api.herokuapp.com/ada-heroines';
    const body = {
        "name": "Esther",
        "superpowers": [
            "Volver locas a las adalabers"
        ]
    }
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        method: 'POST'
    };

    fetch(postUrl, options)
        .then(data => data.json())
        .then(res => {
            // do whatever
        })
        .catch(error => console.error(error))
}

function updateAdaHeroine() {
    const putUrl = `https://heroines-api.herokuapp.com/ada-heroines/3f3e2bc5-c1bb-4aff-b447-cb17d9da6e6b`;
    const body = {
        "name": "Esther",
        "superpowers": [
            "Updated heroine"
        ]
    };
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        method: 'PUT'
    };

    fetch(putUrl, options)
        .then(data => data.json())
        .then(res => {
            // do whatever
        })
        .catch(error => console.error(error))
}

function deleteAdaHeroine(id) {
    const deleteUrl = `https://heroines-api.herokuapp.com/ada-heroines/${id}`;

    const options = {
        method: 'DELETE'
    };

    fetch(deleteUrl, options)
        .then(response => console.log(response))
        .catch(error => console.log('Error', error))
}

buttonCreateList.addEventListener('click', updateAdaHeroine);