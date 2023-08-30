let customColumnName = 'Codigo Aduana de registro - DDT'

function cleanArray(arrayToClean, customColumnIndex, arrayCustom) {
    let result = arrayToClean.filter(x => {
        return arrayCustom.includes(x[customColumnIndex]);
    })
    return result;
}

function filterCustoms(arrayListData, arrayCustom = arrHidrovia) {
    let arrayFilteredList = new Array();
    arrayListData.forEach((element, index) => {
        let arrayResult = cleanArray(element, arrCustomColumnIndex[index], arrayCustom);
        arrayFilteredList.push(arrayResult);
        console.log('Array number %s filtered', index);
    })
    return arrayFilteredList;
}


function getNotDidItData() {
    console.log('Iniciando comparar datos');
    let resultNotDidItData;

    resultNotDidItData = arrayCrudoMayo[0].filter(x => {
        for (let items of arrayCrudoJulio[0]) {
            if (items.includes(x[0])) {
                x.push('NO')
                return true;
            }
        }
        x.push('SI')
        return false;
    })


    console.log(resultNotDidItData);
    console.log('Iniciando comparar datos');

}


let resultDidItData;

function getDidItData(arrayRawLastMonth, arrayRawCurrentMonth, recordColumnIndex) {
    console.log('Analizando registros regularizados');
    arrayRawLastMonth.forEach(x => {
        for (let items of arrayRawCurrentMonth) {
            if (items.includes(x[recordColumnIndex])) {
                x.push('NO');
                return;
            }
        }
        x.push('SI');
    })
    return arrayRawLastMonth
}

function getNewData(arrayRawLastMonth, arrayRawCurrentMonth, recordColumnIndex) {
    console.log('Analizando registros nuevos');
    arrayRawCurrentMonth.forEach(x => {
        for (let items of arrayRawLastMonth) {
            if (items.includes(x[recordColumnIndex])) {
                x.push('NO');
                return;
            }
        }
        x.push('SI');
    })
    return arrayRawCurrentMonth;
}
function download(filename, text) {
    let element = document.createElement('a');
    // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('href', text);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
function processData() {

    // Get raw array a filter customs
    let arrCustomFilteredListLastMonth = filterCustoms(arrayCrudoMesAnterior);
    let arrCustomFilteredListCurrentMonth = filterCustoms(arrayCrudoMesActual);

    // Compara lists
    let arrComparedListLastMonth = new Array();
    let arrComparedListCurrentMonth = new Array();
    for (let i=0; i < arrCustomFilteredListCurrentMonth.length; i++) {
    // for (let i = 1; i < 4; i++) {
        arrComparedListCurrentMonth.push(getNewData(arrCustomFilteredListLastMonth[i],
            arrCustomFilteredListCurrentMonth[i],
            arrRecordColumnIndex[i]));
        arrComparedListLastMonth.push(getDidItData(arrCustomFilteredListLastMonth[i],
            arrCustomFilteredListCurrentMonth[i],
            arrRecordColumnIndex[i]));
    }

    let rosarioCustomListLastMonth = filterCustoms(arrComparedListLastMonth, ['052'])
    let rosarioCustomListCurrentMonth = filterCustoms(arrComparedListCurrentMonth, ['052'])
    for (let i=1; i < rosarioCustomListCurrentMonth.length; i++) {
        let sheetL = new sheet();
        sheetL.addSheet(rosarioCustomListLastMonth[i], rosarioCustomListCurrentMonth[i], arrNombresArchivos[i][4].substring(0,15));
        let fileSheet = sheetL.getSpreadSheetFile();
        let fileSheetBlob = new Blob([fileSheet], {type: "application/octet-stream"});
        download('rosario.xlsx', window.URL.createObjectURL(fileSheetBlob));
    }
    console.log('Finalizado');
}