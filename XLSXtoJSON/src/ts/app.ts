"use strict";
declare var require: any;
// const css = require('./../sass/tree.scss');
// const fancyboxjs = require('./../fancybox-3.0/dist/jquery.fancybox.min.js');

declare var window:any;
// import { IMModel }  from './model';
// import { IMView }  from './view';
import { controler } from './control';
import { Injector }  from './Injector';

window.onload = ()=>{
    var DI = Injector.getInstance();
    // DI.register('IMModel', IMModel);
    // DI.register('IMView', IMView);
    window.excelAPI = DI.process(controler);
}

