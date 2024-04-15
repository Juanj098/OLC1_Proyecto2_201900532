const parser = require("./Analizador/analizador")
const cors = require('cors');
const morgan = require('morgan');
var express = require('express');

var tSymbol
var app = express();
var corsOpt ={
    origin:"*"
}
const port = 3000;

app.get('/',function(req,res){
   res.send('Hello world :D') 
});

app.use(express.text())
app.use(morgan('dev'))
app.use(cors(corsOpt))

app.post('/analizar',function(req,res){
    console.log(req.body)
    let resp = parser.parse(req.body)
    console.log(resp)
    res.send("entrada analizada :)")
});

app.get('/Tsym',function(req,res){
    console.log('<Tsym>')
    let resp = ({"tsym":"sym"})
    res.json(resp)
})
app.listen(port,()=>{
    console.log(`server on port ${3000}`)
})
