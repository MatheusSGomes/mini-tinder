// CRIAR ARRAY ID TODOS OS USUÁRIOS
const all = document.querySelectorAll('span#id')

const todosIDs = Array.from(all).map((id) => {
  return id.dataset.id
})

// console.log(todosIDs)

let index = 0
let arrayLiked = []
let arrayDisliked = []

// SALVAR INDEX NO SESSION STORAGE OU LOCAL STORAGE
// sessionStorage.setItem('index', index)
// const indexSession = sessionStorage.getItem('index')
// console.log(indexSession)

const h2 = document.querySelectorAll('h2')
const img = document.querySelectorAll('img')

// INICIAR COM IMAGEM
img.forEach(item => {
  item.style.display = 'none'
})

h2[index].style.display = 'block'
img[index].style.display = 'block'

// <img src="/images/f.jpg" style="display: block;">
console.log(img[0])

function like() { 
  arrayLiked.push(todosIDs[index])

  // ID DO INDEX ATUAL 
  console.log(todosIDs[index])

  // VERIFICA SE É O ÚLTIMO ITEM DO ARRAY PARA ENVIAR FETCH
  if(index === todosIDs.length - 1) {
    sendLists(arrayLiked, arrayDisliked)
  }

  // INSCREMENTAR
  index++

  // CONDIÇÃO SE INDEX FOR MENOR DO QUE TODOS OS ARRAYS
  if(index <= todosIDs.length - 1) {
    // EXIBIR APENAS IMAGEM E NOME DO INDEX
    h2.forEach(item => {
      item.style.display = 'none'
    })
    h2[index].style.display = 'block'

    img.forEach(item => {
      item.style.display = 'none'
    })
    img[index].style.display = 'block'
  }

  // SE FOR ÚLTIMO ITEM, BLOQUEIA PARA NÃO ENVIAR MAIS
  if (index === todosIDs.length) {
    // REDIRECIONAR PÁGINA DE 'FIM DO GAME'
    console.log('Não mais imagem')
    window.location.replace('/game-over')

    const btnLike = document.querySelector('#btn-like')
    btnLike.setAttribute('disabled', '')
    
    const btnDislike = document.querySelector('#btn-dislike')
    btnDislike.setAttribute('disabled', '')
  }
}

function dislike() { 
  arrayDisliked.push(todosIDs[index])

  // ID DO INDEX ATUAL 
  console.log(todosIDs[index])

  // VERIFICA SE É O ÚLTIMO ITEM DO ARRAY PARA ENVIAR FETCH
  if(index === todosIDs.length - 1) {
    sendLists(arrayLiked, arrayDisliked)
  }

  // INSCREMENTAR
  index++

  // CONDIÇÃO SE INDEX FOR MENOR DO QUE TODOS OS ARRAYS
  if(index <= todosIDs.length - 1) {
    
    // EXIBIR APENAS IMAGEM E NOME DO INDEX
    h2.forEach(item => {
      item.style.display = 'none'
    })
    h2[index].style.display = 'block'

    img.forEach(item => {
      item.style.display = 'none'
    })
    img[index].style.display = 'block'
  }

  // SE FOR ÚLTIMO ITEM, BLOQUEIA PARA NÃO ENVIAR MAIS
  if (index === todosIDs.length) {

    // REDIRECIONAR PÁGINA DE 'FIM DO GAME'
    window.location.replace('/game-over')

    const btnLike = document.querySelector('#btn-like')
    btnLike.setAttribute('disabled', '')
    
    const btnDislike = document.querySelector('#btn-dislike')
    btnDislike.setAttribute('disabled', '')

  }
}

function sendLists(likedList, dislikedList) {
  fetch('/list', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ liked: likedList, disliked: dislikedList })
  }).then(data => console.log(data))
}