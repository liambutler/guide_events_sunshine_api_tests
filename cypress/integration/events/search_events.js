import { events } from "../../fixtures/events";

let now = new Date().toISOString();
describe("Guide Search events", () => {
    before(() => {
        cy.getAccount();
    });
    beforeEach(() => {
        cy
            .getUser('agent')
            .as('user')
            .then(user =>
                cy.signIn(user))
    });
    it("ArticleInstantSearchResultClicked event present in the sunshine", function () {
        cy
            .visit('hc/en-us/')
            .getArticle()
            .then(article =>
                cy
                    .get('#query').type(article.title)
                    .get('zd-autocomplete-multibrand').click())
            .eventPreset(this.user, now, events.articleInstantSearchResultClicked)
            .then(responseData =>
                expect(responseData).to.be.true)

    });

    it("ArticleSearchResultClicked event present in the sunshine", function () {
        cy
            .getArticle()
            .then(article =>
                cy
                    .searchOnSearchResultsPage(article.title))
            .get('.search-result-title').click()
            .eventPreset(this.user, now, events.articleSearchResultClicked)
            .then(responseData =>
                expect(responseData).to.be.true)
    });

    it("HelpCenterSearched event present in the sunshine", function () {
        cy
            .visit('hc/en-us/community/topics/')
            .getPost()
            .then(post =>
                cy
                    .get('#query').type(`${post.title}{enter}`))
            .eventPreset(this.user, now, events.helpCenterSearched)
            .then(responseData =>
                expect(responseData).to.be.true)
    });

    it("CommunitySearchResultClicked event present in the sunshine", function () {
        cy
            .getPost()
            .then(post =>
                cy
                    .searchOnSearchResultsPage(post.title))
            .get('.search-result-title').first().click()
            .eventPreset(this.user, now, events.communitySearchResultClicked)
            .then(responseData =>
                expect(responseData).to.be.true)
    });


});
