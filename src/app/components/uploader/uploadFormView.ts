/// <reference path="./plupload.d.ts" />

let uploadFormTemplate: string = require('./uploadFormView.hbs');

class UploadFormModel extends Backbone.Model{
    name: string;
};

export default class UploadFormView extends Marionette.ItemView<UploadFormModel> {
    public plupload = (<any>window).plupload;
    template = uploadFormTemplate;

    constructor(options?: any) { //  Backbone.ViewOptions<NavModel>
        super(options);
        if (!options)
            options = {};
        //options.template = uploadFormTemplate;
    }

    /*onRender() {
        this.pluploadInstance = new PlUpload();
        console.log('on render', this.pluploadInstance)
    }*/
    className = "file-uploader";


    public uploader;
    options = {};

    successMessage = 'File uploaded successfully';

    ui = {
        message: '.message',
        fileList: '#filelist',
        dropTarget: '#file-drop',
        browseButton: '#file-select',
        uploadButton: '#file-upload',
        progressContainer: '.progress',
        progressBar: '.progress .bar'
    };

    events() {
        return {
            'click #file-select': 'onFileSelect',
            'click #file-upload': 'startUpload'
        }
    }

    /*initialize(options) {
        if(options) {
            this.options = options;

            this.successMessage = options.successMessage || this.successMessage;
        }
    }*/
    onDomRefresh() {
        var defaults = {
            runtimes : 'html5,flash,silverlight,html4', //,html4 ,html5,flash,silverlight', // gears browserplus
            drop_element : (<any>this.ui.dropTarget).get(0),
            browse_button : (<any>this.ui.browseButton).get(0),
            container : this.el,
            multi_selection: true,
            url: 'http://192.168.1.213/upload.php',
            max_file_size : '10mb',
            // Flash settings
            flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
            /*filters : [
                {title : "CSV files", extensions : "csv"}
            ],
            resize : {width : 320, height : 240, quality : 90}*/
        };

        /*
        this.uploader = new this.plupload.Uploader({
            container: 'pluploadcontainer',
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: 'browse', // this can be an id of a DOM element or the DOM element itself
            url: 'http://192.168.1.213/upload.php'
        });
        console.log(this.uploader)
        this.uploader.init();
        // this.uploader.refresh();


        console.log('>>> button', (<any>this.ui.browseButton).get(0))
        */

        this.uploader = new this.plupload.Uploader(_.defaults(this.options, defaults));
        console.log('this uploader:', this.uploader)
        this.uploader.init();

        //this.uploader.bind('FilesAdded', _.bind(this.filesAdded, this)); // (up, files) => this.filesAdded(up, files)); //
        this.uploader.bind('Browse', () => {
            console.log('fire browse')
        })
        this.uploader.bind('UploadProgress', (up: any, file: any) => this.onUploadProgress(up, file));
        this.uploader.bind('FileUploaded', (up: any, file: any) => this.onFileUploaded(up, file));
        this.uploader.bind('FilesAdded', (up: any, files: any) => this.onFilesAdded(up, files));
        this.uploader.bind('Init', (up:any, params: any) => this.onUploaderInit(up, params));
        this.uploader.bind('Error', (up: any, err: any) => this.handleUploadErrors(up, err));
    }

    onRender() {
        (<any>this.ui.progressContainer).hide();
    }

    startUpload(e) {
        e.preventDefault();
        this.uploader.start();
        (<any>this.ui.progressContainer).show();
    }

    onUploaderInit(up: any, params: any) {
        var target = (<any>this.ui.dropTarget).get(0);
        if (this.uploader.features.dragdrop) {


            target.ondragover = function(event) {
                event.dataTransfer.dropEffect = "copy";
            };

            target.ondragenter = function() {
                this.className = "dragover";
            };

            target.ondragleave = function() {
                this.className = "";
            };

            target.ondrop = function() {
                this.className = "";
            };
        }
    }

    onFileSelect(e) {
        //e.preventDefault();
        //console.log('click select')
    }

    onFilesAdded(up: any, files: any) {
        console.log('file added binding')
        var html = "";
        $.each(files, (i, file) => {
            html += '<div id="' + file.id + '">' + file.name + ' (' + this.plupload.formatSize(file.size) + ') <b></b>' + '</div>';
        });

        // document.getElementById('filelist').innerHTML += html;

        (<any>this.ui.message).html('<div class="alert alert-info">' + html + '</div>');

        up.refresh(); // Reposition Flash/Silverlight
    }

    onUploadProgress(up: any, file: any) {
        (<any>this.ui.progressBar).width(file.percent + '%');
    }

    onFileUploaded(up: any, file: any) {
        (<any>this.ui.progressBar).addClass('bar-success');
        (<any>this.ui.progressBar).parent().removeClass('active');
        (<any>this.ui.message).html('<div class="alert alert-success">' + this.successMessage + '</div>');
    }

    handleUploadErrors(up: any, err: any) {
        (<any>this.ui.message).html('<div class="alert alert-error">An error occured: ' + err.message + " for " + (err.file ? ", File: " + err.file.name : "") + '</div>');
    }
}