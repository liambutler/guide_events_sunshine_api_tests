import { events } from '../../fixtures/events';

describe('Guide Search events', () => {
  before(() => {
    cy.getAccount();
  });
  after(() => {
    cy.deleteProfile('agent');
  });
  beforeEach(() => {
    cy.getUser('agent')
      .as('user')
      .then(user => cy.signIn(user));
  });
  it('ArticleInstantSearchResultClicked event present in the sunshine', function() {
    cy.visit('hc/en-us/')
      .getArticle()
      .then(article =>
        cy
          .get('#query')
          .type(article.title.slice(0, -1))
          .get('zd-autocomplete-multibrand:first')
          .click()
      )
      .eventPresent(this.user, events.articleInstantSearchResultClicked)
      .then(responseData => expect(responseData).to.be.true);
  });

  it('ArticleSearchResultClicked event present in the sunshine', function() {
    cy.getArticle()
      .then(article => cy.searchOnSearchResultsPage(article.title))
      .get('.search-result-title:first')
      .click()
      .eventPresent(this.user, events.articleSearchResultClicked)
      .then(responseData => expect(responseData).to.be.true);
  });

  it('HelpCenterSearched event present in the sunshine', function() {
    cy.visit('hc/en-us/community/topics/')
      .getPost()
      .then(post => cy.get('#query').type(`${post.title}{enter}`))
      .eventPresent(this.user, events.helpCenterSearched)
      .then(responseData => expect(responseData).to.be.true);
  });

  it('CommunitySearchResultClicked event present in the sunshine', function() {
    cy.getPost()
      .then(post => cy.searchOnSearchResultsPage(post.title))
      .get('.search-result-title')
      .first()
      .click()
      .eventPresent(this.user, events.communitySearchResultClicked)
      .then(responseData => expect(responseData).to.be.true);
  });
});
