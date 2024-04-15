class Expresion{
    constructor(valor,tipo,fila,columna){
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(entorno){}
}

module.exports={Expresion}