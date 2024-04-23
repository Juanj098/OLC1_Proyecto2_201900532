const {instruccion} = require("../Instrucciones/instruccion")
const {Ctx} = require("../Entorno/Entorno")
class Bloque extends instruccion{
    constructor(bloque,linea,columna){
        super(linea,columna)
        this.bloque = bloque
    }
    Interpretar(ctx,consola){
        const newCtx = new Ctx(ctx)
        for(let instruccion of this.bloque ){
            const retorno = instruccion.Interpretar(newCtx,consola)
            if (retorno){
                return retorno
            }
        }
        return null
    }
}
module.exports={Bloque}