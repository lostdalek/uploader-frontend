class UploadFileModel extends Backbone.Model{
    defaults() {
        return {
            title: '',
            completed: false,
            created: 0,
            percent: 0
        };
    }

    initialize() {
        if (this.isNew()) {
            this.set('created', Date.now());
        }
    }
}

class UploadFileCollection  extends Backbone.Collection<UploadFileModel> {
    uploadProgress: number = 0;
    // model: UploadFileModel = UploadFileModel;

    initialize() {
        this.on( 'change:percent', (model: UploadFileModel, val: any, options: any) => this.onChangePercent(model, val, options));
        this.on('update', () => this._calcUploadProgress());
    }

    onChangePercent(model: UploadFileModel, val: any, options: any) {
        console.log('model changed', model, val, options);

        this._calcUploadProgress();
    }

    _calcUploadProgress() {

        let modelsLength = this.models.length,
            totalProgess = 0;

        if (  modelsLength === 0 ) {
            return this.uploadProgress = totalProgess;
        }
        _.each(this.models, (model: UploadFileModel) => {

            totalProgess += parseInt(model.get('percent'), 10);
        });


        return this.uploadProgress = (totalProgess / modelsLength);
    }

    getUploadProgress() {
        return this.uploadProgress;
    }
}

export {UploadFileCollection, UploadFileModel};
