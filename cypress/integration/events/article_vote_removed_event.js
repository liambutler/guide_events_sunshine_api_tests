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
    it("ArticleVoteRemoved event present in the sunshine", function () {
        let now = new Date().toISOString();
        cy
            .get('.article-vote-up').click()
            .get('.article-vote-up').click()
            .wait(10000)
            .getUserEvents(this.user, now)
            .then(responseData =>
                expect(responseData[0]).to.have.property('type', 'article_vote_removed'))
    });

});
