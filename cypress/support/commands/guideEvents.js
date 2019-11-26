Cypress.Commands.add('eventPresent', (user, event) => {
  let url = `/api/sunshine/events?identifier=support:user_id:${JSON.stringify(
    user.id
  )}`;
  let timeout = 15000;
  return cy.waitUntil(
    () =>
      cy
        .requestApi({
          method: 'GET',
          url: url
        })
        .then(response => {
          if (response.body.data != null) {
            for (let i = 0; i < response.body.data.length; i++) {
              if (response.body.data[i].type === event) {
                return true;
              }
            }
            return false;
          } else {
            return false;
          }
        }),
    {
      errorMsg: `Could not find the event ${event} in ${timeout /
        1000} seconds.`,
      interval: 1000,
      timeout: timeout
    }
  );
});

Cypress.Commands.add('deleteProfile', userRole =>
  cy.getUser(userRole).then(user => {
    cy.requestApi({
      method: 'DELETE',
      url: `api/sunshine/profile?identifier=support:user_id:${JSON.stringify(
        user.id
      )}`
    });
  })
);
