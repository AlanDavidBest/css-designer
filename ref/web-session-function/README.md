# Web Session Service
  
## Introducton

This project uses the serverless, webpack and node.js frameworks to support the storage and retrieval of web session data via a simple GET and PUT rest api.

All available endpoints are written to the console when you issue `yarn start`.

### Webpack

Webpack has been used to enable developers to use ES6 syntax, benefit from webpack module capabilities as well as provide the ability to produce minified individual functions for deployment. Webpack also enables developers to pre-process Javascript using all of the available Webpack plugins.

## Setup
It is essential that you use a node version greater than 8.0.* to run this project.
A number of global node.js modules are required to start using this project locally, of which are listed below:

* yarn
* serverless
* serverless-offline

Packages can be installed globally using the following command:

    npm install -g <package-name>

Once the above node.js packages have been installed globally, you need to install all project dependencies by executing the `yarn` command.

## Running in Development mode.

The project runs using a local serverless installation which provides local AWS services such as S3. The configuration for this is found in  the `serverless.yml` file.

The project can be run locally by executing the `yarn start` command. Doing so will run `serverless-offline` with the webpack plugin.

## Test

### Unit

Testing is provided using NYC, Mocha, Chai and Sinon. Tests are located in the `test/unit` directory and can be run by executing the `yarn test` command. Doing so will run all tests as well as print out the test coverage report in the terminal. A html report will also be produced, this is located in the `coverage` directory.

### Acceptance

Acceptance test support is provided by cucumber-js and apickli. Cucumber-js provides the Cucumber and Gherkin support; apickli provides a rest testing framework to standardise the feature file


To run the full acceptance test type `yarn acceptance`. This runs the serverless-offline stack and then executes the features against this local instance. Once the test run is complete the serverless-offline instance is torn down. This is all controlled by the "bin/run_acceptance.sh" script.


## Debug
To start a debug session you can type `yarn debug`. Currently this works, to a degree, with Visual Source Code but some debug features, such as inspect, tend to fail.

### debugging acceptance
You can also run type `yarn start` to start your service and `yarn cucumber` in another terminal to execute the acceptance tests on your running application.

## Building

The AWS Lambda functions are built via the `yarn build` command. Executing the `build` command will run webpack, bundling each function into a separate zip file located in the `.serverless` directory.
