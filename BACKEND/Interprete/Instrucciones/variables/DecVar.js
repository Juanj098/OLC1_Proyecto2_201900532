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

    Interpretar(ctx,consola){
        // console.log(this.id)
        let dato = ctx.getSym(this.id)
        if(dato){
            console.log("dato ya declarado")
        } else {
            if(this.valor == null){
                for(let i = 0;i<this.id.length;i++){
                    if (this.tipo.toUpperCase() == TypeData.INT[0]){
                        ctx.addSym(this.id[i],0,TypeData.INT,TypeSym.VARIABLE,this.fila,this.columna)
                    } else if (this.tipo.toUpperCase() == TypeData.DOUBLE[0]){
                        ctx.addSym(this.id[i],0.0,TypeData.DOUBLE,TypeSym.VARIABLE,this.fila,this.columna)
                    } else if (this.tipo.toUpperCase() == TypeData.BOOL[0]){
                        ctx.addSym(this.id[i],true,TypeData.BOOL,TypeSym.VARIABLE,this.fila,this.columna)
                    } else if (this.tipo.toUpperCase() == TypeData.CHAR[0]){
                        ctx.addSym(this.id[i],'\u0000',TypeData.CHAR,TypeSym.VARIABLE,this.fila,this.columna)
                    } else if (this.tipo.toUpperCase() = TypeData.STD_STRING[0]){
                        ctx.addSym(this.id[i],"",TypeData.STD_STRING,TypeSym.VARIABLE,this.fila,this.columna)
                    }
                }
            } else {
                for(let i = 0; i < this.id.length; i++){  
                    const value = this.valor.Interpretar(Ctx)
                    if(value.tipo[0] == TypeData.INT[0]){ //integer
                        ctx.addSym(this.id[i],value.valor,TypeData.INT,TypeSym.VARIABLE,this.fila,this.columna)
                    } else if (value.tipo[0] == TypeData.DOUBLE[0]){ //double
                        ctx.addSym(this.id[i],value.valor,TypeData.DOUBLE,TypeSym.VARIABLE,this.fila,this.columna)
                    } else if(value.tipo[0] == TypeData.BOOL[0]){//Bool
                        ctx.addSym(this.id[i],value.valor,TypeData.BOOL,TypeSym.VARIABLE,this.fila,this.columna)
                    } else if (value.tipo[0] == TypeData.CHAR[0]){ //char
                        ctx.addSym(this.id[i],value.valor,TypeData.CHAR,TypeSym.VARIABLE,this.fila,this.columna)
                    }else if (value.tipo[0] == TypeData.STD_STRING[0]){ //string
                        ctx.addSym(this.id[i],value.valor,TypeData.STD_STRING,TypeSym.VARIABLE,this.fila,this.columna)
                    }else{ 
                        console.log("dato no compatible con tipo")
                    }
                }
            }
        }
        return null
    }
}

module.exports = {DecVar}