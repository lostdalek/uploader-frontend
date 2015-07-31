let appTemplate: string = require('./rootLayout.hbs');

export class RootLayoutModel extends Backbone.Model {
    name: string;
}

export class RootLayoutView extends  Marionette.LayoutView<RootLayoutModel> {
    /*regions(options: any) {

     return {
     head: '#head-container',
     main: '#main-container',
     foot: '#foot-container'
     }
     };*/
    template = appTemplate;
    destroyImmediate = true;
    constructor(options?: any) {
        super(options);

        this.addRegions({
            head: '#head-container',
            main: '#main-container',
            foot: '#foot-container'
        });
        /*this.regions = {
         head: '#head-container',
         main: '#main-container',
         foot: '#foot-container'
         };*/

    }

    onRender(): void {
        // super.onRender();
    }
}
