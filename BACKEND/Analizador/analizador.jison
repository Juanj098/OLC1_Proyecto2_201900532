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
"Void"          return 'VOID'
"std::string"   return 'STD_STRING';
"cout"          return 'COUT'
"endl"          return 'ENDL'
"pow"           return 'POW'
"if"            return 'IF'
"else"          return 'ELSE'
"WHILE"         return 'WHILE'
"FOR"           return 'FOR'
"DO"            return 'DO'
"Break"         return 'BREAK'
"Continue"      return 'CONTINUE'
"Return"        return 'RETURN'
"EXECUTE"       return 'EXECUTE'


//-> Simbolos

\;          return 'PYC';
\,          return 'COMA';
"<<"        return 'DPA';
"+"         return 'MAS';
"-"         return 'MENOS';
"*"         return 'POR';
"/"         return 'DIV';
"%"         return 'MOD'
"("         return 'PARIZQ';
")"         return 'PARDER';
"||"        return 'OR'
"&&"        return 'AND'
"!"         return 'NOT'
"<="        return 'MEOIGQ'
">="        return 'MAOIGQ'
"!="        return 'DIFQ'
"=="        return 'IGQ'
"="         return 'IG';
">"         return 'MAQ'
"<"         return 'MEQ'
"{"         return 'CORIZQ'
"}"         return 'CORDER'
"["         return 'CORCHIZQ'
"]"         return 'CORCHDER'

//-> ID, number(int, double), bool, cadenas, char
"true"|"false"      return 'V_BOOL';
[a-zA-Z]+[0-9]*     return 'ID';
[0-9]+(\.[0-9]+)\b  return 'V_DOUBLE';
[-+]?[0-9]+\b       return 'V_INT';
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
    const {Acceder} = require("../Interprete/Expresion/Acceder_Arr")
    const {Logico} = require("../Interprete/Expresion/logicos")
    const {Relacionales} = require("../Interprete/Expresion/Relacionales")
    const {TypeData} = require("../Interprete/Enums/TipoDato")
    const {Funciones}  = require("../Interprete/Instrucciones/Func/funciones")
    const {Bloque}  = require("../Interprete/Instrucciones/bloque")
    const {Llamada} = require("../Interprete/Instrucciones/llamada")
    const {func_if} = require("../Interprete/Instrucciones/Control/if")
    const {Break} = require("../Interprete/Instrucciones/Control/Break")
    const {Continue} = require("../Interprete/Instrucciones/Control/continue")
    const {Retorno} = require("../Interprete/Instrucciones/Control/return")
    const {While} = require("../Interprete/Instrucciones/Ciclos/while")
    const {DoWhile} = require("../Interprete/Instrucciones/Ciclos/DoWhile")
    const {For} = require("../Interprete/Instrucciones/Ciclos/For")
    const {Incremento} = require("../Interprete/Expresion/incremento")
    const {Decremento} = require("../Interprete/Expresion/decremento")
    const {Exec} = require("../Interprete/Instrucciones/Func/Exec.js")
    const {Arreglo} = require("../Interprete/Expresion/Array")
%}
// -------> Precedencia
%right 'NOT'
%left  'OR'
%left  'AND'
%left  'MEQ','MAQ','MEOIGQ','MAOIGQ','IGQ','DIFQ'
%left  'MAS','MENOS'
%left  'POR','DIV','MOD'
%right  UMINUS


// -------> Simbolo Inicial

%start star

%% // ------> Gramatica

star: instrucciones EOF       {return new AST($1);}
    |error EOF                {console.log('Error Sintactico: ' + yytext + ' - linea: ' + this._$.first_line  + ' - columna: ' + this._$.first_column);}
;

instrucciones
            :instrucciones ins   {$1.push($2);$$=$1 }
            |ins                 {$$=[$1]}
;

ins
    :declarar  PYC       {$$=$1}
    |declarar_arr PYC    {$$=$1}
    |print     PYC       {$$=$1}
    |llamada_func PYC    {$$=$1}
    |fn_func   PYC       {$$=$1}
    |func_if   PYC       {$$=$1}
    |c_while   PYC       {$$=$1}
    |asign     PYC       {$$=$1}
    |c_for     PYC       {$$=$1}
    |c_dowhile PYC       {$$=$1}
    |ins_break PYC       {$$=$1}
    |ins_conti PYC       {$$=$1}
    |ins_ret   PYC       {$$=$1}
    |fun_dec   PYC       {$$=$1}
    |fun_inc   PYC       {$$=$1}
    |func_exec PYC       {$$=$1}
