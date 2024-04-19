const {instruccion} = require("../instruccion")
const {Ctx} = require("../../Entorno/Entorno")
const {TypeSym} = require("../../Enums/TypeSym")
const {TypeData} = require("../../Enums/TipoDato")
class Asignacion extends instruccion{
    constructor(id,tipo,valor,fila,columna){
        super("Asignacion",fila,columna)
        this.id = id;
        this.tipo = tipo;
        this.valor = valor
    }
    Interpretar(Ctx,consola){
        for(let i = 0; i < this.id.length; i++){  
            if((this.tipo.toUpperCase() == TypeData.INT) && (/^-?\d+$/.test(this.valor))){ //integer
                Ctx.addSym(this.id[i],this.valor,this.tipo,TypeSym.VARIABLE,this.fila,this.columna)
            } else if ((this.tipo.toUpperCase() == TypeData.DOUBLE) && (/^-?\d+(\.\d+)$/.test(this.valor))){ //double
                Ctx.addSym(this.id[i],this.valor,this.tipo,TypeSym.VARIABLE,this.fila,this.columna)
            } else if((this.tipo.toUpperCase() == TypeData.BOOL) && (this.valor == 'true' || this.valor == 'false')){//Bool
                Ctx.addSym(this.id[i],this.valor,this.tipo,TypeSym.VARIABLE,this.fila,this.columna)
            } else if ((this.tipo.toUpperCase() == TypeData.CHAR) && (/^'([a-zA-Z])'$/.test(this.valor))){ //char
                Ctx.addSym(this.id[i],this.valor,this.tipo,TypeSym.VARIABLE,this.fila,this.columna)
            }else if ((this.tipo.toUpperCase() == TypeData.STD_STRING)&&(/^"(.*)"$/.test(this.valor))){ //string
                Ctx.addSym(this.id[i],this.valor,this.tipo,TypeSym.VARIABLE,this.fila,this.columna)
            }else{ 
                console.log("dato no compatible con tipo")
            }
        }
    }
}
module.exports = {Asignacion}
