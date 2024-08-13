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

describe('When: I add a book to the reading list.', ()=>{
  beforeEach(() => {
    cy.startAt('/');
    cy.get('input[type="search"]').type('ruby');
    cy.get('form').submit();
  });

  it('Then: Snackbar should be displayed and button should be disabled.', ()=>{
    
    cy.wait(2000).get('[data-testing="add-to-read-button"]').first().click();

    cy.get('.addSnackbar')
      .should('be.visible')
      .then($snackbar => {
        const snackbarText = $snackbar.text();
        expect(snackbarText).to.include('Book added to the Reading list.');
      });
    cy.wait(2000).get('[data-testing="add-to-read-button"]').first().should('be.disabled');
    
  });

  it('Then: Book should be added to reading list.', ()=>{
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.reading-list-item--details--title').last().should(
      'contain.text',
      "Ruby (Oprah's Book Club 2.0)"
    );
    cy.get('[data-testing="remove-button"]').last().click();
  });

  it('Then: Undo the Add action.', ()=>{
    cy.wait(2000).get('[data-testing="add-to-read-button"]').first().click();

    cy.get('.addSnackbar') 
      .should('be.visible')
      .and('contain.text', 'Book added to the Reading list.')
      .find('button')
      .should('contain.text', 'Undo')
      .click();

      cy.get('[data-testing="toggle-reading-list"]').click();

      cy.get('.reading-list-item--details--title').last().should(
        'not.contain.text',
        "Ruby (Oprah's Book Club 2.0)"
      );
  })

});

describe('When: I remove the book from the reading list.', ()=>{

  beforeEach(()=>{
    cy.startAt("./");
    cy.get('input[type="search"]').type('ruby');
    cy.get('form').submit();
    cy.wait(2000).get('[data-testing="add-to-read-button"]').first().click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-item--details--title').last().should(
      'contain.text',
      "Ruby (Oprah's Book Club 2.0)"
    );
  });

  it('Then: Book should be removed from reading list and Snackbar should be displayed.', ()=>{
    
    cy.get('[data-testing="remove-button"]').last().click();
    cy.get('.reading-list-item--details--title').last().should(
      'not.contain.text',
      "Ruby (Oprah's Book Club 2.0)"
    );

    cy.get('.removeSnackbar') 
      .should('be.visible')
      .and('contain.text', 'Book Removed from the reading list.');

  });

  it('Then: Undo the Remove action.', ()=>{
    cy.get('[data-testing="remove-button"]').last().click();
    cy.get('.removeSnackbar') 
      .should('be.visible')
      .and('contain.text', 'Book Removed from the reading list.')
      .find('button')
      .should('contain.text', 'Undo')
      .click();
    
    cy.get('.reading-list-item--details--title').last().should(
        'contain.text',
        "Ruby (Oprah's Book Club 2.0)"
      );
    
      cy.get('[data-testing="remove-button"]').last().click();
    
  });
});
