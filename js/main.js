'use-strict';

const buttonGet = document.querySelector('.get-button');
const buttonPost = document.querySelector('.create-button');
const addButton = document.querySelector('.add-button');
const list = document.querySelector('.heroines-list');
const form = document.getElementById('create-form');
const loader = document.getElementById('loader');
const inputName = document.getElementById('name');
const inputSuperpower = document.getElementById('superpower');
const notification = document.getElementById('notification');

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

function setHTMLList(heroines) {
    heroines.map(heroine => {
        list.innerHTML +=
            `
            <li class="item">
                <p class="hero-name">${heroine.name}</p>
                <div class="hero-superpower">
                    ${heroine.superpowers.map(s => {
                return `<p>${s}</p>`
            })}
                </div>
                <i class="far fa-trash-alt"></i>
                <a class="update-link">Update</a>
            </li>
        `
    })
}

function requestAdaHeroinesList() {
    const url = 'https://heroines-api.herokuapp.com/ada-heroines';
    loader.classList.add('loader');
    fetch(url)
        .then(response => response.json())
        .then(heroines => {
            loader.classList.remove('loader');
            let heroinesList = [];
            heroines.map(heroine => heroinesList.push(heroine));
            setHTMLList(heroinesList);
        })
        .catch(err => console.error(err))
}

function createAdaHeroine(e) {
    e.preventDefault();
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

    if (!!inputName.value && !!inputSuperpower.value) {
        fetch(postUrl, options)
            .then(data => data.json())
            .then(res => {
                inputName.value = '';
                inputSuperpower.value = '';
                hideElement(form, 'form');
                showNotification('Heroine created!');
            })
            .catch(error => console.error(error))
    } else {
        console.log('Nope');
    }
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

function showElement(element, className) {
    element.classList.remove('hidden');
    element.classList.add(className);
}

function hideElement(element, className) {
    element.classList.remove(className);
    element.classList.add('hidden');
}

function showNotification(message) {
    notification.innerHTML = message;
    notification.classList.add('show');
    setTimeout(() => { notification.classList.remove('show') }, 3000)
}


buttonGet.addEventListener('click', requestAdaHeroinesList);
buttonPost.addEventListener('click', createAdaHeroine);
addButton.addEventListener('click', () => showElement(form, 'form'))