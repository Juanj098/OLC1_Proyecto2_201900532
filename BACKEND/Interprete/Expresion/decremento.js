 const {Exp} = require("../Expresion/expresion")
class Decremento extends Exp{
    constructor(id,fila,columna){
        super(fila,columna)
        this.id = id
    }
    Interpretar(ctx,consola){
        let dato = ctx.getSym(this.id)
        if(dato){
            dato.value = dato.value-1;
        }
        console.log(dato)
    }
}
module.exports={Decremento}