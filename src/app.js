const path = require('path')
const { request } = require('express')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
  res.render('index',{
    title: 'Cotações',
    author: 'Nunes'
  })
})

app.get('/about',(req,res) => {
  res.render('about',{
    title: 'Sobre',
    author: 'Nunes'
  })
})

app.get('/help',(req,res) => {
  res.render('help',{
    title: 'Help',
    author: 'Nunes'
  })
})

app.get('/cotacoes', (req,res) => {


  if (!req.query.ativo) {
    return res.status(400).json({
      message: 'O Ativo deve ser informado'
    })
  }

  const symbol = req.query.ativo.toUpperCase()
  cotacoes(symbol,(err, body)=>{
    if (err) {
      const {message} = err
      return res.status(err.code).json({error:{
        message:err.message,
        code: err.code
      }})
    }
    return res.status(200).json(body)
  })
})

app.get('/help/*',(req,res) => {
  res.render('404',{
    title: '404',
    errorMessage: 'Não existe página depois do help',
    author: 'Nunes'
  })
})

app.get('*',(req,res) => {
  res.render('404',{
    title: '404',
    errorMessage: 'Página não encontrada',
    author: 'Nunes'
  })
})

app.listen(3000,()=>{
  console.log('server is up on port 3000')
})
