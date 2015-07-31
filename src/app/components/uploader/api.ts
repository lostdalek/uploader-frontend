import radioChannels from '../../core/radioChannels';
import CollectionManagerView from '../collectionManager/collectionManagerView';
import UploadLayoutView from './uploaderLayout';
import UploadFormView from './views/uploadFormView';
import FileCollectionView from './views/uploadFileCollectionView';
import * as entities from '../../entities/entities';

class UploaderRouteDispatcher extends Marionette.Object {
    getDefaultPage() {
        console.log('Uploader API > dispatch: get default');
        radioChannels.router.trigger('route:uploader:getDefaultPage');
    }
    getHomePage() {
        radioChannels.router.trigger('route:getHomePage');
    }
    getUploadPage() {
        radioChannels.router.trigger('route:getUploadPage');
    }
}

class UploaderApi {
    identifier: string = 'uploaderApi';
    uploadFileCollection: entities.UploadFileCollection;
    recordSetCollection: entities.RecordSetCollection;
    layoutInstance: UploadLayoutView;
    channels = {
        route: {

        }
    };
    constructor() {
        this.getLayout(true).render();

        // init models and collections
        this.uploadFileCollection = new entities.UploadFileCollection();
        this.recordSetCollection = new entities.RecordSetCollection();



        radioChannels.router.on('route:getUploadPage', () => {
            this.initialize();
            // this.getLayout().getRegion('uploader').show(new UploadFormView());
            // this.getLayout().getRegion('collectionManager').show(new CollectionManagerView());
        });

        radioChannels.router.on('route:uploader:getDefaultPage', () => {
            this.initialize();
            // this.getLayout().getRegion('uploader').show(new UploadFormView());
            // this.getLayout().getRegion('collectionManager').show(new CollectionManagerView());

        });
    }

    getLayout(forceNew?: boolean): UploadLayoutView {
        if ( this.layoutInstance instanceof UploadLayoutView && forceNew !== true) {
            return this.layoutInstance;
        }
        return this.layoutInstance = new UploadLayoutView();
    }

    getRouteDispatcher() {
        return new UploaderRouteDispatcher();
    }

    getRoutes() {
        return {
            'uploader/default': 'getDefaultPage'
        };
    }

    initialize() {
        this.getLayout().getRegion('uploader').show(new UploadFormView({
            uploadFileCollection: this.uploadFileCollection
        }));
        this.getLayout().getRegion('recordSet').show(new CollectionManagerView());

        this.getLayout().getRegion('uploadedFiles').show(new FileCollectionView({
            collection:  this.uploadFileCollection
        }));

    }
}

export {UploaderApi};
