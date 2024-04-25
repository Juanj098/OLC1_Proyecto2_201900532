const {instruccion} = require("../instruccion") 
class Continue extends instruccion{
    constructor(fila,columna){
        super(fila,columna)
    }
    Interpretar(ctx,consola){
        return "Continue"
    }
}
module.exports = {Continue}
