export default class AnimatedRegion extends Marionette.Region {
    $el;
    options: any;
    animationType = 'fadeInUp';

    attachHtml(view: any) {
        if (!Modernizr.csstransitions) {
            // default behavior of Region:
            this.defaultAttachHtml(view);

        } else {
            // if css animation are supported:


            if( this.options.animationType !== undefined ) {
                let defer = (<any>jQuery).Deferred();
                this.animationType = this.options.animationType;
                /* too slow to trigger
                this.$el
                    .addClass('animated slideOutLeft')
                    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
                        this.$el.removeClass('animated slideOutLeft');
                        defer.resolve();
                    });
                */
                this.$el.hide();
                // do not wait for previous animation
                defer.resolve();

                defer.promise().then(() => {
                    this.el.appendChild(view.el);
                    this.$el.show()
                        .addClass('animated ' + this.animationType)
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
                            this.$el.removeClass('animated ' + this.animationType);
                        });
                });
            } else {
                this.defaultAttachHtml(view);
            }

        }
    }

    defaultAttachHtml(view: any) {
        this.$el.contents().detach();
        this.el.appendChild(view.el);
    }
}
