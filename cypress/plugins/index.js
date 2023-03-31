/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const fs = require('fs');

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
//module.exports = (on, config) => {

// `on` is used to hook into various events Cypress emits
// `config` is the resolved Cypress config
//}

// ...

const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const nodePolyfills = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin





/*const deleteFileFromRemote = (remoteFile) =>{
   return sftp.connect(config).then(() => {
     return sftp.delete(remoteFile, 'utf8');
  });
};*/


module.exports = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config) // to allow json to be produced
  // To use esBuild for the bundler when preprocessing


  on(
    'file:preprocessor',
    createBundler({
      plugins: [nodePolyfills(), createEsbuildPlugin(config)],
    })
  )
  return config
}


module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    failed: require('cypress-failed-log/src/failed')(),
  }),
   

  
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.family === 'chromium') {
      console.log('Adding Chrome flag: --disable-dev-shm-usage');
      launchOptions.args.push('--disable-dev-shm-usage');
      launchOptions.args.push('--disable-backgrounding-occluded-windows')
      launchOptions.args.push('--max_old_space_size=1500');
      launchOptions.args.push('--js-flags=--expose-gc')
    }
    return launchOptions;
  });

  return config;

};
