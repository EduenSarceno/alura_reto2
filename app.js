;(function(){
'use strict'

var juego = {
  palabra: 'ALURA',
  estado: 1,
  adivinado: ['A', 'L'],
  errado: ['B', 'J', 'K', 'C']
}

var $html = {
  hombre: document.getElementById('hombre'),
  adivinado: document.querySelector('.adivinado'),
  errado: document.querySelector('.errado')
}

function dibujar(juego) {
  // Actualizar la imagen del hombre
  var $elem
  $elem = $html.hombre
  $elem.src = './imgs/estados/0' + juego.estado + '.png'

  // Creamos las letras adivinadas
  var palabra = juego.palabra
  var adivinado = juego.adivinado
  $elem = $html.adivinado
  for (let letra of palabra) {
    let $span = document.createElement('span')
    let $txt = document.createTextNode('')
    if (adivinado.indexOf(letra) >= 0) {
      $txt.nodeValue = letra
    }
    $span.setAttribute('class', 'letra adivinada')
    $span.appendChild($txt)
    $elem.appendChild($span)
  }

  // Creamos las letras erradas
  var errado = juego.errado
  $elem = $html.errado
  for (let letra of errado) {
    let $span = document.createElement('span')
    let $txt = document.createTextNode(letra)
    $span.setAttribute('class', 'letra errada')
    $span.appendChild($txt)
    $elem.appendChild($span)
  }
}

console.log(juego)
dibujar(juego)

}())