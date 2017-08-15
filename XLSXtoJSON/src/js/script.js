$(document).ready(function(){
    excelAPI.init('form', '.csvFile');
    var ex = excelAPI.ExcelToJSON();
    ex.then(function(data){
        console.table(data);
    }).catch(function(err){
        console.log(err);
    });
})