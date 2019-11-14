// visit:
// Goes to a URL and ensures the below items are in Session Storage
// Can pass an optional sessionSettings object. Accepts skipOnboarding, skipIncludeConnectSnippet,
//  and skipIncludeAnalyticsSnippet

Cypress.Commands.overwrite("visit", (originalFn, url, options = {}) => {
  const { onBeforeLoad = () => {}, sessionSettings } = options;

  return originalFn(url, {
    onBeforeLoad: (...args) => {
      const [contentWindow] = args;
      const {
        skipOnboarding = true,
        skipIncludeConnectSnippet = true,
        skipIncludeAnalyticsSnippet = true,
      } =
        sessionSettings || {};

      // Cypress does not currently support the fetch api, so this fallback is necessary until
      // https://github.com/cypress-io/cypress/issues/687 is fixed
      contentWindow.fetch = null;

      contentWindow.sessionStorage.setItem(
        "guide.skipOnboarding?",
        skipOnboarding
      );
      contentWindow.sessionStorage.setItem(
        "guide.skipIncludeConnectSnippet?",
        skipIncludeConnectSnippet
      );
      contentWindow.sessionStorage.setItem(
        "guide.skipIncludeAnalyticsSnippet?",
        skipIncludeAnalyticsSnippet
      );

      onBeforeLoad(...args);
    },
    ...(options || {}),
  });
});


Cypress.Commands.add("searchOnSearchResultsPage", (searchString) => {
  cy
      .visit(`hc/en-us/search?query=${searchString}`)
});
