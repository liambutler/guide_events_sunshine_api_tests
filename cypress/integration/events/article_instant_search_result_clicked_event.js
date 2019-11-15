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
            .visit('hc/en-us/')
            .getArticle()
            .as("article")
            .then(article =>
                cy
                    .get('#query').type(article.title)

                    .get('zd-autocomplete-multibrand').click());
    });
    it("ArticleInstantSearchResultClicked event present in the sunshine", function () {
        cy
            .eventPreset(this.user, now,'article_instant_search_result_clicked')
            .then(responseData =>
                expect(responseData).to.be.true)

    });

});
