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

//Abrindo o Modal com informações do carrinho
function abrirModal(){
  new bootstrap.Modal('#modal-window').show();
}

//Evento de Clique para adicionar algum produto ao carrinho
produtos.addEventListener('click', function(event){
  let parentButton = event.target.closest('.add-to-cart-btn');

  if(parentButton){
    const name = parentButton.getAttribute('data-name');
    const price = parseFloat(parentButton.getAttribute('data-price'));
    
    // Adicionar no carrinho e LOCALSTORAGE

    //FAZER A CHAMADA DA FUNÇÂO SALVAR NO LOCALSTORAGE
    console.log(name);
    console.log(price.toFixed(2));
  }

})

// Configurando o MODAL do CARRINHO
const produtos = document.getElementById('tab-content');
const cartBtn = document.getElementById('cart-btn');
const modalWindow = document.getElementById('modal-window');
const cartItems = document.getElementById('cart-item');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCounter = document.getElementById('cart-count');





// 1- CONFIGURAR O MODAL c/ 
// https://www.youtube.com/watch?v=FXm7Dfre60I&t=0s


// 2- ADICIONAR O PRODUTO NO LOCALSTORAGE c/
// https://www.youtube.com/watch?v=SWTJxnms_YA&t=302s
// https://www.youtube.com/watch?v=_HEIqE_qqbQ&t=256s