'use-strict';

const buttonGet = document.querySelector('.get-button');
const buttonPost = document.querySelector('.create-button');
const addButton = document.querySelector('.add-button');
const updateButton = document.querySelector('.update-button');
const list = document.querySelector('.heroines-list');
const createForm = document.getElementById('create-form');
const updateForm = document.getElementById('update-form');
const loader = document.getElementById('loader');
const inputNameCreate = document.getElementById('name-create');
const inputSuperpowerCreate = document.getElementById('superpower-create');
const inputNameUpdate = document.getElementById('name-update');
const inputSuperpowerUpdate = document.getElementById('superpower-update');
const notification = document.getElementById('notification');

let heroinesList = [];
let heroineToWorkWith;

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

function setHTMLList(heroines) {
    list.innerHTML = '';
    heroines.map((heroine, index) => {
        list.innerHTML +=
            `
            <li class="item" heroine-id=${heroine.id}>
                <p class="hero-name">${heroine.name}</p>
                <div class="hero-superpower">
                    ${heroine.superpowers.map((s) => {
                return `<p>${s}</p>`
            })}
                <div class="card-bottom">
                    <img class="trash-image" src="./images/trash-icon.svg">
                    <a id="update-link-${index}" class="update-link">Update</a>
                </div>
            </li>
        `;
    });
}

function setHeroineToWorkWith(e) {
    let element = e.target;
    let parentNodes = [];
    while (element) {
        parentNodes.unshift(element);
        element = element.parentNode;
    };
    const heroineCard = parentNodes.filter(el => el.className === 'item').reduce((a, b) => a);
    const heroineID = heroineCard.getAttribute('heroine-id');
    heroineToWorkWith = heroinesList.filter(heroine => heroine.id === heroineID).reduce((a, b) => a);
}

function openFormToUpdate(e) {
    setHeroineToWorkWith(e);
    inputNameUpdate.value = heroineToWorkWith.name;
    inputSuperpowerUpdate.value = heroineToWorkWith.superpowers[0];
    showElement(updateForm, 'form');
}

function getReadyToDelete(e) {
    setHeroineToWorkWith(e);
    deleteAdaHeroine(heroineToWorkWith.id);
}

function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}

function requestAdaHeroinesList() {
    const url = 'https://heroines-api.herokuapp.com/ada-heroines';
    loader.classList.add('loader');
    fetch(url)
        .then(response => response.json())
        .then(heroines => {
            successfulGetRequest(heroines);
        })
        .catch(err => console.error(err))
}

function successfulGetRequest(heroines) {
    loader.classList.remove('loader');
    heroines.map(heroine => heroinesList.push(heroine));
    if (heroinesList.length > 0) {
        setHTMLList(heroinesList);
        const updateLink = document.querySelectorAll('.update-link');
        const deleteIcon = document.querySelectorAll('.trash-image');
        addEventListenerList(updateLink, 'click', openFormToUpdate);
        addEventListenerList(deleteIcon, 'click', getReadyToDelete)
    }
    else list.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 15px;">
        <p style="margin-bottom: 15px">No heroines in here! :(</p>
        <img src="https://media1.tenor.com/images/d5c26505e0893c10fc32a389d938e590/tenor.gif">
    </div>
    `;
}

function createAdaHeroine(e) {
    e.preventDefault();
    const postUrl = 'https://heroines-api.herokuapp.com/ada-heroines';
    const body = {
        "name": inputNameCreate.value,
        "superpowers": [
            inputSuperpowerCreate.value
        ]
    }
    const options = {
        headers: headers,
        body: JSON.stringify(body),
        method: 'POST'
    };

    if (!!inputNameCreate.value && !!inputSuperpowerCreate.value) {
        fetch(postUrl, options)
            .then(data => data.json())
            .then(res => {
                successfulPostRequest();
            })
            .catch(error => console.error(error))
    } else {
        console.log('Nope');
    }
}

function successfulPostRequest() {
    inputNameCreate.value = '';
    inputSuperpowerCreate.value = '';
    hideElement(createForm, 'form');
    showNotification('Heroine created!');
}

function updateAdaHeroine(e, heroineID) {
    e.preventDefault();
    const putUrl = `https://heroines-api.herokuapp.com/ada-heroines/${heroineID}`;
    const body = {
        "name": inputNameUpdate.value,
        "superpowers": [
            inputSuperpowerUpdate.value
        ]
    };
    const options = {
        headers: headers,
        body: JSON.stringify(body),
        method: 'PUT'
    };

    if (!!inputNameUpdate.value && !!inputSuperpowerUpdate.value) {
        fetch(putUrl, options)
            .then(data => data.json())
            .then(res => {
                showNotification('Heroine updated!');
                hideElement(updateForm, 'form');
                heroinesList = [];
                requestAdaHeroinesList();
            })
            .catch(error => console.error(error))
    }
}

function deleteAdaHeroine(heroineID) {
    const deleteUrl = `https://heroines-api.herokuapp.com/ada-heroines/${heroineID}`;

    const options = {
        method: 'DELETE'
    };

    fetch(deleteUrl, options)
        .then(response => {
            showNotification('Heroine deleted! :(');
            heroinesList = [];
            requestAdaHeroinesList();
        })
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
addButton.addEventListener('click', () => showElement(createForm, 'form'));
updateButton.addEventListener('click', (e) => updateAdaHeroine(e, heroineToWorkWith.id))