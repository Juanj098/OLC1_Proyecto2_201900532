const {instruccion}=require("../instruccion")
class Break extends instruccion{
    constructor(linea,columna) {
        super(linea,columna)       
    }
    Interpretar(ctx,consola){
        return "Break"
    }
}
module.exports ={Break}