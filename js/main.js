


const campoList = document.querySelector('#list');

//Fazendo a listagem de produtos dos items buscados
function listarSearch(array) {
    array.forEach((element) => {
        campoList.innerHTML += `
            <li class="itemList itemListSearch" id="${element.id}">
            <button class="buttonList" id="buttonList">
                    <img class="img" src="${element.image}" alt="imagem do produto">
                    <div class="divInfoProduct">
                        <h2 class="titleProduct">${element.nome}</h2>
                        <p class="description">Valor : R$${element.preco}</p>
                    </div> 
                </button>
            </li>
         `;
    })
}

listarSearch(arrayProdutos)

const inputSearch = document.querySelector('#inputSearch');

inputSearch.addEventListener('keyup', (event) =>{keyUpping(event)})

function keyUpping(event){
    const valorDigitado = event.target.value;

    const arraySearch = searchItems(valorDigitado);
    
    console.log(arraySearch);

    campoList.innerHTML = '';
    listarSearch(arraySearch)
    
}


function searchItems(valorDigitado) {
    return arrayProdutos.filter((element) => {
        return element.nome.toLowerCase().includes(valorDigitado.toLowerCase());
    })
}