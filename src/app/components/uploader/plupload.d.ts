// /// <reference path="../jquery/jquery.d.ts" />
export interface plupload {
    Uploader: Function
}

interface JQueryPlUploadOptions {

}

interface JQueryPlUpload extends JQuery  {
    settings:any;
}

interface JQuery {
    //pluploadQueue(settings?: JQueryPlUploadOptions): JQueryPlUpload;
    pluploadQueue(data?: any, options?: any): JQuery;
    plupload(settings?: JQueryPlUploadOptions): JQueryPlUpload;
}