const {TypeSym} = require("../Enums/TypeSym")
const {instruccion} = require("../Instrucciones/instruccion")
const {Ctx} = require("../Entorno/Entorno")
class Llamada extends instruccion{
    constructor(id,args,linea,columna){
        super(linea,columna)
        this.id = id
        this.args = args        
    }
    Interpretar(ctx,consola){
        const symb = ctx.getSym(this.id)
        
        if(symb.typeVar!=TypeSym.FUNCION){ 
            console.log("Error:esta id no es una funcion :p")
        }         
        const func = symb.getValor()
        const global = ctx.getGlobal()
        const ctxFunc = new Ctx(global)
        if(this.args.length!=func.getParams().length){
            console.log("Error:verifique parametros")
        }
        func.getParams().forEach((param,index)=>{
            const exp = this.args[index].Interpretar(ctx)
            if(exp.tipo[0] != param.tipo[0]){console.log("Error:tipo de parametro no coincide")}
            console.log({exp:exp})
            ctxFunc.addSym(param.id,exp.valor,exp.tipo,TypeSym.VARIABLE)
        })
        const instruccion = func.getIns()
        instruccion.Interpretar(ctxFunc,consola)
        return  null
    }
}
module.exports = {Llamada}