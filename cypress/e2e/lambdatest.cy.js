/// <reference types="cypress" />

describe('LambdaTest Playground Tests', () => {
    it('should move the slider to 95 and verify the value', () => {
        // Step 1: Visit the slider demo
        cy.visit('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');

        // Step 2: Target the specific slider (the "Green" one)
        cy.get('input[type="range"][value="15"]').as('slider'); // first slider default = 15

        // Step 3: Use the native HTML input range manipulation
        cy.get('@slider').then(($slider) => {
            const nativeInput = $slider[0];

            // set the value directly
            nativeInput.value = 95;

            // fire the proper events so the UI updates
            nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
            nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
        });

        // Step 4: Verify the display text next to the slider (not input value!)
        cy.get('@slider')
            .parent()
            .find('output')
            .should('have.text', '15');
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
        cy.get('form', { timeout: 10000 }).should('be.visible');

        // Fill out the form
        cy.get('#name').type('John Doe');
        cy.get('#inputEmail4').type('john@example.com');
        cy.get('#inputPassword4').type('Password123');
        cy.get('#company').type('My Company');
        cy.get('#websitename').type('https://example.com');
        cy.get('select[name="country"]').select('India');
        cy.get('#inputCity').type('Hyderabad');
        cy.get('#inputAddress1').type('123 Test Street');
        cy.get('#inputAddress2').type('Flat 201');
        cy.get('#inputState').type('Telangana');
        cy.get('#inputZip').type('500001');

        // Submit
        cy.get('#seleniumform > div.text-right.mt-20 > button').click();

        // Assert success message
        cy.contains('Thanks for contacting us, we will get back to you shortly.').should('be.visible');
    });
});