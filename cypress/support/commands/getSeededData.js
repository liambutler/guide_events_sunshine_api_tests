let apiVersion = '/api/v2';

Cypress.Commands.add('openArticle', () => {
  return cy.getArticle().then(article => {
    cy.visit(`hc/en-us/articles/${article.id}`)
      .wrap(article)
      .as('article');
  });
});

Cypress.Commands.add('getArticle', () => {
  return cy
    .requestApi({
      method: 'GET',
      url: `${apiVersion}/help_center/en-us/articles.json?sort_by=created_at&sort_order=desc`
    })
    .then(response => {
      if (response.body.articles.length > 0) {
        const article = response.body.articles[0];
        cy.wrap(article).as('article');
      } else {
        throw new Error(
          'No articles found for this account. Check that account is being seeded correctly.'
        );
      }
    });
});

Cypress.Commands.add('openPost', () => {
  return cy.getPost().then(post => {
    cy.visit(`hc/en-us/community/posts/${post.id}`)
      .wrap(post)
      .as('post');
  });
});

Cypress.Commands.add('getPost', () => {
  return cy
    .requestApi({
      method: 'GET',
      url: `${apiVersion}/community/posts.json?sort_by=created_at&sort_order=desc`
    })
    .then(response => {
      if (response.body.posts.length > 0) {
        const post = response.body.posts[0];
        cy.wrap(post).as('post');
      } else {
        throw new Error(
          'No posts found for this account. Check that post is being seeded correctly.'
        );
      }
    });
});

Cypress.Commands.add('getUser', userRole =>
  cy
    .requestApi({ url: `${apiVersion}/users.json` })
    .then(res => res.body.users.find(user => user.role === userRole))
);
