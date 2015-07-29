/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="./app.d.ts" />
/// <reference path="../theme/client.config.ts" />
/// <reference path="./components/riot-ts.ts" />
/// <reference path="./polyfills/console.ts" />
import {Uploader} from './components/uploader/uploader';
import {riot, RiotObject, RiotEvents, RiotElement} from './components/riot-ts';
import {greetings, Person} from './components/greetings';
import {Timer} from './components/timer/timer';
import CollectionSelector from './components/collectionSelector';
import Application from './core/application';



riot.class(CollectionSelector);
riot.class(Timer); // wont work in IE8 with getter/setters
riot.mount('*');   // mounts all elements




var person = new Person("bert");
$(document).ready(function () {
    var message = greetings(person);
    $("#status")[0].innerHTML = message;

    new Uploader();
});

class NavModel extends Backbone.Model{
    name: string;
};

class NavBarItemView extends Marionette.ItemView<NavModel> {
    constructor(options?: any) { //  Backbone.ViewOptions<NavModel>
        if (!options)
            options = {};
        options.template = "#navBarItemViewTemplate";
        super(options);
    }
}





var uploaderApp = new Application({
    rootLayout: "#main-section"
});

uploaderApp.on('start', () => {
   // console.log('app has started', uploaderApp.mainRegion)
});


uploaderApp.on('before:start', () => {
    uploaderApp.setRootLayout('rootLayout');
    //uploaderApp.getRegion('main').show(uploaderApp.root)

});

uploaderApp.start();
