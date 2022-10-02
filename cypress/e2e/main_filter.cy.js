describe('main page resail', () => {
    beforeEach(function () {
        //load
        cy.visit('https://www.etagi.com');

        //fixtures
        cy.fixture('main').then(function (main) {
            this.mainJSON = main;
        });

        //aliases
        cy.get('span:contains(Показать)').as('showOffers');
        cy.get('input[placeholder=От]').as('lowerLimit');
        cy.get('input[placeholder=До]').as('upperLimit');
        cy.get('button:contains(Выбрать)').as('btnSelect');
    });

    it('valid filter fields', function () {
        cy.contains(this.mainJSON.roomCountStudio)
            .click()
            .should('have.class', 'GyoEC');
        cy.get('@lowerLimit').eq(0)
            .type(this.mainJSON.minPrice)
            .should('have.value', '2 000 000');
        cy.get('@upperLimit').eq(0)
            .type(this.mainJSON.maxPrice)
            .should('have.value', '5 000 000');
        cy.get('@lowerLimit').eq(1)
            .type(this.mainJSON.minSquare)
            .should('have.value', this.mainJSON.minSquare);
        cy.get('@upperLimit').eq(1)
            .type(this.mainJSON.maxSquare)
            .should('have.value', this.mainJSON.maxSquare);
        cy.get('@btnSelect').eq(0)
            .click();
        cy.contains(this.mainJSON.district)
            .click()
            .should('have.class', 'active');
        cy.contains('Применить фильтр')
            .click({force: true});
        cy.get('@btnSelect').eq(1)
            .click();
        cy.contains(this.mainJSON.street)
            .click()
            .should('have.class', 'active');
        cy.get('@showOffers').parent()
            .click({force: true});
        cy.url()
            .should('include', '/realty/?');
    });
});