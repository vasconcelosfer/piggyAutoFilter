const BOOK_TYPE = 'xlsx';
const OUTPUT_TYPE = 'array';

const LAST_MONTH = 'Anterior';
const CURRENT_MONTH = 'Actual';

const WORKBOOK_TITLE_NAME = 'ADUANA';
const AUTHOR_SHEET_NAME = 'AFIP';

class sheet {
    constructor() {
        this.workSheet = XLSX.utils.book_new();
        this.workSheet.Props = {
            Title: WORKBOOK_TITLE_NAME,
            Author: AUTHOR_SHEET_NAME,
            CreatedDate: new Date().getFullYear()
        };
    }

    addSheet(arrayLastMonth, arrayCurrentMonth, sheetName, lastMonth = LAST_MONTH, currentMonth = CURRENT_MONTH) {
        // Add sheets
        // let lastMonthSheetName = lastMonth.concat(' ',sheetName).substring(0, 30);
        // let currentMonthSheetName = currentMonth.concat(' ',sheetName).substring(0, 30);
        // this.workSheet.SheetNames.push(lastMonthSheetName);
        // this.workSheet.SheetNames.push(currentMonthSheetName);

        // Convert array to spreadsheet data
        let lastMonthXLSXData = XLSX.utils.aoa_to_sheet(arrayLastMonth);
        let currentMonthXLSXData = XLSX.utils.aoa_to_sheet(arrayCurrentMonth);

        // this.workSheet.Sheets[lastMonthSheetName] = lastMonthXLSXData;
        // this.workSheet.Sheets[currentMonthSheetName] = currentMonthXLSXData;
        XLSX.utils.book_append_sheet(this.workSheet, lastMonthXLSXData, lastMonth.concat(' ',sheetName).substring(0, 30));
        XLSX.utils.book_append_sheet(this.workSheet, currentMonthXLSXData, currentMonth.concat(' ',sheetName).substring(0,30));
    }

    addStatisticsSheet(arrStatistics){

        let statisticsXLSXData = XLSX.utils.aoa_to_sheet(arrStatistics);
        XLSX.utils.book_append_sheet(this.workSheet, statisticsXLSXData, "estadisticas");
    }

    makeSomeStatics() {
        let statisticsArray = [];
        this.workSheet.SheetNames.forEach(sheetName => {
            let currentSheet = this.workSheet.Sheets[sheetName];
            let range = XLSX.utils.decode_range(currentSheet['!ref']);
            let lastColumnAddr = XLSX.utils.encode_cell({c: range.e.c, r:0});
            let lastColumnHeader = currentSheet[lastColumnAddr];
            if (lastColumnHeader.v === 'REGULARIZO'){
                console.log("Agregamos regularizar");
                let formula = "COUNTIF($'Actual EXPORTACIONES CON DIFER'.G1:G27, SI)";
                statisticsArray.push(['first', {f:formula}])
            }else{
                console.log("Es nuevo")
            }
        })

        let statisticsXLSXData = XLSX.utils.aoa_to_sheet(statisticsArray);
        XLSX.utils.book_append_sheet(this.workSheet, statisticsXLSXData, 'ESTADISTICA');
        // XLSX.utils.book_append_sheet(this.workSheet, )
    }

    getSpreadSheetFile(){
        return XLSX.write(this.workSheet, {bookType: BOOK_TYPE, type: OUTPUT_TYPE});
    }
}