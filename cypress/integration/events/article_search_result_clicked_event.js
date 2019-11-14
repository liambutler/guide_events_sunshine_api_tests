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
            .getUserEvents(this.user, now)
            .then(responseData =>
                expect(responseData[0]).to.have.property('type', 'article_search_result_clicked'))
    });

});
