const {Exp} = require("../Expresion/expresion")
const  {TypeData} = require("../Enums/TipoDato")
const  {TypeSym} = require("../Enums/TypeSym")

class Arreglo extends Exp{
    constructor(tipo,id,Dimension,vals,fila,columna){
        super(fila,columna)
        this.tipo = tipo
        this.id = id
        this.Dimension = Dimension
        this.vals  = vals
    }
    Interpretar(ctx,consola){
        const id = this.id
        if(this.Dimension === 1){
            let arr = [];
            for(let i=0;i<this.vals.length;i++){
                let dato = this.vals[i].Interpretar(ctx,consola) 
                if(this.tipo.toUpperCase() === dato.tipo[0] ){
                    arr.push(dato)
                }else{
                    console.log("error:tipo no valido en el arreglo")
                    break;
                }
            }
            let ret = []
            ret.push(arr)
            if(this.tipo.toUpperCase() === TypeData.INT[0]){ //int
                ctx.addSym(id,ret,TypeData.INT,TypeSym.ARREGLO,this.fila,this.columna)
            }else if(this.tipo.toUpperCase() === TypeData.DOUBLE[0]){ //double
                ctx.addSym(id,ret,TypeData.DOUBLE,TypeSym.ARREGLO,this.fila,this.columna)
            }else if(this.tipo.toUpperCase() === TypeData.BOOL[0]){ //bool
                ctx.addSym(id,ret,TypeData.BOOL,TypeSym.ARREGLO,this.fila,this.columna)
            }else if(this.tipo.toUpperCase() === TypeData.CHAR[0]){ //char
                ctx.addSym(id,ret,TypeData.CHAR,TypeSym.ARREGLO,this.fila,this.columna)
            }else if(this.tipo.toUpperCase() === TypeData.STD_STRING[0]){ //std_string
                ctx.addSym(id,ret,TypeData.STD_STRING,TypeSym.ARREGLO,this.fila,this.columna)
            }
        }
        if(this.Dimension === 2){
            let Array = []
            for(let i = 0;i<this.vals.length;i++){
                let Arr = []
                for(let j = 0;j<this.vals[i].length;j++){
                    let dato = this.vals[i][j].Interpretar()
                    if(this.tipo.toUpperCase() ==dato.tipo[0]){
                        Arr.push(dato)
                    }
                }
                Array.push(Arr)
            }
            if(this.tipo.toUpperCase() === TypeData.INT[0]){ //int
                ctx.addSym(id,Array,TypeData.INT,TypeSym.ARREGLO,this.fila,this.columna)
            }else if(this.tipo.toUpperCase() === TypeData.DOUBLE[0]){ //double
                ctx.addSym(id,Array,TypeData.DOUBLE,TypeSym.ARREGLO,this.fila,this.columna)
            }else if(this.tipo.toUpperCase() === TypeData.BOOL[0]){ //bool
                ctx.addSym(id,Array,TypeData.BOOL,TypeSym.ARREGLO,this.fila,this.columna)
            }else if(this.tipo.toUpperCase() === TypeData.CHAR[0]){ //char
                ctx.addSym(id,Array,TypeData.CHAR,TypeSym.ARREGLO,this.fila,this.columna)
            }else if(this.tipo.toUpperCase() === TypeData.STD_STRING[0]){ //std_string
                ctx.addSym(id,Array,TypeData.STD_STRING,TypeSym.ARREGLO,this.fila,this.columna)
            }
        }
    }
}
module.exports = {Arreglo}