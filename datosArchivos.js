//Orden de Imput de las columnas 
//columna 0: linea que escribe en la tabla
//columna 1: nombre del archivo descargado de DW/ESEFIA
//columna 2: columna correspondiente a la ADUANA en el archivo
//columna 3: columna correspondiente a la FECHA en el archivo
//columna 4: columna correspondiente al TITULO de cada linea

var arrNombresArchivos = [
	//DEFINITIVAS
 [0,'01 - Tablero SDG OAI - ECA sin cancelar - final .txt',1,3,'ECA SIN CANCELAR']
,[1,'02 - Tablero SDG OAI - EC Transitos de exportacion arribados sin cancelar - final .txt',2,3,'EC TRANSITOS DE EXPORTACION ARRIBADOS SIN CANCELAR'] 
,[2,'03 - Tablero SDG OAI - EC sin cancelar - final .txt',0,3,'EC SIN CANCELAR']
	//SUSPENSIVAS
,[3,'04 - Tablero SDG OAI - ES e IDA sin cancelar - final .txt',1,6,'ES e IDA SIN CANCELAR'] 
,[4,'05 - Tablero SDG OAI - Transitos detallados arribados sin cancelar - final .txt',2,4,'TR ARRIBADOS SIN CANCELAR']
,[5,'06 - Tablero SDG OAI - Transitos detallados sin cancelar - final .txt',1,4,'TR SIN CANCELAR ']	//antes 2,5
,[6,'07 - Tablero SDG OAI - Exportaciones temporales sin cancelar - final .txt',4,1,'EXPORTACIONES TEMPORALES SIN CANCELAR']
,[7,'08 - Tablero SDG OAI - Importaciones temporales sin cancelar - final .txt',3,1,'IMPORTACIONES TEMPORALES SIN CANCELAR']
,[8,'09 - Tablero SDG OAI - REMO REM1 sin cancelar - final .txt',0,5,'REMO-REM1 SIN CANCELAR']
	//SUMARIAS
,[9,'10 - Tablero SDG OAI - Transitos sumarios arribados sin cancelar - final .txt',1,4,'TR SUMARIOS ARRIBADOS SIN CANCELAR']
,[10,'11 - Tablero SDG OAI - Transitos sumarios generados sin cancelar - final .txt',1,5,'TR SUMARIOS GENERADOS SIN CANCELAR']
,[11,'12 - Tablero SDG OAI - MANI sin cancelar - final .txt',1,5,'MANI SIN CANCELAR']
,[12,'13 - Tablero SDG OAI - MARE sin cancelar - final .txt',5,3,'MARE SIN CANCELAR']
,[13,'14 - Tablero SDG OAI - MANE sin cancelar - final .txt',1,5,'MANE SIN CANCELAR']
	//GARANTIAS
,[14,'15 - Tablero SDG OAI - Garantias AFE AEJ - final .txt',11,10,'GARANTIAS A EJECUTAR (AEJ)']	
	//BLOQUEO CIPE/MOFA
,[15,'16 - Tablero SDG OAI - Exportaciones con bloqueo CIPE y MOFA - final .txt',1,6,'EXPORTACIONES CON BLOQUEO CIPE Y MOFA']
	//LEGAJOS ENDO
,[16,'17 - Tablero SDG OAI - DEPOFIEL Legajos estado ENDO - final .txt',5,6,'LEGAJOS SIN DIGITALIZAR']	
	//TITULOS
,[17,'18 - Tablero SDG OAI - Titulos Marcados sin publicación en BO - final .txt',9,8,'TITULOS MARCADOS SIN PUBLICAR EN B.O.']
	//ENYSA VENCIDOS
,[18,'19 - Tablero SDG OAI - Registros ENYSA vencidos sin cancelar - final .txt',0,17,'REGISTROS ENYSA VENCIDOS SIN CANCELAR']
	//SINTIA SIN SATAI
,[19,'20 - Tablero SDG OAI - SINTIA sin evento SATAI - final .txt',4,7,'SINTIA SIN EVENTO SATAI']
	//SALIDAS EN ESTADO AUTO
,[20,'21 - Tablero SDG OAI - Salida zona primaria aduanera estado auto - final .txt',4,3,'SALIDA ZONA PRIMARIA ADUANERA EN ESTADO AUTO']
	//EXPORTACIONES CON DIFERENCIA
,[21,'22 - Tablero SDG OAI - Exportaciones con diferencia sin post embarque - final .txt',1,5,'EXPORTACIONES CON DIFERENCIA SIN POST EMBARQUE']

];















