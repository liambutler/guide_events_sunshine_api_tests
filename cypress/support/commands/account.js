import { generateAuthString } from '../../../scripts/generators';

Cypress.Commands.add('getAccount', function(providedAccountDetails = {}) {
  const accountDetails = {
    pod: Cypress.env('pod') || '998',
    guide_enabled: 'true',
    //guide_plan: "enterprise",
    support_enabled: 'true',
    support_plan: 'enterprise',
    talk_enabled: 'false',
    chat_enabled: 'false',
    multiproduct: 'false',
    owner_name: Cypress.env('ownerName') || 'guide_events_sunshine',
    // Merge in provided account details with all values converted to strings,
    // since Pandora does not handle plain boolean values well.
    ...Object.entries(providedAccountDetails).reduce(
      (prev, [k, v]) => ({ ...prev, [k]: v.toString() }),
      {}
    )
  };

  if (Cypress.env('pandoraEnabled')) {
    const pandoraUrl =
      Cypress.env('pandoraUrl') ||
      'https://pandora.internaltools-staging-use1.zende.sk';
    cy.request({
      method: 'POST',
      url: pandoraUrl + '/resource_types/account/resources/lock.json',
      auth: {
        user: 'test',
        pass: 'test'
      },
      body: {
        query: {
          lock_timeout: 2,
          resource_attributes: {
            ...accountDetails
          }
        }
      }
    }).then(({ body: { resource_attributes: attr } }) => {
      Cypress.config({
        authString: generateAuthString(attr.email, attr.password),
        baseUrl: attr.url,
        userEmail: attr.email,
        userPassword: attr.password
      });
    });
  } else {
    const userEmail = Cypress.env('userEmail') || 'automationsqa@z3nmail.com';
    const userPassword = Cypress.env('userPassword') || '12345';
    const baseUrl = Cypress.config('baseUrl') || 'https://mondocam.zd-dev.com';
    const authString = generateAuthString(userEmail, userPassword);

    if (
      accountDetails.guide_plan !== 'enterprise' &&
      baseUrl === 'https://mondocam.zd-dev.com'
    ) {
      console.log(
        'Skipping. Only tests intended for the enterprise Guide plan are run on the mondocam account.'
      );
      this.skip();
    }

    Cypress.config({
      authString,
      baseUrl,
      userEmail,
      userPassword
    });
  }
});
