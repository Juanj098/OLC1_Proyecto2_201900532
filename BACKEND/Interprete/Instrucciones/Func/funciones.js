const {instruccion}= require("../instruccion")
const {Ctx} = require("../../Entorno/Entorno")
const {TypeSym} = require("../../Enums/TypeSym")
const {TypeData} = require("../../Enums/TipoDato")
class Funciones extends instruccion{
    constructor(tipo,id,params,bloque,fila,columna){
        super(fila,columna)
        this.tipo = tipo
        this.id = id
        this.params = params
        this.bloque = bloque
    }
    
    Interpretar(ctx,consola){
        const global = ctx.getGlobal()
        // console.log({bloque:this.bloque})
        for(let i = 0;i<this.params.length;i++){
            if(this.params[i].tipo.toUpperCase() == TypeData.INT[0]){
                this.params[i].tipo=TypeData.INT
            }else if(this.params[i].tipo.toUpperCase() == TypeData.DOUBLE[0]){
                this.params[i].tipo=TypeData.DOUBLE
            }else if(this.params[i].tipo.toUpperCase() == TypeData.CHAR[0]){
                this.params[i].tipo=TypeData.CHAR
            }else if(this.params[i].tipo.toUpperCase() == TypeData.BOOL[0]){
                this.params[i].tipo=TypeData.BOOL
            }else if(this.params[i].tipo.toUpperCase() == TypeData.STD_STRING[0]){
                this.params[i].tipo=TypeData.STD_STRING
            }
        }
        global.addSym(this.id,this,this.tipo,TypeSym.FUNCION)
        return null
    }

    getParams = () => this.params
    getIns = () => this.bloque
}
module.exports = {Funciones}