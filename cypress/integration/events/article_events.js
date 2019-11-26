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

  it('Article Votes event are present in the sunshine', function() {
    cy.get('.article-vote-up')
      .click()
      .eventPresent(this.user, events.articleVoteAdded)
      .then(responseData => expect(responseData).to.be.true)
      .get('.article-vote-down')
      .click()
      .eventPresent(this.user, events.articleVoteChanged)
      .then(responseData => expect(responseData).to.be.true)
      .get('.article-vote-down')
      .click()
      .eventPresent(this.user, events.articleVoteRemoved)
      .then(responseData => expect(responseData).to.be.true);
  });
});
