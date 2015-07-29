let navbladeTemplate: string = require('./navblade.hbs');

class NavBladeModel extends Backbone.Model{
    name: string;
};

export default class NavBladeItemView extends Marionette.ItemView<NavBladeModel> {
    constructor(options?: any) { //  Backbone.ViewOptions<NavModel>
        if (!options)
            options = {};
        options.template = navbladeTemplate;
        super(options);
    }
}