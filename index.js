const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const employeeRoutes = require('./routes/employee')

app.use(session({
    secret: "nodejs",
    resave: true,
    saveUninitialized: true
    
}))

app.use(flash())

//flash messages

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash(('success_msg'))
    res.locals.error_msg = req.flash(('error_msg'))
    next()
})

app.use(methodOverride('_method'))

dotenv.config({path : './config.env'})
app.use(bodyParser.urlencoded({extended : true}))
mongoose.connect(process.env.DATABASE_LOCAL,{
useNewUrlParser: true,
useUnifiedTopology: true
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('Public'))
app.use(employeeRoutes)







const port = process.env.PORT


app.listen(port, ()=>{
    console.log(`connected to ${port}`)
})