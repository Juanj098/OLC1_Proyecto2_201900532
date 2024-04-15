const {Ctx} = require("../Entorno/Entorno")
class AST{
    instrucciones = []
    constructor(instrucciones){
        this.instrucciones = instrucciones,
        this.consola = [],
        this.Global = new Ctx(null)
    }

    Ejecutar(){
        //primera pasada
        this.instrucciones.forEach(
            instruccion => {
                instruccion.Interpretar(this.Global,this.consola)
            }
        )
    }

    Interpretar(){
        //segunda pasada
        console.log(this.console);
        let salida = "";
        for(let i = 0;i<this.consola.length;i++){
            salida +=this.consola[i].toString();
        }
        console.log(salida)
        return salida
    }

    getTsym(){
        return this.Global.TSym
    }
}

module.exports = {AST}