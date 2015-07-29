let appTemplate: string = require('../app.hbs');

class ApplicationModel extends Backbone.Model{
    name: string;
};

class RootView extends  Marionette.LayoutView<ApplicationModel> {
    template = appTemplate; //'#layout-view-template';
    destroyImmediate = true;
}

export default class Application extends Marionette.Application {
    root: Marionette.LayoutView<ApplicationModel>;
    constructor( rootRegions) {
        super();
        this.addRegions(rootRegions);
        /*this.on('before:start', () => {

        });*/
    }
    setRootLayout(rootRegion) {
        this.root = new RootView();
        this.getRegion(rootRegion).show(this.root);
    }
}