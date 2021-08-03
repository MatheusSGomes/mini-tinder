const express = require('express');
const session = require('express-session')
const app = express();
const path = require('path')

app.use(session({
  secret: 'segredo',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: (30 * 60 * 1000) // 30 minutos
  }
}))

app.use(express.static(__dirname + '/views/pages'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(path.resolve(__dirname, 'storage')))

// ROTAS
const postRoutes = require('./routes/postRoutes.js')
const getRoutes = require('./routes/getRoutes.js')

app.use('/', postRoutes)
app.use('/', getRoutes)


app.listen(3000, () => {
  console.log('Servidor rodando porta 3000')
});