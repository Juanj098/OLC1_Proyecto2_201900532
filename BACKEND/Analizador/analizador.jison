// ---------------------> ANALIZADOR LEXICO <---------------------

%lex

%options case-insensitive 

%%
//-> espacios y comentarios

\/\/.*                              {/* skip comments one line*/}
\/\*((\*+[^/*])|([^*]))*\**\*\/     {/*skip comments with multiple lines*/}  
\s+                                 {/* skip whitespace */}

//-> palabras  reservadas

"int"           return 'INT';
"double"        return 'DOUBLE';
"bool"          return 'BOOL';
"char"          return 'CHAR';
"std::string"   return 'STD_STRING';


//-> Simbolos

\;         return 'PYC';
"="         return 'IG';
\,          return 'COMA';

//-> ID, number(int, double), bool, cadenas, char
"true"|"false"      return 'V_BOOL';
[a-zA-Z]+[0-9]*     return 'ID';
[0-9]+(\.[0-9]+)\b  return 'V_DOUBLE';
[0-9]+\b            return 'V_INT';
\".*\"              return 'V_CADENA';
\"[a-zA-Z]\"        return 'V_CHAR';    


<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex

// ---------------------> ANALIZADOR SINTACTICO <---------------------
%{
    //enum
    // const {Tdato} = require("../Interprete/expresion.js");
    // //exp
    // const Data = require("../Interprete/Expresion/Dato.js");

%}
// -------> Precedencia



// -------> Simbolo Inicial

%start star

%% // ------> Gramatica

star: instrucciones EOF       {return $1;}
    |error EOF                { console.error('Error Sintactico: ' + yytext + ' - linea: ' + this._$.first_line  + ' - columna: ' + this._$.first_column);}
;

instrucciones
            :instrucciones ins   {$1.push($2);$$=$1 }
            |ins                 {$$=[$1]}
;

ins
    :declarar   {$$=$1;}
;

declarar
    :tipo ids PYC           {$$={tipo: $1, ids: $2 };}
    |tipo ids IG exp PYC    {$$={ tipo: $1, ids: $2, exp: $4 };}
;

tipo
    :INT        {$$=$1}
    |CHAR       {$$=$1}
    |DOUBLE     {$$=$1}
    |BOOL       {$$=$1}
    |STD_STRING {$$=$1}
;

ids
    :ids COMA ID {$1.push($3);$$=$1}
    |ID   {$$=[$1]}
;

exp
    :V_BOOL   {$$=$1}
    |V_CADENA {$$=$1}
    |V_CHAR   {$$=$1}
    |V_DOUBLE {$$=$1}
    |V_INT    {$$=$1}
;
