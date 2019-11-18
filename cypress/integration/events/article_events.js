let now = new Date().toISOString();
describe("Article events", () => {
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
            .as("article")
    });

    it("ArticleViewed event present in the sunshine", function () {
        cy
            .searchOnSearchResultsPage(this.article.title)
            .eventPreset(this.user, now,'article_viewed')
            .then(responseData =>
                expect(responseData).to.be.true)
    });

    it("Article Votes event are present in the sunshine", function () {
        cy
            .get('.article-vote-up').click()
            .wait(1000)
            .get('.article-vote-down').click()
            .wait(1000)
            .get('.article-vote-down').click()
            .eventPreset(this.user, now,'article_vote_added')
            .then(responseData =>
                expect(responseData).to.be.true)
            .eventPreset(this.user, now,'article_vote_changed')
            .then(responseData =>
                expect(responseData).to.be.true)
            .eventPreset(this.user, now,'article_vote_removed')
            .then(responseData =>
                expect(responseData).to.be.true)
    });
    //
    // it("ArticleVoteChanged event present in the sunshine", function () {
    //     cy
    //         .get('.article-vote-up').click()
    //         .wait(1000)
    //         .get('.article-vote-down').click()
    //         .get('.article-vote-down').click()
    //         .eventPreset(this.user, now,'article_vote_changed')
    //         .then(responseData =>
    //             expect(responseData).to.be.true)
    // });
    //
    // it("ArticleVoteRemoved event present in the sunshine", function () {
    //     cy
    //         .get('.article-vote-up').click()
    //         .get('.article-vote-up').click()
    //         .eventPreset(this.user, now,'article_vote_removed')
    //         .then(responseData =>
    //             expect(responseData).to.be.true)
    // });

});
