export class AppRouteDispatcher extends Marionette.Object {
    getHomePage() {
        //HomeManager.trigger("contacts:list");
        console.log('home controler', arguments);

        // var view = new App.IndexView();
        // App.appRegion.show(view);
    }
}

export class AppRouter extends Marionette.AppRouter {
    protected appRoutes;
    constructor(options?: any) {
        this.appRoutes = {
            '': 'getHomePage',
            'home': 'getHomePage'
        };
        super(options);
    }

    onRoute() {
        console.log('on route')
    }
}