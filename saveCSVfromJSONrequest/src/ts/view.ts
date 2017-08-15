declare var $: any;
export class IMView{
    private static _instance = new IMView();

    constructor(){
        if(IMView._instance){
			throw new Error('The constructor is private, please use '+Object.getPrototypeOf(this)['constructor']['name']+'.getInstance() method.');
		}
        this.onInit();
		return IMView._instance;
    }

    public static getInstance(){
        return IMView._instance;  
    }
    onInit(){
        
    }
};