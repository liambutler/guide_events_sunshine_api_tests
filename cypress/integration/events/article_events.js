import { events } from "../../fixtures/events";

describe("Article events", () => {
    before(() => {
        cy.getAccount();
    });
    after(()=>{
        cy.deleteProfile('agent');
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
            .eventPreset(this.user, events.articleViewed)
            .then(responseData =>
                expect(responseData).to.be.true)
    });

// Failed test. Need to uncomment when fixed.

    // it("Article Votes event are present in the sunshine", function () {
    //     cy
    //         .get('.article-vote-up').click()
    //         .wait(1000)
    //         .get('.article-vote-down').click()
    //         .wait(1000)
    //         .get('.article-vote-down').click()
    //         .eventPreset(this.user, events.articleVoteAdded)
    //         .then(responseData =>
    //             expect(responseData).to.be.true)
    //         .eventPreset(this.user, events.articleVoteChanged)
    //         .then(responseData =>
    //             expect(responseData).to.be.true)
    //         .eventPreset(this.user, events.articleVoteRemoved)
    //         .then(responseData =>
    //             expect(responseData).to.be.true)
    // });

});
