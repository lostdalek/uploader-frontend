import radioChannels from '../../core/radioChannels';
import UploadLayoutView from './uploaderLayout';
import HomeView from '../home';
import UploadFormView from './uploadFormView';

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
    layoutInstance: UploadLayoutView;
    channels = {
        route: {

        }
    };
    constructor() {
        console.log('trigger new instance')
        this.getLayout(true).render();

        radioChannels.router.on('route:getUploadPage', () => {
            /*
            console.log('uploader API: route:getUploadPage')

            //this.getLayout(true).render();
            //this.getLayout().getRegion('uploader').show(new UploadFormView())


            // this.getLayout(true).render();
            console.log('region is up?', this.getLayout().getRegion('uploader'))
            let uploaderRegion = this.getLayout().getRegion('uploader'),
                uploadForm = new UploadFormView();
            uploaderRegion.show(uploadForm);
            uploadForm.render();
            */
            //this.getLayout(true).render();
            console.log('old instance', this.getLayout())
            this.getLayout().getRegion('uploader').show(new UploadFormView());
        });

        radioChannels.router.on('route:uploader:getDefaultPage', () => {
            console.log('uploader API: route:uploader:getDefaultPage')
            // uploaderApp.rootLayout.getRegion('main').show(new NavBladeItemView());
            // uploaderApp.rootLayout.getRegion('head').show(new HomeView());
            this.getLayout().getRegion('uploader').show(new UploadFormView());
        });
    }

    getLayout(forceNew?: boolean): UploadLayoutView {
        if( this.layoutInstance instanceof UploadLayoutView && forceNew !== true) {
            console.log('alreday instance')
            return this.layoutInstance;
        }
        return this.layoutInstance = new UploadLayoutView();
    }

    getRouteDispatcher() {
        return new UploaderRouteDispatcher();
    }

    getRoutes() {
        return {
            "uploader/default": "getDefaultPage"
        }
    }
}

export {UploaderApi};