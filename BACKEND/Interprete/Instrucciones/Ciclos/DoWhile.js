const {instruccion}=require("../instruccion")
const {TypeData} = require("../../Enums/TipoDato")
class DoWhile extends instruccion{
    constructor(bloque,condicion,fila,columna){
        super(fila,columna)
        this.condicion = condicion
        this.bloque = bloque
    }
    Interpretar(ctx,consola){
        let cond = this.condicion.Interpretar(ctx)
        if (cond.tipo[0]!=TypeData.BOOL[0]){
            console.log("error:Condicion no valida")
        }else{
            try {
                do {
                    let retorno = this.bloque.Interpretar(ctx, consola)
                    if(retorno){
                        console.log({ret:retorno})
                    }
                    cond = this.condicion.Interpretar(ctx)
                } while (cond.valor);                
            } catch (error) {
                
            }
        }
        return null
    }
}
module.exports = {DoWhile}