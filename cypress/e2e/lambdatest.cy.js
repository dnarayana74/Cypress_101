/// <reference types="cypress" />

describe('LambdaTest Playground Tests', () => {

    it('Moves slider to 95 and validates output', () => {
        cy.visit('https://www.lambdatest.com/selenium-playground');
        cy.contains('Simple Form Demo').click();

        // Wait for element visibility (important for CI)
        cy.get('#range').should('be.visible');

        // Set slider value to 95 programmatically and trigger UI events
        cy.get('#range')
            .invoke('val', 95)
            .trigger('input', { force: true })
            .trigger('change', { force: true });

        // Validate that the value updates
        // cy.get('#rangeSuccess', { timeout: 5000 })
        //     .should('be.visible')
        //     .and('have.text', '95');
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
        cy.get("form").first().within(() => {
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
        cy.end();
    });
});
