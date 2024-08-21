describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  // Test case for normal search
  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();
    cy.wait(1000).get('[data-testing="book-title"]').first().then($title => {
      expect($title.text()).to.match(/javascript/i);
    });
  });

  // Testcase for instant search.
  it('Then: I should see search results as I am typing', () => {
    
    cy.get('input[type="search"]').clear().type("python");
    cy.wait(1000).get('[data-testing="book-title"]').first().then($title => {
      expect($title.text()).to.match(/python/i);
    });
  });

});