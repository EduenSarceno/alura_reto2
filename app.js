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

  var estado = juego.estado
  if (estado === 8) {
    estado = juego.previo
  }
  $elem.src = './imgs/estados/0' + estado + '.png'

  // Creamos las letras adivinadas
  var palabra = juego.palabra
  var adivinado = juego.adivinado
  $elem = $html.adivinado
  // borramos los elementos anteriores
  $elem.innerHTML = ''
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
  // Borramos los elementos anteriores
  $elem.innerHTML = ''
  for (let letra of errado) {
    let $span = document.createElement('span')
    let $txt = document.createTextNode(letra)
    $span.setAttribute('class', 'letra errada')
    $span.appendChild($txt)
    $elem.appendChild($span)
  }
}

function adivinar(juego, letra) {
  var estado = juego.estado
  // Si ya se ha perdido, o ganado, no hay que hacer nada
  if (estado === 1 || estado === 8) {
    return
  }

  var adivinado = juego.adivinado
  var errado = juego.errado
  // Si ya hemos adivinado o errado la letra, no hay que hacer nada
  if (adivinado.indexOf(letra) >= 0 ||
      errado.indexOf(letra) >= 0) {
    return
  }

  var palabra = juego.palabra
  // Si es letra de la palbra
  if (palabra.indexOf(letra) >= 0) {
    let ganado = true
    // Debemos ver si llegamos al estado ganado
    for (let l of palabra) {
      if (adivinado.indexOf(l) < 0 && l != letra) {
        ganado = false
        juego.previo = juego.estado
        break
      }
    }
    // Si ya se ha ganado, debemos indicarlo
    if (ganado) {
      juego.estado = 8
    }
    // Agregamos la letra, a la lista de letras adivinadas
    adivinado.push(letra)
  } else {
    // Si no es letra de la palabra, acercamos al hombre un paso más de su ahorca
    juego.estado--
    // Agregamos la letra, a la lista de letras erradas
    errado.push(letra)
  }
}

window.onkeypress = function adivinarLetra(e) {
  var letra = e.key
  letra = letra.toUpperCase()
  if (/[^A-ZÑ]/.test(letra)) {
    return
  }
  adivinar(juego, letra)
  dibujar(juego)
}

dibujar(juego)

}())