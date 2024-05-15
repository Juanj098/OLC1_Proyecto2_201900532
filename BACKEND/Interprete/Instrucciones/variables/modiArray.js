const {instruccion} = require("../instruccion")
class ModiArr extends instruccion{
    constructor(id,Dim,posx,posy,nvalor,fila,columna){
        super(fila,columna)
        this.id = id
        this.dim = Dim
        this.posx = posx
        this.posy = posy
        this.nvalor = nvalor
    }
    Interpretar(ctx,consola){
        const sym = ctx.getSym(this.id)
        let valor = this.nvalor.Interpretar(ctx)
        console.log(this.valor)
        if(sym){
            if(sym.type[0]===valor.tipo[0]){
                if(this.posy == null){
                    let posx = this.posx.Interpretar(ctx)
                    sym.value[0][posx.valor] = valor
                }else {
                    let posx = this.posx.Interpretar(ctx)
                    let posy = this.posy.Interpretar(ctx)
                    if(this.posx > 1){
                        console.log("error:solo son permitidas 2 dimensiones")
                    }else{
                        sym.value[posx.valor][posy.valor] = valor
                    }
                }
            }else{
                console.log("error:valor no permitido en el arreglo")
            }
        }


    }
}
module.exports = {ModiArr}