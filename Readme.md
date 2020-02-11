# Guide Events in Sunshine API Integration Tests

This directory contains a collection of integration tests covering ingestion of the guide events into
Sunshine API
They are written in and run via [Cypress](https://cypress.io).

## Running tests

Cypress can run in two modes: As a one-off test run or as an ongoing session.
The former is achieved via the `cypress run` command and the latter via `cypress open`.

We have aliased these commands to `yarn cy:run` and `yarn cy:open` but either version will work.

### Environment variables

These are the optional environment variables that can be used to configure a test run:

| Name                     | Description                                                                                                                                            | Default              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `CYPRESS_pandoraEnabled` | When set to "true", the tests will pull down and sign in accounts from Pandora when using the `cy.signIn` command.                                     | `false`              |
| `CYPRESS_pod`            | When `CYPRESS_pandoraEnabled` is "true", this will tell the runtime from which pod Pandora accounts should be fetched from.                            | `998`                |
| `CYPRESS_authSession`    | The value of this will be written directly to the `_zendesk_shared_session` cookie, thereby bypassing the sign in flow. Can be useful when developing. | `undefined`          |
| `CYPRESS_userEmail`      | The user email to use for signing in a user for testing (ignored when using Pandora)                                                                   | `"admin@zd-dev.com"` |
| `CYPRESS_userPassword`   | The user password to use for signing in a user for testing (ignored when using Pandora)                                                                | `"123456"`           |

The environment variables can be applied in-line like so:

```bash
$ CYPRESS_pandoraEnabled=true cypress run
```

### Running tests against ZDI

Before running tests against ZDI, verify that the Mondocam Help Center has both English and Danish enabled. If not, update to the latest seed.
To keep the specs running quickly, there are no cleanups in the before/after steps. Pandora handles the cleanup on staging. If the ZDI tests begin to fail, run `yarn prepareMondocam`. This will clean up any Cypress-related test data and create new fixtures.

### Running specific tests

To run a specific test, add the `--spec` option and point it to the spec file you wish to run:

```bash
$ cypress run --spec cypress/integration/events/article_events.js
```

## Writing tests

For information the syntax to use when writing tests in Cypress, refer to the [Cypress documentation](https://docs.cypress.io/api/api/table-of-contents.html)

### Project file structure

All files input to and output from a test run is located within the `cypress/` root-folder.
The directory structure looks like this:

```
cypress/
  ├── integration
  │    ├── app1
  │    │    ├── spec1.js
  │    │    ├── spec2.js
  │    │    └── specN.js
  │    │── app2
  │    └── appN
  │
  ├── support
  │    ├── commands
  │    │    ├── general_command1.js
  │    │    ├── general_command2.js
  │    │    └── general_commandN.js
  │    ├── app1
  │    │    ├── specific_command1.js
  │    │    ├── specific_command2.js
  │    │    └── specific_commandN.js
  │    │── app2
  │    └── appN
  │
  ├── plugins
  ├── fixtures
  ├── screenshots
  └── videos
```

* **integration/**:
  The spec files themselves are located here.
* **support/**:
  Files that "support" the spec files by defining custom commands etc. are located here.
* **plugins/**:
  Any plugins for Cypress can be written here
* **fixtures/**:
  Any test fixtures will automatically be picked up from here
* **screenshots/**:
  Screenshots after a test run are output to here
* **videos/**:
  MP4 videos files for each spec during a test run are output to here

### Best Practices

#### Think async

Cypress works on the principle of chaining. While this will be familiar to anyone who has worked with Javascript promises, it can be confusing for people coming from other languages.

Commands should be chained together:

```js
cy
  .signIn()
  .visit("/hc/en-us/")
```

Non-Cypress commands should be wrapped using .then(), and should return something.

```js
cy
  .requestApi({ method: "GET", url })
  .then(response => response.body.sections[0].id)
```

Note that Cypress uses its own promise syntax. Keywords such as `async` will not work in a Cypress spec. More information can be found in the [documentation for Cypress.Promise()](https://docs.cypress.io/api/utilities/promise.html).

#### Test once. Test well

This is good testing practice in general, but because Cypress is so closely tied to the browser we can use its features to reduce duplication. 

Here are a couple of examples of what can be done with Cypress:

Specs do not need to go through the sign in modal each time. One spec could test the modal, and subsequent scenarios can set a cookie in the setup steps. This saves 5-10 seconds from each spec. [Here is a good example from this repo](https://github.com/zendesk/guide_events_sunshine_api_tests/blob/master/cypress/support/commands/signIn.js).

Likewise, if many tests will call on the same API, you can have one test to validate the integration. If other tests need to make the same call, this can be stubbed using [cy.server()](https://docs.cypress.io/api/commands/server.html) and [cy.route()](https://docs.cypress.io/api/commands/route.html) 

#### Go straight to where you want to go

Avoid clicking through several links in a scenario. While Cypress will have no issue clicking through to multiple parts of an app, it is not a good use of time. Go straight to the part of the app that you want to test. 

If you need to validate a link, consider validating on a url level instead. Much faster than clicking and waiting for a page to load.
