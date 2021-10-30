const express =require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const {port,database}=require('./config/config.env')
const cors = require('cors')
// const path=require('path')
dotenv.config()
const app = express()
//databasa
mongoose.connect(database,()=>{
    console.log("Connecting to Database")
})

//middleware
app.use(express.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.use(express.json())
app.use(cors())


app.use(require('./routes/stores'))





app.listen(port, () => {
    console.log('Backend is running:'+ port);
})