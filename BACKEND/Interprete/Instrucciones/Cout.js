const {instruccion} = require("../Instrucciones/instruccion")
const {TypeSym} = require("../Enums/TypeSym");
const { Arreglo } = require("../Expresion/Array");
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
            if(res.tipoSym === "ARREGLO" ){
                if(res.valor.length == 1){
                    let arre = []
                    for(let i = 0;i<res.valor.length;i++){
                        for(let j = 0;j<res.valor[i].length;j++){
                                arre.push(res.valor[i][j].valor)
                            }
                    }
                    consola.push("\["+arre+"\]"+"\n")
                } else if(res.valor.length == 2){
                    let arre = []
                    for(let i = 0;i<res.valor.length;i++){
                        let arre2 = []
                        for(let j =0;j<res.valor[i].length;j++){
                            arre2.push(res.valor[i][j].valor)
                        }
                        arre.push(arre2)
                    }
                    consola.push("\["+"\["+arre[0]+"\]"+"\,"+"\["+arre[1]+"\]"+"\]"+"\n")
                }
            } else {
                consola.push(res.valor+"\n")
            }
        } else {
            if(res.tipoSym === "ARREGLO" ){
                if(res.valor.length == 1){
                    let arre = []
                    for(let i = 0;i<res.valor.length;i++){
                        for(let j = 0;j<res.valor[i].length;j++){
                                arre.push(res.valor[i][j].valor)
                            }
                    }
                    consola.push("\["+arre+"\]")
                } else if(res.valor.length == 2){
                    let arre = []
                    for(let i = 0;i<res.valor.length;i++){
                        let arre2 = []
                        for(let j =0;j<res.valor[i].length;j++){
                            arre2.push(res.valor[i][j].valor)
                        }
                        arre.push(arre2)
                    }
                    consola.push("\["+"\["+arre[0]+"\]"+"\,"+"\["+arre[1]+"\]"+"\]")
                }
            } else {
                consola.push(res.valor)
            }
        }
        return null
    }
}
module.exports ={Cout}