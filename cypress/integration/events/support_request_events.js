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
    });
    it("SupportRequestMade and SupportRequestViewed events are present in the sunshine after creation of a ticket", function () {
        let now = new Date().toISOString();
        cy
            .visit('hc/en-us/requests/new')
            .get('#request_subject').type('Request Test Subject')
            .get('#request_description').type('Request Test Description')
            .get('input[name="commit"]').click()
            .url().then(url => {
                cy.url()
                    .as('url')
        })

            .eventPreset(this.user, now,'support_request_made')
            .then(responseData =>
                expect(responseData).to.be.true)
            .eventPreset(this.user, now,'support_request_viewed')
            .then(responseData =>
                expect(responseData).to.be.true)
    });

    it("SupportRequestViewed event is present in the sunshine after visiting ticket page", function () {
        let now = new Date().toISOString();
        cy
            .visit(this.url)
            .eventPreset(this.user, now,'support_request_viewed')
            .then(responseData =>
                expect(responseData).to.be.true)
    });

});
