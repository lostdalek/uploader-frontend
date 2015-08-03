
export default class LangConfig {
    protected polyglot;

    public constructor(options?: any) {
        this.polyglot = new (<any>window).Polyglot(options);
    }

    public t(...args) {
        return this.polyglot.t(args);
    }
}
