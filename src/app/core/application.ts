import {AppRouteDispatcher, AppRouter} from './router';
import {MainLayoutModel} from '../components/mainLayout/mainLayout';
import {Config} from '../config/config.global';


export default class Application extends Marionette.Application {
    appRouteDispatcher;
    components = {};
    config: any;
    router: any;
    rootLayout: Marionette.LayoutView<MainLayoutModel>;
    constructor( rootRegions: any, rootLayoutInstance: any) {
        super();
        this.addRegions(rootRegions);
        this.rootLayout = rootLayoutInstance;
        this.config = new Config();
        this.on('start', () => {
            this.appRouteDispatcher = new AppRouteDispatcher();
            this.router = new AppRouter({ controller: new AppRouteDispatcher() });
        });
    }
    setRootLayout(rootRegion: any) {
        this.getRegion(rootRegion).show(this.rootLayout);
    }
    /*registerAppRoutes(routes) {
        this.router.processAppRoutes(this.appRouteDispatcher, componentInstance.getRoutes());
    }*/
    registerComponent(componentInstance: any) {

        if ( this.components[componentInstance.identifier] === undefined ) {
            // register routes:
            this.router.processAppRoutes(componentInstance.getRouteDispatcher(), componentInstance.getRoutes());
            return componentInstance;
        }
        return this.components[componentInstance.identifier];

    }

    startWhenReady() {
        console.log('this.config ', this.config );
        // start app when config is ready:
        this.config
            .initialize()
            .then( () => this.start() ); // trigger Marionette.Application.start()
    }
}
