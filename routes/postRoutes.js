const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

let usuarios = require('../usuarios.js')

function findUsersByPassword(pass) {
  return usuarios.find((users) => users.senha === pass)
}

function findUserByEmail(email) {
  return usuarios.find((users) => users.email === email)
}

function findUserById(id) {
  return usuarios.find((users) => users._id === id)
}

// GAME
router.post('/list', express.json(), function(req, res) {
  // console.log(req.body.liked)
  // console.log(req.body.disliked)

  findUserByEmail(req.session.email).likedList.push(...req.body.liked)
  findUserByEmail(req.session.email).dislikedList.push(...req.body.disliked)

  // console.log(findUserByEmail(req.session.email).likedList)
  // console.log(findUserByEmail(req.session.email).dislikedList)

  // res.redirect('/')
})

// CADASTRO
router.post('/register', function(req, res) {
  const form = formidable({ multiples: true, uploadDir: __dirname })

  form.parse(req, function(erro, fields, files) {
    try {
      // CRIAR ID DO USUÁRIO
      const createId = Date.now().toString()

      // EDITAR NOME DA FOTO
      const extName = path.extname(files.filestoupload.name)
  
      files.filestoupload.name = createId + extName

      // CONFIGURAÇÕES REGISTRO NOVO USUÁRIO
      usuarios.push({
        _id: createId,
        nome: fields.nome,
        idade: fields.idade,
        email: fields.email,
        senha: fields.senha,
        telefone: fields.telefone,
        sexo: fields.sexo,
        foto: files.filestoupload.name,
        likedList: [],
        dislikedList: [],
      })

      console.log(usuarios)

      // array[array.length - 1]
      // console.log(usuarios[usuarios.length - 1]);
      // console.log(fields);
      // console.log(files.filestoupload.name)
      
      // CONFIGURAÇÕES UPLOAD IMAGEM
      const oldpath = files.filestoupload.path
      const newpath = path.join(__dirname, '../storage', files.filestoupload.name)

      fs.renameSync(oldpath, newpath)

      res.render('pages/index', { error: '', welcome: 'Obrigado por se cadastrar, faça login para começar'})

    } catch (error) {
      console.log('Erro:', error)
    }
  })
})

// LOGIN
router.post('/login', function(req, res) {
  if(req.body.senha === findUserByEmail(req.body.email).senha) {

    // CRIA SESSÃO SE DADOS FOREM VÁLIDOS
    req.session.email = findUserByEmail(req.body.email).email

    res.redirect('/game')
  } else {
    res.render('pages/index', { error: 'Email ou senha errada', welcome: ''})
  }
})


router.post('/update', function(req, res) {
  const dadosAtualizados = findUserByEmail(req.session.email)

  const form = formidable({ multiples: true, uploadDir: __dirname })

  form.parse(req, function(erro, fields, files) {
    try {
      // EDITAR NOME DA FOTO
      const extName = path.extname(files.filestoupload.name)
      files.filestoupload.name = dadosAtualizados._id + extName

      // CONFIGURAÇÕES UPLOAD IMAGEM
      const oldpath = files.filestoupload.path
      const newpath = path.join(__dirname, '../storage', files.filestoupload.name)

      fs.renameSync(oldpath, newpath)

      // ATUALIZAR DADOS
      console.log('Dados atualizados')
      
      dadosAtualizados.nome = fields.nome
      dadosAtualizados.email = fields.email
      dadosAtualizados.senha = fields.senha
      dadosAtualizados.telefone = fields.telefone

      if(extName) {
        dadosAtualizados.foto = files.filestoupload.name
      }
      
      console.log(dadosAtualizados)
      
      res.redirect('/game')

    } catch (error) {
      console.log('Erro:', error)
      
    }
  })
})

router.post('/delete', function(req, res) {
  const dadosParaDeletar = findUserByEmail(req.body.email)
  const filterDelete = usuarios.filter((item) => item._id !== dadosParaDeletar._id)

  usuarios = filterDelete

})

module.exports = router