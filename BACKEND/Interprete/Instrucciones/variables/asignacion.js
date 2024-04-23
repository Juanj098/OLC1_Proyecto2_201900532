const {instruccion} = require("../instruccion")
const {Ctx} = require("../../Entorno/Entorno")
const {TypeSym} = require("../../Enums/TypeSym")
const {TypeData} = require("../../Enums/TipoDato")
class Asignacion extends instruccion{
    constructor(id,valor,fila,columna){
        super(fila,columna)
        this.id = id;
        this.valor = valor
    }
    Interpretar(ctx,consola){
        let dato = ctx.getSym(this.id)
        if(dato){
            let valor = this.valor.Interpretar(ctx);
            if(valor.tipo[0] === dato.type[0]){
                dato.actualizarValor(valor.valor)
            }
        }else{
            console.log("error:variable no asignada")
        }
    }
}
module.exports = {Asignacion}