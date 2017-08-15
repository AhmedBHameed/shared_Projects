declare var $: any;
declare var callback: any;
export class IMModel{
    private static _instance = new IMModel();
    private url                : string;
    // private url                : string = 'https://filemanagerbackend.herokuapp.com/public/';
    private obj                : any = {
                                        type: null,
                                        url: null,
                                        origin: null,
                                        data: null
                                    };
    private static instance    : any;
    constructor(){
        if(IMModel._instance){
			throw new Error('The constructor is private, please use '+Object.getPrototypeOf(this)['constructor']['name']+'.getInstance() method.');
		}
		return IMModel._instance;
    }

    public static getInstance(){
        return IMModel._instance;        
    }
    public setUrl(url: string){
        this.url = url;
    }
    http(){
        return $.ajax({
                xhr         : ()=>{
                                    var xhr = new XMLHttpRequest();
                                    //     progressbar = $('.aside .progress-bar');
                                    // //Upload progress
                                    // xhr.upload.addEventListener("progress", (evt)=>{
                                    //     if(this.isFileUploading){
                                    //         if (evt.lengthComputable) {
                                    //         var percentComplete = Math.floor((evt.loaded / evt.total)*100)+'%';
                                    //         //Do something with upload progress
                                    //         progressbar.css('width', percentComplete).text(percentComplete);
                                    //         if(percentComplete == '100%'){
                                    //             progressbar.parent().hide(500);
                                    //             this.isFileUploading = false;
                                    //         }
                                    //     }
                                    // }
                                    // }, false);
                                    // //Download progress
                                    // xhr.addEventListener("progress", (evt)=>{
                                    // if (evt.lengthComputable) {
                                    //     var percentComplete = evt.loaded / evt.total;
                                    //     //Do something with download progress
                                    //     // console.log(percentComplete);
                                    // }
                                    // }, false);
                                    return xhr;
                                },
                type        : this.obj['type'],
                beforeSend  :   (xhr:any)=>{
                                    // xhr.setRequestHeader( "Accept", "application/json" );
                                    // xhr.setRequestHeader( "content-Type", 'application/json; charset=utf-8',);
                                    // xhr.setRequestHeader( "Origin", obj['origin'] );
                                },
                url         : this.obj['url'],
                data        : this.obj['data'],
                dataType    : 'json'
                // success     : (data)=>{ this.json = data },
                // fail        : (err)=>{ this.error = err; }
            });
    }
    subscribe( response:any, error:any){
        let res = this.http();
        res.done(response);
        res.fail(error);
    }
    private requestOptions(page:any, requestType:any,  data:any){
        if(requestType == 'Post'){
            this.obj = {
                type: requestType,
                url: this.url,
                // origin: 'http://localhost:9000',
                data: JSON.stringify(data)
            };
        }else{
            this.obj = {
                type: requestType,
                url: this.url,
                // origin: 'http://localhost:9000'
            };
        }
    }
    checkURL(){
        return (this.url != null || this.url != undefined || this.url != '') ? true : false;
    }
    post(query:any=null, json:any){
        if(this.checkURL){
            this.requestOptions(query, 'Post', json);
            return this;
        }else{
            throw new Error('Please set URL first. It must not be empty or null');
        }
    }
    get(query: any=null){
        if(this.checkURL){
            this.requestOptions(query, 'Get', null);
            return this;
        }else{
            throw new Error('Please set URL first. It must not be empty or null');
        }
    }
};