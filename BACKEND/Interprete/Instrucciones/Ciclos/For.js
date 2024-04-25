const {instruccion} = require("../instruccion")
const {Ctx} =require("../../Entorno/Entorno")
const {TypeData} = require("../../Enums/TipoDato")
class For extends instruccion{
    constructor(decvar,condi,decosum,bloque,fila,columna){
        super(fila,columna)
        this.decvar = decvar
        this.condi = condi
        this.decosum = decosum
        this.bloque = bloque
    }
    Interpretar(ctx,consola){
        console.log(this.decvar)
        try {
            this.decvar.Interpretar(ctx)
            let condicion = this.condi.Interpretar(ctx)
            console.log({cond:condicion})
            if(condicion.tipo[0]!=TypeData.BOOL[0]){
                console.log("error: condicion no valida")
            } else {
                while(condicion.valor){
                    let retorno = this.bloque.Interpretar(ctx,consola)
                    console.log({ret:retorno})
                    if(retorno === "Break"){
                        break;
                    } else if(retorno==='Continue'){
                        continue;
                    }
                    this.decosum.Interpretar(ctx)
                    condicion = this.condi.Interpretar(ctx)
                }
            }
            return null
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports={For}
