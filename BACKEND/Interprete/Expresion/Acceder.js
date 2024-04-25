const { Ctx } = require("../Entorno/Entorno")
const {Exp} = require("../Expresion/expresion")
class Acceder extends Exp{
    constructor(id,linea,columna){
        super(linea,columna)
        this.id = id
    }   
    Interpretar(ctx,consola){
        const Sym = ctx.getSym(this.id)
        console.log(Sym)
        if(Sym){
            return({valor:Sym.value,tipo:Sym.type,tipoSym:Sym.typeVar})
        } else {
            console.log("variable no declarada")
        }
    }
}
module.exports ={Acceder}