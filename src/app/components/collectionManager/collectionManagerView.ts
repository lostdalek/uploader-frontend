let collectionManagerTemplate: string = require('./collectionManagerView.hbs');

class CollectionManagerModel extends Backbone.Model{
    name: string;
}

export default class CollectionManagerView extends Marionette.ItemView<CollectionManagerModel> {
    template = collectionManagerTemplate;
    ui = {
        collectionSelector: '#collection-selector'
    };

    constructor(options?: any) {
        super(options);
        if (!options) {
            options = {};
        }
    }


    onRender() {
        console.log('dom refresh collection manager')
        var data = [
            {id: 0, text: 'enhancement'},
            {id: 1, text: 'bug'},
            {id: 2, text: 'duplicate'},
            {id: 3, text: 'invalid'},
            {id: 4, text: 'wontfix'}];

        $((<any>this.ui.collectionSelector).get(0)).select2({
            templateResult: this.formatCollection,
            placeholder: 'Select a collection',
            allowClear: true,
            data: data
        });
    }

    formatCollection(item: any) {
        if (!item.id) {
            return item.text;
        }

        return $(
            '<span><img src="vendor/images/flags/' + item.element.value.toLowerCase() + '.png" class="img-flag" /> ' + item.text + '</span>'
        );
    }
}
