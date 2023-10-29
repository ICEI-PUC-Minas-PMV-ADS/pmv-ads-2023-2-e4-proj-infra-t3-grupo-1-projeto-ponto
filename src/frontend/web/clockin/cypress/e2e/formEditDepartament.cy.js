describe("Testando editar um novo departamento", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("deve encontrar o departamento clicar no botão de edição, cancelar clicar novamente no botão de edição e concluir a edição retornando um codigo 204", () => {
    cy.get('[data-cy="input-email"]').type("matheusestevamnc@outlook.com");
    cy.get('[data-cy="input-password"]').type("Matheus#14");
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="departaments-link"]').click();
    cy.get('[data-cy="input-name"]').type("Cypress test departament");
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="update"]').eq(1).click();
    cy.get('[data-cy="cancel"]').click();
    cy.get('[data-cy="update"]').eq(1).click();
    cy.get('[data-cy="input-name"]').eq(0).type(" edit");
    cy.get('[data-cy="submit"]').eq(0).click();
  });

  // Teste para gerar erro
  // it("deve encontrar o departamento clicar no botão de edição, preencher os campos e clicar no botão de submit, retornando um codigo 400", () => {
  //   cy.get('[data-cy="input-email"]').type("matheusestevamnc@outlook.com");
  //   cy.get('[data-cy="input-password"]').type("Matheus#14");
  //   cy.get('[data-cy="submit"]').click();
  //   cy.get('[data-cy="departaments-link"]').click();
  //   cy.get('[data-cy="input-name"]').type("Cypress test departament");
  //   cy.get('[data-cy="submit"]').click();
  //   cy.get('[data-cy="update"]').eq(1).click();
  //   cy.get('[data-cy="input-name"]')
  //     .eq(0)
  //     .type(" edit ultrapassando o limite de caracteres");
  //   cy.get('[data-cy="submit"]').eq(0).click();
  // });
});
