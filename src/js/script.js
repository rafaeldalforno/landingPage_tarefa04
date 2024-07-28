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



// 1- CONFIGURAR O MODAL c/ 
// https://www.youtube.com/watch?v=FXm7Dfre60I&t=0s


// 2- ADICIONAR O PRODUTO NO LOCALSTORAGE c/
// https://www.youtube.com/watch?v=SWTJxnms_YA&t=302s
// https://www.youtube.com/watch?v=_HEIqE_qqbQ&t=256s