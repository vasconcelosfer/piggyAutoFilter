function cleanArray(arrayToClean, customColumnIndex, arrayCustom) {
    return arrayToClean.filter(x => {
        return arrayCustom.includes(x[customColumnIndex]);
    })
}

function filterCustoms(arrayListData, arrayCustom = arrHidrovia) {
    let arrayFilteredList = [];
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
    let arrComparedListLastMonth = [];
    let arrComparedListCurrentMonth = [];
    for (let i=0; i < arrCustomFilteredListCurrentMonth.length; i++) {
    // for (let i = 1; i < 4; i++) {
        arrComparedListCurrentMonth.push(getNewData(arrCustomFilteredListLastMonth[i],
            arrCustomFilteredListCurrentMonth[i],
            arrRecordColumnIndex[i]));
        arrComparedListLastMonth.push(getDidItData(arrCustomFilteredListLastMonth[i],
            arrCustomFilteredListCurrentMonth[i],
            arrRecordColumnIndex[i]));
    }

    let rosarioCustomListLastMonth = filterCustoms(arrComparedListLastMonth, ['057'])
    let rosarioCustomListCurrentMonth = filterCustoms(arrComparedListCurrentMonth, ['057'])
    let sheetL = new sheet();
    for (let i=0; i < rosarioCustomListCurrentMonth.length; i++) {
        // Add Column Titles
        rosarioCustomListCurrentMonth[i].unshift(arrayTitulosMesActual[i]);
        rosarioCustomListCurrentMonth[i][0].push('ES NUEVO');
        rosarioCustomListLastMonth[i].unshift(arrayTitulosMesAnterior[i]);
        rosarioCustomListLastMonth[i][0].push('REGULARIZO');
        sheetL.addSheet(rosarioCustomListLastMonth[i], rosarioCustomListCurrentMonth[i], arrNombresArchivos[i][4]);
    }
    let fileSheet = sheetL.getSpreadSheetFile();
    let fileSheetBlob = new Blob([fileSheet], {type: "application/octet-stream"});
    download('SANLORENZO.xlsx', window.URL.createObjectURL(fileSheetBlob));
    console.log('Finalizado');
}
