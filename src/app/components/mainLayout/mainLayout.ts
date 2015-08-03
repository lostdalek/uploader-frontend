import AnimatedRegion from '../animatedRegion/animatedRegion';
let layoutTemplate: string = require('./mainLayout.hbs');

export class MainLayoutModel extends Backbone.Model{
}

class MainLayoutView extends  Marionette.LayoutView<MainLayoutModel> {
    template;
    destroyImmediate;
    regionClass;
    constructor(options?: any) {
        this.regionClass = AnimatedRegion;
        this.destroyImmediate = true;
        this.template = layoutTemplate;
        super(options);
        this.addRegions({
            head: {
                selector: '#head-container'
            },
            main: {
                selector: '#main-container',
                animationType: 'slideInUp'
            },
            foot: {
                selector: '#foot-container',
                animationType: 'slideInUp'
            }
        });
    }
}

export {MainLayoutView};