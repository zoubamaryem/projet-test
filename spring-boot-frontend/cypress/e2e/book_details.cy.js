describe("Book Details E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3003");
  });

  it("should display details when 'View Details' is clicked", () => {
    cy.get('[data-cy="view-details-1"]').click();

    cy.get('[data-cy="book-details"]').should("exist");
    cy.get('[data-cy="book-details"]').should("contain", "The Great Gatsby");
    cy.get('[data-cy="book-details"]').should("contain", "F. Scott Fitzgerald");
  });
});
