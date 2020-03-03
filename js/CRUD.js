function requestAdaHeroinesList() {
    const url = 'https://heroines-api.herokuapp.com/ada-heroines';
    loader.classList.add('loader');
    fetch(url)
        .then(response => response.json())
        .then(heroines => {
            // do whatever
        })
        .catch(err => console.error(err))
}

function createAdaHeroine() {
    const postUrl = 'https://heroines-api.herokuapp.com/ada-heroines';
    const body = {
        "name": inputName.value,
        "superpowers": [
            inputSuperpower.value
        ]
    }
    const options = {
        headers: headers,
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

function updateAdaHeroine(id) {
    const putUrl = `https://heroines-api.herokuapp.com/ada-heroines/${id}`;
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