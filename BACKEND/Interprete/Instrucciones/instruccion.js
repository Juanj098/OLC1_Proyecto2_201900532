const {Ctx} = require("../Entorno/Entorno")

class instruccion{
    constructor(tipo,fila,columna){
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
    Interpretar(Ctx){}
}
module.exports={instruccion}