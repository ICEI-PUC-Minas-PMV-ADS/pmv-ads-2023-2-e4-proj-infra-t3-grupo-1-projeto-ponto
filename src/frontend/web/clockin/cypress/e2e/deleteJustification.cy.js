describe("Testando a deleção de uma justificativa", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("deve encontrar a justificativa e deletar da lista e retornar um codigo 204", () => {
    cy.get('[data-cy="input-email"]').type("matheusestevamnc@outlook.com");
    cy.get('[data-cy="input-password"]').type("Matheus#14");
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="justifications-link"]').click();
    cy.get('[data-cy="input-name"]').type("Cypress test justification");
    cy.get('[data-cy="input-description"]').type("Cypress test justification");
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="delete"]').eq(1).click();
  });
});
