const { TypeData } = require("../Enums/TipoDato")
const {Exp}= require("../Expresion/expresion") 
class Logico extends Exp{
    constructor(Izq,Der,Oplog,linea,columna){
        super(linea,columna)
        this.Izq = Izq
        this.Der = Der
        this.Oplog = Oplog
    }

    Interpretar(Ctx,consola){
        let valIzq, valDer = null;
        if(this.Izq!=null){
            valIzq = this.Izq.Interpretar(Ctx)
            valDer = this.Der.Interpretar(Ctx)
        }else{
            valDer = this.Der.Interpretar(Ctx)
        }



        if(this.Oplog == '&&'){
            if(valIzq.tipo[0] == 'BOOL'  && valDer.tipo[0] == 'BOOL'){
                return({valor:(valIzq.valor&&valDer.valor),tipo:TypeData.BOOL})  
            }else{
                console.log("tipos no compatibles")
            }
        } else if(this.Oplog == '||'){
            if(valIzq.tipo[0] == 'BOOL'  && valDer.tipo[0] == 'BOOL'){
                return({valor:(valIzq.valor||valDer.valor),tipo:TypeData.BOOL})  
            } else{
                console.log("tipos no compatibles")
            }
        } else if(this.Oplog == '!'){
            if(valDer.valor == 'true'){
                return({valor:false,tipo:TypeData.BOOL})
            }else{
                return({valor:true,tipo:TypeData.BOOL})
            }
        } else{
            console.log("tipos no compatibles")
        }

     }
        
}

module.exports={Logico}