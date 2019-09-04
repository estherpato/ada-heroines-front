'use-strict';

const CAT_API_KEY = 'a31d9c88-3c95-4125-84ca-8a1f29a2f90a';

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application.json');


function requestAdaHeroinesList() {
    const options = {
        method: 'GET',
        headers: headers
    };

    const url = 'https://heroines-api.herokuapp.com/ada-heroines';

    fetch(url, options)
        .then(response => response.json())
        .then(heroines => console.log(heroines))

}

function createAdaHeroine(heroine) {
    const options = {
        method: 'POST',
        headers: headers,
        body: heroine
    };

    const url = 'https://heroines-api.herokuapp.com/ada-heroin';

    fetch(url, options)
        .then(response => response.json())
        .then(heroines => console.log(heroines))
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
        .then(heroines => console.log(heroines))
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
    let image;
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => image = data[0].url);
    return image;
}

requestAdaHeroinesList()

