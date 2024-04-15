class Sym{
    constructor(name,value,type,typeVar,fila,columna){
        this.name = name;
        this.value = value;
        this.type = type;
        this.typeVar = typeVar;
        this,fila = fila;
        this.columna = columna;
    }
    getValor(){
        return this.value
    }

    actualizarValor(valor){
        this.value =  valor
    }
}

module.exports = {Sym}