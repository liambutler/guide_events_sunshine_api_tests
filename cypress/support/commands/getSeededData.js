Cypress.Commands.add("openArticle", () => {
    return cy
        .requestApi({
            method: "GET",
            url:
                "/api/v2/help_center/en-us/articles.json?sort_by=created_at&sort_order=desc",
        })
        .then(response => {
            if (response.body.articles.length > 0) {
                const article = response.body.articles[0];
                cy
                    .visit(`hc/en-us/articles/${article.id}`)
                    .wrap(article)
                    .as("article");
            } else {
                throw new Error(
                    "No articles found for this account. Check that account is being seeded correctly."
                );
            }
        });
});

Cypress.Commands.add("getArticle", () => {
    return cy
        .requestApi({
            method: "GET",
            url:
                "/api/v2/help_center/en-us/articles.json?sort_by=created_at&sort_order=desc",
        })
        .then(response => {
            if (response.body.articles.length > 0) {
                const article = response.body.articles[0];
                cy
                    .wrap(article)
                    .as("article");
            } else {
                throw new Error(
                    "No articles found for this account. Check that account is being seeded correctly."
                );
            }
        });
});

Cypress.Commands.add("openPost", () => {
    return cy
        .requestApi({
            method: "GET",
            url:
                "/api/v2/community/posts.json?sort_by=created_at&sort_order=desc",
        })
        .then(response => {
            if (response.body.posts.length > 0) {
                const post = response.body.posts[0];
                cy
                    .visit(`hc/en-us/community/posts/${post.id}`)
                    .wrap(post)
                    .as("post");
            } else {
                throw new Error(
                    "No posts found for this account. Check that post is being seeded correctly."
                );
            }
        });
});

Cypress.Commands.add("getPost", () => {
    return cy
        .requestApi({
            method: "GET",
            url:
                "/api/v2/community/posts.json?sort_by=created_at&sort_order=desc",
        })
        .then(response => {
            if (response.body.posts.length > 0) {
                const post = response.body.posts[0];
                cy
                    .wrap(post)
                    .as("post");
            } else {
                throw new Error(
                    "No posts found for this account. Check that post is being seeded correctly."
                );
            }
        });
});

Cypress.Commands.add("getUser", userRole =>
    cy
        .requestApi({url: "/api/v2/users.json"})
        .then(res => res.body.users.find(user => user.role === userRole))
);

Cypress.Commands.add("eventPreset", (user, time, event) => {
    let url = `/api/sunshine/events?identifier=support:user_id:${JSON.stringify(user.id)}&start_time=${time}`;
    let timeout = 15000;
         return cy
            .waitUntil(() =>
                    cy.requestApi({
                        method: "GET",
                        url: url
                    })
                        .then(response => {
                            if (response.body.data != null) {
                                for (let i = 0; i < response.body.data.length; i++) {
                                    if (response.body.data[i].type === event) {
                                        return true
                                    }
                                }
                                return false
                            }else {
                                return false
                            }
                        }
                            )
                , {errorMsg: `Could not find the event ${event} in ${timeout/1000} seconds.`, interval: 1000, timeout: timeout})
    }
);
