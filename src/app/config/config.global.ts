'use strict';
import ConfigService from '../core/configService';
import radioChannels from '../core/radioChannels';
import LangConfig from './config.lang';
interface ILocale {
    numberFormat?: string;
}

interface IConfig {
    lang?: any;
    locale?: string;
    localisation?: ILocale;
    baseUrl?: string;
    basePath?: string;
    staticPath?: string
}

export class Config extends ConfigService {
    lang;
    constructor() {
        var defaultConfig: IConfig = {
            locale: 'en',
            localisation: {
                numberFormat: ',.0f'
            },
            baseUrl: 'http://localhost:3000/',
            basePath: '',
            staticPath: '',
            ui: {
                leftSidebarIsTogglable: false
            }
        };
        super(defaultConfig);
        var locale = <string>this.getConfig('locale');

        /**
         * Return config Instance
         */
        radioChannels.config.reply('all', (): Config => {
            return this;
        });

        /* sample for config channel:
        radioChannels.config.reply('get', (configKey) => {
            console.log('config request has been made', configKey)
            return this.getConfig(configKey);
        });

        var evLocale = radioChannels.config.request('get','locale');
        console.log('evLocale', evLocale);
        */
    }

    public initialize() {
        var ready = $.Deferred();

        // load locals:
        this.initLangService()
        .then(() => ready.resolve(), () => ready.reject());

        return ready;
    }

    initLangService() {

        var locale = <string>this.getConfig('locale');

        return $.getJSON(this.getConfig('staticPath') + 'locales/' + locale + '.json', (data) => {
            // Instantiates polyglot with phrases.
            this.lang = new LangConfig({phrases: data});
        });

    }
}