;

declarar
    :tipo ids                                                          {$$ = new DecVar($2,$1,null,@1.first_line,@1.first_column);}
    |tipo ids IG exp                                                   {$$ = new DecVar($2,$1,$4,@1.first_line,@1.first_column);}
;

declarar_arr
    :tipo ID CORCHIZQ CORCHDER                                                                                                          {$$ = new Arreglo($1,$2,1,[],@1.first_line,@1.first_column)} //int arr1 [] = <tipo>[];
    |tipo ID CORCHIZQ CORCHDER IG CORCHIZQ list_val CORCHDER                                                                            {$$ = new Arreglo($1,$2,1,$7,@1.first_line,@1.first_column)} //int arr3 [] = [a,b,c] 
    |tipo ID CORCHIZQ CORCHDER CORCHIZQ CORCHDER                                                                                        {$$ = new Arreglo($1,$2,2,[[],[]],@1.first_line,@1.first_column)} //int arr2 [][] = <tipo>[][];
    |tipo ID CORCHIZQ CORCHDER CORCHIZQ CORCHDER IG CORCHIZQ CORCHIZQ list_val CORCHDER COMA CORCHIZQ list_val CORCHDER CORCHDER        {let arr = []; arr.push($10);arr.push($14);$$ = new Arreglo($1,$2,2,arr,@1.first_line,@1.first_column)} //int arr4 [][] = [[1,2],[3,4]]
;

list_val
    :list_val COMA exp      {$1.push($3);$$=$1}
    |exp                    {$$=[$1]}
;


asign
    :ID IG exp {$$= new Asignacion($1,$3,@1.first_line,@1.first_column)}
;

tipo
    :INT        {$$=$1}
    |CHAR       {$$=$1}
    |DOUBLE     {$$=$1}
    |BOOL       {$$=$1}
    |STD_STRING {$$=$1}
    |VOID       {$$=$1}
;

ids
    :ids COMA ID {$1.push($3);$$=$1}
    |ID   {$$=[$1]}
;

exp
    :MENOS exp %prec UMINUS                           {$$ = new Aritmetica(new Primitivo(0,0,0),$2,'Menos',@1.first_line,@1.first_column)}
    |exp MAS exp                                      {$$ = new Aritmetica($1,$3,'Suma',@1.first_line,@1.first_column)}
    |exp MENOS exp                                    {$$ = new Aritmetica($1,$3,'Menos',@1.first_line,@1.first_column)}
    |exp POR exp                                      {$$ = new Aritmetica($1,$3,'Por',@1.first_line,@1.first_column)}
    |exp DIV exp                                      {$$ = new Aritmetica($1,$3,'Div',@1.first_line,@1.first_column)}
    |exp MOD exp                                      {$$ = new Aritmetica($1,$3,'MOD',@1.first_line,@1.first_column)} 
    |POW PARIZQ exp COMA exp PARDER                   {$$ = new Aritmetica($3,$5,'Pow',@1.first_line,@1.first_column)}
    |ID                                               {$$ = new Acceder($1,@1.first_line,@1.first_column)}
    |V_BOOL                                           {$$ = new Primitivo($1,"BOOL",@1.first_line,@1.first_column)}
    |V_CADENA                                         {$$ = new Primitivo($1,"STD::STRING",@1.first_line,@1.first_column)}
    |V_CHAR                                           {$$ = new Primitivo($1,"CHAR",@1.first_line,@1.first_column)}
    |V_DOUBLE                                         {$$ = new Primitivo($1,"DOUBLE",@1.first_line,@1.first_column)}
    |V_INT                                            {$$ = new Primitivo($1,"INT",@1.first_line,@1.first_column)}
    |ID CORIZQ V_INT CORCHDER                         {$$ = new Acceder_Arr($1,$3,null,@1.first_line,@1.first_column)}
    |ID CORIZQ V_INT CORCHDER CORIZQ V_INT CORCHDER   {$$ = new Acceder_Arr($1,$3,$6,@1.first_line,@1.first_column)}
    |oplogicos                                        {$$ = $1}
    |oprelacionales                                   {$$ = $1}
    |PARIZQ exp PARDER                                {$$ = $2}
