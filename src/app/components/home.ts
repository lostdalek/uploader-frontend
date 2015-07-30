let homeTemplate: string = require('./home.hbs');
class HomeModel extends Backbone.Model{

};
export default class HomeView extends Marionette.ItemView<HomeModel>{
    constructor(options?: any) { //  Backbone.ViewOptions<NavModel>
        if (!options)
            options = {};
        options.template = homeTemplate;
        super(options);
    }
}