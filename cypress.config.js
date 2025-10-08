const { defineConfig } = require("cypress");
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { pa11y } = require("@cypress-audit/pa11y");

module.exports = defineConfig({
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
        mochaFile: 'cypress/results/results-[hash].xml',
        toConsole: true
    },
    video: true,
    screenshotOnRunFailure: true,
    reporter: "spec",
    e2e: {
        baseUrl: "https://www.lambdatest.com/selenium-playground",
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 60000,
        viewportWidth: 1280,
        viewportHeight: 720,
        setupNodeEvents(on, config) {
            on("before:browser:launch", (browser = {}, launchOptions) => {
                prepareAudit(launchOptions);
            });

            on("task", {
                lighthouse: lighthouse(),
                pa11y: pa11y(),
            });

        },
    },
});
