import {riot, RiotObject, RiotEvents, RiotElement} from '../riot-ts';

export class Timer extends RiotElement {
    time: number;
    timerHandle: number;
    mylist=["one","two","three"];

    public template() {
        return `<div><collection-selector></collection-selector>
     <span>timer: { time }</span>


     <div each="{el in mylist}">iterating over array item "{el}"<br></div>
     </div>`;
    }
    //
    public tagName() {
        return "timer";
    }

    public constructor(opts) {
        super();
        this.time= opts.time||0;
        this.timerHandle=setInterval(() => {
            //console.log('tick')
            this.ticks(); // should be binded
        },1000);

        this.on(RiotEvents.unmount,() => {
            clearInterval(this.timerHandle);
        });



        // riot.mount('collection-selector');
        console.log('>>>>', this.tags['collection-selector'])

    }

    public ticks() {
        this.time++;
        this.update();
    }

    public bindTo() {
        return ['ticks'];
    }

}