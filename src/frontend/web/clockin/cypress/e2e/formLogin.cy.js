describe("Testando fomrualrio de login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("não deve permitir uma senha ou email invalido", () => {
    cy.get('[data-cy="input-email"]').type("matheusestevamnc@outlook.com");
    cy.get('[data-cy="input-password"]').type("Matheus#14");
    cy.get('[data-cy="submit"]').click();
  });
  
  // Teste para gerar erro
  // it('deve retoranr 400 pois a senha ou email esta invalido', ()=>{
  //     cy.get('[data-cy="input-email"]').type('matheusestevamnc@outlook.com')
  //     cy.get('[data-cy="input-password"]').type('123')
  //     cy.get('[data-cy="submit"]').click()
  // })
});
