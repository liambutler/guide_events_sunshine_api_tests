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
            .getArticle()
            .as("article")
            .then(article =>
                cy
                    .searchOnSearchResultsPage(article.title));
    });
    it("ArticleSearchResultClicked event present in the sunshine", function () {
        cy
            .get('.search-result-title').click()
            .eventPreset(this.user, now,'article_search_result_clicked')
            .then(responseData =>
                expect(responseData).to.be.true)
    });

});
