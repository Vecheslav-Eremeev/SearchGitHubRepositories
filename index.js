const input = document.querySelector('.input');
const repositoriesList = document.querySelector('.repositories');
const mainContainer = document.querySelector('.main');
const USER_PER_PAGE = 5;



async function addRepositories() {
    if (input.value) {
        return await fetch(`https://api.github.com/search/repositories?q=${input.value}&per_page=${USER_PER_PAGE}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(res => {
                const resArr = res['items'];
                console.log(...resArr);
                clearRepositoriesElement();
                resArr.forEach(el => {

                    const repositoriesListElement = createElement('button', 'btn');
                    const classBtn = 'w-100 py-2 mb-3 btn btn-outline-secondary rounded-3'.split(' ');
                    classBtn.forEach(e => repositoriesListElement.classList.add([e]));
                    const textContent = `<div class="repository">
                                            Owner - <a href="${el.html_url}" target="_blank">${el.owner.login}</a>
                                        </div>
                                        <div class="repository">
                                            Name repository - <span>${el.name}</span>
                                        </div>
                                        <div class="repository">
                                            Repository id - <span">${el.id}</span>
                                        </div>
                                        <div class="repository">
                                            Stars - <span>${el.stargazers_count}</span>
                                        </div>
                                        <div class="repository">
                                            Language - <span>${el.language}</span>
                                        </div>`;
                    repositoriesListElement.innerHTML = textContent;
                    repositoriesListElement.type = 'submit';
                    repositoriesList.append(repositoriesListElement);

                    function clickHandler() {

                        const container = createElement('li', 'container');

                        setTimeout(clearRepositoriesElement, 2000);
                    }
                    repositoriesListElement.addEventListener('click', clickHandler);
                });
                repositoriesList.style.display = 'block'
            });
    } else {
        clearRepositoriesElement();
    }

}

addRepositories = debounce(addRepositories, 500);
input.addEventListener('keyup', addRepositories);

function createElement(elementName, className) {
    const element = document.createElement(elementName);
    if (className) {
        element.classList.add(className);
    }
    return element;
}

function debounce(fn, ms) {
    let timeout;
    return function () {
        const fnCall = () => { fn.apply(this, arguments) };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms)
    }
}

function clearRepositoriesElement() {
    repositoriesList.innerHTML = '';
}


