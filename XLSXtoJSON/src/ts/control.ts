
declare var $:any, window:any, XLSX: any, Promise: any;

export let controler = class IMControl {
    model: any;
    view: any;

    file: any;
    form: any;
    constructor() {
        // this.model = IMModel;
        // this.view = IMView;
    }

    init(form: any, inputFile: any) {
        if (!window['$']) {
            throw new Error('Jquery is not found!');
        }
        this.form = (typeof form == 'object') ? form : $(form);
        this.file = (typeof inputFile == 'object') ? inputFile : this.form.find(inputFile);
    }
    // remove() {
    //     this.form.off('submit', () => {
    //         this.ExcelToJSON(this.file[0].files[0]);
    //         return false;
    //     });
    // }
    ExcelToJSON(): any {
        if (!this.file) {
            throw new Error("please initialize your form first using init method");
        }
        return new Promise((resolve: any, reject: any) => {
            let xlsx = window.XLSX;
            this.form.on('submit', (e: any) => {
                e.preventDefault();
                e.stopPropagation();
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    let data = e.target.result;
                    let workbook = xlsx.read(data, {type: 'binary'});

                    workbook.SheetNames.forEach((sheetName: any) => {
                        // Here is your object
                        var XL_row_object = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify(XL_row_object);
                        resolve(json_object);

                    });

                };

                reader.onerror = function (ex) {
                    reject(ex);
                };
                reader.readAsBinaryString(this.file[0].files[0]);
            });
        });

    }

};