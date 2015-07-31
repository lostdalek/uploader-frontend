/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="./app.d.ts" />
/// <reference path="../theme/client.config.ts" />

import Application from './core/application';
import radioChannels from './core/radioChannels';

import HomeView from './components/home';
import NavBladeItemView from './components/navblade/navblade';
import {UploaderApi} from './components/uploader/api';

class NavModel extends Backbone.Model{
    name: string;
};

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
});

let uploader;

uploaderApp.on('before:start', () => {
    uploaderApp.setRootLayout('rootLayout');
    Backbone.history.start({pushState: false});
    // uploaderApp.getRegion('main').show(uploaderApp.root)
});

uploaderApp.on('start', () => {
    uploader = uploaderApp.registerComponent( new UploaderApi() );

    // attach root Layout
    uploaderApp.rootLayout.render();
    uploaderApp.rootLayout.getRegion('head').show(new NavBladeItemView());
    uploaderApp.rootLayout.getRegion('main').show(new HomeView());
    // uploaderApp.rootLayout.getRegion('foot').show(new NavBladeItemView());
});

//
// handle main layout routing: @TODO move into an app API and implement uploaderApp.registerAppRoute() / mainComponent
//

radioChannels.router.on('route:getHomePage', () => {
    uploaderApp.rootLayout.getRegion('main').show( new HomeView());
    uploaderApp.rootLayout.getRegion('head').show(new NavBladeItemView());
});

radioChannels.router.on('route:getUploadPage', () => {
    uploaderApp.rootLayout.getRegion('head').show(new NavBladeItemView());
    uploaderApp.rootLayout.getRegion('main').show(uploader.getLayout(true));
});

// finally start:
$(document).ready(function () {
    uploaderApp.start();
});
