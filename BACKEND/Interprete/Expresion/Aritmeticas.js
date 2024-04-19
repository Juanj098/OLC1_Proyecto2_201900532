const {TipoOperacion} = require("../Enums/TipoOperacion")
const {TypeData} = require("../Enums/TipoDato")
const {Exp} = require("../Expresion/expresion")
class Aritmetica extends Exp{
    constructor(Izq,Der,operacion,linea,columna){
        super(linea,columna)
        this.Izq = Izq;
        this.Der = Der;
        this.operacion = operacion;
    }
    Interpretar(Ctx){
        const resIzq = this.Izq.Interpretar(Ctx)
        const resDer = this.Der.Interpretar(Ctx)

        const Suma = [
            [TypeData.INT,TypeData.DOUBLE,TypeData.INT,TypeData.INT,TypeData.STD_STRING],
            [TypeData.DOUBLE,TypeData.DOUBLE,TypeData.DOUBLE,TypeData.DOUBLE,TypeData.STD_STRING],
            [TypeData.INT,TypeData.DOUBLE,null,null,TypeData.STD_STRING],
            [TypeData.INT,TypeData.DOUBLE,null,TypeData.STD_STRING,TypeData.STD_STRING],
            [TypeData.STD_STRING,TypeData.STD_STRING,TypeData.STD_STRING,TypeData.STD_STRING,TypeData.STD_STRING]
        ]

        if(this.operacion=='Suma'){
            const dominante = Suma[resIzq.tipo[1]][resDer.tipo[1]]
            if(dominante!=null){
                if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    // console.log(numIzq+numDer)
                    return({valor:(numIzq+numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq+numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'BOOL'){
                    let numIzq = parseInt(resIzq.valor)
                    let tr = (resDer.valor=="true"?1:0)
                    console.log(`${numIzq+tr}`)
                    return({valor:(numIzq+tr),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseInt(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    console.log(numIzq+ascii)
                    return({valor:(numIzq+ascii),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'STD::STRING'){
                    let numIzq = resIzq.valor.toString()
                    let valDer = resDer.valor.replace(/"/g ,'')
                    console.log(numIzq+valDer)
                    return({valor:(numIzq+valDer),tipo:dominante[0]})
                }
                //<---------DOUBLE--------->
                if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    let sum = (numIzq+numDer)
                    console.log(sum)
                    return({valor:(sum),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    console.log(numIzq+numDer)
                    return({valor:(numIzq+numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'BOOL'){
                    let numIzq = parseFloat(resIzq.valor)
                    let tr = (resDer.valor=="true"?1:0)
                    console.log(`${numIzq+tr}`)
                    return({valor:(numIzq+tr),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseFloat(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    console.log(numIzq+ascii)
                    return({valor:(numIzq+ascii),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'STD::STRING'){
                    let numIzq = resIzq.valor.toString()
                    let valDer = resDer.valor.replace(/"/g ,'')
                    console.log(numIzq+valDer)
                    return({valor:(numIzq+valDer),tipo:dominante[0]})
                }
                //<---------BOOL--------->
                if(resIzq.tipo[0] == 'BOOL' && resDer.tipo[0] == 'INT'){
                    let tr = (resIzq.valor=="true"?1:0)
                    let numDer = parseInt(resDer.valor)
                     console.log(tr+numDer)
                    return({valor:(tr+numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'BOOL' && resDer.tipo[0] == 'DOUBLE'){
                    let tr = (resIzq.valor=="true"?1:0)
                    let numDer = parseFloat(resDer.valor)
                    console.log(tr+numDer)
                    return({valor:(tr+numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'BOOL' && resDer.tipo[0] == 'STD::STRING'){
                    let numIzq = resIzq.valor.replace(/"/g ,'')
                    let valDer = resDer.valor.replace(/"/g ,'')
                    console.log(numIzq+valDer)
                    return({valor:(numIzq+valDer),tipo:dominante[0]})
                }
                //<---------CHAR--------->
                if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'INT'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseInt(resDer.valor)
                    let sum = (ascii+numDer)
                    console.log(sum)
                    return({valor:(sum),tipo:dominante[0]}) 
                } else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseFloat(resDer.valor)
                    let sum = (ascii+numDer)
                    console.log(sum)
                    return({valor:(sum),tipo:dominante[0]})
                } else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'STD::STRING'){
                    let valIzq = resIzq.valor.replace(/'/g,'')
                    let valDer = resDer.valor.replace(/"/g ,'')
                    console.log(valIzq+valDer)
                    return({valor:(valIzq+valDer),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'CHAR'){
                    let valIzq = resIzq.valor.replace(/'/g,'')
                    let valDer = resDer.valor.replace(/'/g ,'')
                    console.log(valIzq+valDer)
                    return({valor:`"${(valIzq+valDer)}"`,tipo:dominante[0]})
                }

                //<---------STD::STRING--------->
                if(resIzq.tipo[0] == 'STD::STRING' && resDer.tipo[0] == 'INT'){
                    let valIzq = resIzq.valor.replace(/"/g ,'')
                    let valDer = resDer.valor.toString()
                    console.log(valIzq+valDer)
                    return({valor:(valIzq+valDer),tipo:dominante[0]}) 
                } if(resIzq.tipo[0] == 'STD::STRING' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = resIzq.valor.replace(/"/g ,'')
                    let valDer = resDer.valor.toString()
                    console.log(valIzq+valDer)
                    return({valor:(valIzq+valDer),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'STD::STRING' && resDer.tipo[0] == 'BOOL'){
                    let valIzq = resIzq.valor.replace(/"/g,'')
                    let valDer = resDer.valor
                    console.log(`${valIzq+valDer}`)
                    return({valor:(valIzq+valDer),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'STD::STRING' && resDer.tipo[0] == 'CHAR'){
                    let valIzq = resIzq.valor.replace(/"/g,'')
                    let valDer = resDer.valor.replace(/'/g ,'')
                    console.log(valIzq+valDer)
                    return({valor:(valIzq+valDer),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'STD::STRING' && resDer.tipo[0] == 'STD::STRING'){
                    let valIzq = resIzq.valor.replace(/"/g ,'')
                    let valDer = resDer.valor.replace(/"/g ,'')
                    console.log(valIzq+valDer)
                    return({valor:(valIzq+valDer),tipo:dominante[0]})
                }
            } else {
                console.log("valores no compatibles")
            }
        }

        const Resta = [
            [TypeData.INT,TypeData.DOUBLE,TypeData.INT,TypeData.INT,null],
            [TypeData.DOUBLE,TypeData.DOUBLE,TypeData.DOUBLE,TypeData.DOUBLE,null],
            [TypeData.INT,TypeData.DOUBLE,null,null,null],
            [TypeData.INT,TypeData.DOUBLE,null,null,null],
            [null,null,null,null,null]
        ]
        
        if(this.operacion=='Menos'){
            const dominante = Resta[resIzq.tipo[1]][resDer.tipo[1]]
            if(dominante!=null){
                if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(numIzq-numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq-numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'BOOL'){
                    let numIzq = parseInt(resIzq.valor)
                    let tr = (resDer.valor=="true"?1:0)
                    return({valor:(numIzq-tr),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseInt(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq-ascii),tipo:dominante[0]})
                }
                //<---------DOUBLE--------->
                if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(numIzq-numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq-numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'BOOL'){
                    let numIzq = parseFloat(resIzq.valor)
                    let tr = (resDer.valor=="true"?1:0)
                    return({valor:(numIzq-tr),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseFloat(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq-ascii),tipo:dominante[0]})
                }
                //<---------BOOL--------->
                if(resIzq.tipo[0] == 'BOOL' && resDer.tipo[0] == 'INT'){
                    let tr = (resIzq.valor=="true"?1:0)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(tr-numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'BOOL' && resDer.tipo[0] == 'DOUBLE'){
                    let tr = (resIzq.valor=="true"?1:0)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(tr-numDer),tipo:dominante[0]}) 
                }
                //<---------CHAR--------->
                if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'INT'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseInt(resDer.valor)
                    let res = (ascii-numDer)
                    return({valor:(res),tipo:dominante[0]}) 
                } else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseFloat(resDer.valor)
                    let res = (ascii-numDer)
                    console.log(res)
                    return({valor:(res),tipo:dominante[0]})
                }
            } else {
                console.log("valores no compatibles")
            }
        }

        const Multi = [
            [TypeData.INT,TypeData.DOUBLE,null,TypeData.INT,null],
            [TypeData.DOUBLE,TypeData.DOUBLE,null,TypeData.DOUBLE,null],
            [null,null,null,null,null],
            [TypeData.INT,TypeData.DOUBLE,,null,null],
            [null,null,null,null,null]
        ]

        if(this.operacion=='Por'){
            const dominante = Multi[resIzq.tipo[1]][resDer.tipo[1]]
            if(dominante!=null){
                if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(numIzq*numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq*numDer),tipo:dominante[0]}) 
                }if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseInt(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq*ascii),tipo:dominante[0]})
                }
                //<---------DOUBLE--------->
                if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(numIzq-numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq+numDer),tipo:dominante[0]}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'BOOL'){
                    let numIzq = parseFloat(resIzq.valor)
                    let tr = (resDer.valor=="true"?1:0)
                    return({valor:(numIzq-tr),tipo:dominante[0]})
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseFloat(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    console.log(numIzq+ascii)
                    return({valor:(numIzq-ascii),tipo:dominante[0]})
                }
                //<---------CHAR--------->
                if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'INT'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseInt(resDer.valor)
                    return({valor:(ascii*numDer),tipo:dominante[0]}) 
                } else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(ascii*numDer),tipo:dominante[0]})
                }
            } else {
                console.log("valores no compatibles")
            }
        }
        
        const Div = [
            [TypeData.DOUBLE,TypeData.DOUBLE,null,TypeData.DOUBLE[0],null],
            [TypeData.DOUBLE,TypeData.DOUBLE,null,TypeData.DOUBLE[0],null],
            [null,null,null,null,null],
            [TypeData.DOUBLE,TypeData.DOUBLE[0],null,null,null],
            [null,null,null,null,null]
        ]

        const Pow = [
            [,,,,],
            [,,,,],
            [,,,,],
            [,,,,],
            [,,,,]
        ]

        const Mod =[
            [,,,,,],
            [,,,,,],
            [,,,,,],
            [,,,,,],
            [,,,,,]
        ]
    }

}
module.exports = {Aritmetica}