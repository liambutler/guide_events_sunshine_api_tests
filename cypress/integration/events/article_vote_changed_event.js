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
    it("ArticleVoteChanged event present in the sunshine", function () {
        let now = new Date().toISOString();
        cy
            .get('.article-vote-up').click()
            .wait(1000)
            .get('.article-vote-down').click()
            .wait(20000)
            .getUserEvents(this.user, now,'article_vote_changed')
            .then(responseData =>
                expect(responseData).to.be.true)
    });

});
