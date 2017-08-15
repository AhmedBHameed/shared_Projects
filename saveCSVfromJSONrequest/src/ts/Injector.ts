export class Injector{
    private static _instance = new Injector();
    private dependencies:any = {};
    constructor(){
        if(Injector._instance){
			throw new Error('The constructor is private, please use '+Object.getPrototypeOf(this)['constructor']['name']+'.getInstance() method.');
		}
		return Injector._instance;
    }

    public static getInstance(){
        return Injector._instance;        
    }
    process(target:any){
        let mainFun:any = null,
            main:any = ()=>{},
            // FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
            // FN_ARG_SPLIT = /,/,
            // FN_ARG = /^\s*(_?)(\S+?)\1\s*$/,
            // STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
            // text = target[2].toString(),
            // args = text.match(FN_ARGS)[1].replace(/\s/g, '').split(',');
            args:Array<string> = [],
            container:Array<any> = Object.keys(this.dependencies).join(',').split(',').concat(target);

        for(let key in container){
            if(typeof container[key] != 'function'){
                args.push(container[key]);
            }else{
                mainFun = container[key];
                break;
            }
        }
        // console.log(args, mainFun);
        
        main.prototype = mainFun.prototype;
        var instance = new main();
        main.prototype.constructor.apply(instance, this.getDependencies(args) );
        return instance;
    }
    getDependencies(arr:any){        
        return arr.map( (value:any)=>{
            return this.dependencies[value];
        });            
    }
    register(name:any, module:any){
        this.dependencies[name] = module.getInstance();        
    }

};