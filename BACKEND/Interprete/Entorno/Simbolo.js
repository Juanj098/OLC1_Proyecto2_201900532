class Sym{
    constructor(name,value,type,typeSym,fila,columna){
        this.name = name;
        this.value = value;
        this.type = type;
        this.typeVar = typeSym;
        this,fila = fila;
        this.columna = columna;
    }
    getValor(){
        return this.value
    }

    actualizarValor(valor){
        this.value =  valor
    }

    getTipo(tipo){
        return this.typeVar
    }
}

module.exports = {Sym}