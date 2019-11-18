import { events } from "../../fixtures/events";

let now = new Date().toISOString();
describe("Community events", () => {
    before(() => {
        cy.getAccount();
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
            .eventPreset(this.user, now, events.communityPostViewed)
            .then(responseData =>
                expect(responseData).to.be.true)
    });

});
