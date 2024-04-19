
const {Sym} = require("./Simbolo.js") 
class Ctx{
    constructor(padre){
        this.padre = padre;
        this.TSym = new Map();
    }

    addSym(name,value,type,typeVar,fila,columna){
        const exist = this.TSym.has(name)
        if(!exist){
            this.TSym.set(name,new Sym(name,value,type,typeVar,fila,columna))
            console.log("variable guardada: ",name)
        } else {
            console.log("la variable ya fue declarada");
        }
    }

    getSym(name){
        let ctx = this;
        while(ctx!=null){
            const exist = ctx.TSym.has(name)
            if(exist){
                return ctx.TSym.get(name)
            }
            ctx=ctx.padre
        }
        return undefined
    }

    ActualizarSym(id,valor){
        this.TSym.set(id,valor)
    }

    mostrarTSym() {
        console.log("Contenido de TSym:");
        for (let [key, value] of this.TSym) {
            console.log(key, ":", value);
        }
    }
}

module.exports = {Ctx}