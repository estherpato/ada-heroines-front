import './CRUD.js';

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
                <a class="update-link">Update</a>
            </li>
        `
    })
}


buttonGet.addEventListener('click', requestAdaHeroinesList);
buttonPost.addEventListener('click', createAdaHeroine);
