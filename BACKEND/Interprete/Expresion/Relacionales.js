const { TypeData } = require("../Enums/TipoDato")
const {Exp} = require("../Expresion/expresion") 
class Relacionales extends Exp{
    constructor(Izq,Der,opRel,linea,columna){
        super(linea,columna)
        this.Izq = Izq
        this.Der = Der
        this.opRel = opRel
    }
    Interpretar(ctx, consola){
        const valIzq = this.Izq.Interpretar(ctx)
        const valDer = this.Der.Interpretar(ctx)
        // [<,>,<=,>=,==,!=]
        //int-double | int-char | double-char | char-int | char-double | char-char 
        if(valIzq != null && valDer != null ){

            if((valIzq.tipo[0]==TypeData.INT[0] || valIzq.tipo[0]=='DOUBLE' || valIzq.tipo[0]=='CHAR' || valIzq.tipo[0]=='BOOL') && (valDer.tipo[0]==TypeData.INT[0] || valDer.tipo[0]=='DOUBLE' || valDer.tipo[0]=='CHAR' || valDer.tipo[0]=='BOOL')){
                if (valIzq.tipo[0] === TypeData.INT[0]) {
                    valIzq.valor = parseInt(valIzq.valor);
                } else if(valIzq.tipo[0]===TypeData.DOUBLE[0]){
                    valIzq.valor = parseFloat(valIzq.valor);
                }
                
                if (valDer.tipo[0] === TypeData.INT[0]) {
                    valDer.valor = parseInt(valDer.valor);
                }else if(valDer.tipo[0] === TypeData.DOUBLE[0]){
                    valDer.valor = parseFloat(valDer.valor);
                }


                if(this.opRel == '<'){  
                    return({valor:(valIzq.valor < valDer.valor),tipo:TypeData.BOOL})
                }else if(this.opRel == '>'){
                    return({valor:(valIzq.valor > valDer.valor),tipo:TypeData.BOOL})
                }else if(this.opRel == '<='){
                    return({valor:(valIzq.valor <= valDer.valor),tipo:TypeData.BOOL})
                }else if(this.opRel == '>='){
                    return({valor:(valIzq.valor >= valDer.valor),tipo:TypeData.BOOL})
                }else if(this.opRel == '=='){
                    return({valor:(valIzq.valor == valDer.valor),tipo:TypeData.BOOL})
                }else if(this.opRel == '!='){
                    return({valor:(valIzq.valor != valDer.valor),tipo:TypeData.BOOL})
                }
            } else {
                console.log("operacion no valida entre datos")
            }
        }
    }
}
module.exports = {Relacionales}