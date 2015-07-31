import {UploadFileCollection, UploadFileModel} from '../../../entities/uploadFile';
let FileCollectionTemplate: string = require('./uploadFileCollectionView.hbs');
let FileItemTemplate: string = require('./uploadFileItemView.hbs');

class FileModel extends Backbone.Model {
    // name: string;
}
class FileItemView extends Marionette.ItemView<UploadFileModel> {
    public tagName;
    public template;

    constructor(options?: any) {
        options.tagName = 'tr';
        options.template = FileItemTemplate;
        super(options);
    }

    initialize() {
        this.listenTo(this.model, 'change', this.render);
    }
}

export default class FileCollectionView extends Marionette.CompositeView<FileModel> {
    public model: Backbone.Model;
    public collection: UploadFileCollection;
    public childView;
    public childViewContainer;
    public template;

    constructor(options?: any) {
        if (!options) {
            options = {};
        }
        options.childView = FileItemView;
        options.childViewContainer = 'tbody';
        options.template = FileCollectionTemplate;
        super(options);

        this.model = new Backbone.Model({uploadProgress: 0});
        this.ui = {
            collectionSelector: '#collection-selector'
        };

    }
    initialize() {
        // this.listenTo(this.model, 'change:uploadProgress', this.render);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'change', this.onCollectionChanged);
    }

    onCollectionChanged() {
        this.model.set('uploadProgress', this.collection.getUploadProgress());

        // @TODO - not very optimum way, the whole view is re-rendered
        this.render(); // @TODO use https://github.com/theironcook/Backbone.ModelBinder
    }
}
