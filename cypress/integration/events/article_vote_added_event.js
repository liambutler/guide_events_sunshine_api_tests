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
            .getUserEvents(this.user, now)
            .then(responseData =>
                expect(responseData[0]).to.have.property('type', 'article_vote_added'))
    });

});
