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

    resultNotDidItData = arrayCrudoMesAnterior[0].filter(x => {
        for (let items of arrayCrudoMesActual[0]) {
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
    let counter = 0;
    arrayRawLastMonth.forEach(x => {
        for (let items of arrayRawCurrentMonth) {
            if (items.includes(x[recordColumnIndex])) {
                x.push('NO');
                return;
            }
        }
        counter += 1;
        x.push('SI');
    })
    console.log('Se regularizaron %s registros', counter)
    return { arrayRawLastMonth, counter }
}

function getNewData(arrayRawLastMonth, arrayRawCurrentMonth, recordColumnIndex) {
    console.log('Analizando registros nuevos');
    let counter = 0;
    arrayRawCurrentMonth.forEach(x => {
        for (let items of arrayRawLastMonth) {
            if (items.includes(x[recordColumnIndex])) {
                x.push('NO');
                return;
            }
        }
        counter += 1 ;
        x.push('SI');
    })
    console.log('Hay %s registros nuevos', counter);
    return {arrayRawCurrentMonth, counter};
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
function processData(arrayRawLastMonth, arrayRawCurrentMonth) {

    // Get raw array a filter customs
    let arrCustomFilteredListLastMonth = filterCustoms(arrayRawLastMonth);
    let arrCustomFilteredListCurrentMonth = filterCustoms(arrayRawCurrentMonth);

    // Compara lists
    let arrComparedListLastMonth = [];
    let arrComparedListCurrentMonth = [];
    for (let i=0; i < arrCustomFilteredListCurrentMonth.length; i++) {
    // for (let i = 1; i < 4; i++) {
        arrComparedListCurrentMonth.push(getNewData(arrCustomFilteredListLastMonth[i],
            arrCustomFilteredListCurrentMonth[i], arrRecordColumnIndex[i]).arrayRawCurrentMonth);
        arrComparedListLastMonth.push(getDidItData(arrCustomFilteredListLastMonth[i],
            arrCustomFilteredListCurrentMonth[i],
            arrRecordColumnIndex[i]).arrayRawLastMonth);
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
function processDataByCustom(arrayRawLastMonth, arrayRawCurrentMonth, arrayCustom, customName) {

    // Get raw array a filter customs
    let arrCustomFilteredListLastMonth = filterCustoms(arrayRawLastMonth, arrayCustom);
    let arrCustomFilteredListCurrentMonth = filterCustoms(arrayRawCurrentMonth, arrayCustom);

    // Compara lists
    let arrComparedListLastMonth = [];
    let arrComparedListCurrentMonth = [];
    let arrStatistics = []
    for (let i=0; i < arrCustomFilteredListCurrentMonth.length; i++) {
    // for (let i = 1; i < 4; i++) {
        arrStatistics.push([arrNombresArchivos[i][4]]);

        let value = getNewData(arrCustomFilteredListLastMonth[i], arrCustomFilteredListCurrentMonth[i], arrRecordColumnIndex[i])
        if(value.arrayRawCurrentMonth.length !== 0) {
            arrComparedListCurrentMonth.push(value.arrayRawCurrentMonth);
            arrStatistics.push(["Total registros mes actual:", value.arrayRawCurrentMonth.length])
            arrStatistics.push(["Nuevos registros:", value.counter]);
            console.log('THIS IS COUNTER %s', value.counter);
        }

        value = getDidItData(arrCustomFilteredListLastMonth[i], arrCustomFilteredListCurrentMonth[i], arrRecordColumnIndex[i])
        if(value.arrayRawLastMonth.length !== 0) {
            arrComparedListLastMonth.push(value.arrayRawLastMonth);
            arrStatistics.push(["Total registros mes anterior:", value.arrayRawLastMonth.length])
            arrStatistics.push(["Registros regularizados:", value.counter]);
        }
        arrStatistics.push([]);


    }

    // let rosarioCustomListLastMonth = filterCustoms(arrComparedListLastMonth, ['057'])
    // let rosarioCustomListCurrentMonth = filterCustoms(arrComparedListCurrentMonth, ['057'])
    let sheetL = new sheet();
    for (let i=0; i < arrComparedListCurrentMonth.length; i++) {
        // Add Column Titles
        arrComparedListCurrentMonth[i].unshift(arrayTitulosMesActual[i]);
        arrComparedListCurrentMonth[i][0].push('ES NUEVO');
        arrComparedListLastMonth[i].unshift(arrayTitulosMesAnterior[i]);
        arrComparedListLastMonth[i][0].push('REGULARIZO');
        sheetL.addSheet(arrComparedListLastMonth[i], arrComparedListCurrentMonth[i], arrNombresArchivos[i][4]);
    }
    sheetL.addStatisticsSheet(arrStatistics);

    // sheetL.makeSomeStatics();
    let fileSheet = sheetL.getSpreadSheetFile();
    let fileSheetBlob = new Blob([fileSheet], {type: "application/octet-stream"});
    download(customName+'.xlsx', window.URL.createObjectURL(fileSheetBlob));
    console.log('Finalizado');
}

function computeCustom(){
    let customSelect = document.getElementById('customSelect');
    let custom = customSelect.value;
    let customName = customSelect[customSelect.selectedIndex].label;
    processDataByCustom(arrayCrudoMesAnterior, arrayCrudoMesActual, [custom], customName);
}