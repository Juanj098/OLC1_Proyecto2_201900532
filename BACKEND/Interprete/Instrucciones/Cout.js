const {instruccion} = require("../Instrucciones/instruccion")
class Cout extends instruccion{
    constructor(exp,ln,linea,columna){
        super(linea,columna)
        this.exp = exp;
        this.ln = ln;
    }
    Interpretar(Ctx,consola){
        const res = this.exp.Interpretar(Ctx)
        if(res.tipo[0] == "BOOL"){
            res.valor ==res.valor?"true":"false"
        }
        if(this.ln){
            res.valor = res.valor.toString()
            consola.push(res.valor+"\n")
        } else {
            res.valor = res.valor.toString()
            consola.push(res.valor)
        }
        return null
    }
}
module.exports ={Cout}