import AnimatedRegion from '../animatedRegion/animatedRegion';
let layoutTemplate: string = require('./uploaderLayout.hbs');

export class UploadLayoutModel extends Backbone.Model{
    name: string;
};

export default class UploadLayoutView extends  Marionette.LayoutView<UploadLayoutModel> {
    options;
    template;
    destroyImmediate;
    regionClass;
    constructor(options?: any) {
        this.regionClass = AnimatedRegion;
        this.destroyImmediate = true;
        this.template = layoutTemplate;
        super(options);

        if ( this.model === undefined ) {
            this.model = new UploadLayoutModel({
                layoutTitle: options.globalConfig.lang.t('app.uploader.title')
            });
        }
        this.addRegions({
            uploader: {
                selector: '#upload-container',
                animationType: 'zoomIn'
            },
            recordSet: {
                selector: '#collection-container'
            },
            uploadedFiles: {
                selector: '#uploaded-files-container'
            }
        });

        this.render();
    }
}
