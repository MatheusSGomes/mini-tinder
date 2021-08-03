const express = require('express')
const router = express.Router()
const path = require('path')

const usuarios = require('../usuarios.js')

function findUserByEmail(email) {
  const usuarioSelecionado = usuarios.find((user) => {
    return user.email === email
  })

  return usuarioSelecionado
}

function filterUserById(id) {
  return usuarios.filter((users) => users._id === id)
}

function checkAuthenticated (req, res, next) {
  if(req.session.email) {
    next()
  } else {
    res.redirect('/')
  }
}

function checkNotAuthenticated (req, res, next) {
  if(req.session.email) {
    res.redirect('back')
  } else {
    next()
  }
}

let usersForMatch;

router.get('/', checkNotAuthenticated, function(req, res) {
  res.render('pages/index', { error: '', welcome: ''});
})

router.get('/game', checkAuthenticated, function(req, res) {
  // http://localhost:3000/game/?page=20&limit=30
  // console.log(req.query.page)
  // console.log(req.query.limit)

  // FILTRA USUÁRIOS SEXO OPOSTO - CASO MASCULINO
  if(findUserByEmail(req.session.email).sexo === 'masculino') {
    usersForMatch = usuarios.filter((user, index) => {
      return user.sexo === 'feminino'
    })
  }

  // FILTRA USUÁRIOS SEXO OPOSTO - CASO FEMININO
  if (findUserByEmail(req.session.email).sexo === 'feminino') {
    usersForMatch = usuarios.filter((user, index) => {
      return user.sexo === 'masculino'
    })
  }

  // FILTRAR USUARIOS LIKED
  const toRemoveLiked = findUserByEmail(req.session.email).likedList
  
  usersForMatch = usersForMatch.filter((elemento) => {
    return !toRemoveLiked.includes(elemento._id)
  })

  // FILTRAR USUÁRIOS DISLIKED
  const toRemoveDisliked = findUserByEmail(req.session.email).dislikedList
  
  usersForMatch = usersForMatch.filter((elemento) => {
    return !toRemoveDisliked.includes(elemento._id)
  })

  // VERIFICA SE HÁ USUÁRIOS PARA MATCH, SE NÃO HOUVER REDIRECIONA PARA 'GAME-OVER', SE HOUVER ELE ENTRA NO GAME
  if (usersForMatch.length === 0) {
    res.redirect('/game-over')

  } else {
    res.render('pages/game', { 
      usuarios: usersForMatch,
    })
  }
})

router.get('/game-over', checkAuthenticated, function(req, res) {
  res.render('pages/game-over')
})

router.get('/matchs', checkAuthenticated, function(req, res) {

  let usersMatched;

  // FILTRA DE ACORDO COM O SEXO OPOSTO
  if(findUserByEmail(req.session.email).sexo === 'masculino') {
    usersMatched = usuarios.filter((user) => {
      return user.sexo === 'feminino'
    })
  }

  if(findUserByEmail(req.session.email).sexo === 'feminino') {
    usersMatched = usuarios.filter((user) => {
      return user.sexo === 'masculino'
    })
  }

  // PEGAR USUÁRIOS PELOS IDs DE LIKE
  usersMatched = findUserByEmail(req.session.email).likedList.map((id) => {
    return filterUserById(id)
  })
  
  // REMOVER USUÁRIOS DO ARRAY DUPLICADO
  usersMatched = usersMatched.flat()

  // FILTRAR MATCH (QUEM TAMBÉM CURTIU O MESMO ID)
  usersMatched = usersMatched.filter((user, index) => {
    if(user.likedList.includes(findUserByEmail(req.session.email)._id)) {
      return user
    }
  })

  // ENVIAR USUÁRIOS LIKED
  res.render('pages/matchs', { matchs: usersMatched })
})

router.get('/register', checkNotAuthenticated, function(req, res) {
  res.render('pages/register')
})

router.get('/update', checkAuthenticated, function(req, res) {
    const dataForUpdate = {
      nome: findUserByEmail(req.session.email).nome,
      email: findUserByEmail(req.session.email).email,
      senha: findUserByEmail(req.session.email).senha,
      foto: findUserByEmail(req.session.email).foto,
      telefone: findUserByEmail(req.session.email).telefone,
    }

    // console.log(dataForUpdate)

    res.render('pages/update', { 
      data: dataForUpdate,
    })
})

router.get('/logout', checkAuthenticated, function(req, res) {
  req.session.destroy(function(error) {
    res.redirect('/')
  })
})

router.get('/*', checkNotAuthenticated, function(req, res) {
  res.redirect('/')
})

module.exports = router