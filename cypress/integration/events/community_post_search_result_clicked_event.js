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
                    .searchOnSearchResultsPage("Test Post"));
    });
    it("ArticleSearchResultClicked event present in the sunshine", function () {
        cy
            .get('.search-result-title').first().click()
            .wait(15000)
            .getUserEvents(this.user, now)
            .then(responseData =>
                expect(responseData[0]).to.have.property('type', 'community_search_result_clicked'))
    });

});