;

oplogicos
    :exp AND exp    {$$ = new Logico($1,$3,$2,@1.first_line,@1.first_column)}
    |exp OR  exp    {$$ = new Logico($1,$3,$2,@1.first_line,@1.first_column)}
    |NOT exp        {$$ = new Logico(null,$2,$1,@1.first_line,@1.first_column)}
;

oprelacionales
    :exp MAQ exp    {$$ = new Relacionales($1,$3,$2,@1.first_line,@1.first_column)} //>
    |exp MEQ exp    {$$ = new Relacionales($1,$3,$2,@1.first_line,@1.first_column)} //<
    |exp MAOIGQ exp {$$ = new Relacionales($1,$3,$2,@1.first_line,@1.first_column)} //>=
    |exp MEOIGQ exp {$$ = new Relacionales($1,$3,$2,@1.first_line,@1.first_column)} //<=
    |exp DIFQ exp   {$$ = new Relacionales($1,$3,$2,@1.first_line,@1.first_column)} //!=
    |exp IGQ exp    {$$ = new Relacionales($1,$3,$2,@1.first_line,@1.first_column)} //==
;

print
    :COUT DPA exp            {$$= new Cout($3,false,@1.first_line,@1.first_column)}
    |COUT DPA exp DPA ENDL   {$$= new Cout($3,true,@1.first_line,@1.first_column)}
;

fn_func
    :tipo ID PARIZQ PARDER bloque          {$$ = new Funciones($1,$2,[],$5,@1.first_line,@1.first_column)}
    |tipo ID PARIZQ params PARDER bloque   {$$ = new Funciones($1,$2,$4,$6,@1.first_line,@1.first_column)}
;

param
    :tipo ID    {$$ = ({id:$2,tipo:$1})}
;

params
    :params COMA param   {$1.push($3);$$ = $1}
    |param               {$$=[$1]}
;

llamada_func
    :ID PARIZQ PARDER           {$$ = new Llamada($1,[],@1.first_line,@1.first_column)}
    |ID PARIZQ list_exp PARDER  {$$ = new Llamada($1,$3,@1.first_line,@1.first_column)}
;

list_exp
    :list_exp COMA exp    {$1.push($3); $$=$1}
    |exp                  {$$=[$1]}
;

bloque
    :CORIZQ instrucciones CORDER    {$$ = new Bloque($2,@1.first_line,@1.first_column)}
    |CORIZQ CORDER                  {$$ = new Bloque([],@1.first_line,@1.first_column)}
;

func_if
    :IF PARIZQ exp PARDER bloque                {$$ = new func_if($3,$5,null,@1.first_line,@1.first_column)}
    |IF PARIZQ exp PARDER bloque ELSE bloque    {$$ = new func_if($3,$5,$7,@1.first_line,@1.first_column)}
    |IF PARIZQ exp PARDER bloque ELSE func_if   {$$ = new func_if($3,$5,$7,@1.first_line,@1.first_column)}
;

c_while
    : WHILE PARIZQ exp PARDER bloque    {$$ = new While($3,$5,@1.first_line,@1.first_column)}
;

ins_break
    :BREAK      {$$ = new Break(@1.first_line,@1.first_column)}
;

ins_conti
    :CONTINUE   {$$ = new Continue(@1.first_line,@1.first_column)}
;

ins_ret
    :RETURN exp {$$ = new Retorno($2,@1.first_line,@1.first_column)}
;

fun_dec
    :ID MENOS MENOS {$$ = new Decremento($1,@1.first_line,@1.first_column)}
;

fun_inc
    :ID MAS MAS {$$ = new Incremento($1,@1.first_line,@1.first_column)}
;

c_for
    :FOR PARIZQ declarar PYC exp PYC fun_inc PARDER bloque {$$ = new For($3,$5,$7,$9,@1.first_line,@1.first_column)}
    |FOR PARIZQ asign PYC exp PYC fun_dec PARDER bloque {$$ = new For($3,$5,$7,$9,@1.first_line,@1.first_column)}
;

c_dowhile
    :DO bloque WHILE PARIZQ exp PARDER  {$$ = new DoWhile($2,$5,@1.first_line,@1.first_column)}
;

func_exec
    :EXECUTE llamada_func       {$$ = new Exec($2,@1.first_line,@1.first_column)}
;