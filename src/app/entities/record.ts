'use strict';

class RecordModel extends Backbone.Model{
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

class RecordCollection  extends Backbone.Collection<RecordModel> {

}

export {RecordCollection, RecordModel};
