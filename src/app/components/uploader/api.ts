import radioChannels from '../../core/radioChannels';
import UploadLayoutView from './uploaderLayout';
import HomeView from '../home';

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


        radioChannels.router.on('route:getUploadPage', () => {
            console.log('uploader API: seems like a route has been triggered')

            this.getLayout(true).render();
            this.getLayout().getRegion('uploader').show(new HomeView())
        });

        radioChannels.router.on('route:uploader:getDefaultPage', () => {
            console.log('uploader API: route:uploader:getDefaultPage')
            // uploaderApp.rootLayout.getRegion('main').show(new NavBladeItemView());
            // uploaderApp.rootLayout.getRegion('head').show(new HomeView());

            this.getLayout(true).render();
            this.getLayout().getRegion('uploader').show(new HomeView());
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