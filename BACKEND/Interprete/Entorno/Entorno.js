
const {Sym} = require("./Simbolo.js") 
class Ctx{
    constructor(padre){
        this.padre = padre,
        this.TSym = new Map()
    }

    addSym(name,value,type,typeVar,fila,columna){
        const exist = this.TSym.has(name)
        if(!exist){
            this.TSym.set(name,new Sym(name,value,type,typeVar,fila,columna))
            console.log("variable guradada")
        }
        throw new Error("la variable ya fue declarada");
    }

    getSym(id){
        let ctx = this;
        while(ctx!=null){
            const exist = ctx.TSym.has(id)
            if(exist){
                return ctx.TSym.get(id)
            }
            ctx=ctx.padre
        }
        return undefined
    }

    ActualizarSym(id,valor){
        this.TSym.set(id,valor)
    }

}

module.exports = {Ctx}