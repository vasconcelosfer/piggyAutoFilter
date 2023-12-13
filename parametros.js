let strTodosLosAnios = 'Ultimos 6 años';
let gMuestraIdModal = false;
let gTipoApiladoCIPEMOFA = 'corto';	//valores: "corto" (muestra 5 caracteres) o "largo" (muestra nombre completo)
let gTipoApiladoLEGAJOS = 'corto';	//valores: "corto" (muestra 5 caracteres) o "largo" (muestra nombre completo)
let gTipoApilado5ABAJO = 'corto';	//valores: "corto" (muestra 5 caracteres) o "largo" (muestra nombre completo)
let gMuestraURL = true;

let arrGraficos = [	//a todos los indices se le sumó 2 porque en 0 está la aduana y en 1 el codigo de DRA
    [[2, 3, 4], 'DEFINITIVAS SIN CANCELAR', 'none', 8, 'chart1', 'PieChart', true, true]
    , [[5, 6, 7, 8, 9, 10], 'SUSPENSIVAS SIN CANCELAR', 'none', 12, 'chart2', 'BarChart', true, false]
    , [[11, 12, 13, 14, 15], 'SUMARIAS SIN CANCELAR', 'none', 12, 'chart3', 'ColumnChart', true, false]
    , [[16], 'GARANTIAS AEJ', 'none', 12, 'chart4', 'PieChart', true, false]
    , [[17], 'BLOQUEO CIPE/MOFA', 'none', 12, 'chart5', 'ColumnChart', true, false]
    , [[18], 'LEGAJOS ESTADO ENDO', 'none', 12, 'chart6', 'PieChart', true, false]
    , [[19], 'TITULOS MARCADOS PARA PUBLICACION', 'none', 8, 'chart7', 'PieChart', true, true]
    , [[20], 'ENYSA VENCIDOS', 'none', 8, 'chart8', 'PieChart', true, true]
    , [[21], 'SINTIA SIN EVENTOS SATAI', 'none', 8, 'chart9', 'PieChart', true, true]
    , [[22], 'SALIDAS EN ESTADO AUTO', 'none', 8, 'chart10', 'PieChart', true, true]
    , [[23], 'EXPORTACIONES CON DIFERENCIA SIN POSTEMBARQUE', 'none', 8, 'chart11', 'PieChart', true, true]
];

var arrDRAs = [
    [0, 'Patagonica']
    , [1, 'Central']
    , [2, 'Noreste']
    , [3, 'Noroeste']
    , [4, 'Pampeana']
    , [5, 'Hidrovia']
    , [6, 'SDG OAI']
];

let arrNombresDRAs = [
    'Patagonica'
    , 'Central'
    , 'Noreste'
    , 'Noroeste'
    , 'Pampeana'
    , 'Hidrovia'
    , 'SDG OAI'
];

let arrNombresCortosDRAs = ['PAT', 'CEN', 'NE', 'NO', 'PAMP', 'HID', 'SDG OAI'];
/*
//https://htmlcolorcodes.com/es/nombres-de-los-colores/
Lavender,PaleGoldenrod,LightSalmon,PaleTurquoise,Gainsboro,Pink,LightGreen,PeachPuff,PaleVioletRed,Gold
,Plum,DarkKhaki,MediumSlateBlue,RosyBrown,MediumAquamarine,DarkSeaGreen,CornflowerBlue*/

//HIDROVIA (5)
let arrHidrovia = [
    '093', '062', '057', '069', '052', '016', '041', '020', '013', '015', '026', '059', '060', '094', '267', '268'
]
let arrCustomColumnIndex = [1, 0, 0, 1, 1, 1, 4, 3, 0, 2, 1, 1, 5, 1, 11, 1, 5, 0, 0, 4, 4, 1];
let arrRecordColumnIndex = [0, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 0, 0, 0];

