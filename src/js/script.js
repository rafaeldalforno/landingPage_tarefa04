// Requisição Ajax para apresentar os produtos do cardápio
function requisitar(url){
  document.getElementById('tab-content').innerHTML = '';

  let ajax = new XMLHttpRequest();
  ajax.open('GET', url);

  ajax.onreadystatechange = () => {
    if(ajax.readyState == 4 && ajax.status == 200){
      document.getElementById('tab-content').innerHTML = ajax.responseText;

      const botoes = document.querySelectorAll('.tab-btn');
      botoes.forEach((botao) => {
        botao.addEventListener('click', function(){
          botoes.forEach((botao) => botao.classList.remove('active'));
          this.classList.add('active');
        })
      })
    }

    if(ajax.readyState == 4 && ajax.status == 404){
      document.getElementById('tab-content').innerHTML = 'Requisição não encontrada - ERRO 404!';
    }
  }

  ajax.send();
}


// ACESSANDO O DOM E SALVANDO EM VARIÁVEIS
const produtos = document.getElementById('tab-content');
const cartBtn = document.getElementById('cart-btn');
const modalWindow = document.getElementById('modal-window');
const cartItems = document.getElementById('cart-item');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCounter = document.getElementById('cart-count');
const editButton = document.getElementById('delete');


//Abrindo o Modal com informações do carrinho
function abrirModal(){
  new bootstrap.Modal('#modal-window').show();
}
cartBtn.addEventListener('click', () => updateCarrinho());

// EVENTOS DE CLICK 
//Evento de Clique para adicionar algum produto ao carrinho
produtos.addEventListener('click', function(event){
  let parentButton = event.target.closest('.add-to-cart-btn');

  if(parentButton){
    const name = parentButton.getAttribute('data-name');
    const price = parseFloat(parentButton.getAttribute('data-price'));
    
    // Adicionar no LOCALSTORAGE
    const produto = {
      item: name,
      preco: price.toFixed(2)
    }

    createProduto(produto);
    cartCounter.innerHTML = readProduto().length;
  }
})

// UPDATE NO LOCALSTORAGE PARA CRIAR O ITEM NO CARRINHO
const createItem = (produto) => {
  const newItem = document.createElement('div');
  newItem.innerHTML = `
    <div id="cart-item" class="d-flex justify-content-between mb-2 align-items-center">
      <div class="item">
        <h3>${produto.item}</h3>
        <p>Preço: R$ ${produto.preco}</p>
        <p>Obs:</p>
      </div>
      <div class="item-button">
        <button id="edit" onclick="editItem()">
          <i class="bi bi-pencil"></i>
        </button>
        <button id="delete" onclick="deleteItem()">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  `
  document.querySelector('.modal-body').appendChild(newItem);
}

const clearCarrinho = () => {
  const items = document.querySelectorAll('.modal-body>div');
  items.forEach(item => item.parentNode.removeChild(item));
}

const updateCarrinho = () => {
  let lista_produtos = readProduto();
  clearCarrinho();
  lista_produtos.forEach(createItem);

  let somaPrecoTotal = 0.00;
  for(produto of lista_produtos){
    somaPrecoTotal += parseFloat(produto.preco);
  }
  const newTotal = document.createElement('div');
  newTotal.innerHTML = `
    <p class="fw-bold fs-5 text-end">Total: R$<span id="cart-total">${somaPrecoTotal.toFixed(2)}</span></p>
  `
  document.querySelector('.modal-body').appendChild(newTotal);
}



//EVENTO DE CLICK EDIT / DELETE
// document.querySelector('.modal-body>div').addEventListener('click', editDelete);

const editItem = () => {
    console.log("CLICOU NO EDIT");
}

const deleteItem = () =>{
  console.log("CLICOU NO DELETE");
}



// FUNÇÕES DE ACESSO AO LOCALSTORAGE (CRUD)
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_carrinho')) ?? [];

const setLocalStorage = (lista_produtos) => localStorage.setItem("db_carrinho", JSON.stringify(lista_produtos));

// Função CREATE do CRUD
const createProduto = (produto) => {
  let lista_produtos = getLocalStorage();
  lista_produtos.push(produto);
  setLocalStorage(lista_produtos);
}

// Função READ do CRUD
const readProduto = () => getLocalStorage();

// Função UPDATE do CRUD
const updateProduto = (index, produto) => {
  let lista_produtos = readProduto();
  lista_produtos[index] = produto;
  setLocalStorage(lista_produtos);
}

// Função DELETE do CRUD
const deleteProduto = (index) => {
  let lista_produtos = readProduto();
  lista_produtos.splice(index, 1);
  setLocalStorage(lista_produtos);
}


// 1- CONFIGURAR O MODAL c/ 
// https://www.youtube.com/watch?v=FXm7Dfre60I&t=0s


// 2- ADICIONAR O PRODUTO NO LOCALSTORAGE c/
// https://www.youtube.com/watch?v=SWTJxnms_YA&t=302s
// https://www.youtube.com/watch?v=_HEIqE_qqbQ&t=256s