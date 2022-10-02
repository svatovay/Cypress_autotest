const mainPage = 'https://www.etagi.com'
const roomCountStudio = 'Студия'
const minPrice = '2000000'
const maxPrice = '5000000'
const minSquare = '25'
const maxSquare = '50'

let offerCount = null

function getOfferCount(inputStr) {
    return Number(inputStr.match(/([\d *]+)/)[0].replace(/\s/g, ''));
}


function checkOfferCount(inputOfferCount) {
    if (inputOfferCount !== null) {
        return true
    }
}

describe('main page resail', () => {
    beforeEach(() => {
        cy.visit(mainPage);
        //aliases
        cy.get('span:contains(Показать)').as('showOffers');
        cy.get('input[placeholder=От]').as('lowerLimit');
        cy.get('input[placeholder=До]').as('upperLimit');
        cy.get('button:contains(Выбрать)').as('btnSelect');
    });

    it('valid filter fields', () => {
        cy.contains(roomCountStudio).click().should('have.class', 'GyoEC');
        cy.get('@lowerLimit').eq(0).type(minPrice).should('have.value', '2 000 000');
        cy.get('@showOffers').invoke('text').should((text) => {
            const _ = getOfferCount(text);
            expect(checkOfferCount(_)).to.be.true;
        })
        cy.get('@upperLimit').eq(0).type(maxPrice).should('have.value', '5 000 000');
        cy.get('@lowerLimit').eq(1).type(minSquare).should('have.value', minSquare);
        cy.get('@upperLimit').eq(1).type(maxSquare).should('have.value', maxSquare);
        cy.get('@btnSelect').eq(0).click();
        cy.contains('Центр: Дом печати').click().should('have.class', 'active');
        cy.contains('Применить фильтр').click({force: true});
        cy.get('@btnSelect').eq(1).click();
        cy.contains('Максима Горького').click().should('have.class', 'active');
        cy.get('@showOffers').parent().click({force: true});
        cy.url().should('include', '/realty/?');
    });
});