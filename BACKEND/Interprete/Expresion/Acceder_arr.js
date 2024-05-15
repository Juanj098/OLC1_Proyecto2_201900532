const {Ctx} = require("../Entorno/Entorno")
const {Exp} = require("../Expresion/expresion")
class Acceder_Arr extends Exp{
    constructor(id,dim,posx,posy,fila,columna){
        super(fila,columna)
        this.id = id
        this.dim = dim
        this.posx = posx
        this.posy = posy
    }
    Interpretar(ctx,consola){
        console.log(ctx)
        const sym = ctx.getSym(this.id)
        if(this.posy==null){
            let x = this.posx.Interpretar(ctx)
            if(sym){
                if (sym.value.length == 1){
                    return sym.value[0][x.valor]
                }else if(sym.value.length == 2){
                    let arr = []
                    for(let s = 0;s<sym.value[x.valor].length;s++){
                        arr.push(sym.value[x.valor][s].valor)
                    }
                    let t = sym.value[x.valor][0].tipo
                    return {valor:`\[${arr}\]`, tipo:t, /*tipoSym:"ARREGLO"*/}
                }
                
            }
        } else {
            let x = this.posx.Interpretar(ctx)
            let y = this.posy.Interpretar(ctx)
            if(sym){
                return sym.value[x.valor][y.valor]
            }
        }
    }
}
module.exports={Acceder_Arr}
