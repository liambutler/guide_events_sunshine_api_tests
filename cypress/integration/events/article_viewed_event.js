let now = new Date().toISOString();
describe("Guide event", () => {
    before(() => {
        cy.getAccount();
    });
    beforeEach(() => {
        cy
            .getUser('agent')
            .as('user')
            .then(user =>
                cy.signIn(user))
            .openArticle()
            .then(article =>
                cy.searchOnSearchResultsPage(article.title)
            )

    });
    it("ArticleViewed event present in the sunshine", function () {
        cy
            .eventPreset(this.user, now,'article_viewed')
            .then(responseData =>
                expect(responseData).to.be.true)
    });
});
