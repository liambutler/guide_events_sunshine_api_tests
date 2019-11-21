import { events } from "../../fixtures/events";

describe("Support request events", () => {
    before(() => {
        cy.getAccount();
    });
    after(()=>{
        cy
            .visit('access/logout')
            .signIn()
            .deleteProfile('end-user');
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
        cy
            .visit('hc/en-us/requests/new')
            .get('#request_subject').type('Request Test Subject')
            .get('#request_description').type('Request Test Description')
            .get('input[name="commit"]').click()
            .url().then(url => {
                cy.url()
                    .as('url')
        })

            .eventPreset(this.user, events.supportRequestMade)
            .then(responseData =>
                expect(responseData).to.be.true)
            .eventPreset(this.user, events.supportRequestViewed)
            .then(responseData =>
                expect(responseData).to.be.true)
    });

    it("SupportRequestViewed event is present in the sunshine after visiting ticket page", function () {
        cy
            .visit(this.url)
            .eventPreset(this.user, events.supportRequestViewed)
            .then(responseData =>
                expect(responseData).to.be.true)
    });

    it("ArticleSuggest and SuggestedArticleClicked events are present in the sunshine", function () {
        cy
            .visit('hc/en-us/requests/new')
            .getArticle()
            .then(article =>
                cy
                    .get('#request_subject').type(article.title)
                    .eventPreset(this.user, events.answersSuggested)
                    .then(responseData =>
                        expect(responseData).to.be.true)
                    .get('.searchbox-suggestions a').click()
                    .eventPreset(this.user, events.suggestedArticleClicked)
                    .then(responseData =>
                        expect(responseData).to.be.true))

    });

});
