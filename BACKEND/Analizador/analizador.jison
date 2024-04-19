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
"cout"          return 'COUT'
"endl"          return 'ENDL'


//-> Simbolos

\;          return 'PYC';
"="         return 'IG';
\,          return 'COMA';
"<<"        return 'DPA';
"+"         return 'MAS';
"-"         return 'MENOS';
"*"         return 'POR';
"/"         return 'DIV';
"("         return 'PARIZQ';
")"         return 'PARDER';

//-> ID, number(int, double), bool, cadenas, char
"true"|"false"      return 'V_BOOL';
[a-zA-Z]+[0-9]*     return 'ID';
[0-9]+(\.[0-9]+)\b  return 'V_DOUBLE';
[-+]?[0-9]+\b            return 'V_INT';
\".*\"              return 'V_CADENA';
\'[a-zA-Z]\'        return 'V_CHAR';    


<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex

// ---------------------> ANALIZADOR SINTACTICO <---------------------
%{
    const {AST} = require("../Interprete/AST/AST.js")
    const {DecVar} = require("../Interprete/Instrucciones/variables/DecVar.js")
    const {Asignacion} = require("../Interprete/Instrucciones/variables/Asignacion")
    const {Primitivo} = require("../Interprete/Expresion/Primitivo")
    const {Aritmetica} = require("../Interprete/Expresion/Aritmeticas")
    const {Cout} = require("../Interprete/Instrucciones/Cout")
    const {Acceder} = require("../Interprete/Expresion/Acceder")
%}
// -------> Precedencia
%left 'MAS','MENOS'
%left 'POR','DIV'
%right UMINUS


// -------> Simbolo Inicial

%start star

%% // ------> Gramatica

star: instrucciones EOF       {return new AST($1);}
    |error EOF                {console.error('Error Sintactico: ' + yytext + ' - linea: ' + this._$.first_line  + ' - columna: ' + this._$.first_column);}
;

instrucciones
            :instrucciones ins   {$1.push($2);$$=$1 }
            |ins                 {$$=[$1]}
;

ins
    :declarar PYC  {$$=$1;}
    |print    PYC  {$$=$1}
;

declarar
    :tipo ids            {$$ = new DecVar($2,$1,null,@1.first_line,@1.first_column);}
    |tipo ids IG exp     {$$ = new DecVar($2,$1,$4,@1.first_line,@1.first_column);}
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
    :MENOS exp %prec UMINUS     {$$ = new Aritmetica(new Primitivo(0,0,0),$2,'Menos',@1.first_line,@1.first_column)}
    |exp MAS exp                {$$ = new Aritmetica($1,$3,'Suma',@1.first_line,@1.first_column)}
    |exp MENOS exp              {$$ = new Aritmetica($1,$3,'Menos',@1.first_line,@1.first_column)}
    |exp POR exp                {$$ = new Aritmetica($1,$3,'Por',@1.first_line,@1.first_column)}
    // |exp DIV exp                {$$ = new Aritmetica($1,$3,'Div',@1.first_line,@1.first_column)}
    |ID                         {$$ = new Acceder($1,@1.first_line,@1.first_column)}
    |V_BOOL                     {$$ = new Primitivo($1,"BOOL",@1.first_line,@1.first_column)}
    |V_CADENA                   {$$ = new Primitivo($1,"STD::STRING",@1.first_line,@1.first_column)}
    |V_CHAR                     {$$ = new Primitivo($1,"CHAR",@1.first_line,@1.first_column)}
    |V_DOUBLE                   {$$ = new Primitivo($1,"DOUBLE",@1.first_line,@1.first_column)}
    |V_INT                      {$$ = new Primitivo($1,"INT",@1.first_line,@1.first_column)}
    |PARIZQ exp PARDER          {$$ = $2}
;

print
    :COUT DPA exp            {$$= new Cout($3,false,@1.first_line,@1.first_column)}
    |COUT DPA exp DPA ENDL   {$$= new Cout($3,true,@1.first_line,@1.first_column)}
;