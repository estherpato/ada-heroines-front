const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
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

function createAdaHeroine() {
    const postUrl = 'https://heroines-api.herokuapp.com/ada-heroines';
    const body = {
        "name": "Débora",
        "superpowers": [
            "Drinking beer like a boss"
        ]
    }
    const options = {
        headers: headers,
        body: JSON.stringify(body),
        method: 'POST'
    };

    fetch(postUrl, options)
        .then(data => data.json())
        .then(res => console.log(res))
        .catch(error => console.error(error))
}

function updateAdaHeroine() {
    const putUrl = 'https://heroines-api.herokuapp.com/ada-heroines/5e254972-2c81-4ca6-83c1-59c506e9c518';
    const body = {
        "name": "Esther",
        "superpowers": [
            "Updated heroine"
        ]
    };
    const options = {
        headers: headers,
        body: JSON.stringify(body),
        method: 'PUT'
    };

    fetch(putUrl, options)
        .then(data => data.json())
        .then(res => console.log(res))
        .catch(error => console.error(error))
}

function deleteAdaHeroine() {
    const deleteUrl = 'https://heroines-api.herokuapp.com/ada-heroines/5e254972-2c81-4ca6-83c1-59c506e9c518';

    const options = {
        method: 'DELETE'
    };

    fetch(deleteUrl, options)
        .then(response => console.log(response))
        .catch(error => console.log('Error', error))
}