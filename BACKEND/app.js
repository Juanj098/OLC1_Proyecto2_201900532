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
    let data = req.body
    let resp = parser.parse(data)  
    // console.log(resp)
    resp.Ejecutar()
    let resx = resp.Interpretar()
    console.log(resx)
    res.send(resx)
});

app.get('/Tsym',function(req,res){
    console.log('<Tsym>')
    let resp = ({"tsym":"sym"})
    res.json(resp)
})
app.listen(port,()=>{
    console.log(`server on port ${3000}`)
})
