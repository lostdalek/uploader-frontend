/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="./app.d.ts" />
/// <reference path="../theme/client.config.ts" />
/// <reference path="./polyfills/console.ts" />
import {Uploader} from './components/uploader/uploader';
import Application from './core/application';
import radioChannels from './core/radioChannels';

import HomeView from './components/home';
import NavBladeItemView from './components/navblade/navblade'
import {UploaderApi} from './components/uploader/api';


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

let uploader;

uploaderApp.on('before:start', () => {
    uploaderApp.setRootLayout('rootLayout');
    Backbone.history.start({pushState: false});
    //uploaderApp.getRegion('main').show(uploaderApp.root)
});
uploaderApp.on('start', () => {
    uploader = uploaderApp.registerComponent( new UploaderApi() );

    // attach root Layout
    uploaderApp.rootLayout.render();
    uploaderApp.rootLayout.getRegion('head').show(new NavBladeItemView());
    uploaderApp.rootLayout.getRegion('main').show(new HomeView());
    uploaderApp.rootLayout.getRegion('foot').show(new NavBladeItemView());
});

//
// handle main layout routing: @TODO move into an app API and implement uploaderApp.registerAppRoute() / mainComponent
//

radioChannels.router.on('route:getHomePage', () => {
   console.log('seems like a route has been triggered')
    uploaderApp.rootLayout.getRegion('main').show( new HomeView());
    uploaderApp.rootLayout.getRegion('head').show(new NavBladeItemView());
});

radioChannels.router.on('route:getUploadPage', () => {
    //let uploader = new UploaderApi();
    console.log('seems like a route has been triggered')
    uploaderApp.rootLayout.getRegion('main').show(uploader.getLayout());
    uploaderApp.rootLayout.getRegion('head').show(new HomeView());
});

// finally start:
uploaderApp.start();

export {uploaderApp};