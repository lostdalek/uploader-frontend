/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="./app.d.ts" />
/// <reference path="../theme/client.config.ts" />
/// <reference path="./polyfills/console.ts" />
import {Uploader} from './components/uploader/uploader';
import Application from './core/application';

import HomeView from './components/home';
import NavBladeItemView from './components/navblade/navblade'



$(document).ready(function () {
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


let uploaderApp = new Application({
    rootLayout: "#application-container"
});
//uploaderApp.router = new AppRouter({ controller: new AppRouteDispatcher() });

uploaderApp.on("initialize:after", function(){
    // Start Backbone history a necessary step for bookmarkable URL's
    console.log('history started')
    Backbone.history.start();
});
uploaderApp.on('before:start', () => {
    uploaderApp.setRootLayout('rootLayout');
    // initialize the router

    Backbone.history.start();
    console.log('yep done')
    //uploaderApp.getRegion('main').show(uploaderApp.root)
});
uploaderApp.on('start', () => {
    //console.log('app has started', uploaderApp.mainRegion)
    //uploaderApp.getRegion('rootLayout'); //.render(); //.show( new NavBladeItemView());

    // attach root Layout


    uploaderApp.rootLayout.render();
    console.log('head region:', uploaderApp.rootLayout);

    //uploaderApp.rootLayout.head.show(new NavBladeItemView());
    // HomeView

});


// finally start:
uploaderApp.start();