import radioChannels from './radioChannels';

export class AppRouteDispatcher extends Marionette.Object {
    getDefaultPage() {
        console.log('dispatch: get default');
    }
    getHomePage() {
        radioChannels.router.trigger('route:getHomePage');
    }
    getUploadPage() {
        radioChannels.router.trigger('route:getUploadPage');
    }
}

export class AppRouter extends Marionette.AppRouter {
    protected appRoutes;
    constructor(options?: any) {
        this.appRoutes = {
            '': 'getDefaultPage',
            'home': 'getHomePage',
            'uploader': 'getUploadPage'
        };
        super(options);
        this.navigate('', true);
    }

    onRoute() {
        console.log('on route', arguments);
    }
}
