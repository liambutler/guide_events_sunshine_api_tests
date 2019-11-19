import { events } from "../../fixtures/events";

describe("Community events", () => {
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
            .openPost()
    });
    it("CommunityPostViewed event present in the sunshine", function () {
        cy
            .eventPreset(this.user, events.communityPostViewed)
            .then(responseData =>
                expect(responseData).to.be.true)
    });

});
