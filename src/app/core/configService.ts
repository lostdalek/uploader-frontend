export default class ConfigService {
    protected config: any;

    /**
     * register global envConfiguration
     */
    constructor (defaultConfig?: any) {
        this.config = defaultConfig;
        var envConfiguration = (<any>window).envConfiguration || {};
        this._registerConfig(envConfiguration);
    }

    /**
     * Set config Object
     * Only available in angular config phase
     * @param config
     * @returns {IConfig}
     */
    public setConfig(config: App.IConfig): App.IConfig {
        return this._registerConfig(config);
    }

    /**
     * Get Config Object or specified key
     * note: accessible in angular config phase at your own risks
     *
     * @param configKey
     * @returns {IConfig}
     */
    public getConfig(configKey?: any): App.IConfig {

        if (configKey !== undefined) {
            var foundValue = this._findKeyValue(configKey || this.config);

            switch (typeof foundValue) {
                case 'string':
                    return foundValue;
                default:
                    return foundValue ? foundValue : null;

            }

        }

        return this.config;
    }

    /**
     *
     * @param config
     * @returns {IConfig}
     * @private
     */
    private _registerConfig(config: App.IConfig): App.IConfig  {
        _.extend(this.config, config);
        return this.config;
    }

    // @TODO cast
    private _findKeyValue(configName: any) {
        if (!configName) {
            return undefined;
        }

        var isStr = _.isString(configName),
            name  = isStr ? configName : configName.name,
            path  = configName.indexOf('.') > 0 ? true : false;

        if (path) {
            return this._search(this.config, name);
        }
        var state = this.config[name];
        if (state && (isStr || (!isStr && state === configName))) {
            return state;
        } else if ( isStr ) {
            return state;
        }
        return undefined;
    }

    // @TODO cast
    private _search(obj: Object, path: any) {
        if (_.isNumber(path)) {
            path = [path];
        }
        if (_.isEmpty(path)) {
            return obj;
        }
        if (_.isEmpty(obj)) {
            return null;
        }
        if (_.isString(path)) {
            return this._search(obj, path.split('.'));
        }

        var currentPath = path[0];

        if (path.length === 1) {
            if (obj[currentPath] === void 0) {
                return null;
            }
            return obj[currentPath];
        }

        return this._search(obj[currentPath], path.slice(1));
    }
}