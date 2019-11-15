let now = new Date().toISOString();
describe("Guide Search events", () => {
    before(() => {
        cy.getAccount();
    });
    beforeEach(() => {
        cy
            .getUser('agent')
            .as('user')
            .then(user =>
                cy.signIn(user))
    });
    it("ArticleInstantSearchResultClicked event present in the sunshine", function () {
        cy
            .visit('hc/en-us/')
            .getArticle()
            .as("article")
            .then(article =>
                cy
                    .get('#query').type(article.title)
                    .get('zd-autocomplete-multibrand').click())
            .eventPreset(this.user, now,'article_instant_search_result_clicked')
            .then(responseData =>
                expect(responseData).to.be.true)

    });

    it("ArticleSearchResultClicked event present in the sunshine", function () {
        cy
            .getArticle()
            .as("article")
            .then(article =>
                cy
                    .searchOnSearchResultsPage(article.title))
            .get('.search-result-title').click()
            .eventPreset(this.user, now,'article_search_result_clicked')
            .then(responseData =>
                expect(responseData).to.be.true)
    });

    it("CommunitySearched event present in the sunshine", function () {
        cy
            .visit('hc/en-us/community/topics/')
            .getPost()
            .as("post")
            .then(post =>
                cy
                    .get('#query').type(`${post.title}{enter}`))
            .eventPreset(this.user, now,'community_searched')
            .then(responseData =>
                expect(responseData).to.be.true)
    });

    it("ArticleSearchResultClicked event present in the sunshine", function () {
        cy
            .getPost()
            .as("post")
            .then(post =>
                cy
                    .searchOnSearchResultsPage(post.title))
            .get('.search-result-title').first().click()
            .eventPreset(this.user, now,'community_search_result_clicked')
            .then(responseData =>
                expect(responseData).to.be.true)
    });


});
