import {RiotObject, RiotEvents, RiotElement} from './riot-ts';

export default class CollectionSelector extends RiotElement {
    time: number;
    timerHandle: number;
    mylist=["one","two","three"];

    public template() {
        return `<select>
     <option each="{el in mylist}">iterating over array item "{el}"</option>
     </select>`;
    }

    public tagName() {
        return "collection-selector";
    }

    public constructor(opts) {
        super();
        this.time= opts.time||0;
        /*this.timerHandle=setInterval(() => {
            console.log('tick')
            this.ticks(); // should be binded
        },1000);*/

        this.on(RiotEvents.unmount,() => {
            clearInterval(this.timerHandle);
        });
        this.on(RiotEvents.update,() => {
            // console.log('has been updated')
        });
        this.on(RiotEvents.mount,() => {
            // console.log('has been mount')
        });

    }

    /*public ticks() {
        this.time++;
        this.update();
    }

    public bindTo() {
        return [];
    }*/

}