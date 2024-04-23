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
                    return({valor:(numIzq+numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq+numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'BOOL'){
                    let numIzq = parseInt(resIzq.valor)
                    let tr = (resDer.valor=="true"?1:0)
                    return({valor:(numIzq+tr),tipo:dominante})
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseInt(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq+ascii),tipo:dominante})
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'STD::STRING'){
                    let numIzq = resIzq.valor.toString()
                    let valDer = resDer.valor.replace(/"/g ,'')
                    return({valor:(numIzq+valDer),tipo:dominante})
                }
                //<---------DOUBLE--------->
                if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(numIzq+numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq+numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'BOOL'){
                    let numIzq = parseFloat(resIzq.valor)
                    let tr = (resDer.valor=="true"?1:0)
                    console.log(`${numIzq+tr}`)
                    return({valor:(numIzq+tr),tipo:dominante})
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseFloat(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq+ascii),tipo:dominante})
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'STD::STRING'){
                    let numIzq = resIzq.valor.toString()
                    let valDer = resDer.valor.replace(/"/g ,'')
                    return({valor:(numIzq+valDer),tipo:dominante})
                }
                //<---------BOOL--------->
                if(resIzq.tipo[0] == 'BOOL' && resDer.tipo[0] == 'INT'){
                    let tr = (resIzq.valor=="true"?1:0)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(tr+numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'BOOL' && resDer.tipo[0] == 'DOUBLE'){
                    let tr = (resIzq.valor=="true"?1:0)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(tr+numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'BOOL' && resDer.tipo[0] == 'STD::STRING'){
                    let numIzq = resIzq.valor.replace(/"/g ,'')
                    let valDer = resDer.valor.replace(/"/g ,'')
                    return({valor:(numIzq+valDer),tipo:dominante})
                }
                //<---------CHAR--------->
                if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'INT'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseInt(resDer.valor)
                    return({valor:(ascii+numDer),tipo:dominante}) 
                } else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(ascii+numDer),tipo:dominante})
                } else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'STD::STRING'){
                    let valIzq = resIzq.valor.replace(/'/g,'')
                    let valDer = resDer.valor.replace(/"/g ,'')
                    return({valor:(valIzq+valDer),tipo:dominante})
                }else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'CHAR'){
                    let valIzq = resIzq.valor.replace(/'/g,'')
                    let valDer = resDer.valor.replace(/'/g ,'')
                    return({valor:`"${(valIzq+valDer)}"`,tipo:dominante})
                }
                //<---------STD::STRING--------->
                if(resIzq.tipo[0] == 'STD::STRING' && resDer.tipo[0] == 'INT'){
                    let valIzq = resIzq.valor.replace(/"/g ,'')
                    let valDer = resDer.valor.toString()
                    return({valor:(valIzq+valDer),tipo:dominante}) 
                } if(resIzq.tipo[0] == 'STD::STRING' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = resIzq.valor.replace(/"/g ,'')
                    let valDer = resDer.valor.toString()
                    return({valor:(valIzq+valDer),tipo:dominante})
                }else if(resIzq.tipo[0] == 'STD::STRING' && resDer.tipo[0] == 'BOOL'){
                    let valIzq = resIzq.valor.replace(/"/g,'')
                    let valDer = resDer.valor
                    return({valor:(valIzq+valDer),tipo:dominante})
                }else if(resIzq.tipo[0] == 'STD::STRING' && resDer.tipo[0] == 'CHAR'){
                    let valIzq = resIzq.valor.replace(/"/g,'')
                    let valDer = resDer.valor.replace(/'/g ,'')
                    return({valor:(valIzq+valDer),tipo:dominante})
                }else if(resIzq.tipo[0] == 'STD::STRING' && resDer.tipo[0] == 'STD::STRING'){
                    let valIzq = resIzq.valor.replace(/"/g ,'')
                    let valDer = resDer.valor.replace(/"/g ,'')
                    return({valor:(valIzq+valDer),tipo:dominante})
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
                    return({valor:(numIzq-numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq-numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'BOOL'){
                    let numIzq = parseInt(resIzq.valor)
                    let tr = (resDer.valor=="true"?1:0)
                    return({valor:(numIzq-tr),tipo:dominante})
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseInt(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq-ascii),tipo:dominante})
                }
                //<---------DOUBLE--------->
                if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(numIzq-numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq-numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'BOOL'){
                    let numIzq = parseFloat(resIzq.valor)
                    let tr = (resDer.valor=="true"?1:0)
                    return({valor:(numIzq-tr),tipo:dominante})
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseFloat(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq-ascii),tipo:dominante})
                }
                //<---------BOOL--------->
                if(resIzq.tipo[0] == 'BOOL' && resDer.tipo[0] == 'INT'){
                    let tr = (resIzq.valor=="true"?1:0)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(tr-numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'BOOL' && resDer.tipo[0] == 'DOUBLE'){
                    let tr = (resIzq.valor=="true"?1:0)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(tr-numDer),tipo:dominante}) 
                }
                //<---------CHAR--------->
                if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'INT'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseInt(resDer.valor)
                    return({valor:(ascii-numDer),tipo:dominante}) 
                } else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(ascii-numDer),tipo:dominante})
                }
            } else {
                console.log("valores no compatibles")
            }
        }

        const Multi = [
            [TypeData.INT,TypeData.DOUBLE,null,TypeData.INT,null],
            [TypeData.DOUBLE,TypeData.DOUBLE,null,TypeData.DOUBLE,null],
            [null,null,null,null,null],
            [TypeData.INT,TypeData.DOUBLE,null,null],
            [null,null,null,null,null]
        ]

        if(this.operacion=='Por'){
            const dominante = Multi[resIzq.tipo[1]][resDer.tipo[1]]
            if(dominante!=null){
                if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(numIzq*numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq*numDer),tipo:dominante}) 
                }if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseInt(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq*ascii),tipo:dominante})
                }
                //<---------DOUBLE--------->
                if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(numIzq*numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq*numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'BOOL'){
                    let numIzq = parseFloat(resIzq.valor)
                    let tr = (resDer.valor=="true"?1:0)
                    return({valor:(numIzq*tr),tipo:dominante})
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseFloat(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq*ascii),tipo:dominante})
                }
                //<---------CHAR--------->
                if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'INT'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseInt(resDer.valor)
                    return({valor:(ascii*numDer),tipo:dominante}) 
                } else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(ascii*numDer),tipo:dominante})
                }
            } else {
                console.log("valores no compatibles")
            }
        }
        
        const Div = [
            [TypeData.DOUBLE,TypeData.DOUBLE,null,TypeData.DOUBLE,null],
            [TypeData.DOUBLE,TypeData.DOUBLE,null,TypeData.DOUBLE,null],
            [null,null,null,null,null],
            [TypeData.DOUBLE,TypeData.DOUBLE,null,null,null],
            [null,null,null,null,null]
        ]

        if(this.operacion=='Div'){
            const dominante = Div[resIzq.tipo[1]][resDer.tipo[1]]
            if(dominante!=null){
                if(resIzq.tipo[0] == "INT" && resDer.tipo[0] == "INT"){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    return({valor:(numIzq/numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseInt(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq/numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseInt(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq/ascii),tipo:dominante})
                }
                //<---------DOUBLE--------->
                if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'INT'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseInt(resDer.valor)
                    return({valor:numIzq/numDer,tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'DOUBLE'){
                    let numIzq = parseFloat(resIzq.valor)
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(numIzq/numDer),tipo:dominante}) 
                }else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'CHAR'){
                    let numIzq = parseFloat(resIzq.valor)
                    let valDer = resDer.valor.replace(/"/g ,'')
                    let ascii = valDer.charCodeAt(0);
                    return({valor:(numIzq/ascii),tipo:dominante})
                }
                //<---------CHAR--------->
                if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'INT'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseInt(resDer.valor)
                    return({valor:(ascii/numDer),tipo:dominante}) 
                } else if(resIzq.tipo[0] == 'CHAR' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = resDer.valor.replace(/'/g ,'')
                    let ascii = valIzq.charCodeAt(0);
                    let numDer = parseFloat(resDer.valor)
                    return({valor:(ascii/numDer),tipo:dominante})
                }
            } else {
                console.log("valores no compatibles")
            }
        }        

        const Pow = [
            [TypeData.INT,TypeData.DOUBLE,null,null,null],
            [TypeData.DOUBLE,TypeData.DOUBLE,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null]
        ]

        if(this.operacion == 'Pow'){
            const dominante = Pow[resIzq.tipo[1]][resDer.tipo[1]]
            if (dominante!=null){
                if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'INT'){
                    let valIzq = parseInt(resIzq.valor)
                    let valDer = parseInt(resDer.valor)
                    return({valor:(Math.pow(valIzq,valDer)),tipo:dominante})
                } else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = parseInt(resIzq.valor)
                    let valDer = parseFloat(resDer.valor)
                    return({valor:(Math.pow(valIzq,valDer)),tipo:dominante})
                }
                //<----DOUBLE---->
                if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'INT'){
                    let valIzq = parseFloat(resIzq.valor)
                    let valDer = parseInt(resDer.valor)
                    return({valor:(Math.pow(valIzq,valDer)),tipo:dominante})
                } else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = parseFloat(resIzq.valor)
                    let valDer = parseFloat(resDer.valor)
                    return({valor:(Math.pow(valIzq,valDer)),tipo:dominante})
                }
            }
        }

        const Mod =[
            [TypeData.DOUBLE,TypeData.DOUBLE,null,null,null],
            [TypeData.DOUBLE,TypeData.DOUBLE,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null]
        ]
        if(this.operacion == 'MOD'){
            const dominante = Mod[resIzq.tipo[1]][resDer.tipo[1]]
            if (dominante!=null){
                if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'INT'){
                    let valIzq = parseInt(resIzq.valor)
                    let valDer = parseInt(resDer.valor)
                    return({valor:(valIzq%valDer),tipo:dominante})
                } else if(resIzq.tipo[0] == 'INT' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = parseInt(resIzq.valor)
                    let valDer = parseFloat(resDer.valor)
                    return({valor:(valIzq%valDer),tipo:dominante})
                }
                //<----DOUBLE---->
                if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'INT'){
                    let valIzq = parseFloat(resIzq.valor)
                    let valDer = parseInt(resDer.valor)
                    return({valor:(valIzq%valDer),tipo:dominante})
                } else if(resIzq.tipo[0] == 'DOUBLE' && resDer.tipo[0] == 'DOUBLE'){
                    let valIzq = parseFloat(resIzq.valor)
                    let valDer = parseFloat(resDer.valor)
                    return({valor:(valIzq%valDer),tipo:dominante})
                }
            }
        }
    }

}
module.exports = {Aritmetica}