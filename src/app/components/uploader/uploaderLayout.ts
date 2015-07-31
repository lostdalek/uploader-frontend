import AnimatedRegion from '../animatedRegion/animatedRegion';
let layoutTemplate: string = require('./uploaderLayout.hbs');

export class UploadLayoutModel extends Backbone.Model{
    name: string;
};

export default class UploadLayoutView extends  Marionette.LayoutView<UploadLayoutModel> {
    template;
    destroyImmediate;
    regionClass;
    constructor(options?: any) {
        // options.template = layoutTemplate;
        this.regionClass = AnimatedRegion;
        this.destroyImmediate = true;
        this.template = layoutTemplate;
        super(options);
        this.addRegions({
            uploader: {
                selector: '#upload-container',
                regionType: AnimatedRegion
            },
            recordSet: {
                selector: '#collection-container',
                regionType: AnimatedRegion
            },
            uploadedFiles: {
                selector: '#uploaded-files-container',
                regionType: AnimatedRegion
            }
        });
        // this.addRegion('uploadedFiles', AnimatedRegion)

    }
}
