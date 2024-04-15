const {Ctx} = require("../../Entorno/Entorno")
const {instruccion} = require("../instruccion")
const {exp} = require("../../Expresion/expresion")
const {typeD} = require("../../Enums/TipoDato") 
class DecVar extends instruccion{
    constructor(id,tipo,valor){
        super("Declaracion",this.fila,this.columna)
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }
}