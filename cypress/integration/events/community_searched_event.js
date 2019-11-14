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
            .visit('hc/en-us/community/topics/')
            .getPost()
            .as("post")
            .then(post =>
                cy
                    .get('#query').type(`${post.title}{enter}`));
    });
    it("CommunitySearched event present in the sunshine", function () {
        cy
            .wait(16000)
            .getUserEvents(this.user, now)
            .then(responseData =>
                expect(responseData[0]).to.have.property('type', 'community_searched'))
    });

});
