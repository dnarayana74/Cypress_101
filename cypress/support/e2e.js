import 'cypress-xpath';
import 'cypress-axe';
import '@cypress-audit/lighthouse/commands';
import '@cypress-audit/pa11y/commands';

// Ignore React errors from LambdaTest playground
Cypress.on('uncaught:exception', (err) => {
    if (
        err.message.includes('Minified React error #418') ||
        err.message.includes('Minified React error #423')
    ) {
        return false; // prevent test failure
    }
});

// Custom helper: inject axe after every cy.visit
Cypress.Commands.add('prepareAxe', () => {
    cy.window({ log: false }).then((win) => {
        if (!win.axe) {
            cy.injectAxe(); // inject axe-core into AUT
        }
    });
});
