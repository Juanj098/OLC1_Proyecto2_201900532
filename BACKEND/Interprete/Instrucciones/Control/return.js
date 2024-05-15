const {instruccion} = require("../instruccion")
class Retorno extends instruccion{
    constructor(exp,fila,columna){
        super(fila,columna)
        this.exp = exp
    }
    Interpretar(ctx,consola){
        const expression = this.exp.Interpretar(ctx,consola)
        return expression
    }
}

module.exports ={Retorno}