let arrAduanas = [
    ['093', 'RAFAELA', '5', 'HIDROVIA', 'FireBrick', 'RAFAE']
    , ['062', 'SANTA FE', '5', 'HIDROVIA', 'Salmon', 'STAFE']
    , ['057', 'SAN LORENZO', '5', 'HIDROVIA', 'Fuchsia', 'SLORE']
    , ['069', 'VILLA CONSTITUCION', '5', 'HIDROVIA', 'Orange', 'VCONS']
    , ['052', 'ROSARIO', '5', 'HIDROVIA', 'DarkKhaki', 'ROSAR']
    , ['016', 'CONCORDIA', '5', 'HIDROVIA', 'DarkViolet', 'CONCO']
    , ['041', 'PARANA', '5', 'HIDROVIA', 'LimeGreen', 'PARAN']
    , ['020', 'DIAMANTE', '5', 'HIDROVIA', 'DarkGreen', 'DIAMA']
    , ['013', 'COLON', '5', 'HIDROVIA', 'DarkCyan', 'COLON']
    , ['015', 'CONCEPCION DEL URUGUAY', '5', 'HIDROVIA', 'Blue', 'CURUG']
    , ['026', 'GUALEGUAYCHU', '5', 'HIDROVIA', 'SaddleBrown', 'GUALE']
    , ['059', 'SAN NICOLAS', '5', 'HIDROVIA', 'Black', 'SNICO']
    , ['060', 'SAN PEDRO', '5', 'HIDROVIA', 'Silver', 'SPEDR']
    , ['094', 'VENADO TUERTO', '5', 'HIDROVIA', 'PowderBlue', 'VTUER']
    , ['267', 'ZF CONCEPCION DEL URUGUAY', '5', 'HIDROVIA', 'OrangeRed', 'ZFCUR']
    , ['268', 'ZF VILLA CONSTITUCION', '5', 'HIDROVIA', 'Olive', 'ZFVCO']
//NOROESTE (3)
    , ['031', 'JUJUY', '3', 'NOROESTE', 'FireBrick', 'JUJUY']
    , ['034', 'LA QUIACA', '3', 'NOROESTE', 'Salmon', 'QUIAC']
    , ['045', 'POCITOS', '3', 'NOROESTE', 'DarkCyan', 'POCIT']
    , ['053', 'SALTA', '3', 'NOROESTE', 'Orange', 'SALTA']
    , ['066', 'TINOGASTA', '3', 'NOROESTE', 'DarkKhaki', 'TINOG']
    , ['074', 'TUCUMAN', '3', 'NOROESTE', 'DarkViolet', 'TUCUM']
    , ['076', 'ORAN', '3', 'NOROESTE', 'LimeGreen', 'ORAN']
    , ['089', 'SANTIAGO DEL ESTERO', '3', 'NOROESTE', 'DarkGreen', 'SANTI']
//NORESTE (2)
    , ['010', 'BARRANQUERAS', '2', 'NORESTE', 'FireBrick', 'BARRA']
    , ['012', 'CLORINDA', '2', 'NORESTE', 'Salmon', 'CLORI']
    , ['018', 'CORRIENTES', '2', 'NORESTE', 'Silver', 'CORRI']
    , ['024', 'FORMOSA', '2', 'NORESTE', 'Orange', 'FORMO']
    , ['025', 'GOYA', '2', 'NORESTE', 'DarkKhaki', 'GOYA']
    , ['029', 'IGUAZU', '2', 'NORESTE', 'DarkViolet', 'IGUAZ']
    , ['042', 'PASO DE LOS LIBRES', '2', 'NORESTE', 'LimeGreen', 'PASOL']
    , ['046', 'POSADAS', '2', 'NORESTE', 'DarkGreen', 'POSAD']
    , ['054', 'SAN JAVIER', '2', 'NORESTE', 'DarkCyan', 'SJAVI']
    , ['082', 'BERNARDO DE IRIGOYEN', '2', 'NORESTE', 'Blue', 'BIRIG']
    , ['084', 'SANTO TOME', '2', 'NORESTE', 'SaddleBrown', 'STOME']
    , ['086', 'OBERA', '2', 'NORESTE', 'Black', 'OBERA']
//CENTRAL (1)
    , ['079', 'LA RIOJA', '1', 'CENTRAL', 'FireBrick', 'LRIOJ']
    , ['055', 'SAN JUAN', '1', 'CENTRAL', 'Salmon', 'SJUAN']
    , ['038', 'MENDOZA', '1', 'CENTRAL', 'DarkCyan', 'MENDO']
    , ['083', 'SAN LUIS', '1', 'CENTRAL', 'Orange', 'SLUIS']
    , ['078', 'SAN RAFAEL', '1', 'CENTRAL', 'DarkKhaki', 'SRAFA']
    , ['088', 'GENERAL DEHEZA', '1', 'CENTRAL', 'DarkViolet', 'DEHEZ']
    , ['017', 'CORDOBA', '1', 'CENTRAL', 'LimeGreen', 'CORDO']
//PAMPEANA (4)
    , ['003', 'BAHIA BLANCA', '4', 'PAMPEANA', 'FireBrick', 'BAHIA']
    , ['004', 'BARILOCHE', '4', 'PAMPEANA', 'Salmon', 'BARIL']
    , ['037', 'MAR DEL PLATA', '4', 'PAMPEANA', 'Silver', 'MDPLA']
    , ['040', 'NECOCHEA', '4', 'PAMPEANA', 'Orange', 'NECOC']
    , ['058', 'SAN MARTIN DE LOS ANDES', '4', 'PAMPEANA', 'DarkKhaki', 'SMAND']
    , ['075', 'NEUQUEN', '4', 'PAMPEANA', 'DarkViolet', 'NEUQU']
    , ['080', 'SAN ANTONIO OESTE', '4', 'PAMPEANA', 'LimeGreen', 'SAOES']
    , ['085', 'VILLA REGINA', '4', 'PAMPEANA', 'DarkGreen', 'VREGI']
    , ['090', 'GENERAL PICO', '4', 'PAMPEANA', 'DarkCyan', 'GPICO']
    , ['266', 'ZF CNEL ROSALES', '4', 'PAMPEANA', 'Blue', 'ZFROS']
    , ['269', 'ZF PTO GALVAN', '4', 'PAMPEANA', 'SaddleBrown', 'ZFGAL']
    , ['258', 'ZF GRAL PICO', '4', 'PAMPEANA', 'Black', 'ZFPIC']
//PATAGONICA (0)
    , ['014', 'COMODORO RIVADAVIA', '0', 'PATAGONICA', 'FireBrick', 'CRIVA']
    , ['019', 'PUERTO DESEADO', '0', 'PATAGONICA', 'Salmon', 'DESEA']
    , ['023', 'ESQUEL', '0', 'PATAGONICA', 'SaddleBrown', 'ESQUE']
    , ['047', 'PUERTO MADRYN', '0', 'PATAGONICA', 'Orange', 'MADRY']
    , ['048', 'RIO GALLEGOS', '0', 'PATAGONICA', 'DarkKhaki', 'RGALL']
    , ['049', 'RIO GRANDE', '0', 'PATAGONICA', 'DarkViolet', 'RGRAN']
    , ['061', 'SANTA CRUZ', '0', 'PATAGONICA', 'LimeGreen', 'STACR']
    , ['067', 'USHUAIA', '0', 'PATAGONICA', 'DarkGreen', 'USHU']
    , ['087', 'CALETA OLIVIA', '0', 'PATAGONICA', 'DarkCyan', 'COLIV']
    , ['253', 'ZF RIO GALLEGOS', '0', 'PATAGONICA', 'Blue', 'ZFRIO']
//METRO
    , ['001', 'BUENOS AIRES', '-1', 'METROPOLITANA', 'FireBrick', 'BSAS']
    , ['008', 'CAMPANA', '-1', 'METROPOLITANA', 'Salmon', 'CAMP']
    , ['033', 'LA PLATA', '-1', 'METROPOLITANA', 'SaddleBrown', 'LAPL']
    , ['073', 'EZEIZA', '-1', 'METROPOLITANA', 'Orange', 'EZE']

];

