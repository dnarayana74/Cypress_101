describe('Lighthouse Audit', () => {
    it('runs Lighthouse successfully', () => {
        cy.visit('https://www.lambdatest.com/selenium-playground');
        cy.lighthouse(
            {
                performance: 0,
                seo: 0,
                accessibility: 0,
                'best-practices': 0,
                pwa: 0,
            },
            { failOnError: false }
        );
    });
});
