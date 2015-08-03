/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="./definitions/definitions.d.ts" />
/// <reference path="../theme/client.config.ts" />

import Application from './core/application';
import radioChannels from './core/radioChannels';

import HomeView from './components/mainLayout/home';
import NavBladeItemView from './components/navblade/navblade';
import {UploaderApi} from './components/uploader/api';
import {MainLayoutView} from './components/mainLayout/mainLayout';

class NavModel extends Backbone.Model{
    name: string;
}

class NavBarItemView extends Marionette.ItemView<NavModel> {
    constructor(options?: any) {
        if (!options) {
            options = {};
        }
        options.template = '#navBarItemViewTemplate';
        super(options);
    }
}


let uploaderApp = new Application({
    rootLayout: '#application-container'
}, new MainLayoutView());




let mainLayout, uploader;

uploaderApp.on('before:start', () => {
    uploaderApp.setRootLayout('rootLayout');
    Backbone.history.start({pushState: false});
    // uploaderApp.getRegion('main').show(uploaderApp.root)
});

uploaderApp.on('start', () => {

    // attach root Layout
    uploaderApp.rootLayout.render();
    // display default navblade view:
    uploaderApp.rootLayout.getRegion('head').show(new NavBladeItemView());

    // root layout must be ready before component registration
    uploaderApp.registerComponent( new UploaderApi({
        parentRegion: uploaderApp.rootLayout.getRegion('main')
    }) );
    // display default uploader view:
    //uploaderApp.rootLayout.getRegion('main').show(uploader.getUploaderLayout(true));
    // uploaderApp.rootLayout.getRegion('head').show(new NavBladeItemView());
    // uploaderApp.rootLayout.getRegion('main').show(new HomeView());
    // uploaderApp.rootLayout.getRegion('foot').show(new NavBladeItemView());
    //
    // handle main layout routing: @TODO move into an app API and implement uploaderApp.registerAppRoute() / mainComponent
    //
    /*radioChannels.router.on('route:uploader:initialize', () => {
        console.log('INITIALIZE UPLOADER')
        uploaderApp.rootLayout.getRegion('main').show(uploader.getUploaderLayout());
    });*/
});


/*radioChannels.router.on('route:getHomePage', () => {
    // uploaderApp.rootLayout.getRegion('main').show( new HomeView());
    // uploaderApp.rootLayout.getRegion('head').show(new NavBladeItemView());
    // uploaderApp.rootLayout.getRegion('head').show(new NavBladeItemView());
    uploaderApp.rootLayout.getRegion('main').show(uploader.getUploaderLayout(true));
});*/

/*radioChannels.router.on('route:getUploadPage', () => {
    // reload uploader view on navigation
    uploaderApp.rootLayout.getRegion('main').show(uploader.getUploaderLayout(true));
});*/

// finally start:
$(document).ready(function () {
       uploaderApp.startWhenReady();
});
