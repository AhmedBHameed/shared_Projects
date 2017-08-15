"use strict";
declare var require: any;
// const css = require('./../sass/tree.scss');
// const fancyboxjs = require('./../fancybox-3.0/dist/jquery.fancybox.min.js');

declare var window:any;
import { IMModel }  from './model';
// import { IMView }  from './view';
import { controler } from './control';
import { Injector }  from './Injector';

window.onload = ()=>{
    console.clear();
    var DI = Injector.getInstance();
    DI.register('IMModel', IMModel);
    // DI.register('IMView', IMView);
    window.ahmedAPI = DI.process(controler);
    window.ahmedAPI.setUrl('https://route.cit.api.here.com/routing/7.2/calculateroute.json?waypoint0=53.5533%2C10.0017&waypoint1=48.1424%2C11.5547&mode=fastest%3Bcar%3Btraffic%3Adisabled&routeattributes=no%2Csh%2Cwp&maneuverattributes=di%2Csh%2Csq%2Cti%2Ctm%2Ctt%2Cwt&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&departure=now');
	window.ahmedAPI.getJSON("response/route/0/shape");
}
