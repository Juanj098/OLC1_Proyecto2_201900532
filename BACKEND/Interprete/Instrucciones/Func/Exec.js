const {instruccion} = require("../instruccion")
class Exec extends instruccion{
    constructor(exec,fila,columna){
        super(fila,columna)
        this.exec = exec
    }
    Interpretar(ctx,consola){
        this.exec.Interpretar(ctx,consola)
        return null
    }
}
module.exports = {Exec}