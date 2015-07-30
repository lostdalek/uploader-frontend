let layoutTemplate: string = require('./uploaderLayout.hbs');

export class UploadLayoutModel extends Backbone.Model{
    name: string;
};

export default class UploadLayoutView extends  Marionette.LayoutView<UploadLayoutModel> {
    template = layoutTemplate; //'#layout-view-template';
    destroyImmediate = true;
    constructor(options?: any) {
        super(options);

        this.addRegions({
            uploader: '#upload-container',
            records: '#record-container'
        });

    }
}