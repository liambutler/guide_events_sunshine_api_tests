
// requestApi:
// Sends a request to the specified API endpoint with CSRF tokens included
Cypress.Commands.add("requestApi", (requestOpts = {}) => {
  debugger
  const { authString: Authorization } = Cypress.config();

  cy.request({
    ...requestOpts,
    headers: {
      ...(requestOpts.headers || {}),
      Authorization,
    },
  });
});
