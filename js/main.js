
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
let itemsBag = [];
function addItensBag(id) {
    if(validarBag(id) === false || itemsBag.length === 0){
        itemsBag.push(arrayProdutos[id]);
        exibirBag(itemsBag);
        
        //Adicionando evento de remover item da bag
        RemoveItem();
        verificaQuantidades();
        modifyQuantity();
        calcularTotal();
    }
  
}

//Função para verificar se algum item selecionado ja está na lista.
function validarBag(idclicado){
    for(let c = 0 ; c < itemsBag.length ; c++)
       if(itemsBag[c].id == idclicado){
        return true;
       }else{
        if(c === itemsBag.length - 1){
            return false;
        }
       }
}

const FieldList = document.querySelector('#listBag');
function exibirBag(itemsBag) {
    // validarBag(elementClicado);
   
    FieldList.innerHTML = '';
    itemsBag.forEach(element => {
        FieldList.innerHTML += `
        <li class="itemList itemListBag" id="${element.id}">
            <img class="img" src="${element.image}" alt="imagem produto selecionado">
                <div class="divInfoProduct">
                    <h2 class="titleProduct">${element.nome}</h2>
                    <p class="description">Valor : R$${element.preco}</p>
                    <button class="btnRemove description" data-remove>Remover</button>
                </div>
                <div class="divQuantidade">
                    <button class="buttonQuantidade" data-adicionar-quantidade id="${element.id}">
                        <img class="imgIcon" src="assets/chevron-up.svg" alt="Aumentar quantidade">
                    </button>
                    <input class="inputQuantidade" data-quantidade id="${element.id}" type="text" value="1">
                    <button class="buttonQuantidade" data-reduzir-quantidade id="${element.id}">
                        <img class="imgIcon"  src="assets/chevron-down.svg" alt="Reduzir quantidade">
                    </button>
                </div>
        </li>
        `
    })
    
     //Adicionando evento de remover item da bag
     RemoveItem();
}

//Removendo todos os items da bag 
const buttonRemoveAll = document.querySelector('#buttonRemoveAll');
buttonRemoveAll.addEventListener('click', RemoveAllItems);

function RemoveAllItems() {
    FieldList.innerHTML = '';
    itemsBag = [];
    calcularTotal();
}

//Removendo item bag 


function RemoveItem() {
    
    const buttonsRemove = document.querySelectorAll("[data-remove]");
    buttonsRemove.forEach(element => {

        element.addEventListener('click', (event) => {
            
            const itemRemoved  = event.target.parentNode.parentNode.id;

            for(let c=0;c < itemsBag.length;c++) {
                itemsBag[c].id == itemRemoved ? itemsBag.splice(c, 1) : false ;
               
            }
            
            exibirBag(itemsBag);
            calcularTotal();
        });
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

    //Adicionando eventos
    adicionandoEventButton();

}

//Utilizando o filter para buscas 
function searchItems(valorDigitado) {
    return arrayProdutos.filter((element) => {
        return element.nome.toLowerCase().includes(valorDigitado.toLowerCase());
    })
}

//Calculando valor total 
 let valores = [];
 function verificaQuantidades(){
     const inputsQuantidade = document.querySelectorAll("[data-quantidade]")
     
     //Adicionar quantidade ao seu respectivo id 
     inputsQuantidade.forEach(element => {
          for (let c = 0; c < itemsBag.length; c++) {
            if(parseInt(element.id) === itemsBag[c].id){
                 itemsBag[c].quantidade = parseInt(element.value);
            }
          }
     })

     
 }

//Eventos de manipulação de quantidade do item
function modifyQuantity(){
    const inputsQuantidade = document.querySelectorAll("[data-quantidade]")
    const buttonsAdicionar = document.querySelectorAll("[data-adicionar-quantidade]");
    const buttonsRemover = document.querySelectorAll("[data-reduzir-quantidade]");
    
    buttonsAdicionar.forEach(element =>{
        element.addEventListener("click", () => {
            inputsQuantidade.forEach(elementInput =>{
                    if(elementInput.id == element.id){
                        ++ elementInput.value; 
                        verificaQuantidades();
                        calcularTotal();
                    }

            })
        })
    });
    buttonsRemover.forEach(element =>{
        element.addEventListener("click", () => {
            inputsQuantidade.forEach(elementInput =>{
                if(elementInput.id == element.id && elementInput.value > 1){
                    -- elementInput.value; 
                    verificaQuantidades();
                    calcularTotal();
                }

            })
        })
    })

}
//Calcular resultado de saida
function calcularTotal(){
    const output = document.querySelector('#output');
    let valorTotal = 0;

    if(itemsBag.length > 0){
        itemsBag.forEach(element =>{
            valorTotal += parseFloat(element.quantidade) * parseFloat(element.preco);
        })
    }
    output.innerText = `R$${valorTotal}`;
}