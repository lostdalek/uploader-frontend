import {AppRouteDispatcher, AppRouter} from './router';

let appTemplate: string = require('../app.hbs');

class ApplicationModel extends Backbone.Model{
    name: string;
};

class RootLayoutView extends  Marionette.LayoutView<ApplicationModel> {
    regions = {
        head: '#head-container',
        main: '#main-container',
        foot: '#foot-container'
    };
    template = appTemplate; //'#layout-view-template';
    destroyImmediate = true;
    constructor(options?: any) {
        super(options);
        /*this.regions = {
            head: '#head-container',
            main: '#main-container',
            foot: '#foot-container'
        };*/

    }
}

export default class Application extends Marionette.Application {
    router: any;
    rootLayout: Marionette.LayoutView<ApplicationModel>;
    constructor( rootRegions) {
        super();
        this.addRegions(rootRegions);
        /*this.on('before:start', () => {

        });*/
        this.rootLayout = new RootLayoutView();
        this.router = new AppRouter({ controller: new AppRouteDispatcher() });
    }
    setRootLayout(rootRegion) {
        this.getRegion(rootRegion).show(this.rootLayout);
    }
}