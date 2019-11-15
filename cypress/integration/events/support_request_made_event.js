let now = new Date().toISOString();
describe("Guide event", () => {
    before(() => {
        cy.getAccount();
    });
    beforeEach(() => {
        cy
            .getUser('end-user')
            .as('user')
            .then(user =>
                cy
                    .signIn(user))
            .visit('hc/en-us/requests/new')
            .get('#request_subject').type('Request Test Subject')
            .get('#request_description').type('Request Test Description')
            .get('input[name="commit"]').click();
    });
    
    it("SupportRequestMade event present in the sunshine", function () {
        cy
            .wait(10000)
            .getUserEvents(this.user, now,'support_request_made')
            .then(responseData =>
                expect(responseData).to.be.true)
    });

});
