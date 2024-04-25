const {instruccion} = require("../instruccion")
const {TypeData} = require("../../Enums/TipoDato")
class func_if extends instruccion{
    constructor(exp,blq1,blq2,fila,columna){
        super(fila,columna)
        this.exp = exp;
        this.blqIf = blq1;
        this.blqElse = blq2;
    }
    Interpretar(ctx,consola){
        let cond = this.exp.Interpretar(ctx)
        if(cond.tipo[0]==TypeData.BOOL[0]){
            if(cond.valor){
                this.blqIf.Interpretar(ctx,consola)
                let retorno = this.blqIf.Interpretar(ctx,consola)
                return retorno
            } else{
                let retorno = this.blqElse?.Interpretar(ctx,consola)
                return retorno
            }
        }
        return null
    }
}

module.exports={func_if}