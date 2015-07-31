'use strict';

/**
 * A recordSet is a Phraseanet Collection
 */

class RecordSetModel extends Backbone.Model{
    defaults() {
        return {
            title: '',
            completed: false,
            created: 0
        };
    }

    initialize() {
        if (this.isNew()) {
            this.set('created', Date.now());
        }
    }
}

class RecordSetCollection  extends Backbone.Collection<RecordSetModel> {
    // model: RecordSetModel = RecordSetModel;

}

export {RecordSetCollection, RecordSetModel};
