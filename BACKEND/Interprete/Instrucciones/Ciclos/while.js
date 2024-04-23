const {instruccion} = require("../../Instrucciones/instruccion")
const {TypeData} = require("../../Enums/TipoDato")
class While extends instruccion{
    constructor(condi,bloque,linea,columna){
        super(linea,columna)
        this.condicion = condi;
        this.bloque = bloque;
    }
    Interpretar(ctx, consola){
        let cond = this.condicion.Interpretar(ctx)
        if(cond.tipo[0]!=TypeData.BOOL[0]){
            console.log("condicion no valida")
        }else{
            try {
                while(cond.valor){
                    const retorno = this.bloque.Interpretar(ctx,consola)
                    if(retorno=="Break"){
                        console.log({br:'break'})
                        break;
                    }
                    cond= this.condicion.Interpretar(ctx)
                }
            } catch (error) {
                consola.push(error)
            }
        }

    }

}
module.exports={While}