import radioChannels from './radioChannels';

export class AppRouteDispatcher extends Marionette.Object {
    routeHome() {
        radioChannels.router.trigger('route:uploader:initialize');
    }
    routeUploader() {
        radioChannels.router.trigger('route:uploader:initialize');
    }
}

export class AppRouter extends Marionette.AppRouter {
    protected appRoutes;
    constructor(options?: any) {
        this.appRoutes = {
            'home': 'routeHome',
            'uploader': 'routeUploader',
            '': 'routeHome',
            '*path': 'routeHome'
        };
        super(options);
        this.navigate('', true);
    }

    onRoute() {
        console.log('on route', arguments);
    }
}
