import radioChannels from '../../core/radioChannels';
import CollectionManagerView from '../collectionManager/collectionManagerView';
import UploadLayoutView from './uploaderLayout';
import UploadFormView from './views/uploadFormView';
import FileCollectionView from './views/uploadFileCollectionView';
import * as entities from '../../entities/entities';

class UploaderRouteDispatcher extends Marionette.Object {
    uploaderDefaultRoute() {
        radioChannels.router.trigger('route:uploader:initialize');
    }
}

class UploaderApi {
    options: any;
    identifier: string = 'uploaderApi';
    globalConfig;
    uploadFileCollection: entities.UploadFileCollection;
    recordSetCollection: entities.RecordSetCollection;
    layoutInstance: UploadLayoutView;
    channels = {
        route: {

        }
    };
    constructor(options) {
        this.options = _.extend(this.options, options);

        // initialize and render uploader layout:
        // init models and collections
        this.uploadFileCollection = new entities.UploadFileCollection();
        this.recordSetCollection = new entities.RecordSetCollection();
        this.globalConfig = radioChannels.config.request('all');

        // register global app route listener
        radioChannels.router.on('route:uploader:initialize', () => {
            this.initializeChildren();
        });

        radioChannels.router.on('route:getUploadPage', () => {
            this.initializeChildren();
        });

        // console.log(this.globalConfig.lang.t('app.name'))

        // create a new layout instance
        this.getUploaderLayout(true); //.render();
        // attach instance to parent
        options.parentRegion.show(this.getUploaderLayout());
        // initialize children regions
        // this.getUploaderLayout().render();
        this.initializeChildren();
    }

    getUploaderLayout(forceNew?: boolean): UploadLayoutView {
        if ( this.layoutInstance instanceof UploadLayoutView && forceNew !== true) {
            return this.layoutInstance;
        }
        return this.layoutInstance = new UploadLayoutView({
            globalConfig: this.globalConfig,
            uploadFileCollection: this.uploadFileCollection
        });
    }

    getRouteDispatcher() {
        return new UploaderRouteDispatcher();
    }

    getRoutes() {
        return {
            'uploader/default': 'uploaderDefaultRoute'
        };
    }

    initializeChildren() {
        this.getUploaderLayout().getRegion('uploader').show(new UploadFormView({
            globalConfig: this.globalConfig,
            uploadFileCollection: this.uploadFileCollection
        }));
        this.getUploaderLayout().getRegion('recordSet').show(new CollectionManagerView({
            globalConfig: this.globalConfig
        }));

        this.getUploaderLayout().getRegion('uploadedFiles').show(new FileCollectionView({
            globalConfig: this.globalConfig,
            collection:  this.uploadFileCollection
        }));
    }
}

export {UploaderApi};
