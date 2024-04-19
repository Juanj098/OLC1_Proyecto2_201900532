const {Ctx} = require("../../Entorno/Entorno")
const {instruccion} = require("../instruccion")
const {exp} = require("../../Expresion/expresion")
const {TypeSym} = require("../../Enums/TypeSym") 
const {TypeData} =  require("../../Enums/TipoDato")
class DecVar extends instruccion{
    constructor(id,tipo,valor,fila,columna){
        super("Declaracion",fila,columna)
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }

    Interpretar(Ctx,consola){
        // console.log(this.id)
        if(this.valor == null){
            for(let i = 0;i<this.id.length;i++){
                if (this.tipo.toUpperCase() == TypeData.INT[0]){
                    Ctx.addSym(this.id[i],0,this.tipo,TypeSym.VARIABLE,this.fila,this.columna)
                } else if (this.tipo.toUpperCase() == TypeData.DOUBLE[0]){
                    Ctx.addSym(this.id[i],0.0,this.tipo,TypeSym.VARIABLE,this.fila,this.columna)
                } else if (this.tipo.toUpperCase() == TypeData.BOOL[0]){
                    Ctx.addSym(this.id[i],true,this.tipo,TypeSym.VARIABLE,this.fila,this.columna)
                } else if (this.tipo.toUpperCase() == TypeData.CHAR[0]){
                    Ctx.addSym(this.id[i],'\u0000',this.tipo,TypeSym.VARIABLE,this.fila,this.columna)
                } else if (this.tipo.toUpperCase() = TypeData.STD_STRING[0]){
                    Ctx.addSym(this.id[i],"",this.tipo,TypeSym.VARIABLE,this.fila,this.columna)
                }
            }
        } else {
            for(let i = 0; i < this.id.length; i++){  
                const value = this.valor.Interpretar(Ctx)

                if(value.tipo == TypeData.INT[0]){ //integer
                    Ctx.addSym(this.id[i],value.valor,value.tipo,TypeSym.VARIABLE,this.fila,this.columna)
                } else if (value.tipo == TypeData.DOUBLE[0]){ //double
                    Ctx.addSym(this.id[i],value.valor,value.tipo,TypeSym.VARIABLE,this.fila,this.columna)
                } else if(value.tipo == TypeData.BOOL[0]){//Bool
                    Ctx.addSym(this.id[i],value.valor,value.tipo,TypeSym.VARIABLE,this.fila,this.columna)
                } else if (value.tipo == TypeData.CHAR[0]){ //char
                    Ctx.addSym(this.id[i],value.valor,value.tipo,TypeSym.VARIABLE,this.fila,this.columna)
                }else if (value.tipo[0] == TypeData.STD_STRING[0]){ //string
                    Ctx.addSym(this.id[i],value.valor,value.tipo,TypeSym.VARIABLE,this.fila,this.columna)
                }else{ 
                    console.log("dato no compatible con tipo")
                }
            }
        }
        return null
    }
}

module.exports = {DecVar}