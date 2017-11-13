const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const models = require('./models')
const router = require('./routes/router')
const app = express()

app.set('view engine', 'html')
app.engine('html', nunjucks.render)
nunjucks.configure('views', {
    noCache: true,
    express: app
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', router)

app.use((req,res,next)=>{
    console.log(req.header)
    next()
})

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})

// app.get('/wiki',(req,res)=>{
//     res.render('index')
// })

// app.get('/wiki/:urlTitle',()=>{
//     models.Page.route()
// })

// app.post('/wiki/add',(req,res)=>{
//     res.render('index')
// })

models.User.sync()
.then(
    ()=>{return models.Page.sync()})
.then(
    app.listen(3000,()=>console.log('Server listening')))
.catch(console.error)

