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
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCounter = document.getElementById('cart-count');

//Abrindo o Modal com informações do carrinho
function abrirModal(){
  new bootstrap.Modal('#modal-window').show();
}

// Espera por um evento no botão para abrir o Modal do carrinho
cartBtn.addEventListener('click', () => {
  updateCarrinho();
})

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
      preco: price.toFixed(2),
      obs: ''
    }

    createProduto(produto);
    cartCounter.innerHTML = readProduto().length;
  }
})

// UPDATE NO LOCALSTORAGE PARA CRIAR O ITEM NO CARRINHO
const createItem = (produto, index) => {
  const newItem = document.createElement('div');
  newItem.innerHTML = `
    <div class="cart-item d-flex justify-content-between mb-2 align-items-center">
      <div class="item">
        <h3>${produto.item}</h3>
        <p>Preço: R$ ${produto.preco}</p>
        <p>Obs:</p>
        <input class="mb-2 input-obs" type="text" id="obs-${index}" placeholder="Adicione sua Observação">
      </div>
      <div class="item-buttons d-flex">
        <button id="edit-${index}" type="button" class="edit-item-btn" data-name="${produto.item}">
          Add OBS
        </button>
        <button id="delete-${index}" type="button" class="delete delete-item-btn" data-name="${produto.item}">
          X
        </button>
      </div>
    </div>
  `
  document.querySelector('#cart-items').appendChild(newItem);
}

const clearCarrinho = () => {
  const items = document.querySelectorAll('#cart-items>div');
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
  document.querySelector('#cart-items').appendChild(newTotal);
  cartCounter.innerHTML = readProduto().length;
}


// Espera um click nos botões "EDIT" e "DELETE" de um item específico
cartItemsContainer.addEventListener('click', function(event){
  if(event.target.type == 'button'){
    const [ action, index ] = event.target.id.split('-');
    
    if(action == 'edit'){
      editItem(index);
    } else{
      // chamada de função DELETE do CRUD passando o index do item
      deleteProduto(index);
      updateCarrinho();
    }
  }
})

const editItem = (index) => {
  //DISABLED = FALSE ou TRUE para habilitar a edição
  let produtoIndex = readProduto()[index];
  produtoIndex.obs = document.getElementById('obs-'+ index).value;
  updateProduto(index, produtoIndex);
  document.getElementById('obs-'+index).value = '';

  // ADICIONAR NO CARRINHO A OBS
  
  console.log(`EDITANDO O ITEM ${produtoIndex.item}`);
  console.log(produtoIndex);
}

// Função que irá pegar os produtos salvos no carrinho (localStorage) e enviará através de uma string como mensagem para o whatsapp da Sorveteria
const finalizarPedido = () => {
  let lista_produtos = readProduto();
  const pedido = lista_produtos.map((item) => {
    return (
      `Produto: ${item.item} - Preço: R$ ${item.preco} - OBS: ${item.obs} |`
    )
  }).join("")
  
  const message = encodeURIComponent(pedido); // mensagem com os itens do pedido
  const phone = "48991020114";  //contato da sorveteria que receberá o pedido

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
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