let navbladeTemplate: string = require('./navblade.hbs');

class NavBladeModel extends Backbone.Model{
    name: string;
    classes: string;
};

export default class NavBladeItemView extends Marionette.ItemView<NavBladeModel> {
    public model: NavBladeModel;
    constructor(options?: any) {
        if (!options) {
            options = {};
        }
        options.template = navbladeTemplate;
        super(options);

        if( this.model === undefined ) {
            this.model = new NavBladeModel({
                classes: 'navblade-default',
                logo: {
                    src: 'assets/images/logo.png', // appConfig.baseUrl + appConfig.staticPath +
                    link: '#/dashboard',
                    classes: ''
                }
            });
        }

    }
}
