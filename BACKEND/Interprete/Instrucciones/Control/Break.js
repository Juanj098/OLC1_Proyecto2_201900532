const {instruccion}=require("../instruccion")
class Break extends instruccion{
    constructor(linea,columna) {
        super(linea,columna)       
    }
    Interpretar(ctx,consola){
        console.log('Break')
        return "Break"
    }
}
module.exports ={Break}