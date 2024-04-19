const {Ctx} = require("../Entorno/Entorno")
class Exp{
    constructor(linea, columna){
        this.linea = linea;
        this.columna = columna;
    }

    Interpretar(Ctx){}
}
module.exports={Exp}