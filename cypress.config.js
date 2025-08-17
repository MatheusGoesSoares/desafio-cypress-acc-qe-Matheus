const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: { 
    video: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    watchForFileChanges: false,
    testIsolation: false, 
    specPattern: 'cypress/e2e/**/*.feature',
    baseUrl: 'https://demoqa.com/webtables',

    setupNodeEvents(on, config) {
      const cucumber = require("cypress-cucumber-preprocessor").default;
      on('file:preprocessor', cucumber());

    },
  },
});