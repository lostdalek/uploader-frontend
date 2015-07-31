/// <reference path='./../plupload.d.ts' />

import {UploadFileCollection, UploadFileModel} from '../../../entities/uploadFile';

let uploadFormTemplate: string = require('./uploadFormView.hbs');

class UploadFormModel extends Backbone.Model{
    name: string;
}

interface IUploadFormOptions {
    uploadFileCollection: any;
}

export default class UploadFormView extends Marionette.ItemView<UploadFormModel> {
    public plupload = (<any>window).plupload;
    public uploader;
    public template = uploadFormTemplate;
    public uploadFileCollection: UploadFileCollection;
    public className = 'file-uploader';
    public options = {};
    public successMessage = 'File uploaded successfully';
    public ui = {
        message: '.message',
        fileList: '#filelist',
        dropTarget: '#file-drop',
        browseButton: '#file-select',
        uploadButton: '#file-upload',
        progressContainer: '.progress',
        progressBar: '.progress .bar'
    };

    constructor(options?: IUploadFormOptions) {
        super(options);
        this.uploadFileCollection = options.uploadFileCollection;
    }

    events() {
        return {
            'click #file-select': 'onFileSelect',
            'click #file-upload': 'startUpload'
        };
    }

    onDomRefresh() {
        var defaults = {
            runtimes : 'html5,flash,silverlight,html4',
            drop_element : (<any>this.ui.dropTarget).get(0),
            browse_button : (<any>this.ui.browseButton).get(0),
            container : this.el,
            multi_selection: true,
            url: 'http://192.168.1.213/upload.php',
            max_file_size : '10mb',
            flash_swf_url: '/bower_components/plupload/js/Moxie.swf'
            /*filters : [
                {title : 'CSV files', extensions : 'csv'}
            ]*/
        };


        this.uploader = new this.plupload.Uploader(_.defaults(this.options, defaults));
        this.uploader.init();

        // this.uploader.bind('Browse', () => {});
        this.uploader.bind('UploadProgress', (up: any, file: any) => this.onUploadProgress(up, file));
        this.uploader.bind('FileUploaded', (up: any, file: any) => this.onFileUploaded(up, file));
        this.uploader.bind('FilesAdded', (up: any, files: any) => this.onFilesAdded(up, files));
        this.uploader.bind('Init', (up: any, params: any) => this.onUploaderInit(up, params));
        this.uploader.bind('Error', (up: any, err: any) => this.handleUploadErrors(up, err));
    }

    onRender() {
        (<any>this.ui.progressContainer).hide();
    }

    startUpload(e: any) {
        e.preventDefault();
        this.uploader.start();
        (<any>this.ui.progressContainer).show();
    }

    onUploaderInit(up: any, params: any) {
        var target = (<any>this.ui.dropTarget).get(0);
        if (this.uploader.features.dragdrop) {


            target.ondragover = function(event: any) {
                event.dataTransfer.dropEffect = 'copy';
            };

            target.ondragenter = function() {
                this.className = 'dragover';
            };

            target.ondragleave = function() {
                this.className = '';
            };

            target.ondrop = function() {
                this.className = '';
            };
        }
    }

    onFileSelect(e: any) {
        // e.preventDefault();
        // console.log('click select')
    }

    // @TODO should delegate display to another sibling view
    onFilesAdded(up: any, files: any) {

        // var uploadFileModel = new FileModel(files[0]);

        this.uploadFileCollection.add(files);
        /*

        console.log('file added binding', files)
        var html = '';
        $.each(files, (i, file) => {
            html += '<div id='' + file.id + ''>' + file.name + ' (' + this.plupload.formatSize(file.size) + ') <b></b>' + '</div>';
        });

        // document.getElementById('filelist').innerHTML += html;

        (<any>this.ui.message).html('<div class='alert alert-info'>' + html + '</div>');
        */
        up.refresh(); // reposition Flash/Silverlight
    }

    onUploadProgress(up: any, file: any) {

        let fileFromQueue: UploadFileModel = this.uploadFileCollection.get(file.id);
        fileFromQueue.set('percent', file.percent);

        // (<any>this.ui.progressBar).width(file.percent + '%');
    }

    onFileUploaded(up: any, file: any) {
        /*(<any>this.ui.progressBar).addClass('bar-success');
        (<any>this.ui.progressBar).parent().removeClass('active');
        (<any>this.ui.message).html('<div class='alert alert-success'>' + this.successMessage + '</div>');*/
    }

    handleUploadErrors(up: any, err: any) {
        (<any>this.ui.message).html(
            '<div class="alert alert-error">An error occured: ' + err.message + ' for ' + (err.file ? ', File: ' + err.file.name : '') + '</div>');
    }
}
