const {Exp} = require("../Expresion/expresion")
class Incremento extends Exp{
    constructor(id,fila,columna){
        super(fila,columna)
        this.id = id
    }
    Interpretar(ctx,consola){
        let dato = ctx.getSym(this.id)
        if(dato){
            console.log({data:dato})
            dato.value = dato.value+1
        }
    }
}
module.exports={Incremento}