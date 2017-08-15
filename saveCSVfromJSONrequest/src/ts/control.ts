declare var $: any, window: any,top:any;

export let controler = class IMControl{
    model:any;
    // view:any;
    constructor(IMModel:any ){
        this.model = IMModel;
        // this.view = IMView;
    }
    setUrl(url:string){
        this.model.setUrl(url);
    }
    searchInObject(arrgument:any, theObject:any): any{
        if(arrgument == null || arrgument == '') return theObject;
        var result = null,
        args = arrgument.split('/');
        if(args[0] == ""){
            return theObject;
        }
        if(theObject instanceof Array) {
            for(var i = 0; i < theObject.length; i++) {
                if(Object.keys(theObject).indexOf(args[0]) > -1){
                    args.splice(0,1);
                    result = this.searchInObject(args.join('/'), theObject[i] ) ;
                }else{
                    result = this.searchInObject(args.join('/'), theObject[i] );
                }
            }
        }else{
            for(let key in theObject){        
                if(key != args[0]) continue;
                if(key == args[0]){
                    args.splice(0,1);
                    result = this.searchInObject(args.join('/'), theObject[key] ) ;
                }
            }
        }
        return result;
    }
    provideLink(filename:string, data:any, type:any){
        var data,url,blob;
        blob = new Blob(["\ufeff",data.join()], {type: "text/plain"});
        url = window.URL.createObjectURL(blob);
        var ele = document.createElement('a');
        ele.className = 'ancher';
        ele.href = url;
        ele.download = filename+'.'+type;
        ele.click();
    }
    getJSON(search:string){
        this.model.get().subscribe(
            (json:any)=>{
                let data = this.searchInObject(search, json);
                if(!Array.isArray(data)){
                    throw new Error('Data provided is not type of array. Please correct the search arrguments or the url');
                }                
                this.provideLink('file'+(new Date().getTime()).toString().substr(-6), data, 'csv');
            },
            (err:any)=>{
                console.log(err['responseJSON']);
            }
        )
    }
};