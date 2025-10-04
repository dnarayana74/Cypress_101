/// <reference types="cypress" />

describe('LambdaTest Playground Tests', () => {

    it('Test Scenario 1: Drag & Drop Slider to 95', () => {
        cy.visit('/');
        cy.contains('Drag & Drop Sliders').click();

        // Move the 3rd slider (Default value 15) to 95
        cy.get("input[type='range']").eq(2).invoke('val', 95).trigger('change', { force: true });

        // Assert result
        cy.get('#rangeSuccess', { timeout: 5000 }).should('have.text', '95');
    });

    it('Test Scenario 2: Input Form Submit with accessibility + performance checks', () => {
        cy.viewport('samsung-note9');
        cy.visit('/');
        cy.contains('Input Form Submit').click();

        // Accessibility check
        cy.prepareAxe();
        cy.checkA11y(null, null, (violations) => {
            if (violations.length) {
                Cypress.log({
                    name: 'a11y',
                    message: `${violations.length} violations`,
                    consoleProps: () => violations,
                });
            }
        }, { skipFailures: true });

        // Fill form using both CSS and XPath selectors
        // Scope everything inside the Input Form Submit
        cy.get("form").within(() => {
            cy.get("input[name='name']").first().type("John Doe");
            cy.get("input[name='email']").first().type("john@example.com");
            cy.get("input[name='password']").first().type("Password123");

            cy.get("input[name='company']").type("LambdaTest");
            cy.get("input[name='website']").type("https://example.com");

            cy.get("select[name='country']").select("United States");

            cy.get("input[name='city']").type("New York");
            cy.get("input[name='address_line1']").type("123 Main St");
            cy.get("input[name='address_line2']").type("Apt 4B");

            cy.get("input[name='state']").type("NY");
            cy.get("input[name='zip']").type("10001");

            // Submit form
            cy.get("button[type='submit']").click();
        });


        // Assert success message
        cy.contains('Thanks for contacting us, we will get back to you shortly.').should('be.visible');

        // Run Lighthouse audit
        cy.task('lighthouse', {
            performance: ['performance', 'accessibility', 'best-practices', 'seo'],
        }).then((report) => {
            cy.log('Lighthouse scores:', JSON.stringify(report));
        });

        // Close tab (end session)
        cy.end();
    });
});
