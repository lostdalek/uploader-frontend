export var RiotEvents = { mount: "mount", unmount: "unmount", update: "update", updated: "updated" };

interface RiotSettings {
    brackets: string;
}

export interface RiotObservable {
    on(events: string,callback: Function);
    one(events: string,callback: Function);
    off(events: string);
    trigger(eventName: string, ...args);
}

export interface RiotRouter {
    (callback: Function);
    (to: string);

    start();
    stop();
    exec(callback: Function);
    parser(parser: Function);
}

export interface RiotObject {
    version: string;
    settings: RiotSettings;
    mount(customTagSelector: string,opts?: any): Array<RiotElement>;
    mount(selector: string,tagName: string,opts?: any): Array<RiotElement>;
    render(tagName: string,opts?: any): string;
    tag(tagName: string, html: string,css?: string,attrs?: string,constructor?: Function);
    tag(tagName: string, html: string, constructor?: Function);
    class(element: any): void;

    // TODO compiler and parser

    route: RiotRouter;
}



export class RiotElement implements RiotObservable{
    opts: any;
    parent: any;
    root: HTMLElement;
    tags: any;

    update(data?: any) { }
    unmount(keepTheParent?: boolean) { }
    on(eventName: string,fun: Function) { }
    one(eventName: string,fun: Function) { }
    off(events: string) {}
    trigger(eventName: string,...args) {}
}


declare var riot: RiotObject;
var riot: RiotObject = (<any>window).riot;
riot.class = function(element: any) {
    var tagName;
    var template: string;

    // gets string template, directly or via #id
    //console.log(element.prototype.template() )
    if(element.prototype.template !== undefined ) {
        template=element.prototype.template();
        if(template.charAt(0)=="#") {
            var elementId=template.substr(1);
            template=document.getElementById(elementId).innerHTML;
        }
    }
    else throw "template not specified";

    // gets tag name
    if(element.prototype.tagName !== undefined ) {
        tagName=element.prototype.tagName();
    }
    else throw "tagName property not specified";

    var transformFunction = function(opts) {

        if( element.prototype.bindTo !== undefined ) {

            console.log(element.prototype.bindTo());
            let bindable = element.prototype.bindTo();
            for (var key in element.prototype.bindTo()) {
                console.log(bindable[key])
                this[bindable[key]]=element.prototype[bindable[key]]
            }
        }

        element.apply(this,[opts]);
    };

    riot.tag(tagName,template,transformFunction);
};
export {riot};