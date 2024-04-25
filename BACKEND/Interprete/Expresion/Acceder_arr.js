const {Exp} = require("../Expresion/expresion")
class Acceder_Arr extends Exp{
    constructor(id,posx,posy,fila,columna){
        super(fila,columna)
        this.id = id
        this.posx = posx
        this.posy = posy
    }
    Interpretar(ctx,consola){
        if(this.posy!=null){
            
        }
    }
}
module.exports ={Acceder_Arr}