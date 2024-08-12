describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
});


describe('When: I mark the book as Finished.', ()=>{
  beforeEach(()=>{
    cy.startAt('/');
    cy.get('input[type="search"]').type('ruby');
    cy.get('form').submit();
    
    cy.wait(2000).get('[data-testing="add-to-read-button"]').first().click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.fa-regular')
      .last()
      .parents('button')
      .click();
  });

  it('Then: Display the finishedDate', ()=>{

    cy.get('.fa-solid')
      .last()
      .parents('.reading-list-item')
      .find('.reading-list-item--details--finished')
      .should('be.visible')
      .and('not.be.empty');

    cy.get('.fa-circle-minus')
      .last()
      .parents('button')
      .click();

  });

  it('Then: The Button in Books catalogue should be updated as Finished.', ()=>{
    cy.wait(2000)
      .get('[data-testing="add-to-read-button"]')
      .first()
      .should('contain', 'Finished');
    
    cy.get('.fa-circle-minus')
      .last()
      .parents('button')
      .click();
    
  });
});