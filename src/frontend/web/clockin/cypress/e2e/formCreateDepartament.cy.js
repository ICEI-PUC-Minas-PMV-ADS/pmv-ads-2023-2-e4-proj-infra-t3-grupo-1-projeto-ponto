describe("Testando adicionar um novo departamento", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it('Deve permitir incluir um departamento na lista e rotnar um status 201', ()=>{
      cy.get('[data-cy="input-email"]').type('matheusestevamnc@outlook.com')
      cy.get('[data-cy="input-password"]').type('Matheus#14')
      cy.get('[data-cy="submit"]').click()
      cy.get('[data-cy="departaments-link"]').click()
      cy.get('[data-cy="input-name"]').type('Cypress test departament')
      cy.get('[data-cy="submit"]').click()
  })
});