let arrColores = [
    '#a1c2d5'		//Patagonica
    , '#c5a8de'		//Central
    , '#a5d5bf'		//Noreste
    , '#e09e9f'		//Noroeste
    , '#d8c8af'		//Pampeana
    , '#e69c79'		//Hidrovia
];

let arrColoresAdu = [
    'FireBrick'
    , 'Salmon'
    , 'Tomato'
    , 'Orange'
    , 'DarkKhaki'
    , 'DarkViolet'
    , 'LimeGreen'
    , 'DarkGreen'
    , 'DarkCyan'
    , 'Blue'
    , 'SaddleBrown'
    , 'Black'
    , 'Silver'
    , 'PowderBlue'
    , 'OrangeRed'
    , 'Olive'
    , 'PapayaWhip'
];

let arrColoresAnio = [
    ['#a1c2d5', '#d9e6ee', '#c6dae5', '#b3cedd', '#809baa', '#60747f']	//Patagonica
    , ['#c5a8de', '#e7dcf1', '#dccaeb', '#d0b9e4', '#9d86b1', '#766485']	//Central
    , ['#a5d5bf', '#dbeee5', '#c9e5d8', '#b7ddcb', '#84aa98', '#637f72']	//Noreste
    , ['#e09e9f', '#f2d8d8', '#ecc4c5', '#e6b1b2', '#b37e7f', '#865e5f']	//Noroeste
    , ['#d8c8af', '#efe9df', '#e7decf', '#dfd3bf', '#aca08c', '#817869']	//Pampeana
    , ['#e69c79', '#f5d7c9', '#f0c3ae', '#ebaf93', '#b87c60', '#8a5d48']	//Hidrovia
    , ['#bcbcbc', '#a7a7a7', '#929292', '#7d7d7d', '#686868', '#535353']	//SDG OAI
];

