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
            .as("article");
    });
    it("ArticleVoteAdded event present in the sunshine", function () {
        let now = new Date().toISOString();
        cy
            .get('.article-vote-up').click()
            .getUserEvents(this.user, now,'article_vote_added')
            .then(responseData =>
                expect(responseData).to.be.true)
    });

});
