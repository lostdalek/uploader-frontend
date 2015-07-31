/**
 * Created by marcinkrysiak on 25/02/15.
 */
export default class AnimatedRegion extends Marionette.Region {
    $el;
    animationType = 'default';

    attachHtml(view: any) {
        /* default behavior:
         * this.$el.contents().detach();
         * this.el.appendChild(view.el);
         */
        if (!Modernizr.csstransitions) {
            // default behavior of Region:
            this.$el.contents().detach();
            this.el.appendChild(view.el);

        } else {
            // if css animation are supported:

            let defer = (<any>jQuery).Deferred();

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
                    .addClass('animated bounceInLeft')
                    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
                        this.$el.removeClass('animated bounceInLeft');
                    });
            });
        }
    }
}
