$(document).ready(function(){
    excelAPI.init('form', '.csvFile');
    var ex = excelAPI.ExcelToJSON();
    ex.then(function(data){
        console.table(JSON.parse(data));
    }).catch(function(err){
        console.log(err);
    });
})