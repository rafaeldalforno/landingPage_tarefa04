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



// let tela = window.screen;
// if(tela.availWidth < 991){
  
// }