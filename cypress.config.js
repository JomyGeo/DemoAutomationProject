const { defineConfig } = require('cypress')

const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const cypress = require('cypress')


async function setupNodeEvents(on, config) {

  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.feature$/,
            use: [
              {
                loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                options: config,
              },
            ],
          },
        ],
      },
    },
  };

  on('file:preprocessor', webpackPreprocessor(options));
  require("./cypress/plugins/index.js")(on, config);

  return config;
}


module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  chromeWebSecurity: false,
  parseSpecialCharSequences: false,
  defaultCommandTimeout: 190000,
  pageLoadTimeout: 190000,
  requestTimeout: 190000,
  responseTimeout: 190000,
  failOnStatusCode: false,
  numTestsKeptInMemory: 10,
  ensureScrollable: true,
  video: false,
  videoCompression: 32,
  videoUploadOnPasses: false,
  watchForFileChanges: false,
  downloadsFolder: "cypress/downloads",
  cucumberJson: {
    generate: true,
    outputFolder: "cypress/cucumber-json",
    filePrefix: "",
    fileSuffix: ".cucumber"
  },


  env: {
   
    
    filterSpecs: true,
    omitFiltered: true,
    CYPRESS_Report_custom_LOG: 0,
    modifyObstructiveCode:true,
    experimentalInteractiveRunEvents:true,
    experimentalModifyObstructiveThirdPartyCode:true,
    experimentalMemoryManagement:true

  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    testIsolation: false,
    experimentalRunAllSpecs:true,
    experimentalOriginDependencies:true,	
    experimentalSkipDomainInjection: [
      '*.salesforce.com',
      '*.force.com',
      '*.google.com',
   
    ],
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)

    },
    supportFile: false,
    setupNodeEvents,
    specPattern: 'cypress/e2e/**/**/*.{feature,features}',
    chromeWebSecurity: false,
  },
  setupNodeEvents,

})
