describe("Navigation", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Hoang Tien Dinh");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.request("GET", "/api/debug/reset");

    cy.contains(".appointment__card--show", "Hoang Tien Dinh");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


});
