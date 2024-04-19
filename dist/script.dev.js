"use strict";

var modalQtd;
var modalKey = 0;
var cart = []; //-------------Inicio Exibe informações das pizzas-------------//

pizzaJson.map(function (item, index) {
  //clonando o pizza-item
  var pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true); //O atributo data-key permite enviar dados através do html, esses dados podem se utilizados posteriormente por uma janela modal ou por qualquer outro componente.
  //definindo um atributo chamado data-key ao elemento .pizza-item contendo o id da pizza que foi selecionada pelo usuário

  pizzaItem.setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--img img').src = item.img; //toFixed = permite definir quantas casas decimais o javascript irá 

  pizzaItem.querySelector('.pizza-item--price').innerHTML = "R$ ".concat(item.price.toFixed(2).replace('.', ','));
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
  pizzaItem.querySelector('a').addEventListener('click', function (event) {
    event.preventDefault();
    modalQtd = 1;
    modalKey = index; //queremos pegar a key da pizza ou seja a posição dela no array para sabermos qual pizza foi clicada. Sabemos que todas as pizzas posuem um atrributo data-key com a chave da mesma, assim iremos utilizar o closest para selecionar o elemento e pegar esta key.
    //closest = busca a partir do elemento especificado o elemento mais próximo com a classe ou id especificado, primeiro ele irá procurar dentro de si e depois o elemento mais próximo, seja acima ou abaixo dele.
    //getAttribute =  pega o valor de um atributo

    var key = event.target.closest('.pizza-item').getAttribute('data-key');
    document.querySelector('.pizzaWindowArea').computedStyleMap.opacity = 0;
    document.querySelector('.pizzaWindowArea').style.display = 'flex';
    setTimeout(function () {
      document.querySelector('.pizzaWindowArea').style.opacity = 1;
    }, 150);
    document.querySelector('.pizzaBig img').src = pizzaJson[key].img;
    document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    document.querySelector('.pizzaInfo--actualPrice').innerHTML = "R$ ".concat(pizzaJson[key].price.toFixed(2).replace('.', ','));
    document.querySelector('.pizzaInfo--size.selected').classList.remove('.selected'); //

    document.querySelectorAll('.pizzaInfo--size').forEach(function (size, sizeIndex) {
      //fará que a o tamanho garnde sempre seja selecionada por padrão ao usuário clicar em uma pizza
      if (sizeIndex == 2) {
        size.classList.add('selected');
      }

      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]; //size.querSeleector('span').innerHTML = '123';
    });
  });
  document.querySelector('.pizza-area').append(pizzaItem);
}); //-------------Fim Exibe informações das pizzas-------------//
//-----------Funcionalidade janela modal----------------//
//-----------Função que fecha o modal-------------//

function closeModal() {
  document.querySelector('.pizzaWindowArea').style.opacity = 0;
  setTimeout(function () {
    document.querySelector('.pizzaWindowArea').style.display = 'none';
  }, 500);
} //Estamos usando o forEach para que automaticamente ele selecione automaticamente cada um dos elementos com as classes abaixo e adicione um EventListener nesses elementos, a cada vez que o usuário clicar em algum botão de fechar ele irá detectar o clique e irá chamar a função closeModal para fechar a janela.


document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(function (item) {
  item.addEventListener('click', closeModal);
});
/* document.querySelector('.pizzaInfo--cancelButton').addEventListener(() => { 

}) */
//-------------QUANTIDADE DE PIZZAS--------------//

document.querySelector('.pizzaInfo--qtmais').addEventListener('click', function () {
  modalQtd++;
  document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
});
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', function () {
  if (modalQtd > 1) {
    modalQtd--;
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
  }
});
//# sourceMappingURL=script.dev.js.map
