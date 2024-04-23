const {Exp} = require("../Expresion/expresion")
const {Ctx} = require("../Entorno/Entorno")
const {TypeData} = require("../Enums/TipoDato")
class Primitivo extends Exp{
    constructor(dato,tipo,linea,columna){
        super(linea,columna)
        this.valor = dato;
        this.Tipo = tipo
    }
    Interpretar(Ctx,consola){
        if(/^-?\d+$/.test(this.valor)){ //integer
            return{valor:this.valor,tipo:TypeData.INT}
        } else if (/^-?\d+(\.\d+)$/.test(this.valor)){ //double
            return{valor:this.valor,tipo:TypeData.DOUBLE}
        } else if(this.valor == 'true' || this.valor == 'false'){//Bool
            // let val = this.valor=='true'?true:false;
            return{valor:this.valor,tipo:TypeData.BOOL}
        } else if (/^'([a-zA-Z])'$/.test(this.valor)){ //char
            let valor = this.valor.replace(/'/g,'') 
            return{valor:valor,tipo:TypeData.CHAR}
        }else if (/^"(?!.*\+)[^"]*"$/.test(this.valor)){ //string
            let valor = this.valor.replace(/"/g,'')
            return{valor:valor,tipo:TypeData.STD_STRING}
        } else {
            return{valor:null,tipo:null}
        }
    }
}
module.exports = {Primitivo}