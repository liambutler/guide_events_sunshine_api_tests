import { events } from '../../fixtures/events';

describe('Article events', () => {
  before(() => {
    cy.getAccount();
  });
  after(() => {
    cy.deleteProfile('agent');
  });
  beforeEach(() => {
    cy.getUser('agent')
      .as('user')
      .then(user => cy.signIn(user))
      .openArticle()
      .as('article');
  });

  it('ArticleViewed event present in the sunshine', function() {
    cy.eventPresent(this.user, events.articleViewed).then(
      responseData => expect(responseData).to.be.true
    );
  });
});
