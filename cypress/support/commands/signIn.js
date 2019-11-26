// signIn:
// Signs in a user

Cypress.Commands.add('signIn', user => {
  const authSession = Cypress.env('authSession');
  //const userEmail = Cypress.config("userEmail");
  var userEmail;
  typeof user === 'undefined'
    ? (userEmail = Cypress.config('userEmail'))
    : (userEmail = user.email);
  //const userEmail = user.email || Cypress.config("userEmail");
  const userPassword = Cypress.config('userPassword');
  const baseUrl = Cypress.config('baseUrl');

  if (authSession) {
    return cy.setCookie('_zendesk_shared_session', authSession);
  }

  cy.request({ url: `${baseUrl}/auth/v2/login` }).then(response => {
    const authTokenRegex = new RegExp(
      '<input type="hidden" name="authenticity_token" value="(.+)" />'
    );

    const authToken = response.body.match(authTokenRegex)[1];

    return cy
      .request({
        method: 'POST',
        url: `${baseUrl}/access/login`,
        form: true,
        body: {
          return_to: `${baseUrl}/auth/v2/login/signed_in`,
          'user[email]': userEmail,
          'user[password]': userPassword,
          authenticity_token: authToken
        }
      })
      .then(response => {
        if (
          response.redirects.some(url =>
            url.includes('/access/unauthenticated')
          )
        ) {
          throw new Error(
            `Could not sign in user with email '${userEmail}' and password '${userPassword}'`
          );
        }
      });
  });
});
