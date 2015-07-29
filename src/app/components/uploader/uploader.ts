/// <reference path="./plupload.d.ts" />


export var pluploadConfig = {
    // General settings
    runtimes: 'html5,flash,silverlight,html4',
    url: 'http://192.168.1.213/upload.php',

    // Maximum file size
    max_file_size: '2mb',

    chunk_size: '1mb',

    // Resize images on clientside if we can
    resize: {
        width: 200,
        height: 200,
        quality: 90,
        crop: true // crop to exact dimensions
    },

    // Specify what files to browse for
    filters: [
        {title: "Image files", extensions: "jpg,gif,png"},
        {title: "Zip files", extensions: "zip,avi"}
    ],

    // Rename files by clicking on their titles
    rename: true,

    // Sort files
    sortable: true,

    // Enable ability to drag'n'drop files onto the widget (currently only HTML5 supports that)
    dragdrop: true,

    // Views to activate
    views: {
        list: true,
        thumbs: true, // Show thumbs
        active: 'thumbs'
    },

    // Flash settings
    flash_swf_url: '/plupload/js/Moxie.swf',

    // Silverlight settings
    silverlight_xap_url: '/plupload/js/Moxie.xap',
    browse_button: 'browse', // this can be an id of a DOM element or the DOM element itself
}

export class Uploader {
    public plupload = (<any>window).plupload;
    public uploader;

    public constructor() {
        this.uploader = new this.plupload.Uploader({
            runtimes: 'html5,flash,silverlight,html4',
            browse_button: 'browse', // this can be an id of a DOM element or the DOM element itself
            url: 'http://192.168.1.213/upload.php'
        });

        this.uploader.init();

        this.bindFileAdded();
        this.bindFileProgress();
        this.bindError();
        document.getElementById('start-upload').onclick = () => {
            console.log('click')
            this.uploader.start();
        };
        return this.uploader;
    }

    public bindFileAdded() {
        this.uploader.bind('FilesAdded', (up, files) => {
            console.log('try to bind', up, files)
            var html = '';
            this.plupload.each(files, (file) => {
                html += '<li id="' + file.id + '">' + file.name + ' (' + this.plupload.formatSize(file.size) + ') <b></b></li>';
            });
            document.getElementById('filelist').innerHTML += html;
        });

        return this.uploader;
    }

    public bindFileProgress() {
        this.uploader.bind('UploadProgress', (up, file) => {
            document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
        });

        return this.uploader;
    }
    public bindError() {
        this.uploader.bind('Error', (up, error) => {
            document.getElementById('console').innerHTML += "\nError #" + error.code + ": " + error.message;
        });

        return this.uploader;
    }

}