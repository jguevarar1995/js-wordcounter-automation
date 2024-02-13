import { WebdriverIOConfig } from '@serenity-js/webdriverio';
import { resolve } from 'path';
import { wdioOptions } from './src/helpers/wdioOptions';
import { Actors } from './src';

export const config: WebdriverIOConfig = {

    framework: '@serenity-js/webdriverio',

    serenity: {
        actors: new Actors(),
        runner: 'cucumber',
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { 
                outputDirectory: 'target/site/serenity' 
            } ],
            [ '@serenity-js/web:Photographer', {
                strategy: 'TakePhotosOfInteractions'
            } ],
        ]
    },

    cucumberOpts: {
        require: [
            './features/support/parameters.ts',
            './features/step-definitions/**/*.ts'
        ],
        format: [ ],
        
        profile: '',
        
        strict: false,
        
        tags: ['@regression and not @wip'],
        timeout: 60000
    },

    specs: [
        './features/**/*.feature',
    ],

    reporters: [
        'spec'
    ],

    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: resolve(__dirname, './tsconfig.json'),
        },
    },

    headless: false,
    automationProtocol: 'webdriver',

    maxInstances: 1,

    capabilities: [{

        browserName: 'chrome',
        'goog:chromeOptions': {
            excludeSwitches: [ 'enable-automation' ],
            args: [
                //'--headless',
                '--disable-infobars',
                '--disable-popup-blocking',
                '--no-sandbox',
                '--disable-gpu',
                //'--window-size=1920,1080',
                '--start-maximized'
            ],
        }
    }],

    logLevel: 'warn',

    bail: 0,

    baseUrl: process.env.BASE_URL,

    waitforTimeout: 10000,

    connectionRetryTimeout: 90000, 

    connectionRetryCount: 3,

    afterTest: async() => await wdioOptions.clearLocalStorage()
};