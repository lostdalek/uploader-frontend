import {AppRouteDispatcher, AppRouter} from './router';
import {RootLayoutView, RootLayoutModel} from './rootLayout';


export default class Application extends Marionette.Application {
    appRouteDispatcher;
    components = {};
    router: any;
    rootLayout: Marionette.LayoutView<RootLayoutModel>;
    constructor( rootRegions) {
        super();
        this.addRegions(rootRegions);
        this.rootLayout = new RootLayoutView();
        this.on('start', () => {
            console.log('internal start', this)

            this.appRouteDispatcher = new AppRouteDispatcher();

            this.router = new AppRouter({ controller: new AppRouteDispatcher() });
        });
    }
    setRootLayout(rootRegion) {
        this.getRegion(rootRegion).show(this.rootLayout);
    }
    /*registerAppRoutes(routes) {
        this.router.processAppRoutes(this.appRouteDispatcher, componentInstance.getRoutes());
    }*/
    registerComponent(componentInstance) {

        if( this.components[componentInstance.identifier] === undefined ) {
            // register routes:
            this.router.processAppRoutes(componentInstance.getRouteDispatcher(), componentInstance.getRoutes());
            return componentInstance;
        }
        return this.components[componentInstance.identifier];

    }
}