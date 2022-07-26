
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
adicionandoEventButton();

//Adicionando evento de clique em cada produto 
function adicionandoEventButton() {
    const buttons = document.querySelectorAll('#buttonList');
    buttons.forEach((element) => {
        element.addEventListener('click', () => {
            addItensBag(element.parentNode.id);
        });
    })

}

//Adicionando items a bag
const itemsBag = [];
function addItensBag(id) {
    itemsBag.push(arrayProdutos[id]);
    exibirBag(itemsBag);
    
}

 const FieldList = document.querySelector('#listBag');
 function exibirBag(itemsBag) {
    console.log(itemsBag)
    FieldList.innerHTML = '';
    itemsBag.forEach(element =>{
        FieldList.innerHTML += `
        <li class="itemList itemListBag" id="${element.id}">
            <img class="img" src="${element.image}" alt="imagem produto selecionado">
                <div class="divInfoProduct">
                    <h2 class="titleProduct">${element.nome}</h2>
                    <p class="description">Valor : R$${element.preco}</p>
                    <button class="btnRemove description">Remover</button>
                </div>
                <div class="divQuantidade">
                    <button class="buttonQuantidade">
                        <img class="imgIcon" src="assets/chevron-up.svg" alt="Aumentar quantidade">
                    </button>
                    <input class="inputQuantidade" type="text" value="1">
                    <button class="buttonQuantidade">
                        <img class="imgIcon"  src="assets/chevron-down.svg" alt="Reduzir quantidade">
                    </button>
                </div>
        </li>
        `
    })  
 }
//A cada vez que o usuário digita um caracter
//Será preenchido um array com os dados recebidos

const inputSearch = document.querySelector('#inputSearch');
inputSearch.addEventListener('keyup', (event) => { keyUpping(event) })

function keyUpping(event) {
    const valorDigitado = event.target.value;

    const arraySearch = searchItems(valorDigitado);

    campoList.innerHTML = '';
    listarSearch(arraySearch)
    adicionandoEventButton();
}

//Utilizando o filter para buscas 
function searchItems(valorDigitado) {
    return arrayProdutos.filter((element) => {
        return element.nome.toLowerCase().includes(valorDigitado.toLowerCase());
    })
}

